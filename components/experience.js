"use client";
import { React, useEffect } from "react";
import { Canvas } from "react-three-fiber";
import { Html, OrbitControls } from "@react-three/drei";
import styles from "./experience.module.css";
import Product from "./product";
import { useState } from "react";

export default function Experience() {
  const [isWireFrame, setisWireFrame] = useState(false);
  const [lightIntensity, setLightIntensity] = useState(0.5);

  useEffect(() => {
    // Update light intensity based on isWireFrame state
    setLightIntensity(isWireFrame ? 10 : 1);
  }, [isWireFrame]);


  const canvasStyle = {
    backgroundColor: isWireFrame ? "black" : "#ACCCD7",
  };

  const gridPatternStyle = {
    backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg,rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
    backgroundSize: "100px 100px",
  };

  return (
    <div className={styles["container"]}>
      <Canvas className={styles["scene"]} style={{...canvasStyle, ...gridPatternStyle}}>
        <Product isWireFrame={isWireFrame}/>
        <OrbitControls enablePan={false} maxZoom={0.5} />
        <ambientLight intensity={lightIntensity}/>
        <pointLight intensity={lightIntensity} position={[0,5,0]}/>
        <directionalLight intensity={1} position={[0,2,0]}/>
        <directionalLight intensity={1} position={[0,-5,0]}/>
        <perspectiveCamera fov={100} position={[1,1,1]}/>
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
