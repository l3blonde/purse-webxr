"use client"

import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import { useXRInputSourceState, useXR } from "@react-three/xr"
import type * as THREE from "three"

function PurseModel() {
    const modelUrl = "/assets/3d/purse.glb"
    const { scene } = useGLTF(modelUrl)

    console.log("[v0] Purse model loaded successfully")

    return <primitive object={scene} scale={15} />
}

function VRControllerHandler({
                                 onGrab,
                                 onRelease,
                                 onRotate,
                                 onMove,
                             }: {
    onGrab: () => void
    onRelease: () => void
    onRotate: () => void
    onMove: (pos: [number, number, number]) => void
}) {
    const [isGrabbing, setIsGrabbing] = useState(false)
    const [lastGripState, setLastGripState] = useState(false)
    const rightController = useXRInputSourceState("controller", "right")

    useFrame(() => {
        const gamepad = (rightController as any)?.inputSource?.gamepad

        if (gamepad && gamepad.buttons) {
            // Trigger button (index 0) - Grab and move
            const triggerPressed = gamepad.buttons[0]?.pressed || false

            if (triggerPressed && !isGrabbing) {
                setIsGrabbing(true)
                onGrab()
                console.log("[v0] VR: Trigger pressed - grabbing purse")
            } else if (!triggerPressed && isGrabbing) {
                setIsGrabbing(false)
                onRelease()
                console.log("[v0] VR: Trigger released - placed purse")
            }

            // Grip button (index 1) - Rotate 45 degrees
            const gripPressed = gamepad.buttons[1]?.pressed || false

            if (gripPressed && !lastGripState) {
                onRotate()
                console.log("[v0] VR: Grip pressed - rotating purse 45°")
            }
            setLastGripState(gripPressed)

            // If grabbing, follow controller position
            if (isGrabbing && (rightController as any).object) {
                const controllerPos = (rightController as any).object.position
                onMove([controllerPos.x, controllerPos.y, controllerPos.z - 0.5])
                console.log("[v0] VR: Moving purse with controller")
            }
        }
    })

    return null
}

export default function PurseScene() {
    const purseRef = useRef<THREE.Group>(null)
    const [position, setPosition] = useState<[number, number, number]>([0, -1.5, -1])
    const [rotation, setRotation] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState(0)

    const xrState = useXR()
    const isInVR = xrState.session !== null

    // Desktop controls (keyboard + mouse)
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
            {isInVR && (
                <VRControllerHandler
                    onGrab={() => {}}
                    onRelease={() => {}}
                    onRotate={() => setRotation((prev) => prev + Math.PI / 4)}
                    onMove={(pos) => setPosition(pos)}
                />
            )}

            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 5, 5]} intensity={1.5} />
            <directionalLight position={[-5, 3, -5]} intensity={0.8} />
            <pointLight position={[0, 2, 0]} intensity={0.5} />

            <group ref={purseRef} position={position}>
                <PurseModel />
            </group>
        </>
    )
}
