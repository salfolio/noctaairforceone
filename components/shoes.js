import React from "react";
import { useRef } from "react";
import { useFrame } from "react-three-fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three"; // Import THREE

export default function Shoe(props) {
  const meshRef = useRef();
  const model = useGLTF("./model/NoctaForceOnes8-stitches-006.glb");

  const lacesTextures = useTexture("./textures/LacesBaked001.jpg");
  const bodyTextures = useTexture("./textures/ShoesBaked004.jpg");
  const interorTextures = useTexture("./textures/InteriorTexture004.jpg");

  bodyTextures.flipY = false;
  lacesTextures.flipY = false;
  interorTextures.flipY = false;

  console.log(model);

  const textureScale = 5;
  // Traverse the model's scene to find and modify materials for BodyLeft and BodyRight
  model.scene.traverse((node) => {
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
        wireframe: props.isWireFrame

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
        wireframe: props.isWireFrame

        // wireframe: true
      });
    } else if (
      node.isMesh &&
      (node.name === "LacesAttachmentRight" || node.name === "LacesAttachmentLeft")
    ) {
      // Apply a different material to each child

      node.material = new THREE.MeshStandardMaterial({
        color: "white", // Adjust color as needed
        metalness: "0.8",
        roughness: "0.2",
        wireframe: props.isWireFrame

        // wireframe: true
      });
    }
    else if (
      node.isMesh &&
      (node.name === "InnerSoleRight" || node.name === "InnerSoleLeft")
    ) {
      // Apply a different material to each child

      node.material = new THREE.MeshStandardMaterial({
        map: interorTextures,
        wireframe: props.isWireFrame
        // wireframe: true
      });
    }
    else {
      if(node.isMesh){
        node.material.wireframe = props.isWireFrame
      }
    }
  });
  // useFrame is a hook that runs on each frame
  useFrame(() => {
    // Rotate the mesh around the y-axis
    meshRef.current.rotation.y -= 0.004;
  });

  return (
    <>
      <group ref={meshRef}>
        <primitive object={model.scene} />
      </group>
    </>
  );
}
