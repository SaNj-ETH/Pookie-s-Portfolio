import React, { useState } from 'react';
import { Float, Text, useCursor, MeshDistortMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export function SkillsOrbs({ data }) {
    return (
        <group>
            <Text
                position={[0, 3, 0]}
                fontSize={0.4}
                color="#007aff"
                anchorX="center"
                anchorY="middle"
            >
                EXPERTISE
            </Text>
            <group position={[0, 0, 0]}>
                {data.map((skill, index) => {
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
            case 'marketing':
                // Polished Blue Plastic
                return <meshPhysicalMaterial color="#007aff" roughness={0.1} metalness={0.1} clearcoat={1} />;
            case 'strategy':
                // Matte Orange Ceramic
                return <meshStandardMaterial color="#ff9500" roughness={0.8} metalness={0} />;
            case 'data':
                // Glass
                return <meshPhysicalMaterial color="#ffffff" transmission={0.9} roughness={0} thickness={1} />;
            case 'tech':
                // Metallic
                return <meshStandardMaterial color="#5856d6" metalness={0.8} roughness={0.2} />;
            default:
                return <meshStandardMaterial color="#e5e5ea" />;
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
                    color="#1a1a1a"
                    anchorX="center"
                    anchorY="middle"
                >
                    {skill.name}
                </Text>
            </group>
        </Float>
    );
}
