import React from "react";
import { useRef } from "react";
import { useFrame, useThree } from "react-three-fiber";
import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three"; // Import THREE
import { useState } from "react";
import { PerspectiveCamera } from "@react-three/drei";

export default function FloatingLogos() {
  const heartLogo = useGLTF("./model/logos/nikelogo02.glb");
  const noctaLogo = useGLTF("./model/logos/nikelogo02.glb");

  const heartRef = useRef();
  const noctaRef = useRef();

  heartLogo.scene.traverse((node) => {
    if (node.isMesh) {
      node.material = new THREE.MeshStandardMaterial({
        roughness: 0.3,
        metalness: 1.0,
        color: "white",
      });
    }
  });

  noctaLogo.scene.traverse((node) => {
    if (node.isMesh) {
      node.material = new THREE.MeshStandardMaterial({
        roughness: 0.3,
        metalness: 1.0,
        color: "white",
      });
    }
  });

  const heartPositions = [
    { position: [0.9, 0.3, 0], rotation: [0, 0, 0] },
    { position: [-0.9, 0.3, 0], rotation: [0, 0, 0.1] },
    { position: [0, 0.21, 0], rotation: [0, 0, -0.35398] },
    { position: [-0.7, -0.3, 0], rotation: [0, 0, 0.2] },
    {
      position: [0.5, -0.33, 0],
      rotation: [0, 0, -0.5],
    }, // Add more positions as needed
  ];

  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime()) * 0.2; // Overall rotation

      // Individual movements
      heartPositions.forEach((heart, index) => {
        const speed = 0.1 + index * 0.05; // Adjust the speed for each heart
        groupRef.current.children[index].rotation.y =
          Math.sin(clock.getElapsedTime() * speed) * 0.2;
        groupRef.current.children[index].position.y =
          Math.sin(clock.getElapsedTime() * (speed * 0.5)) * 0.2;
      });
    }
  });

  return (
    <>
      {/* <OrbitControls enableZoom={false} enablePan={false}/> */}
      {/* <axesHelper /> */}
      <directionalLight position={[0, 3, 0]} intensity={5} />
      <directionalLight position={[0, -3, 0]} intensity={5} />
      <directionalLight position={[0, 0, -4]} intensity={5} />
      <directionalLight position={[0, 0, 4]} intensity={5} />
      <pointLight position={[5, 2, 5]} intensity={4} />
      <pointLight position={[-5, -2, -5]} intensity={4} />

      <PerspectiveCamera
        makeDefault
        fov={25}
        near={0.1}
        far={1000}
        position={[0, 0, 4]}
      />
      <ambientLight intensity={3} />
      {/* <group ref={groupRef}>
        {heartPositions.map((heart, index) => (
          <group
            key={index}
            scale={[0.065, 0.065, 0.065]}
            position={heart.position}
            rotation={heart.rotation}
          >
            <primitive
              object={heartLogo.scene.clone(true)}
              rotation={[Math.PI / 2, 0, 0]}
            />
          </group>
        ))}
      </group> */}
    </>
  );
}
