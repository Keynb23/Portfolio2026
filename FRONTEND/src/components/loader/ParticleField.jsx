import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { THEME_THREE } from "../../lib/themeConfig";

const PARTICLE_COUNT = 500;
const PARTICLE_BASE_SIZE = 0.025;

export const ParticleField = ({ isUnlocking, isHovered }) => {
  const meshRef = useRef();
  const { mouse, viewport } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const dummyColor = useMemo(() => new THREE.Color(), []);

  // Initialize Particles
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 60;
      const y = (Math.random() - 0.5) * 40;
      const z = (Math.random() - 0.5) * 20;

      // Diner theme gradient: Crimson Red to Chrome Silver
      const mix = (x + 30) / 60;
      const color = new THREE.Color();
      color.lerpColors(THEME_THREE.crimson, THEME_THREE.silver, mix);

      temp.push({
        pos: new THREE.Vector3(x, y, z),
        basePos: new THREE.Vector3(x, y, z),
        vel: new THREE.Vector3(),
        acc: new THREE.Vector3(),
        offset: Math.random() * Math.PI * 2,
        scale: 0.2 + Math.random() * 0.8,
        baseColor: color.clone(),
        shimmerSpeed: 2 + Math.random() * 4,
        rotation: new THREE.Euler(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ),
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const mx = (mouse.x * viewport.width) / 2;
    const my = (mouse.y * viewport.height) / 2;
    const mousePos = new THREE.Vector3(mx, my, 0);

    particles.forEach((p, i) => {
      // 1. Physics: Floating & Interaction
      p.acc.x += Math.sin(time * 0.5 + p.offset) * 0.001;
      p.acc.y += Math.cos(time * 0.4 + p.offset) * 0.001;

      const dist = p.pos.distanceTo(mousePos);
      if (dist < 8) {
        const repulsion = new THREE.Vector3()
          .subVectors(p.pos, mousePos)
          .normalize();
        p.acc.add(repulsion.multiplyScalar((8 - dist) * 0.01));
      }

      if (isHovered) {
        const dispersal = p.pos.clone().normalize();
        p.acc.add(
          dispersal.multiplyScalar(Math.max(0, (30 - p.pos.length()) * 0.005)),
        );
      }

      // 2. Return to Base & Integration
      p.acc.add(
        new THREE.Vector3().subVectors(p.basePos, p.pos).multiplyScalar(0.005),
      );
      p.vel.add(p.acc).multiplyScalar(0.95);
      p.pos.add(p.vel);
      p.acc.set(0, 0, 0);

      // 3. Transformation
      dummy.position.copy(p.pos);
      dummy.rotation.set(
        p.rotation.x + time * 0.2,
        p.rotation.y + time * 0.1,
        p.rotation.z + time * 0.15,
      );

      const s = isUnlocking ? THREE.MathUtils.lerp(p.scale, 0, 0.1) : p.scale;
      dummy.scale.setScalar(PARTICLE_BASE_SIZE * s);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      // 4. Neon Flicker Effect
      const baseShimmer =
        Math.sin(time * p.shimmerSpeed + p.offset) * 0.5 + 0.5;
      // Add a "neon flicker" - sharp spikes in intensity
      const flicker = Math.random() > 0.98 ? Math.random() * 2 : 1;
      dummyColor
        .copy(p.baseColor)
        .multiplyScalar(flicker * (1 + baseShimmer * 1.5));
      meshRef.current.setColorAt(i, dummyColor);
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
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial transparent opacity={0.8} />
    </instancedMesh>
  );
};
