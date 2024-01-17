"use client";
import { React } from "react";
import { Canvas } from "react-three-fiber";
import { Html, OrbitControls } from "@react-three/drei";
import styles from "./experience.module.css";
import Product from "./product";
import { useState } from "react";

export default function Experience() {
  const [isWireFrame, setisWireFrame] = useState(false);

  const canvasStyle = {
    backgroundColor: isWireFrame ? "blue" : "black",
  };

  const gridPatternStyle = {
    backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)",
    backgroundSize: "100px 100px",
  };

  return (
    <div className={styles["container"]}>
      <Canvas className={styles["scene"]} style={{...canvasStyle, ...gridPatternStyle}}>
        <Product isWireFrame={isWireFrame}/>
        <OrbitControls />
        <ambientLight intensity={1}/>
        <pointLight intensity={1} position={[0,5,0]}/>
        <directionalLight intensity={1} position={[0,2,0]}/>
        <directionalLight intensity={1} position={[0,-5,0]}/>


      </Canvas>
      <div className={styles["wireframe-toggle"]}>
        <div onClick={() => setisWireFrame(false)}>
          <p>Off</p>
        </div>
        <div onClick={() => setisWireFrame(true)}>
          <p>On</p>
        </div>
      </div>
    </div>
  );
}
