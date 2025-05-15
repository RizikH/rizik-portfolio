'use client';

import React from 'react'
import { Canvas } from '@react-three/fiber'
import CubeScene from './cube';

export default function Scene() {
    return (
        <Canvas
            shadows
            camera={{ position: [2, 5, 10], fov: 75 }}
            gl={{ alpha: true, antialias: true }}
            style={{ width: '100%', height: '100%', background: 'transparent' }}
        >
            <CubeScene />
        </Canvas>
    )
}
