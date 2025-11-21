import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text, MeshTransmissionMaterial, useCursor } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

export function Hero3D({ data }) {
    return (
        <group>
            <ParticleField />
            <AvatarCard name={data.name} headline={data.headline} />
        </group>
    );
}

function ParticleField() {
    const ref = useRef();
    const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 10 }));

    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <points ref={ref}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={sphere.length / 3} array={sphere} itemSize={3} />
                </bufferGeometry>
                <pointsMaterial size={0.02} color="#00ffcc" sizeAttenuation depthWrite={false} transparent opacity={0.6} />
            </points>
        </group>
    );
}

function AvatarCard({ name, headline }) {
    const ref = useRef();
    const [hovered, setHover] = useState(false);
    useCursor(hovered);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        ref.current.rotation.x = Math.sin(t / 4) / 8;
        ref.current.rotation.y = Math.sin(t / 4) / 8;
        ref.current.position.y = Math.sin(t / 1.5) / 10;
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group
                ref={ref}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                {/* Glass Card Background */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[4, 2.5, 0.2]} />
                    <MeshTransmissionMaterial
                        backside
                        samples={16}
                        thickness={0.5}
                        chromaticAberration={0.05}
                        anisotropy={0.1}
                        distortion={0.1}
                        distortionScale={0.1}
                        temporalDistortion={0.1}
                        color="#ffffff"
                        bg="#000000"
                    />
                </mesh>

                {/* Neon Border */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[4.05, 2.55, 0.18]} />
                    <meshBasicMaterial color="#00ffcc" wireframe transparent opacity={0.3} />
                </mesh>

                {/* Text Content */}
                <Text
                    position={[0, 0.3, 0.15]}
                    fontSize={0.4}
                    font="/fonts/Rajdhani-Bold.ttf" // Assuming font availability or fallback
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                >
                    {name.toUpperCase()}
                </Text>
                <Text
                    position={[0, -0.3, 0.15]}
                    fontSize={0.15}
                    color="#00ffcc"
                    anchorX="center"
                    anchorY="middle"
                >
                    {headline.toUpperCase()}
                </Text>
            </group>
        </Float>
    );
}
