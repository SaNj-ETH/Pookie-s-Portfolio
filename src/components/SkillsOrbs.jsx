import React, { useState } from 'react';
import { Float, Text, useCursor, MeshDistortMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export function SkillsOrbs({ data }) {
    return (
        <group>
            <Text
                position={[0, 3, 0]}
                fontSize={0.4}
                color="#00ffcc"
                anchorX="center"
                anchorY="middle"
            >
                SKILLS
            </Text>
            <group position={[0, 0, 0]}>
                {data.map((skill, index) => {
                    // Arrange in a circle
                    const angle = (index / data.length) * Math.PI * 2;
                    const radius = 3;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    return <SkillOrb key={index} skill={skill} position={[x, y, 0]} />;
                })}
            </group>
        </group>
    );
}

function SkillOrb({ skill, position }) {
    const [hovered, setHover] = useState(false);
    useCursor(hovered);
    const ref = React.useRef();

    useFrame((state) => {
        if (hovered) {
            ref.current.scale.setScalar(1.2);
            ref.current.rotation.y += 0.05;
        } else {
            ref.current.scale.setScalar(1);
            ref.current.rotation.y += 0.01;
        }
    });

    const getMaterial = () => {
        switch (skill.type) {
            case 'frontend':
                return <meshStandardMaterial color="#00d4ff" metalness={0.8} roughness={0.2} />;
            case 'backend':
                return <meshStandardMaterial color="#ff006e" metalness={0.5} roughness={0.5} />;
            case '3d':
                return <MeshDistortMaterial color="#7000ff" distort={0.4} speed={2} />;
            default:
                return <meshPhysicalMaterial transmission={1} thickness={1} roughness={0} />;
        }
    };

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <group position={position} ref={ref} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
                <mesh>
                    <sphereGeometry args={[0.6, 32, 32]} />
                    {getMaterial()}
                </mesh>
                <Text
                    position={[0, -0.9, 0]}
                    fontSize={0.15}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                >
                    {skill.name}
                </Text>
            </group>
        </Float>
    );
}
