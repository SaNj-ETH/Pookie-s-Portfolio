import React, { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ScrollControls, useScroll } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { Hero3D } from './components/Hero3D';
import { AboutGlass } from './components/AboutGlass';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { SkillsOrbs } from './components/SkillsOrbs';
import { ProjectsCubes } from './components/ProjectsCubes';
import { NavBar } from './components/NavBar';
import { Dock } from './components/Dock';
import { portfolioData } from './data/portfolioData';
import * as THREE from 'three';

function Scene({ activeSection }) {
  const scroll = useScroll();
  const group = useRef();

  useFrame((state, delta) => {
    // Smooth scroll logic or section-based positioning could go here
    // For now, we'll use a simple vertical layout driven by scroll
    // But the user requested "moving between rooms".
    // Let's implement a camera move based on activeSection
  });

  return (
    <group ref={group}>
      {/* Hero Section */}
      <group position={[0, 0, 0]}>
        <Hero3D data={portfolioData.personal} />
      </group>

      {/* About Section - Below Hero */}
      <group position={[0, -10, 0]}>
        <AboutGlass data={portfolioData.personal} />
      </group>

      {/* Experience Section - Right of About */}
      <group position={[15, -10, 0]}>
        <ExperienceTimeline data={portfolioData.experience} />
      </group>

      {/* Skills Section - Below About */}
      <group position={[0, -20, 0]}>
        <SkillsOrbs data={portfolioData.skills} />
      </group>

      {/* Projects Section - Right of Skills */}
      <group position={[15, -20, 0]}>
        <ProjectsCubes data={portfolioData.projects} />
      </group>
    </group>
  );
}

function CameraController({ activeSection }) {
  useFrame((state) => {
    const targetPos = new THREE.Vector3(0, 0, 10);

    switch (activeSection) {
      case 'home':
        targetPos.set(0, 0, 10);
        break;
      case 'about':
        targetPos.set(0, -10, 10);
        break;
      case 'experience':
        targetPos.set(15, -10, 12);
        break;
      case 'skills':
        targetPos.set(0, -20, 10);
        break;
      case 'projects':
        targetPos.set(15, -20, 12);
        break;
      default:
        targetPos.set(0, 0, 10);
    }

    state.camera.position.lerp(targetPos, 0.05);
    state.camera.lookAt(targetPos.x, targetPos.y, 0);
  });
  return null;
}

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#050505' }}>
      <NavBar onSectionChange={setActiveSection} activeSection={activeSection} />

      <Canvas shadows camera={{ position: [0, 0, 10], fov: 45 }}>
        <Suspense fallback={null}>
          <color attach="background" args={['#050505']} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ffcc" />

          <CameraController activeSection={activeSection} />
          <Scene activeSection={activeSection} />

          <Environment preset="city" />

          <EffectComposer>
            <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={0.5} />
            <Noise opacity={0.02} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        </Suspense>
      </Canvas>

      <Dock data={portfolioData.personal} />

      {/* Mobile Fallback / Overlay could go here */}
    </div>
  );
}
