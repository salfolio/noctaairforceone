import React from "react";
import styles from "./experience.module.css";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "react-three-fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three"; // Import THREE
import { useRef } from "react";
import { useFrame } from "react-three-fiber";
import Wireframe from "./3d-components/shoe-wireframe";

export default function Heritage() {
  const gridPatternStyle = {
    backgroundImage:
      "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg,rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
    backgroundSize: "100px 100px",
  };

  return (
    <div className={styles["heritage-container"]} style={{...gridPatternStyle }}>
      <Canvas>
        <OrbitControls enablePan={false} enableZoom={false} />
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
