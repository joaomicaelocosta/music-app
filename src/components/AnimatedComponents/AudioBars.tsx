import React, { useRef } from "react";
import { Canvas, useFrame, MeshProps } from "@react-three/fiber";
import * as THREE from "three";

const Bars: React.FC = () => {
  const ref1 = useRef<THREE.Mesh>(null!);
  const ref2 = useRef<THREE.Mesh>(null!);
  const ref3 = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    ref1.current.scale.y = 0.5 + Math.sin(Date.now() / 500) * 0.5;
    ref2.current.scale.y = 0.5 + Math.sin(Date.now() / 250) * 0.5;
    ref3.current.scale.y = 0.5 + Math.sin(Date.now() / 1000) * 0.5;
  });

  return (
    <>
      <mesh ref={ref1} position={[-1.5, 0, 0]}>
        <boxGeometry args={[1, 6, 0.2]} />
        <meshStandardMaterial color="#69b3e8" />
      </mesh>
      <mesh ref={ref2} position={[0, 0, 0]}>
        <boxGeometry args={[1, 6, 0.2]} />
        <meshStandardMaterial color="#69b3e8" />
      </mesh>
      <mesh ref={ref3} position={[1.5, 0, 0]}>
        <boxGeometry args={[1, 6, 0.2]} />
        <meshStandardMaterial color="#69b3e8" />
      </mesh>
      <ambientLight />
    </>
  );
};

const AudioBars: React.FC<MeshProps> = () => {
  return (
    <Canvas style={{ width: "40px", height: "40px" }}>
      <Bars />
    </Canvas>
  );
};

export default AudioBars;
