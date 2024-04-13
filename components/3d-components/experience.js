"use client";
import { React, useEffect, useRef } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useState } from "react";
import NikeBox from "./nikebox";
import ShoeAnimation from "./shoe-animation";
import { useFrame } from "react-three-fiber";
import * as THREE from "three"; // Import THREE
import { gsap } from "gsap";
import BoxAnimation from "./box-animation";
import { Html } from "@react-three/drei";
import styles from "../experience.module.css";

export default function Experience(props) {
  const [cameraTransformation, setCameraTransformation] = useState({
    target: [0, 0, 0],
    fov: 25,
  });

  const [toggleButtonStateOpen, setToggleButtonStateOpen] = useState(true);
  const [toggleButtonStateClose, setToggleButtonStateClose] = useState(false);

  const [minSize, setMinZoom] = useState(1.3);
  const [maxSize, setMaxZoom] = useState(1.3);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 768) { // Assuming 768px is your mobile breakpoint
        setMinZoom(1.7); // Closer zoom for mobile
        setMaxZoom(1.7); // Farther zoom out for mobile
      } else if(window.innerWidth >= 1600){
        setMinZoom(1.15); // Default closer zoom limit for desktop
        setMaxZoom(1.15); // Default farther zoom limit for desktop
      }
      else{
        setMinZoom(1.3); // Default closer zoom limit for desktop
        setMaxZoom(1.3); // Default farther zoom limit for desktop
      }
    }

    // Set zoom distances initially
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up function to remove event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const fovRef = useRef(cameraTransformation.fov);
  const targetRef = useRef(cameraTransformation.target);

  const cameraRef = useRef();
  const controlsRef = useRef();

  useEffect(() => {
    // Update camera position based on openBoxAnim prop
    if (!props.openBoxAnim) {
      setCameraTransformation({
        target: [0, 0, 0],
        fov: 25,
      });
    } else if (props.openBoxAnim) {
      setCameraTransformation({
        target: [0, 0.45, 0],
        fov: 17,
      });
    }
    // Cleanup function to clear ongoing GSAP animations
    return () => {
      if (controlsRef.current) {
        gsap.killTweensOf([controlsRef.current.target]);
        console.log("dispose");
      }
    };
  }, [props.openBoxAnim]);

  useFrame(({ gl, scene, camera, clock, delta }) => {
    // Manually interpolate FOV
    const targetFov = cameraTransformation.fov;
    camera.fov += (targetFov - camera.fov) * 0.01;
    camera.updateProjectionMatrix();

    // Animate FOV and target values using GSAP
    gsap.to(controlsRef.current.target, {
      x: cameraTransformation.target[0],
      y: cameraTransformation.target[1],
      z: cameraTransformation.target[2],
      duration: 7,
      lazy: true,
    });
  });

  const toggleAnimationHandler = () => {
    props.toggleAnim();
  
    if (toggleButtonStateClose === false && toggleButtonStateOpen === true) {
      // Immediately set the toggleButtonStateOpen to false
      setToggleButtonStateOpen(false);
  
      // Delay setting toggleButtonStateClose to true by 4 seconds
      setTimeout(() => {
        setToggleButtonStateClose(true);
      }, 5200); // Corrected to 4000 milliseconds for 4 seconds
    }
    else if (toggleButtonStateOpen === false && toggleButtonStateClose === true) {
      // Immediately set toggleButtonStateClose to false
      setToggleButtonStateClose(false);
  
      // Delay setting toggleButtonStateOpen to true by 4 seconds
      setTimeout(() => {
        setToggleButtonStateOpen(true);
      }, 5200); // Consistent delay of 4 seconds
    }
  };

  return (
    <>
      {toggleButtonStateOpen && (
        <Html position={[0.09, 0.124, -0.15]}>
          <div
            className={styles["open-box-button"]}
            onClick={toggleAnimationHandler}
          >
            <p>Open Box</p>
          </div>
        </Html>
      )}

      {toggleButtonStateClose && (
        <Html position={[0.07, 0.55, -0.14]}>
          <div
            className={styles["open-box-button"]}
            onClick={toggleAnimationHandler}
          >
            <p>Close</p>
          </div>
        </Html>
      )}

      <ShoeAnimation openBoxAnim={props.openBoxAnim} />
      <BoxAnimation openBoxAnim={props.openBoxAnim} />
      {/* <NikeBox openBoxAnim={props.openBoxAnim}/> */}
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom={false}
        target={targetRef.current}
        minDistance={minSize} // Set the minimum distance for zoom
        maxDistance={maxSize} // Set the maximum distance for zoom
      />
      {/* <axesHelper /> */}
      <ambientLight intensity={1} />
      <pointLight intensity={1} position={[0, 5, 0]} />
      <directionalLight intensity={4} position={[10, 2, 0]} />
      <directionalLight intensity={4} position={[0, -5, 0]} />
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        fov={fovRef.current}
        near={0.1}
        far={1000}
        position={[4, 3, 4]}
      />
    </>
  );
}
