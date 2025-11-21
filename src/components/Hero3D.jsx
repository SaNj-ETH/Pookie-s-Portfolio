import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text, MeshTransmissionMaterial, useCursor, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

export function Hero3D({ data }) {
    return (
        <group>
            <MarketingVisuals />
            <ProfileCard name={data.name} headline={data.headline} />
        </group>
    );
}

function MarketingVisuals() {
    // Abstract representation of funnels and growth graphs
    return (
        <group position={[0, 0, -2]}>
            {/* Funnel Shape */}
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                <group position={[-3, 1, 0]} rotation={[0, 0, 0.2]}>
                    <Cylinder args={[1, 0.1, 2, 32]} rotation={[0, 0, 0]}>
                        <meshPhysicalMaterial
                            color="#007aff"
                            transparent
                            opacity={0.3}
                            roughness={0.1}
                            metalness={0.1}
                            transmission={0.5}
                        />
                    </Cylinder>
                    <Text position={[0, 1.2, 0]} fontSize={0.2} color="#1a1a1a">Traffic</Text>
                    <Text position={[0, -1.2, 0]} fontSize={0.2} color="#1a1a1a">Conversion</Text>
                </group>
            </Float>

            {/* Growth Bar Graph */}
            <Float speed={2} rotationIntensity={0.1} floatIntensity={0.4}>
                <group position={[3, 0, 0]}>
                    <mesh position={[-0.5, -0.5, 0]}>
                        <boxGeometry args={[0.5, 1, 0.5]} />
                        <meshStandardMaterial color="#e5e5ea" />
                    </mesh>
                    <mesh position={[0.2, 0, 0]}>
                        <boxGeometry args={[0.5, 2, 0.5]} />
                        <meshStandardMaterial color="#81b0ff" />
                    </mesh>
                    <mesh position={[0.9, 0.5, 0]}>
                        <boxGeometry args={[0.5, 3, 0.5]} />
                        <meshStandardMaterial color="#007aff" />
                    </mesh>
                    <Text position={[0.2, 2.2, 0]} fontSize={0.3} color="#007aff">GROWTH</Text>
                </group>
            </Float>
        </group>
    );
}

function ProfileCard({ name, headline }) {
    const ref = useRef();
    const [hovered, setHover] = useState(false);
    useCursor(hovered);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        ref.current.rotation.y = Math.sin(t / 8) / 10;
        ref.current.position.y = Math.sin(t / 2) / 10;
    });

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
            <group
                ref={ref}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                {/* Clean White Glass Card */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[4.5, 2.5, 0.1]} />
                    <MeshTransmissionMaterial
                        backside
                        samples={16}
                        thickness={0.2}
                        chromaticAberration={0.02}
                        anisotropy={0.1}
                        distortion={0.0}
                        distortionScale={0.1}
                        temporalDistortion={0.0}
                        color="#ffffff"
                        bg="#f0f0f0"
                    />
                </mesh>

                {/* Border */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[4.55, 2.55, 0.08]} />
                    <meshBasicMaterial color="#007aff" wireframe transparent opacity={0.1} />
                </mesh>

                {/* Text Content */}
                <Text
                    position={[0, 0.4, 0.1]}
                    fontSize={0.35}
                    font="/fonts/Rajdhani-Bold.ttf"
                    color="#1a1a1a"
                    anchorX="center"
                    anchorY="middle"
                >
                    {name.toUpperCase()}
                </Text>
                <Text
                    position={[0, -0.2, 0.1]}
                    fontSize={0.15}
                    color="#007aff"
                    anchorX="center"
                    anchorY="middle"
                >
                    {headline.toUpperCase()}
                </Text>
            </group>
        </Float>
    );
}
