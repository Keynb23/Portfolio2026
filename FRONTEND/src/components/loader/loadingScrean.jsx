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
const PARTICLE_COUNT = 4000; // Adjusted for 3D geometry performance

// Pre-generate particle data for physics and performance (fixes random purity issues)
/**
 * @function INITIAL_PARTICLES_GENERATOR
 * Pre-generates the 4,000 particle objects with unique physical properties
 * to ensure a pure React render and high-performance WebGL execution.
 */
const INITIAL_PARTICLES = (() => {
  const temp = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const t = Math.random() * 100;
    const factor = 20 + Math.random() * 100;
    const speed = 0.005 + Math.random() / 400; // Slower base speed
    const xAngle = Math.random() * Math.PI;
    const yAngle = Math.random() * Math.PI;
    const zAngle = Math.random() * Math.PI;

    temp.push({
      t,
      factor,
      speed,
      xAngle,
      yAngle,
      zAngle,
      pos: new THREE.Vector3().set(
        (Math.random() - 0.5) * 45,
        (Math.random() - 0.5) * 45,
        (Math.random() - 0.5) * 30
      ),
      vel: new THREE.Vector3(0, 0, 0),
      acc: new THREE.Vector3(0, 0, 0),
      scale: 0.03 + Math.random() * 0.07, // Even smaller particles
    });
  }
  return temp;
})();

/**
 * @component ParticleField
 * The 3D Engine that handles InstancedMesh logic, Curl Noise physics,
 * and interactive mouse repulsion.
 */
const ParticleField = ({ isUnlocking, isHovered }) => {
  const meshRef = useRef();
  const { mouse, viewport } = useThree();

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => INITIAL_PARTICLES, []);

  /**
   * @hook useFrame_RenderLoop
   * Updates all 4,000 particle matrices per frame at 60fps.
   */
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const mx = (mouse.x * viewport.width) / 2;
    const my = (mouse.y * viewport.height) / 2;

    particles.forEach((particle, i) => {
      let { pos, vel, acc, scale, speed, xAngle, yAngle, zAngle } = particle;

      // --- APPLIED PHYSICS: Curl Drift ---
      acc.x += Math.cos(time * speed + xAngle) * 0.0008;
      acc.y += Math.sin(time * speed + yAngle) * 0.0008;
      acc.z += Math.cos(time * speed + zAngle) * 0.0008;

      // --- INTERACTION: Mouse Repulsion ---
      const dist = pos.distanceTo(new THREE.Vector3(mx, my, 0));
      if (dist < 4) {
        const repulsion = new THREE.Vector3()
          .subVectors(pos, new THREE.Vector3(mx, my, 0))
          .normalize();
        const force = (4 - dist) * 0.005; // Less snappy
        acc.add(repulsion.multiplyScalar(force));
      }

      // --- INTERACTION: Hover Dispersal ---
      if (isHovered) {
        const centerDist = pos.length();
        const dispersal = pos.clone().normalize();
        const force = Math.max(0, (22 - centerDist) * 0.012);
        acc.add(dispersal.multiplyScalar(force));
      }

      // --- PHYSICS INTEGRATION ---
      vel.add(acc);
      vel.multiplyScalar(0.98); // Higher drag for smoother, slower stops
      pos.add(vel);
      acc.set(0, 0, 0);

      // --- BOUNDARY CHECK: Smooth Teleport ---
      if (pos.x > 35) pos.x = -35;
      if (pos.x < -35) pos.x = 35;
      if (pos.y > 25) pos.y = -25;
      if (pos.y < -25) pos.y = 25;
      if (pos.z > 20) pos.z = -20;
      if (pos.z < -20) pos.z = 20;

      // --- TRANSFORM MESH INSTANCE ---
      dummy.position.copy(pos);
      dummy.rotation.set(time * speed, time * speed, time * speed);
      const s = isUnlocking ? THREE.MathUtils.lerp(scale, 0, 0.1) : scale;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;

    /**
     * @animation Opacity_Lerp
     * Smoothly transitions the material opacity based on hover/unlock states.
     */
    meshRef.current.material.opacity = THREE.MathUtils.lerp(
      meshRef.current.material.opacity,
      isUnlocking ? 0 : isHovered ? 0.2 : 0.7,
      0.05
    );
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, PARTICLE_COUNT]}>
      <icosahedronGeometry args={[0.1, 1]} />
      <meshStandardMaterial
        color="#FDB927"
        emissive="#FDB927"
        emissiveIntensity={1} // Very subtle glow
        transparent
        roughness={0.03}
        metalness={1.0}
      />
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
   * Handles the cross-fade/pause logic between the two audio tracks.
   */
  useEffect(() => {
    if (isUnlocking) {
      cinematicAudioRef.current.pause();
      lebronAudioRef.current.pause();
      return;
    }

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
   */
  const handleUnlock = () => {
    setIsUnlocking(true);
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "auto";
        if (onFinished) onFinished();
      },
    });

    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 1.2,
      ease: "power3.inOut",
    });
    tl.to(
      buttonRef.current,
      { scale: 0.7, opacity: 0, duration: 1, ease: "power4.in" },
      "<"
    );
  };

  return (
    // <!-- WRAPPER: Cinematic Container -->
    <div
      className={`fixed inset-0 z-[9999] transition-colors duration-2000 overflow-hidden select-none ${
        isHovered ? "bg-black" : "bg-[#00050A]"
      }`}
    >
      {/* <!-- ELEMENT: 3D Scene Layer --> */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 15], fov: 50 }}
          gl={{ antialias: false, powerPreference: "high-performance" }}
          style={{ touchAction: "none" }}
        >
          <color
            attach="background"
            args={isHovered ? ["#000000"] : ["#00050A"]}
          />
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={2} color="#FDB927" />
          <spotLight
            position={[-10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={5}
            color="#white"
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
              <div className="w-full h-px bg-white/5 rounded-full overflow-hidden">
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
                  className="group relative px-12 py-6 bg-white/2 border border-white/10 rounded-full backdrop-blur-3xl transition-all duration-700 hover:bg-pacers-gold/5 hover:border-pacers-gold/30 hover:scale-105 active:scale-95 cursor-pointer overflow-hidden shadow-2xl"
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
                      "_blank"
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
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
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
            Physics: Curl Noise / Drag Vector{"\n"}
            Volume: 4.0k Icosahedrons
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
