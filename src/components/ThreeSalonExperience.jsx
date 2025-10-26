import React, { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, ContactShadows, Float, Html } from '@react-three/drei';
import * as THREE from 'three';

function useProgressLoop(duration = 14) {
  const ref = useRef(0);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current = (t % duration) / duration; // 0..1 loop
  });
  return ref;
}

function Person({ progressRef }) {
  const group = useRef();
  const hairRef = useRef();
  const headRef = useRef();

  useFrame(() => {
    const p = progressRef.current;
    const walkP = THREE.MathUtils.clamp(p / 0.4, 0, 1);
    const sitP = THREE.MathUtils.clamp((p - 0.4) / 0.15, 0, 1);
    const cutP = THREE.MathUtils.clamp((p - 0.55) / 0.3, 0, 1);
    const nodP = THREE.MathUtils.clamp((p - 0.85) / 0.15, 0, 1);

    const x = THREE.MathUtils.lerp(-2.2, 0.28, walkP);
    const y = THREE.MathUtils.lerp(0.6, 0.42, sitP);

    if (group.current) group.current.position.set(x, y, 0);
    if (hairRef.current) hairRef.current.scale.y = THREE.MathUtils.lerp(1, 0.4, cutP);
    if (headRef.current) headRef.current.rotation.z = THREE.MathUtils.degToRad(THREE.MathUtils.lerp(0, -6, nodP));
  });

  return (
    <group ref={group}>
      {/* Body */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <capsuleGeometry args={[0.16, 0.5, 2, 8]} />
        <meshStandardMaterial color={0xffffff} metalness={0.1} roughness={0.85} />
      </mesh>
      {/* Head group */}
      <group ref={headRef} position={[0, 0.65, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.16, 16, 16]} />
          <meshStandardMaterial color={0xffffff} roughness={0.65} metalness={0.05} />
        </mesh>
        {/* Hair */}
        <mesh ref={hairRef} position={[0, 0.17, 0]} castShadow>
          <boxGeometry args={[0.28, 0.18, 0.32]} />
          <meshStandardMaterial color={0x111111} roughness={0.6} metalness={0.2} />
        </mesh>
      </group>
      {/* Legs */}
      <mesh position={[-0.07, 0, 0]} castShadow>
        <boxGeometry args={[0.08, 0.3, 0.08]} />
        <meshStandardMaterial color={0xffffff} />
      </mesh>
      <mesh position={[0.07, 0, 0]} castShadow>
        <boxGeometry args={[0.08, 0.3, 0.08]} />
        <meshStandardMaterial color={0xffffff} />
      </mesh>
      {/* Arms */}
      <mesh position={[-0.22, 0.38, 0]} castShadow>
        <boxGeometry args={[0.08, 0.28, 0.08]} />
        <meshStandardMaterial color={0xffffff} />
      </mesh>
      <mesh position={[0.22, 0.38, 0]} castShadow>
        <boxGeometry args={[0.08, 0.28, 0.08]} />
        <meshStandardMaterial color={0xffffff} />
      </mesh>
    </group>
  );
}

function Chair() {
  return (
    <group position={[0.28, 0.2, 0]}>
      <mesh position={[0, 0.2, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.6, 0.1, 0.6]} />
        <meshStandardMaterial color={0x111111} roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.5, -0.25]} receiveShadow castShadow>
        <boxGeometry args={[0.6, 0.6, 0.08]} />
        <meshStandardMaterial color={0x161616} />
      </mesh>
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <cylinderGeometry args={[0.08, 0.12, 0.2, 12]} />
        <meshStandardMaterial color={0x1a1a1a} />
      </mesh>
    </group>
  );
}

function Station() {
  // Minimal barber station with a mirror and counter
  return (
    <group position={[1.4, 0.6, -0.6]}>
      {/* Counter */}
      <mesh position={[0, -0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.9, 0.1, 0.4]} />
        <meshStandardMaterial color={0x121212} roughness={0.8} />
      </mesh>
      {/* Mirror */}
      <mesh position={[0, 0.4, -0.05]}>
        <boxGeometry args={[0.8, 1.2, 0.04]} />
        <meshStandardMaterial color={0x202020} metalness={0.6} roughness={0.2} />
      </mesh>
      {/* Bottles */}
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.2}>
        <group position={[-0.2, -0.08, 0.1]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.14, 12]} />
            <meshStandardMaterial color={0xffffff} roughness={0.2} metalness={0.2} />
          </mesh>
          <mesh position={[0.12, 0, 0]} castShadow>
            <cylinderGeometry args={[0.025, 0.025, 0.1, 12]} />
            <meshStandardMaterial color={0xffffff} roughness={0.2} metalness={0.2} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

function Scissors({ progressRef }) {
  const left = useRef();
  const right = useRef();
  const group = useRef();

  useFrame(() => {
    const p = progressRef.current;
    const active = THREE.MathUtils.clamp((p - 0.55) / 0.3, 0, 1);
    if (group.current) group.current.position.set(0.25, 0.95, 0.16);
    const t = performance.now() / 300;
    const open = 0.4 + Math.sin(t) * 0.2 * active;
    if (left.current && right.current) {
      left.current.rotation.z = open;
      right.current.rotation.z = -open;
    }
  });

  return (
    <group ref={group}>
      <mesh ref={left} position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.35, 0.02, 0.04]} />
        <meshStandardMaterial color={0xffffff} metalness={0.3} roughness={0.3} />
      </mesh>
      <mesh ref={right} position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.35, 0.02, 0.04]} />
        <meshStandardMaterial color={0xffffff} metalness={0.3} roughness={0.3} />
      </mesh>
      <mesh position={[-0.1, -0.02, 0]} castShadow>
        <torusGeometry args={[0.05, 0.01, 8, 24]} />
        <meshStandardMaterial color={0xffffff} metalness={0.3} roughness={0.3} />
      </mesh>
      <mesh position={[0.0, -0.02, 0]} castShadow>
        <torusGeometry args={[0.05, 0.01, 8, 24]} />
        <meshStandardMaterial color={0xffffff} metalness={0.3} roughness={0.3} />
      </mesh>
    </group>
  );
}

function Room() {
  // Monochrome room with walls for bounce, adds premium depth
  const mat = useMemo(() => new THREE.MeshStandardMaterial({ color: 0x0d0d0d, roughness: 0.95, metalness: 0.05 }), []);
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color={0x0a0a0a} roughness={1} />
      </mesh>
      {/* Walls */}
      <mesh position={[0, 1.2, -2.4]} receiveShadow>
        <boxGeometry args={[8, 2.4, 0.1]} />
        <primitive object={mat} attach="material" />
      </mesh>
      <mesh position={[-2.4, 1.2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[8, 2.4, 0.1]} />
        <primitive object={mat} attach="material" />
      </mesh>
    </group>
  );
}

function Scene() {
  const progressRef = useProgressLoop(14);

  return (
    <group>
      {/* Key light */}
      <directionalLight
        position={[2.2, 3.2, 2.2]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      {/* Fill light */}
      <hemisphereLight intensity={0.5} color={0xffffff} groundColor={0x111111} />

      <Room />
      <Chair />
      <Person progressRef={progressRef} />
      <Scissors progressRef={progressRef} />
      <Station />

      <ContactShadows position={[0, 0, 0]} opacity={0.6} scale={10} blur={2.4} far={4} color="#000000" />
    </group>
  );
}

const ThreeSalonExperience = () => {
  return (
    <section id="experience" className="relative py-28 md:py-36 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">Premium 3D Salon</h2>
            <p className="mt-4 text-white/70 max-w-2xl">A calm, monochrome space in full 3D. Watch the guest walk in, sit, and get a crisp trim. Shadows, reflections, and subtle motion create a premium feel.</p>
          </div>
          <a href="#services" className="hidden md:inline-flex px-5 py-3 rounded-full border border-white/20 text-white text-sm tracking-wide hover:border-white/60 transition">Explore Services</a>
        </div>

        <div className="mt-8 h-[440px] md:h-[560px] rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-zinc-950 to-black/70">
          <Suspense fallback={<div className="w-full h-full grid place-items-center text-white/50">Loading 3D scene…</div>}>
            <Canvas
              shadows
              gl={{ antialias: true, alpha: true }}
              camera={{ position: [2.8, 1.7, 3.2], fov: 45 }}
            >
              <color attach="background" args={[0x000000]} />
              <fog attach="fog" args={[0x000000, 6, 14]} />
              <Environment preset="city" />
              <Scene />
              <OrbitControls enablePan={false} enableZoom={false} target={[0.28, 0.6, 0]} />
              <Html position={[0, 1.5, -2.2]} center style={{ pointerEvents: 'none' }}>
                <div className="text-[10px] md:text-xs tracking-widest uppercase text-white/50">Signature Cut</div>
              </Html>
            </Canvas>
        </Suspense>
        </div>
      </div>
    </section>
  );
};

export default ThreeSalonExperience;
