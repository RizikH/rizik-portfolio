'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Stars } from '@react-three/drei';

function ResponsiveCube() {
  const meshRef = useRef();
  const starsRef = useRef();
  const [targetScale, setTargetScale] = useState([1, 1, 1]);
  const scrollPos = useRef(0);

  // Resize-based cube target scale
  useEffect(() => {
    const updateCubeSize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const scale = Math.min(w, h) / 220;
      setTargetScale([scale, scale, scale]);
    };

    updateCubeSize();
    window.addEventListener('resize', updateCubeSize);
    return () => window.removeEventListener('resize', updateCubeSize);
  }, []);

  // Scroll position tracking
  useEffect(() => {
    const handleScroll = () => {
      scrollPos.current = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation logic
  useFrame((_, delta) => {
    const sp = scrollPos.current;

    if (meshRef.current) {
      const mesh = meshRef.current;

      // Smooth scaling
      mesh.scale.lerp(new THREE.Vector3(...targetScale), delta * 3);

      // Rotation & oscillation
      mesh.rotation.x = sp * Math.PI * 2;
      mesh.rotation.y = sp * Math.PI * 2;
      mesh.position.x = Math.sin(sp * Math.PI * 2) * 3;
    }

    if (starsRef.current) {
      starsRef.current.position.y = sp * 60;
    }
  });


  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* Stars that move upward with scroll */}
      <Stars
        ref={starsRef}
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        fade
      />

      {/* Your original box */}
      <mesh ref={meshRef} scale={[0, 0, 0]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </>
  );
}

export default function MyScene() {
  return (
    <Canvas
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0, 7], fov: 50 }} // camera is ABOVE looking down
    >

      <ResponsiveCube />
    </Canvas>
  );
}
