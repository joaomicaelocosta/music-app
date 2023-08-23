import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const SoundWaves: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

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

    const geometry = new THREE.PlaneGeometry(15, 5, 100, 100);
    const positions = geometry.attributes.position.array as Float32Array;

    for (let i = 2; i < positions.length; i += 3) {
      positions[i] = Math.sin(positions[i - 2]);
    }

    const material = new THREE.MeshBasicMaterial({
      color: 0xa8d4f3,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    camera.position.z = 5;

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
