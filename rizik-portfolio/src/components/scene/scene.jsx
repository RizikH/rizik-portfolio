'use client';

import React, { useRef } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Sky } from '@react-three/drei'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import GraveyardScene from '../graveyard/graveyard'

export default function Scene() {
    return (
        <Canvas
            shadows
            camera={{ position: [4, 2, 5], fov: 75 }}
            style={{ width: '100%', height: '100%' }}
        >
            <color attach="background" args={['#000']} />
            <fog attach="fog" args={['#02343f', 1, 15]} />
            <OrbitControls enableDamping />
            <GraveyardScene />
        </Canvas>
    )
}
