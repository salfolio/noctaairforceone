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

export default function Experience(props) {
  const [cameraTransformation, setCameraTransformation] = useState({
    target: [0, 0, 0],
    fov: 25,
  });

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

  return (
    <>
      <group>
        <ShoeAnimation
          animationType={animationType}
          openBoxAnim={props.openBoxAnim}
        />
        <BoxAnimation
          animationType={animationType}
          openBoxAnim={props.openBoxAnim}
        />
      </group>
      {/* <NikeBox openBoxAnim={props.openBoxAnim}/> */}
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom={false}
        target={targetRef.current}
        minDistance={1.3} // Set the minimum distance for zoom
        maxDistance={1.3} // Set the maximum distance for zoom
      />
      <axesHelper />
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
        position={[-4, 1, 4]}
      />
    </>
  );
}
