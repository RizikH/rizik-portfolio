// GraveyardScene.jsx
import React, { useRef, useMemo } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { TextureLoader } from 'three'
import { Sky } from '@react-three/drei'
import { useControls } from 'leva'



export default function GraveyardScene() {

    const graves = useMemo(() => {
        const graveData = []
        for (let i = 0; i < 30; ++i) {
            const angle = Math.random() * Math.PI * 2
            const radius = 3 + Math.random() * 6
            const x = Math.cos(angle) * radius
            const z = Math.sin(angle) * radius
            graveData.push({
                position: [x, Math.random() * 0.4, z],
                rotation: [
                    (Math.random() - 0.5) * 0.4,
                    (Math.random() - 0.5) * 0.4,
                    (Math.random() - 0.5) * 0.4,
                ],
            })
        }
        return graveData
    }, [])

    const ghost1 = useRef()
    const ghost2 = useRef()
    const ghost3 = useRef()

    const [
        floorAlpha,
        floorColor,
        floorARM,
        floorNormal,
        floorDisp,

        wallColor,
        wallNormal,
        wallARM,

        roofColor,
        roofNormal,
        roofARM,

        bushColor,
        bushNormal,
        bushARM,

        graveColor,
        graveNormal,
        graveARM,

        doorColor,
        doorNormal,
        doorAlpha,
        doorAO,
        doorHeight,
        doorMetalness,
        doorRoughness,
    ] = useLoader(TextureLoader, [
        // Floor
        '/textures/floor/alpha.jpg',
        '/textures/floor/mud-forest/mud_forest_diff_1k.jpg',
        '/textures/floor/mud-forest/mud_forest_arm_1k.jpg',
        '/textures/floor/mud-forest/mud_forest_nor_gl_1k.jpg',
        '/textures/floor/mud-forest/mud_forest_disp_1k.jpg',
        // Wall
        '/textures/wall/mossy_brick/mossy_brick_diff_1k.jpg',
        '/textures/wall/mossy_brick/mossy_brick_nor_gl_1k.jpg',
        '/textures/wall/mossy_brick/mossy_brick_arm_1k.jpg',
        // Roof
        '/textures/roof/clay_roof/clay_roof_tiles_diff_1k.jpg',
        '/textures/roof/clay_roof/clay_roof_tiles_nor_gl_1k.jpg',
        '/textures/roof/clay_roof/clay_roof_tiles_arm_1k.jpg',
        // Bush
        './textures/bush/forest_leaves/forest_leaves_03_diff_1k.jpg',
        './textures/bush/forest_leaves/forest_leaves_03_nor_gl_1k.jpg',
        './textures/bush/forest_leaves/forest_leaves_03_arm_1k.jpg',
        // Grave
        '/textures/grave/plastered_stone/plastered_stone_wall_diff_1k.jpg',
        '/textures/grave/plastered_stone/plastered_stone_wall_nor_gl_1k.jpg',
        '/textures/grave/plastered_stone/plastered_stone_wall_arm_1k.jpg',
        //door
        '/textures/door/color.jpg',
        '/textures/door/normal.jpg',
        '/textures/door/alpha.jpg',
        '/textures/door/ambientOcclusion.jpg',
        '/textures/door/height.jpg',
        '/textures/door/metalness.jpg',
        '/textures/door/roughness.jpg',
    ])


    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime()

        const updateGhost = (ref, speed, radius) => {
            const angle = elapsedTime * speed
            ref.current.position.x = Math.cos(angle) * radius
            ref.current.position.z = Math.sin(angle) * radius
            ref.current.position.y = Math.sin(angle * 2.34) * Math.sin(angle * 3.45)
        }

        updateGhost(ghost1, 0.5, 4)
        updateGhost(ghost2, -0.38, 5)
        updateGhost(ghost3, 0.23, 6)
    })


    /**
     * @description Set the texture repeat and wrap mode for the floor textures
     * @param {THREE.Texture}
     */

    // Floor texture repeat
    floorColor.colorSpace = THREE.SRGBColorSpace
    floorColor.repeat.set(8, 8)
    floorColor.wrapS = floorColor.wrapT = THREE.RepeatWrapping
    floorNormal.repeat.set(8, 8)
    floorNormal.wrapS = floorNormal.wrapT = THREE.RepeatWrapping
    floorARM.repeat.set(8, 8)
    floorARM.wrapS = floorARM.wrapT = THREE.RepeatWrapping
    floorDisp.repeat.set(8, 8)
    floorDisp.wrapS = floorDisp.wrapT = THREE.RepeatWrapping

    // Wall texture repeat
    wallColor.colorSpace = THREE.SRGBColorSpace
    wallColor.repeat.set(2, 2)
    wallColor.wrapS = wallColor.wrapT = THREE.RepeatWrapping
    wallNormal.repeat.set(2, 2)
    wallNormal.wrapS = wallNormal.wrapT = THREE.RepeatWrapping
    wallARM.repeat.set(2, 2)
    wallARM.wrapS = wallARM.wrapT = THREE.RepeatWrapping

    // Roof texture repeat
    roofColor.colorSpace = THREE.SRGBColorSpace
    roofColor.repeat.set(3, 1)
    roofColor.wrapS = roofColor.wrapT = THREE.RepeatWrapping
    roofNormal.repeat.set(3, 1)
    roofNormal.wrapS = roofNormal.wrapT = THREE.RepeatWrapping
    roofARM.repeat.set(3, 1)
    roofARM.wrapS = roofARM.wrapT = THREE.RepeatWrapping

    // Bush texture repeat
    bushColor.colorSpace = THREE.SRGBColorSpace
    bushColor.repeat.set(2, 1)
    bushColor.wrapS = THREE.RepeatWrapping
    bushNormal.repeat.set(2, 1)
    bushNormal.wrapS = THREE.RepeatWrapping
    bushARM.repeat.set(2, 1)
    bushARM.wrapS = THREE.RepeatWrapping

    // Grave texture repeat
    graveColor.colorSpace = THREE.SRGBColorSpace
    graveColor.repeat.set(0.3, 0.4)
    graveARM.repeat.set(0, 3, 0.4)
    graveNormal.repeat.set(0.3, 0.4)



    // Bushes position and scale
    const bushData = [
        { scale: [0.5, 0.5, 0.5], position: [0.8, 0.2, 2.2] },
        { scale: [0.25, 0.25, 0.25], position: [1.4, 0.1, 2.1] },
        { scale: [0.4, 0.4, 0.4], position: [-0.8, 0.1, 2.2] },
        { scale: [0.15, 0.15, 0.15], position: [-1, 0.05, 2.6] },
    ]

    // Grave position and scale


    // Leva controls for the floor material
    const {
        floorDisplacementScale,
        floorDisplacementBias,
    } = useControls('Floor Material', {
        floorDisplacementScale: { value: 0.43, min: 0, max: 1, step: 0.01 },
        floorDisplacementBias: { value: -0.18, min: -1, max: 1, step: 0.01 },
    })


    return (
        <>
            {/* Lights */}
            <ambientLight intensity={0.5} color="#86cdff" />
            <directionalLight
                position={[3, 2, -8]}
                intensity={1}
                castShadow
                shadow-mapSize-width={256}
                shadow-mapSize-height={256}
            />
            <pointLight ref={ghost1} intensity={6} color="#8f00ff" castShadow />
            <pointLight ref={ghost2} intensity={6} color="#39ff14" castShadow />
            <pointLight ref={ghost3} intensity={6} color="#ff0033" castShadow />

            {/* Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[20, 20, 100, 100]} />
                <meshStandardMaterial
                    map={floorColor}
                    alphaMap={floorAlpha}
                    normalMap={floorNormal}
                    displacementMap={floorDisp}
                    displacementScale={floorDisplacementScale}
                    displacementBias={floorDisplacementBias}
                    roughnessMap={floorARM}
                    metalnessMap={floorARM}
                    aoMap={floorARM}
                    transparent
                />
            </mesh>

            {/* Graves */}
            <group>
                {graves.map((grave, index) => (
                    <mesh
                        key={index}
                        position={grave.position}
                        rotation={grave.rotation}
                        castShadow
                        receiveShadow
                    >
                        <boxGeometry args={[0.6, 0.8, 0.2]} />
                        <meshStandardMaterial
                            map={graveColor}
                            normalMap={graveNormal}
                            roughnessMap={graveARM}
                            metalnessMap={graveARM}
                            aoMap={graveARM}
                        />
                    </mesh>
                ))}
            </group>


            {/* House */}
            <group>
                {/* Walls */}
                <mesh position={[0, 1.25, 0]} castShadow receiveShadow>
                    <boxGeometry args={[4, 2.5, 4]} />
                    <meshStandardMaterial
                        map={wallColor}
                        normalMap={wallNormal}
                        roughnessMap={wallARM}
                        metalnessMap={wallARM}
                        aoMap={wallARM}
                    />
                </mesh>

                {/* Roof */}
                <mesh position={[0, 3.25, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
                    <coneGeometry args={[3.5, 1.5, 4]} />
                    <meshStandardMaterial
                        map={roofColor}
                        normalMap={roofNormal}
                        roughnessMap={roofARM}
                        metalnessMap={roofARM}
                        aoMap={roofARM}
                    />
                </mesh>

                {/* Bush group */}
                <group>
                    {bushData.map((bush, index) => (
                        <mesh
                            key={index}
                            position={bush.position}
                            scale={bush.scale}
                            rotation={[-0.75, 0, 0]}
                            castShadow
                        >
                            <sphereGeometry args={[1, 16, 16]} />
                            <meshStandardMaterial
                                map={bushColor}
                                normalMap={bushNormal}
                                roughnessMap={bushARM}
                                metalnessMap={bushARM}
                                aoMap={bushARM}
                            />
                        </mesh>
                    ))}
                </group>

                {/* Door */}
                <mesh position={[0, 1, 2.01]} castShadow>
                    <planeGeometry args={[1.5, 2, 100, 100]} />
                    <meshStandardMaterial
                        map={doorColor}
                        normalMap={doorNormal}
                        alphaMap={doorAlpha}
                        aoMap={doorAO}
                        roughnessMap={doorRoughness}
                        metalnessMap={doorMetalness}
                        displacementMap={doorHeight}
                        displacementScale={0.15}
                        displacementBias={-0.04}
                        transparent
                    />
                </mesh>



                {/* Door Light */}
                <pointLight position={[0, 2.2, 2.5]} intensity={5} color="#ff7d46" />
            </group>

            {/* Sky */}
            <Sky
                turbidity={10}
                rayleigh={3}
                mieCoefficient={0.1}
                mieDirectionalG={0.95}
                sunPosition={[0.3, -0.038, -0.95]}
                scale={100}
            />
        </>
    )
}
