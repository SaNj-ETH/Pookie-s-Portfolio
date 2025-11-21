import React, { useState } from 'react';
import { Text, RoundedBox, useCursor } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export function ExperienceTimeline({ data }) {
    return (
        <group>
            <Text
                position={[0, 2, 0]}
                fontSize={0.4}
                color="#00ffcc"
                anchorX="center"
                anchorY="middle"
            >
                EXPERIENCE
            </Text>
            <group position={[-3, 0, 0]}>
                {data.map((job, index) => (
                    <ExperienceTile key={job.id} job={job} index={index} />
                ))}
            </group>
        </group>
    );
}

function ExperienceTile({ job, index }) {
    const [hovered, setHover] = useState(false);
    useCursor(hovered);
    const ref = React.useRef();

    useFrame((state) => {
        if (hovered) {
            ref.current.position.y = 0.2;
            ref.current.scale.setScalar(1.05);
        } else {
            ref.current.position.y = 0;
            ref.current.scale.setScalar(1);
        }
    });

    return (
        <group position={[index * 3.5, 0, 0]} ref={ref}>
            <RoundedBox
                args={[3, 2, 0.2]}
                radius={0.1}
                smoothness={4}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                <meshStandardMaterial
                    color={hovered ? "#1a1a1a" : "#0a0a0a"}
                    emissive={hovered ? "#00ffcc" : "#000000"}
                    emissiveIntensity={0.2}
                    metalness={0.8}
                    roughness={0.2}
                />
            </RoundedBox>

            <group position={[0, 0, 0.11]}>
                <Text
                    position={[0, 0.5, 0]}
                    fontSize={0.18}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={2.5}
                >
                    {job.role.toUpperCase()}
                </Text>
                <Text
                    position={[0, 0.2, 0]}
                    fontSize={0.12}
                    color="#00ffcc"
                    anchorX="center"
                    anchorY="middle"
                >
                    {job.company}
                </Text>
                <Text
                    position={[0, -0.4, 0]}
                    fontSize={0.1}
                    color="#888888"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={2.6}
                    textAlign="center"
                >
                    {job.description}
                </Text>
            </group>

            {/* Connecting Line */}
            {index > 0 && (
                <mesh position={[-1.75, 0, -0.1]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
                    <meshBasicMaterial color="#333" />
                </mesh>
            )}
        </group>
    );
}
