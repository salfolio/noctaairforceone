import React from "react";
import { useRef } from "react";
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

  console.log(model);

  const textureScale = 5;
  // Traverse the model's scene to find and modify materials for BodyLeft and BodyRight
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
  useFrame((state, delta) => {
    // You can adjust the amplitude and frequency to control the hovering effect
    const amplitude = 0.01; // Adjust the amplitude of the hovering
    const frequency = 0.5; // Adjust the frequency of the hovering

    // Calculate the vertical position offset based on time
    const yOffsetLeft = amplitude * Math.sin(state.clock.elapsedTime * frequency * 1.05);
    const yOffsetRight = amplitude * Math.sin(state.clock.elapsedTime * frequency);


    // Update the position of the shoe groups
    shoeLeftRef.current.position.y = yOffsetLeft
    shoeRightRef.current.position.y = yOffsetRight
  });

  //Position Values for in Box
  const shoeLeftRotationBox = [0, 0, Math.PI / 2];
  const shoeRightRotationBox = [0, Math.PI, Math.PI / 2];
  const shoeLeftPositionBox = [0.048, 0, -0.02];
  const shoerightPositionBox = [-0.048, 0, 0.02];

  return (
    <>
      <group ref={meshRef} scale={[1.5,1.5,1.5]}>
        <group position={[0.06, 0, 0]} ref={shoeLeftRef}>
          {/* <Html>
            <div className={styles["marker"]}>
              h1
            </div>
          </Html> */}
          <primitive object={shoeLeft.scene} />
        </group>
        <group position={[-0.06, 0, 0]}>
          <primitive object={shoeRight.scene} ref={shoeRightRef}/>
        </group>
      </group>
    </>
  );
}
