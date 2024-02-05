import React from "react";
import styles from "./experience.module.css";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "react-three-fiber";
import FloatingLogos from "./3d-components/floating-logos";

export default function Header() {
  return (
    <div className={styles["header"]}>
      <Canvas className={styles["header-canvas"]}>
        <FloatingLogos />
      </Canvas>
      <div className={styles["header-text"]}>
        <h1>NOCTA Air Force 1</h1>
        <img
          className={styles["header-subtext"]}
          width={500}
          src="./logos/img_4491-2.PNG"
        />
      </div>
    </div>
  );
}
