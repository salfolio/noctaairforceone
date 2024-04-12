import React from "react";
import { useRef, useState, useEffect } from "react";
import { useFrame } from "react-three-fiber";
import { Html, useGLTF, useTexture, useAnimations } from "@react-three/drei";
import * as THREE from "three"; // Import THREE

export default function ShoeAnimation(props) {
  const meshRef = useRef();
  const shoeLeftRef = useRef();
  const shoeRightRef = useRef();

  const shoeLeft = useGLTF("./model/shoe/nike-noctashoeleft-animation.glb");
  const shoeRight = useGLTF("./model/shoe/nike-noctashoeright-animation.glb");

  const shoeLeftAnimations = useAnimations(shoeLeft.animations, shoeLeft.scene);
  const shoeRightAnimations = useAnimations(
    shoeRight.animations,
    shoeRight.scene
  );

  const lacesTextures = useTexture("./textures/LacesBaked001.jpg");
  const bodyTextures = useTexture("./textures/ShoesBaked004.jpg");
  const interorTextures = useTexture("./textures/InteriorTexture004.jpg");

  bodyTextures.flipY = false;
  lacesTextures.flipY = false;
  interorTextures.flipY = false;

  // console.log(shoeLeftActions);
  // console.log(shoeRightActions);

  // useEffect(() => {
  //   const shoeLeftActions = shoeLeftAnimations.actions;
  //   const shoeRightActions = shoeRightAnimations.actions;

  //   if (props.animationType === "ClosedIdle") {
  //     shoeLeftActions.ClosedLeftIdle.reset().play();
  //     shoeRightActions.ClosedRightIdle.reset().play();
  //     console.log("Closed");
  //   } else if (props.animationType === "Opening") {
  //     shoeLeftActions.OpenLeft.reset().play().setLoop(THREE.LoopOnce);
  //     shoeRightActions.OpenRight.reset().play().setLoop(THREE.LoopOnce);
  //     console.log("Opening");
  //   } else if (props.animationType === "OpenIdle") {
  //     shoeLeftActions.IdleLeft.reset().play();
  //     shoeRightActions.IdleRight.reset().play();
  //     console.log("OpenIdle");
  //   } else if (props.animationType === "Closing") {
  //     shoeLeftActions.CloseLeft.reset().play().setLoop(THREE.LoopOnce);
  //     shoeRightActions.CloseRight.reset().play().setLoop(THREE.LoopOnce);
  //     console.log("Closing");
  //   }
  //   return () => {
  //     // Clean up the rest of the animations
  //     shoeLeftActions.ClosedLeftIdle.fadeOut(0);
  //     shoeRightActions.ClosedRightIdle.fadeOut(0);
  //     shoeLeftActions.OpenLeft.fadeOut(0);
  //     shoeRightActions.OpenRight.fadeOut(0);
  //     shoeLeftActions.IdleLeft.fadeOut(0);
  //     shoeRightActions.IdleRight.fadeOut(0);
  //     shoeLeftActions.CloseLeft.fadeOut(0);
  //     shoeRightActions.CloseRight.fadeOut(0);
  //   };
  // }, [props.animationType]);

  useEffect(() => {
    const shoeLeftActions = shoeLeftAnimations.actions;
    const shoeRightActions = shoeRightAnimations.actions;

    if (props.openBoxAnim === true) {
      shoeLeftActions.OpenLeft.reset().play().setLoop(THREE.LoopOnce);
      shoeRightActions.OpenRight.reset().play().setLoop(THREE.LoopOnce);
      setTimeout(() => {
        shoeLeftActions.IdleLeft.reset().play();
        shoeRightActions.IdleRight.reset().play();
        console.log("Opening");
      }, 5000);
    } else if (props.openBoxAnim === false) {
      shoeLeftActions.CloseLeft.reset().play().setLoop(THREE.LoopOnce);
      shoeRightActions.CloseRight.reset().play().setLoop(THREE.LoopOnce);
      setTimeout(() => {
        shoeLeftActions.ClosedLeftIdle.reset().play();
        shoeRightActions.ClosedRightIdle.reset().play();
        console.log("Closing");
      }, 5000);
    }
    return () => {
      // Clean up the rest of the animations
      console.log("CLEANUP");
      shoeLeftActions.ClosedLeftIdle.fadeOut(0);
      shoeRightActions.ClosedRightIdle.fadeOut(0);
      shoeLeftActions.OpenLeft.fadeOut(0);
      shoeRightActions.OpenRight.fadeOut(0);
      shoeLeftActions.IdleLeft.fadeOut(0);
      shoeRightActions.IdleRight.fadeOut(0);
      shoeLeftActions.CloseLeft.fadeOut(0);
      shoeRightActions.CloseRight.fadeOut(0);
    };
  }, [props.openBoxAnim]);

  const textureScale = 5;
  shoeRight.scene.traverse((node) => {
    if (
      node.isMesh &&
      (node.name === "BodyLeft" || node.name === "BodyRight")
    ) {
      // Access the metalness, roughness, and normal maps from the material
      const regularMap = node.material.map;
      const metalnessMap = node.material.metalnessMap;
      const roughnessMap = node.material.roughnessMap;
      const normalMap = node.material.normalMap;

      if (regularMap) {
        regularMap.repeat.set(textureScale, textureScale);
        regularMap.wrapS = regularMap.wrapT = THREE.RepeatWrapping;
        regularMap.needsUpdate = true;
      }

      // Set the desired scale for each map
      if (metalnessMap) {
        metalnessMap.repeat.set(textureScale, textureScale);
        metalnessMap.wrapS = metalnessMap.wrapT = THREE.RepeatWrapping;
        metalnessMap.needsUpdate = true;
      }

      if (roughnessMap) {
        roughnessMap.repeat.set(textureScale, textureScale);
        roughnessMap.wrapS = roughnessMap.wrapT = THREE.RepeatWrapping;
        roughnessMap.needsUpdate = true;
      }

      if (normalMap) {
        normalMap.repeat.set(textureScale, textureScale);
        normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
        normalMap.needsUpdate = true;
      }
    } else if (
      node.isMesh &&
      (node.name === "LacesLeft" || node.name === "LacesRight")
    ) {
      // Apply a different material to each child
      node.material = new THREE.MeshStandardMaterial({
        map: lacesTextures,
      });
    } else if (
      node.isMesh &&
      (node.name === "LogoBackRight" || node.name === "LogoBackLeft")
    ) {
      // Apply a different material to each child

      node.material = new THREE.MeshStandardMaterial({
        color: "white", // Adjust color as needed
        metalness: "0.5",
        roughness: "0.2",

        // wireframe: true
      });
    } else if (
      node.isMesh &&
      (node.name === "LacesAttachmentRight" ||
        node.name === "LacesAttachmentLeft")
    ) {
      // Apply a different material to each child

      node.material = new THREE.MeshStandardMaterial({
        color: "white", // Adjust color as needed
        metalness: "0.8",
        roughness: "0.2",

        // wireframe: true
      });
    } else if (
      node.isMesh &&
      (node.name === "InnerSoleRight" || node.name === "InnerSoleLeft")
    ) {
      // Apply a different material to each child

      node.material = new THREE.MeshStandardMaterial({
        map: interorTextures,
        // wireframe: true
      });
    }
  });

  shoeLeft.scene.traverse((node) => {
    if (
      node.isMesh &&
      (node.name === "BodyLeft" || node.name === "BodyRight")
    ) {
      // Access the metalness, roughness, and normal maps from the material
      const regularMap = node.material.map;
      const metalnessMap = node.material.metalnessMap;
      const roughnessMap = node.material.roughnessMap;
      const normalMap = node.material.normalMap;

      if (regularMap) {
        regularMap.repeat.set(textureScale, textureScale);
        regularMap.wrapS = regularMap.wrapT = THREE.RepeatWrapping;
        regularMap.needsUpdate = true;
      }

      // Set the desired scale for each map
      if (metalnessMap) {
        metalnessMap.repeat.set(textureScale, textureScale);
        metalnessMap.wrapS = metalnessMap.wrapT = THREE.RepeatWrapping;
        metalnessMap.needsUpdate = true;
      }

      if (roughnessMap) {
        roughnessMap.repeat.set(textureScale, textureScale);
        roughnessMap.wrapS = roughnessMap.wrapT = THREE.RepeatWrapping;
        roughnessMap.needsUpdate = true;
      }

      if (normalMap) {
        normalMap.repeat.set(textureScale, textureScale);
        normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
        normalMap.needsUpdate = true;
      }
    } else if (
      node.isMesh &&
      (node.name === "LacesLeft" || node.name === "LacesRight")
    ) {
      // Apply a different material to each child
      node.material = new THREE.MeshStandardMaterial({
        map: lacesTextures,
      });
    } else if (
      node.isMesh &&
      (node.name === "LogoBackRight" || node.name === "LogoBackLeft")
    ) {
      // Apply a different material to each child

      node.material = new THREE.MeshStandardMaterial({
        color: "white", // Adjust color as needed
        metalness: "0.5",
        roughness: "0.2",

        // wireframe: true
      });
    } else if (
      node.isMesh &&
      (node.name === "LacesAttachmentRight" ||
        node.name === "LacesAttachmentLeft")
    ) {
      // Apply a different material to each child

      node.material = new THREE.MeshStandardMaterial({
        color: "white", // Adjust color as needed
        metalness: "0.8",
        roughness: "0.2",

        // wireframe: true
      });
    } else if (
      node.isMesh &&
      (node.name === "InnerSoleRight" || node.name === "InnerSoleLeft")
    ) {
      // Apply a different material to each child

      node.material = new THREE.MeshStandardMaterial({
        map: interorTextures,
        // wireframe: true
      });
    }
  });

  return (
    <>
      <group ref={meshRef} scale={[1, 1, 1]}>
          <group ref={shoeLeftRef}>
            <primitive object={shoeLeft.scene} />
          </group>
        <group ref={shoeRightRef}>
          <primitive object={shoeRight.scene} />
        </group>
      </group>
    </>
  );
}
