import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const SoundWaves: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  // Create the sound waves
  useEffect(() => {
    if (!mountRef.current) return;

    // Create the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1500
    );

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0x000000, 0);

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create the sound wave geometry
    const geometry = new THREE.PlaneGeometry(15, 5, 100, 100);
    const positions = geometry.attributes.position.array as Float32Array;

    // Set the initial positions
    for (let i = 2; i < positions.length; i += 3) {
      positions[i] = Math.sin(positions[i - 2]);
    }

    // Create the material and mesh
    const material = new THREE.MeshBasicMaterial({
      color: 0xa8d4f3,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    camera.position.z = 5;

    // Animate the sound waves
    const animate = () => {
      requestAnimationFrame(animate);

      for (let i = 2; i < positions.length; i += 3) {
        positions[i] = Math.sin(positions[i - 2] + Date.now() * 0.001);
      }
      geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return <div className="sound-wave" ref={mountRef}></div>;
};

export default SoundWaves;
