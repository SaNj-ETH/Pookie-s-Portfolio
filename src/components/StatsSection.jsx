import React, { useRef } from 'react';
import { Text, Float } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export function StatsSection({ data }) {
    return (
        <group>
            <Text
                position={[0, 2, 0]}
                fontSize={0.4}
                color="#007aff"
                anchorX="center"
                anchorY="middle"
            >
                KEY METRICS
            </Text>
            <group position={[0, 0, 0]}>
                <StatCounter
                    label="AD SPEND"
                    value={data.adSpend}
                    position={[-4, 0, 0]}
                    color="#1a1a1a"
                />
                <StatCounter
                    label="ROAS"
                    value={data.roas}
                    position={[0, 0, 0]}
                    color="#ff9500"
                    scale={1.2}
                />
                <StatCounter
                    label="EXPERIENCE"
                    value={data.experience}
                    position={[4, 0, 0]}
                    color="#1a1a1a"
                />
            </group>
        </group>
    );
}

function StatCounter({ label, value, position, color, scale = 1 }) {
    const ref = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        ref.current.position.y = position[1] + Math.sin(t + position[0]) * 0.1;
    });

    return (
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
            <group position={position} ref={ref} scale={scale}>
                <Text
                    position={[0, 0, 0]}
                    fontSize={0.8}
                    font="/fonts/Rajdhani-Bold.ttf"
                    color={color}
                    anchorX="center"
                    anchorY="middle"
                >
                    {value}
                </Text>
                <Text
                    position={[0, -0.6, 0]}
                    fontSize={0.2}
                    color="#666666"
                    anchorX="center"
                    anchorY="middle"
                    letterSpacing={0.1}
                >
                    {label}
                </Text>
            </group>
        </Float>
    );
}
