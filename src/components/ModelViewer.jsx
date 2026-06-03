import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, Environment } from '@react-three/drei';

function PlaceholderGeometry({ color, type }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      {type === 'crochet' ? (
        <sphereGeometry args={[1.5, 32, 32]} />
      ) : (
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
      )}
      <meshStandardMaterial 
        color={color} 
        roughness={type === 'crochet' ? 0.9 : 0.2}
        metalness={type === 'crochet' ? 0.0 : 0.6}
      />
    </mesh>
  );
}

export default function ModelViewer({ color, type }) {
  return (
    <div style={{ width: '100%', height: '100%', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--border-radius-lg)', overflow: 'hidden' }}>
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
        <color attach="background" args={['#121416']} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Stage environment="city" intensity={0.6}>
          <PlaceholderGeometry color={color} type={type} />
        </Stage>
        <OrbitControls autoRotate autoRotateSpeed={2} enablePan={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 1.5} />
      </Canvas>
    </div>
  );
}
