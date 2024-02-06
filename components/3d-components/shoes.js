import React from "react";
import { useRef, useState } from "react";
import { useFrame } from "react-three-fiber";
import { Html, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three"; // Import THREE

export default function Shoe(props) {
  const meshRef = useRef();
  const shoeLeftRef = useRef();
  const shoeRightRef = useRef();
  const model = useGLTF("./model/NoctaForceOnes8-stitches-006.glb");

  const shoeLeft = useGLTF("./model/shoe/shoe-left-02.glb");
  const shoeRight = useGLTF("./model/shoe/shoe-right-02.glb");

  const lacesTextures = useTexture("./textures/LacesBaked001.jpg");
  const bodyTextures = useTexture("./textures/ShoesBaked004.jpg");
  const interorTextures = useTexture("./textures/InteriorTexture004.jpg");

  bodyTextures.flipY = false;
  lacesTextures.flipY = false;
  interorTextures.flipY = false;

  const initShoeTransform = {
    shoeLeft: { position: [0.048, 0, -0.02], rotation: [0, 0, Math.PI / 2] },
    shoeRight: {
      position: [-0.048, 0, 0.02],
      rotation: [0, Math.PI, Math.PI / 2],
    },
  };

  const finalShoeTransform = {
    shoeLeft: { position: [0.06, 0, 0], rotation: [0, 0, 0] },
    shoeRight: { position: [-0.06, 0, 0], rotation: [0, 0, 0] },
  };


  const animateShoes = () => {
    const duration = 2; // Adjust the duration of the animation in seconds

    // Calculate the animation progress based on the elapsed time
    const progress = Math.min(1, animationProgress + props.delta / duration);

    // Update the position and rotation of the shoe groups based on the animation progress
    shoeLeftRef.current.position.lerpVectors(
      new THREE.Vector3().fromArray(initShoeTransform.shoeLeft.position),
      new THREE.Vector3().fromArray(finalShoeTransform.shoeLeft.position),
      progress
    );
    shoeLeftRef.current.rotation.lerpVectors(
      new THREE.Euler().fromArray(initShoeTransform.shoeLeft.rotation),
      new THREE.Euler().fromArray(finalShoeTransform.shoeLeft.rotation),
      progress
    );

    shoeRightRef.current.position.lerpVectors(
      new THREE.Vector3().fromArray(initShoeTransform.shoeRight.position),
      new THREE.Vector3().fromArray(finalShoeTransform.shoeRight.position),
      progress
    );
    shoeRightRef.current.rotation.lerpVectors(
      new THREE.Euler().fromArray(initShoeTransform.shoeRight.rotation),
      new THREE.Euler().fromArray(finalShoeTransform.shoeRight.rotation),
      progress
    );

    setAnimationProgress(progress);
  };



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
  // useFrame is a hook that runs on each frame
  // useFrame((state, delta) => {
  //   // You can adjust the amplitude and frequency to control the hovering effect
  //   const amplitude = 0.01; // Adjust the amplitude of the hovering
  //   const frequency = 0.5; // Adjust the frequency of the hovering

  //   // Calculate the vertical position offset based on time
  //   const yOffsetLeft = amplitude * Math.sin(state.clock.elapsedTime * frequency * 1.05);
  //   const yOffsetRight = amplitude * Math.sin(state.clock.elapsedTime * frequency);

  //   // Update the position of the shoe groups
  //   shoeLeftRef.current.position.y = yOffsetLeft
  //   shoeRightRef.current.position.y = yOffsetRight
  // });

  return (
    <>
      <group ref={meshRef} scale={[1, 1, 1]}>
        <group position={initShoeTransform.shoeLeft.position} rotation={initShoeTransform.shoeLeft.rotation} ref={shoeLeftRef}>
          <primitive object={shoeLeft.scene} />
        </group>
        <group position={initShoeTransform.shoeRight.position} rotation={initShoeTransform.shoeRight.rotation} ref={shoeRightRef}>
          <primitive object={shoeRight.scene} />
        </group>
      </group>
    </>
  );
}
