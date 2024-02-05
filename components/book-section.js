import React from "react";
import styles from "./experience.module.css";
import { Canvas } from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";
import Book from "./3d-components/book";

export default function BookSection() {
  return (
    <div className={styles["book-container"]}>
      <Canvas>
        <Book />
      </Canvas>
    </div>
  );
}
