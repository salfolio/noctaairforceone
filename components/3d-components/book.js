import React from "react";
import { useRef } from "react";
import { useFrame, useThree } from "react-three-fiber";
import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three"; // Import THREE
import { useState, useEffect } from "react";
import { PerspectiveCamera } from "@react-three/drei";

export default function Book() {
  const book = useGLTF("./model/book/book-02.glb");

  const bookRef = useRef();

  const [minZoom, setMinZoom] = useState(1.3);
  const [maxZoom, setMaxZoom] = useState(1.3);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 768) {
        // Assuming 768px is your mobile breakpoint
        setMinZoom(7.6); // Closer zoom for mobile
        setMaxZoom(7.6); // Farther zoom out for mobile
      } else if (window.innerWidth >= 1600) {
        setMinZoom(4.9); // Default closer zoom limit for desktop
        setMaxZoom(4.9); // Default farther zoom limit for desktop
      } else {
        setMinZoom(5.5); // Default closer zoom limit for desktop
        setMaxZoom(5.5); // Default farther zoom limit for desktop
      }
    }

    // Set zoom distances initially
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up function to remove event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useFrame(() => {
    bookRef.current.rotation.z += 0.01;
  });

  return (
    <>
      <ambientLight intensity={2} />
      <directionalLight position={[2, 2, 2]} intensity={5} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minDistance={minZoom}
        maxDistance={minZoom}
      />
      <PerspectiveCamera
        makeDefault
        fov={25}
        near={0.1}
        far={1000}
        position={[-4, 1, 4]}
      />
      <group
        scale={[0.67, 0.67, 0.67]}
        rotation={[Math.PI / 2, 0, 0]}
        ref={bookRef}
      >
        <primitive object={book.scene} />
      </group>
    </>
  );
}
