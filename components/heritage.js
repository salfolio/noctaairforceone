import React from "react";
import styles from "./experience.module.css";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "react-three-fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three"; // Import THREE
import { useRef } from "react";
import { useFrame } from "react-three-fiber";
import Wireframe from "./3d-components/shoe-wireframe";
import { useState, useEffect } from "react";

export default function Heritage() {
  const [minSize, setMinZoom] = useState(1.3);
  const [maxSize, setMaxZoom] = useState(1.3);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 768) {
        // Assuming 768px is your mobile breakpoint
        setMinZoom(8); // Closer zoom for mobile
        setMaxZoom(8); // Farther zoom out for mobile
      } else if (window.innerWidth >= 1600) {
        setMinZoom(4.3); // Default closer zoom limit for desktop
        setMaxZoom(4.3); // Default farther zoom limit for desktop
      } else if (window.innerWidth <= 700){
        setMinZoom(9.2); // Default closer zoom limit for desktop
        setMaxZoom(9.2); // Default farther zoom limit for desktop
      } else {
        setMinZoom(5); // Default closer zoom limit for desktop
        setMaxZoom(5); // Default farther zoom limit for desktop
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

  const gridPatternStyle = {
    backgroundImage:
      "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg,rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
    backgroundSize: "100px 100px",
  };

  return (
    <div
      className={styles["heritage-container"]}
      style={{ ...gridPatternStyle }}
    >
      <Canvas>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minDistance={minSize} // Set the minimum distance for zoom
          maxDistance={maxSize} // Set the maximum distance for zoom
        />
        <directionalLight intensity={1} />
        <PerspectiveCamera
          makeDefault
          fov={25}
          near={0.1}
          far={1000}
          position={[-4, 1, 4]}
        />
        <Wireframe />
      </Canvas>
    </div>
  );
}
