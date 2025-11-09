"use client"

import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import type * as THREE from "three"

function PurseModel() {
    const [modelLoaded, setModelLoaded] = useState(false)

    const modelUrl = "https://threejs.org/examples/models/gltf/Soldier.glb"
    const { scene } = useGLTF(modelUrl)

    useEffect(() => {
        setModelLoaded(true)
        console.log("3D model loaded successfully")
    }, [])

    return <primitive object={scene} scale={0.3} />
}

export default function PurseScene() {
    const purseRef = useRef<THREE.Group>(null)
    const [position, setPosition] = useState<[number, number, number]>([0, 0, 0])
    const [rotation, setRotation] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState(0)
    const [useTestModel, setUseTestModel] = useState(true)

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const step = 0.1
            const rotStep = 0.1

            switch (e.key.toLowerCase()) {
                case "w":
                    setPosition((prev) => [prev[0], prev[1], prev[2] - step])
                    break
                case "s":
                    setPosition((prev) => [prev[0], prev[1], prev[2] + step])
                    break
                case "a":
                    setPosition((prev) => [prev[0] - step, prev[1], prev[2]])
                    break
                case "d":
                    setPosition((prev) => [prev[0] + step, prev[1], prev[2]])
                    break
                case "q":
                    setPosition((prev) => [prev[0], prev[1] + step, prev[2]])
                    break
                case "e":
                    setPosition((prev) => [prev[0], prev[1] - step, prev[2]])
                    break
                case "r":
                    setRotation((prev) => prev + rotStep)
                    break
            }
        }

        const handlePointerDown = (e: PointerEvent) => {
            setIsDragging(true)
            setDragStart(e.clientX)
        }

        const handlePointerMove = (e: PointerEvent) => {
            if (isDragging) {
                const delta = e.clientX - dragStart
                const rotationSpeed = 0.01
                setRotation((prev) => prev + delta * rotationSpeed)
                setDragStart(e.clientX)
            }
        }

        const handlePointerUp = () => {
            setIsDragging(false)
        }

        window.addEventListener("keydown", handleKeyDown)
        window.addEventListener("pointerdown", handlePointerDown)
        window.addEventListener("pointermove", handlePointerMove)
        window.addEventListener("pointerup", handlePointerUp)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            window.removeEventListener("pointerdown", handlePointerDown)
            window.removeEventListener("pointermove", handlePointerMove)
            window.removeEventListener("pointerup", handlePointerUp)
        }
    }, [isDragging, dragStart])

    useFrame(() => {
        if (purseRef.current) {
            purseRef.current.rotation.y = rotation
        }
    })

    return (
        <>
            <ambientLight intensity={1} />
            <directionalLight position={[5, 5, 5]} intensity={1.5} />
            <directionalLight position={[-5, 3, -5]} intensity={0.5} />

            <group ref={purseRef} position={position}>
                {useTestModel ? (
                    <PurseModel />
                ) : (
                    <mesh>
                        <boxGeometry args={[0.3, 0.2, 0.1]} />
                        <meshStandardMaterial color="#8B4513" />
                    </mesh>
                )}
            </group>
        </>
    )
}
