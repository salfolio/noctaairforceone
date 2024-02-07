import React from "react";
import { useRef, useState, useEffect } from "react";
import { useFrame } from "react-three-fiber";
import { Html, useGLTF, useTexture, useAnimations } from "@react-three/drei";
import * as THREE from "three"; // Import THREE

export default function BoxAnimation(props) {
  const boxRef = useRef();
  const box = useGLTF("./model/box/nike-shoebox-animation-05.glb");

  const boxAnimations = useAnimations(box.animations, box.scene);

    // console.log(boxAnimations);
    // console.log(box);

  box.scene.traverse((node) => {
    if (node.isMesh && node.material.name === "insidematerial") {
      node.material = new THREE.MeshStandardMaterial({
        color: "white",
      });
    }
  });

//   useEffect(() => {
//     const boxActions = boxAnimations.actions;
//     console.log(boxActions);

//     // Conditionally play animations based on props.animationType
//     if (props.animationType === "ClosedIdle") {
//       boxActions.ClosedBoxIdle.reset().fadeIn(0.5).play();
//       console.log("Closed");
//     } else if (props.animationType === "Opening") {
//       boxActions.OpenBox.reset().fadeIn(0.5).play().setLoop(THREE.LoopOnce);
//       console.log("Opening");
//     } else if (props.animationType === "OpenIdle") {
//       boxActions.IdleBox.reset().fadeIn(0.5).play();
//       console.log("OpenIdle");
//     } else if (props.animationType === "Closing") {
//       boxActions.CloseBox.reset().fadeIn(0.5).play().setLoop(THREE.LoopOnce);;
//       console.log("Closing");
//     }
//     return () => {
//       // Clean up the rest of the animations
//       boxActions.ClosedBoxIdle.fadeOut(0);
//       boxActions.OpenBox.fadeOut(0);
//       boxActions.IdleBox.fadeOut(0);
//       boxActions.CloseBox.fadeOut(0);
//     };
//   }, [props.animationType]);

  useEffect(() => {
    const boxActions = boxAnimations.actions;
    console.log(boxActions);

    if (props.openBoxAnim === true) {
      console.log("openbox")
      boxActions.IdleBox.reset().play();
      boxActions.IdleBox.crossFadeFrom(boxActions.ClosedBoxIdle, 3);
    } else if (props.openBoxAnim === false) {
      console.log("closeBox")
      boxActions.CloseBox.reset().play().setLoop(THREE.LoopOnce);
    }
    return () => {
      // Clean up the rest of the animations
      console.log("CLEANUP")
      boxActions.OpenBox.fadeOut(0);
      boxActions.CloseBox.fadeOut(0);
      boxActions.ClosedBoxIdle.fadeOut(0);
      boxActions.IdleBox.fadeOut(0);

    };
  }, [props.openBoxAnim]);

  return (
    <>
      <group scale={[1, 1, 1]}>
        <primitive object={box.scene} />
      </group>
    </>
  );
}