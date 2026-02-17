import { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useProgress } from "@react-three/drei";
import { EffectComposer, Bloom, DepthOfField } from "@react-three/postprocessing";
import gsap from "gsap";

import { ParticleField } from "./ParticleField";
import { LoadingHUD } from "./LoadingHUD";
import cinematicMusic from "./cinematic-dark-mysterious-music-412770.mp3";
import lebronMusic from "./lebron-song-469441.mp3";

const LoadingScreen = ({ onFinished }) => {
  const { progress, active } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isPausedAtCritical, setIsPausedAtCritical] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLebronHovered, setIsLebronHovered] = useState(false);

  const containerRef = useRef();
  const overlayRef = useRef();
  const buttonRef = useRef();
  const cinematicAudioRef = useRef(new Audio(cinematicMusic));
  const lebronAudioRef = useRef(new Audio(lebronMusic));
  const hasPaused = useRef(false);

  // 1. Audio Initialization
  useEffect(() => {
    const cin = cinematicAudioRef.current;
    const leb = lebronAudioRef.current;
    cin.loop = leb.loop = true;
    cin.volume = 0.5; leb.volume = 0.6;

    const playAttempt = setInterval(() => {
      cin.play().then(() => clearInterval(playAttempt)).catch(() => {});
    }, 1000);

    return () => {
      clearInterval(playAttempt);
      cin.pause(); leb.pause();
    };
  }, []);

  // 2. Audio Switching
  useEffect(() => {
    if (isUnlocking) {
      lebronAudioRef.current.pause();
      gsap.to(cinematicAudioRef.current, { volume: 0, duration: 2, onComplete: () => cinematicAudioRef.current.pause() });
      return;
    }
    isLebronHovered ? (cinematicAudioRef.current.pause(), lebronAudioRef.current.play()) 
                    : (lebronAudioRef.current.pause(), cinematicAudioRef.current.play());
  }, [isLebronHovered, isUnlocking]);

  // 3. Progress Orchestration
  useEffect(() => {
    if (isLoaded) return;
    const interval = setInterval(() => {
      setDisplayProgress(prev => {
        if (Math.round(prev) === 67 && !hasPaused.current) {
          setIsPausedAtCritical(true);
          hasPaused.current = true;
          return 67;
        }
        if (isPausedAtCritical) return 67;
        
        const target = Math.max(progress, prev + 0.5);
        if (target >= 100 && !active) {
          clearInterval(interval);
          setTimeout(() => setIsLoaded(true), 500);
          return 100;
        }
        return Math.min(99.9, prev + (100 - prev) * 0.05);
      });
    }, 50);
    return () => clearInterval(interval);
  }, [progress, active, isLoaded, isPausedAtCritical]);

  useEffect(() => {
    if (isPausedAtCritical) {
      const timer = setTimeout(() => {
        setIsPausedAtCritical(false);
        setDisplayProgress(68);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isPausedAtCritical]);

  const handleUnlock = () => {
    setIsUnlocking(true);
    const tl = gsap.timeline({ onComplete: () => {
      document.body.style.overflow = "auto";
      if (onFinished) onFinished();
    }});

    tl.to(containerRef.current, { opacity: 0, duration: 1.5, ease: "power2.inOut", onStart: () => { containerRef.current.style.pointerEvents = "none"; } });
    tl.to([overlayRef.current, buttonRef.current], { opacity: 0, duration: 0.8 }, "<");
  };

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] bg-black overflow-hidden select-none">
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 50 }} gl={{ antialias: false }}>
          <color attach="background" args={["#000000"]} />
          <ParticleField isUnlocking={isUnlocking} isHovered={isHovered} />
          <EffectComposer disableNormalPass>
            <Bloom luminanceThreshold={0.9} mipmapBlur intensity={0.3} radius={0.2} />
            <DepthOfField focusDistance={0.01} focalLength={0.025} bokehScale={1.5} height={480} />
          </EffectComposer>
        </Canvas>
      </div>

      <LoadingHUD 
        isLoaded={isLoaded}
        displayProgress={displayProgress}
        isPausedAtCritical={isPausedAtCritical}
        handleUnlock={handleUnlock}
        setIsHovered={setIsHovered}
        setIsLebronHovered={setIsLebronHovered}
        overlayRef={overlayRef}
        buttonRef={buttonRef}
      />
    </div>
  );
};

export default LoadingScreen;