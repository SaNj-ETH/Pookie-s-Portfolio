import React, { useState, useRef } from 'react';
import { Text, Box, useCursor } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function ProjectsCubes({ data }) {
    return (
        <group>
            <Text
                position={[0, 2.5, 0]}
                fontSize={0.4}
                color="#00ffcc"
                anchorX="center"
                anchorY="middle"
            >
                PROJECTS
            </Text>
            <group position={[0, 0, 0]}>
                {data.map((project, index) => (
                    <ProjectCube key={project.id} project={project} index={index} />
                ))}
            </group>
        </group>
    );
}

function ProjectCube({ project, index }) {
    const [active, setActive] = useState(false);
    const [hovered, setHover] = useState(false);
    useCursor(hovered);
    const groupRef = useRef();

    useFrame((state, delta) => {
        const targetRotation = active ? Math.PI : 0;
        const targetScale = active ? 1.2 : 1;

        // Smoothly interpolate rotation and scale
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotation, delta * 5);
        groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, delta * 5));
    });

    return (
        <group
            ref={groupRef}
            position={[(index - 1) * 4, 0, 0]}
            onClick={() => setActive(!active)}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            {/* Front Face: Title */}
            <Box args={[2.5, 2.5, 2.5]}>
                <meshStandardMaterial
                    color="#111"
                    emissive="#00ffcc"
                    emissiveIntensity={0.2}
                    metalness={0.8}
                    roughness={0.2}
                />
            </Box>
            <Text
                position={[0, 0, 1.3]}
                fontSize={0.2}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
                maxWidth={2}
                textAlign="center"
            >
                {project.title.toUpperCase()}
            </Text>

            {/* Back Face: Details */}
            <group rotation={[0, Math.PI, 0]} position={[0, 0, 0]}>
                <Text
                    position={[0, 0.5, 1.3]}
                    fontSize={0.15}
                    color="#00ffcc"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={2}
                >
                    DETAILS
                </Text>
                <Text
                    position={[0, 0, 1.3]}
                    fontSize={0.1}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={2}
                    textAlign="center"
                >
                    {project.description}
                </Text>
                <Text
                    position={[0, -0.8, 1.3]}
                    fontSize={0.08}
                    color="#888888"
                    anchorX="center"
                    anchorY="middle"
                >
                    {project.tech.join(' • ')}
                </Text>
            </group>
        </group>
    );
}
