import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useProgress } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  DepthOfField,
} from "@react-three/postprocessing";
import * as THREE from "three";
import gsap from "gsap";
import { Lock } from "lucide-react";

/**
 * High-End 3D Particle System
 * Uses InstancedMesh for performance and Curl-like noise for physics.
 */
const PARTICLE_COUNT = 50000;
const PARTICLE_BASE_SIZE = 0.02; // Adjust this to change the overall size

const INITIAL_PARTICLES = (() => {
  const temp = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const x = (Math.random() - 0.5) * 60;
    const y = (Math.random() - 0.5) * 40;
    const z = (Math.random() - 0.5) * 20;

    // Pacers gradient: Navy -> Silver -> Gold
    const mix = (x + 30) / 60;
    const color = new THREE.Color();
    if (mix < 0.5) {
      color.lerpColors(
        new THREE.Color("#002D62"), // Navy
        new THREE.Color("#BEC0C2"), // Silver
        mix * 2,
      );
    } else {
      color.lerpColors(
        new THREE.Color("#e1e2e3ff"), // Silver
        new THREE.Color("#FDB927"), // Gold
        (mix - 0.5) * 2,
      );
    }

    temp.push({
      pos: new THREE.Vector3(x, y, z),
      basePos: new THREE.Vector3(x, y, z),
      vel: new THREE.Vector3(0, 0, 0),
      acc: new THREE.Vector3(0, 0, 0),
      speed: 0.2 + Math.random() * 0.5,
      offset: Math.random() * Math.PI * 2,
      scale: 0.1 + Math.random() * 0.3,
      color: color.clone(),
      baseColor: color.clone(),
      isShimmer: i < 500, // Exactly 500 shimmering particles
      shimmerSpeed: 2 + Math.random() * 4,
      rotation: new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ),
    });
  }
  return temp;
})();

const ParticleField = ({ isUnlocking, isHovered }) => {
  const meshRef = useRef();
  const { mouse, viewport } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const dummyColor = useMemo(() => new THREE.Color(), []);
  const particles = useMemo(() => INITIAL_PARTICLES, []);

  useEffect(() => {
    if (!meshRef.current) return;
    particles.forEach((particle, i) => {
      meshRef.current.setColorAt(i, particle.color);
    });
    meshRef.current.instanceColor.needsUpdate = true;
  }, [particles]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const mx = (mouse.x * viewport.width) / 2;
    const my = (mouse.y * viewport.height) / 2;

    particles.forEach((particle, i) => {
      let { pos, basePos, vel, acc, scale, offset, rotation } = particle;

      // Subtle float movement
      acc.x += Math.sin(time * 0.5 + offset) * 0.001;
      acc.y += Math.cos(time * 0.4 + offset) * 0.001;
      acc.z += Math.sin(time * 0.3 + offset) * 0.001;

      // Interaction
      const mousePos = new THREE.Vector3(mx, my, 0);
      const dist = pos.distanceTo(mousePos);
      if (dist < 8) {
        const repulsion = new THREE.Vector3()
          .subVectors(pos, mousePos)
          .normalize();
        const force = (8 - dist) * 0.01;
        acc.add(repulsion.multiplyScalar(force));
      }

      // Hover Dispersal
      if (isHovered) {
        const centerDist = pos.length();
        const dispersal = pos.clone().normalize();
        const force = Math.max(0, (30 - centerDist) * 0.005);
        acc.add(dispersal.multiplyScalar(force));
      }

      // Return to base position (subtle)
      const returnForce = new THREE.Vector3()
        .subVectors(basePos, pos)
        .multiplyScalar(0.005);
      acc.add(returnForce);

      vel.add(acc);
      vel.multiplyScalar(0.95);
      pos.add(vel);
      acc.set(0, 0, 0);

      dummy.position.copy(pos);
      // Align rotation to movement or just subtle spin
      dummy.rotation.set(
        rotation.x + time * 0.2,
        rotation.y + time * 0.1,
        rotation.z + time * 0.15,
      );

      const s = isUnlocking ? THREE.MathUtils.lerp(scale, 0, 0.1) : scale;
      // Adjust size based on the base constant and individual random scale
      const finalScale = PARTICLE_BASE_SIZE * s;
      dummy.scale.set(finalScale, finalScale, finalScale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      // --- COLOR SHIMMER ANIMATION ---
      if (particle.isShimmer) {
        const shimmer =
          Math.sin(time * particle.shimmerSpeed + particle.offset) * 0.5 + 0.5;
        // Boost color intensity significantly to trigger Bloom emission
        dummyColor.copy(particle.baseColor).multiplyScalar(1 + shimmer * 25);
        meshRef.current.setColorAt(i, dummyColor);
      }
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.instanceColor.needsUpdate = true;
    meshRef.current.material.opacity = THREE.MathUtils.lerp(
      meshRef.current.material.opacity,
      isUnlocking ? 0 : 0.8,
      0.05,
    );
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, PARTICLE_COUNT]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial transparent opacity={0.8} />
    </instancedMesh>
  );
};

import cinematicMusic from "./cinematic-dark-mysterious-music-412770.mp3";
import lebronMusic from "./lebron-song-469441.mp3";

/**
 * @component LoadingScreen_Entry
 * Main orchestrator for the initialization UX and 3D Canvas initialization.
 */
const LoadingScreen = ({ onFinished }) => {
  const { progress, active } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isPausedAtCritical, setIsPausedAtCritical] = useState(false);
  const hasPaused = useRef(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLebronHovered, setIsLebronHovered] = useState(false);
  const overlayRef = useRef();
  const buttonRef = useRef();
  const containerRef = useRef();

  // Audio References
  const cinematicAudioRef = useRef(new Audio(cinematicMusic));
  const lebronAudioRef = useRef(new Audio(lebronMusic));

  /**
   * @hook Audio_Initializer
   * Sets up audio properties and handles initial playback.
   */
  useEffect(() => {
    const cinematic = cinematicAudioRef.current;
    const lebron = lebronAudioRef.current;

    cinematic.loop = true;
    lebron.loop = true;
    cinematic.volume = 0.5;
    lebron.volume = 0.6;

    // Attempt to play cinematic audio on load
    const playAttempt = setInterval(() => {
      cinematic
        .play()
        .then(() => {
          clearInterval(playAttempt);
        })
        .catch(() => {
          // Autoplay blocked - will wait for interaction
        });
    }, 1000);

    return () => {
      clearInterval(playAttempt);
      cinematic.pause();
      lebron.pause();
    };
  }, []);

  /**
   * @hook Audio_Suspense_Logic
   * Handles the cross-fade/pause logic between the tracks and the 7s exit fade-out.
   */
  useEffect(() => {
    // Stage 1: The user un-locks the portfolio
    if (isUnlocking) {
      lebronAudioRef.current.pause(); // Kill lebron instantly

      // Quickly fade out the cinematic music over 2 seconds
      gsap.to(cinematicAudioRef.current, {
        volume: 0,
        duration: 2,
        ease: "power1.out",
        onComplete: () => {
          cinematicAudioRef.current.pause();
        },
      });
      return;
    }

    // Stage 2: Normal interaction logic
    if (isLebronHovered) {
      cinematicAudioRef.current.pause();
      lebronAudioRef.current.play().catch(() => {});
    } else {
      lebronAudioRef.current.pause();
      cinematicAudioRef.current.play().catch(() => {});
    }
  }, [isLebronHovered, isUnlocking]);

  /**
   * @hook useLoading_Orchestrator
   * Manages the smooth interpolation of the loading bar and the 2.0s dramatic pause at 67%.
   */
  useEffect(() => {
    let interval;
    if (!isLoaded) {
      interval = setInterval(() => {
        setDisplayProgress((prev) => {
          // --- DRAMATIC PAUSE LOGIC ---
          // Hold the progress at 67% for a cinematic 'Core Sync' simulation
          // Only trigger if we haven't paused yet
          if (Math.round(prev) === 67 && !hasPaused.current) {
            setIsPausedAtCritical(true);
            hasPaused.current = true; // Mark as paused immediately
            return 67;
          }

          // If we are currently paused, stay at 67
          if (isPausedAtCritical) {
            return 67;
          }

          const target = Math.max(progress, prev + 0.5); // Slower, smoother climb
          if (target >= 100 && !active) {
            clearInterval(interval);
            setTimeout(() => setIsLoaded(true), 500);
            return 100;
          }
          const increment = (100 - prev) * 0.05;
          return Math.min(99.9, prev + Math.max(0.05, increment));
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [progress, active, isLoaded, isPausedAtCritical]);

  /**
   * @hook Pause_Timeout
   * Resumes the loading sequence after a 2.0 second wait at the 67% mark.
   */
  useEffect(() => {
    if (isPausedAtCritical) {
      const resumeTimer = setTimeout(() => {
        setIsPausedAtCritical(false);
        // "Bump" the progress past 67 so the round logic doesn't catch it again
        setDisplayProgress(68);
      }, 2000);
      return () => clearTimeout(resumeTimer);
    }
  }, [isPausedAtCritical]);

  /**
   * @hook Scroll_Body_Lock
   * Locks the global scrollbar during initialization.
   */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    // Force loaded state only if something goes terribly wrong
    const forceLoad = setTimeout(() => {
      if (!isLoaded) setIsLoaded(true);
    }, 12000);

    return () => clearTimeout(forceLoad);
  }, [isLoaded]);

  /**
   * @function handleUnlock_Action
   * Triggers the high-end GSAP exit transition when the user enters the experience.
   * Delayed to allow for the audio fade-out.
   */
  const handleUnlock = () => {
    setIsUnlocking(true);
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "auto";
        if (onFinished) onFinished();
      },
    });

    // Animate container to transparent to reveal underlying UI immediately
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 1.0,
      ease: "power2.inOut",
      onStart: () => {
        if (containerRef.current)
          containerRef.current.style.pointerEvents = "none";
      },
    });

    // Fade UI HUD out quickly in parallel
    tl.to(
      overlayRef.current,
      {
        opacity: 0,
        duration: 0.8,
        ease: "power3.inOut",
      },
      "<",
    );

    tl.to(
      buttonRef.current,
      { scale: 0.7, opacity: 0, duration: 0.6, ease: "power4.in" },
      "<",
    );

    // Hold the component mounted slightly longer for audio fade (total 2s from start)
    // The previous animations take ~1s. We wait another 1s.
    tl.to({}, { duration: 1.0 });
  };

  return (
    // <!-- WRAPPER: Cinematic Container -->
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[9999] transition-colors duration-2000 overflow-hidden select-none bg-black`}
    >
      {/* <!-- ELEMENT: 3D Scene Layer --> */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 15], fov: 50 }}
          gl={{ antialias: false, powerPreference: "high-performance" }}
          style={{ touchAction: "none" }}
        >
          <color attach="background" args={["#000000"]} />
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={2} color="#FDB927" />
          <spotLight
            position={[-10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={5}
            color="white"
          />

          <ParticleField isUnlocking={isUnlocking} isHovered={isHovered} />

          <EffectComposer disableNormalPass>
            <Bloom
              luminanceThreshold={0.9}
              mipmapBlur
              intensity={0.3}
              radius={0.2}
            />
            <DepthOfField
              focusDistance={0.01}
              focalLength={0.025}
              bokehScale={1.5}
              height={480}
            />
          </EffectComposer>
        </Canvas>
      </div>

      {/* <!-- ELEMENT: UI HUD Layer --> */}
      <div
        ref={overlayRef}
        className="absolute inset-0 flex items-center justify-center p-6 backdrop-blur-px pointer-events-none"
      >
        <div className="max-w-2xl w-full text-center">
          {!isLoaded ? (
            // <!-- INITIALIZING: Data HUD -->
            <div className="space-y-8 max-w-md mx-auto">
              <h1 className="text-white text-3xl font-black tracking-[0.5em] uppercase opacity-60 animate-pulse">
                {isPausedAtCritical ? "Checking Core Vitals" : "Initializing"}
              </h1>
              <div className="w-full h-px bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-pacers-gold transition-all duration-300 ease-out shadow-[0_0_15px_#FDB927]"
                  style={{ width: `${displayProgress}%` }}
                />
              </div>
              <p className="text-pacers-gold/40 text-[10px] font-bold tracking-[0.3em] uppercase">
                {isPausedAtCritical
                  ? "Critical Sync In Progress"
                  : `Core Sync ${Math.round(displayProgress)}%`}
              </p>
            </div>
          ) : (
            // <!-- ACTION: Dual CTA Group -->
            <div className="flex flex-col items-center gap-8">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 pointer-events-auto">
                {/* Primary Button: Unlock */}
                <button
                  ref={buttonRef}
                  onClick={handleUnlock}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="group relative px-12 py-6 bg-white/5 border border-white/10 rounded-full backdrop-blur-3xl transition-all duration-700 hover:bg-pacers-gold/5 hover:border-pacers-gold/30 hover:scale-105 active:scale-95 cursor-pointer overflow-hidden shadow-2xl"
                >
                  <div className="relative z-10 flex items-center gap-5">
                    <div className="p-3 bg-pacers-gold/10 rounded-full group-hover:bg-pacers-gold/20 transition-colors shadow-inner">
                      <Lock size={20} className="text-pacers-gold" />
                    </div>
                    <span className="text-white text-xl font-black tracking-[0.4em] uppercase">
                      Enter Experience
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500" />
                </button>

                {/* Separator */}
                <span className="text-white/20 text-xs font-black tracking-[0.5em] uppercase italic">
                  Or
                </span>

                {/* Secondary Button: Lebron */}
                <button
                  onClick={() =>
                    window.open(
                      "https://www.youtube.com/watch?v=vpXhz8MUwEw",
                      "_blank",
                    )
                  }
                  onMouseEnter={() => {
                    setIsHovered(true);
                    setIsLebronHovered(true);
                  }}
                  onMouseLeave={() => {
                    setIsHovered(false);
                    setIsLebronHovered(false);
                  }}
                  className="group relative px-10 py-5 bg-white/2 border border-white/5 rounded-full backdrop-blur-3xl transition-all duration-700 hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95 cursor-pointer overflow-hidden text-white/50 hover:text-white"
                >
                  <span className="relative z-10 text-sm font-bold tracking-[0.3em] uppercase">
                    2018 Lebron
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-12 left-12 pointer-events-none opacity-20 hidden md:block">
        <div className="space-y-2 border-l border-white/20 pl-4">
          <p className="text-white/40 text-[9px] font-mono tracking-tighter uppercase whitespace-pre leading-relaxed">
            Engine: R3F + PostProcessing{"\n"}
            Renderer: WebGL 2.0 / InstancedMesh{"\n"}
            Physics: Micro-Particles{"\n"}
            Volume: {PARTICLE_COUNT / 1000}k Core Units
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
