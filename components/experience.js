"use client";
import { React, useEffect, useRef } from "react";
import { Canvas } from "react-three-fiber";
import {
  Html,
  OrbitControls,
  PerspectiveCamera,
  Environment,
} from "@react-three/drei";
import styles from "./experience.module.css";
import Product from "./3d-components/product";
import { useState } from "react";
import Shoes from "./3d-components/shoes";
import NikeBox from "./nikebox";
import ShoeAnimation from "./3d-components/shoe-animation";

export default function Experience() {
  const [isWireFrame, setisWireFrame] = useState(false);
  const [lightIntensity, setLightIntensity] = useState(0.5);
  const [openBoxAnim, setOpenBoxAnim] = useState(false);
  const [cameraTransformation, setCameraTransformation] = useState({
    target: [0,0.45,0],
    fov: 20,
  });

  // Update light intensity based on isWireFrame state
  useEffect(() => {
    setLightIntensity(isWireFrame ? 10 : 1);
  }, [isWireFrame]);

  const toggleAnim = () => {
    if(openBoxAnim === false) {
      setOpenBoxAnim(true);
      setCameraTransformation({
        target: [0,0.45,0],
        fov: [20]
      })
    } else if(openBoxAnim === true) {
      setOpenBoxAnim(false);
      setCameraTransformation({
        target: [0,0,0],
        fov: [25]
      })
    }
  }

  return (
    <>     
      <div
        className={styles["canvas"]}
        // style={{ ...canvasStyle, ...gridPatternStyle }}
      >
        <Canvas>
          {/* <Product isWireFrame={isWireFrame} /> */}
          {/* <Shoes isWireFrame={isWireFrame} /> */}
          <ShoeAnimation/>
          <NikeBox isWireFrame={isWireFrame} shoeAnim={openBoxAnim}/>
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            target={cameraTransformation.target}
            minDistance={1.3} // Set the minimum distance for zoom
            maxDistance={1.3} // Set the maximum distance for zoom
          />
          <ambientLight intensity={lightIntensity} />
          <pointLight intensity={lightIntensity} position={[0, 5, 0]} />
          <directionalLight intensity={4} position={[10, 2, 0]} />
          <directionalLight intensity={4} position={[0, -5, 0]} />
          <PerspectiveCamera
            makeDefault
            fov={cameraTransformation.fov}
            near={0.1}
            far={1000}
            position={[-4, 1, 4]}
          />
        </Canvas>
        {/* <div className={styles["header"]}>
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
      </div> */}
      </div>
      {/* <div className={styles["wireframe-toggle"]}>
        <div onClick={() => setisWireFrame(false)}>
          <p>Off</p>
        </div>
        <div onClick={() => setisWireFrame(true)}>
          <p>On</p>
        </div>
      </div> */}
      <div className={styles["toggle-box-button"]}>
        <div className={styles["toggle-box-button-container"]}>
          <div onClick={toggleAnim}>
            {"open box"}
          </div>
          <div onClick={toggleAnim}>
            {"close box"}
          </div>
        </div>
      </div>
    </>
  );
}
