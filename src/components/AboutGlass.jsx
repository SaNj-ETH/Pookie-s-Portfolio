import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, MeshTransmissionMaterial } from '@react-three/drei';

export function AboutGlass({ data }) {
    const { width } = useThree((state) => state.viewport);
    const group = useRef();

    useFrame((state) => {
        // Parallax effect based on mouse position
        const { x, y } = state.mouse;
        group.current.rotation.x = -y * 0.1;
        group.current.rotation.y = x * 0.1;
    });

    return (
        <group ref={group}>
            {/* Main Glass Panel */}
            <mesh position={[0, 0, 0]}>
                <planeGeometry args={[width * 0.8, 4]} />
                <MeshTransmissionMaterial
                    backside
                    samples={16}
                    thickness={0.2}
                    chromaticAberration={0.03}
                    anisotropy={0.1}
                    distortion={0.1}
                    distortionScale={0.1}
                    temporalDistortion={0.1}
                    color="#ffffff"
                    bg="#000000"
                />
            </mesh>

            {/* Content */}
            <group position={[0, 0, 0.1]}>
                <Text
                    position={[0, 1.2, 0]}
                    fontSize={0.3}
                    color="#00ffcc"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={width * 0.7}
                >
                    ABOUT ME
                </Text>
                <Text
                    position={[0, 0, 0]}
                    fontSize={0.15}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={width * 0.7}
                    lineHeight={1.5}
                    textAlign="center"
                >
                    {data.summary}
                </Text>
            </group>
        </group>
    );
}
