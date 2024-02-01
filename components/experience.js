"use client";
import { React, useEffect } from "react";
import { Canvas } from "react-three-fiber";
import {
  Html,
  OrbitControls,
  PerspectiveCamera,
  Environment,
} from "@react-three/drei";
import styles from "./experience.module.css";
import Product from "./product";
import { useState } from "react";
import Shoes from "./shoes";

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

  const canvasSizeStyle = {
    // width: "100%", // Adjust the width as needed
    // height: "600px", // Adjust the height as needed
  };

  const gridPatternStyle = {
    backgroundImage:
      "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg,rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
    backgroundSize: "100px 100px",
  };

  return (
    <div
      className={styles["container"]}
      style={{ ...canvasStyle, ...gridPatternStyle }}
    >
      <Canvas className={styles["canvas"]} style={{ ...canvasSizeStyle }}>
        {/* <Product isWireFrame={isWireFrame} /> */}
        <Shoes isWireFrame={isWireFrame} />
        <OrbitControls
          enablePan={false}
          target={[0, 0, 0]}
          minDistance={0.1} // Set the minimum distance for zoom
          maxDistance={1.5} // Set the maximum distance for zoom
        />
        <ambientLight intensity={lightIntensity} />
        <pointLight intensity={lightIntensity} position={[0, 5, 0]} /> 
        <directionalLight intensity={4} position={[10, 2, 0]} />
        <directionalLight intensity={4} position={[0, -5, 0]} />
        <PerspectiveCamera
          makeDefault
          fov={25}
          near={0.1}
          far={1000}
          position={[0, 0, 1]}
        />
        {/* <Environment background={false} files={"/hdri/skyHDRI.exr"}/> */}
      </Canvas>
      <div className={styles["wireframe-toggle"]}>
        <div onClick={() => setisWireFrame(false)}>
          <p>Off</p>
        </div>
        <div onClick={() => setisWireFrame(true)}>
          <p>On</p>
        </div>
      </div>
      <div className={styles["header"]}>
        <h1>{"The NOCTA Air Force 1"}</h1>
      </div>
      <div className={styles["love-you-forever"]}>
        <img src="/logos/img_4491-2.PNG" />
      </div>

      <div className={styles["about-section"]}>
        <div className={styles["about-section-text"]}>
          <p>
            {
              "This premium-leather, triple-white AF-1 is a love letter to the classic model. Inspired by Drake's favourite childhood book, Love You Forever, and the sentiment of the phrase, the intent was to enhance the quality of the shoe and add subtle details that would tell the story but wouldn't change the iconic silhouette. For the first time, the midsole is revised to read 'Love You Forever' with complementary hearts that replace the stars on the outsole. Additional design elements include alphabetical beads to customise the lace dubrae, a NOCTA logo in place of Nike Air on the left heel and a new perforation pattern on the toe box."
            }
          </p>
        </div>
        <div className={styles["about-section-button"]}>
          <button className={styles["about-section-button-btn"]}>
            {"PURCHASE"}
          </button>
        </div>
      </div>
    </div>
  );
}
