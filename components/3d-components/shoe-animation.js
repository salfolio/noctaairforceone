import React from "react";
import { useRef, useState, useEffect } from "react";
import { useFrame } from "react-three-fiber";
import { Html, useGLTF, useTexture, useAnimations } from "@react-three/drei";
import * as THREE from "three"; // Import THREE

export default function ShoeAnimation(props) {
  const meshRef = useRef();
  const shoeLeftRef = useRef();
  const shoeRightRef = useRef();
  
  const shoeLeft = useGLTF("./model/shoe/shoe-animation-left.glb");
  const shoeRight = useGLTF("./model/shoe/shoe-animation-right.glb");
  
  const shoeLeftAnimations = useAnimations(shoeLeft.animations, shoeLeft.scene);
  const shoeRightAnimations = useAnimations(shoeRight.animations, shoeRight.scene);

  console.log(shoeLeftAnimations);

  console.log(shoeLeft);
  console.log(shoeRight);

  const lacesTextures = useTexture("./textures/LacesBaked001.jpg");
  const bodyTextures = useTexture("./textures/ShoesBaked004.jpg");
  const interorTextures = useTexture("./textures/InteriorTexture004.jpg");

  bodyTextures.flipY = false;
  lacesTextures.flipY = false;
  interorTextures.flipY = false;


  useEffect(() => {
    const shoeLeftActions = shoeLeftAnimations.actions;
    const shoeRightActions = shoeRightAnimations.actions;
    
    shoeLeftActions.ShoeLeftAnim.play();
    // shoeLeftActions.IdleLeft.play();
    shoeRightActions.ShoeRightAnim.play();
    // shoeRightActions.IdleRight.play();

    
    shoeLeftAnimations.actions.IdleLeft.play();
    shoeLeftAnimations.actions.IdleLeft.crossFadeFrom(shoeLeftAnimations.actions.ShoeLeftAnim, 1);

  },[])

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
      node.material.wireframe = props.isWireFrame;

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
        wireframe: props.isWireFrame,
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
        wireframe: props.isWireFrame,

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
        wireframe: props.isWireFrame,

        // wireframe: true
      });
    } else if (
      node.isMesh &&
      (node.name === "InnerSoleRight" || node.name === "InnerSoleLeft")
    ) {
      // Apply a different material to each child

      node.material = new THREE.MeshStandardMaterial({
        map: interorTextures,
        wireframe: props.isWireFrame,
        // wireframe: true
      });
    } else {
      if (node.isMesh) {
        node.material.wireframe = props.isWireFrame;
      }
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
      node.material.wireframe = props.isWireFrame;

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
        wireframe: props.isWireFrame,
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
        wireframe: props.isWireFrame,

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
        wireframe: props.isWireFrame,

        // wireframe: true
      });
    } else if (
      node.isMesh &&
      (node.name === "InnerSoleRight" || node.name === "InnerSoleLeft")
    ) {
      // Apply a different material to each child

      node.material = new THREE.MeshStandardMaterial({
        map: interorTextures,
        wireframe: props.isWireFrame,
        // wireframe: true
      });
    } else {
      if (node.isMesh) {
        node.material.wireframe = props.isWireFrame;
      }
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
