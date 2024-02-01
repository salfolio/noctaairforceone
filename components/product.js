import React from "react";
import { useRef } from "react";
import { useFrame } from "react-three-fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three"; // Import THREE


export default function Product(props) {
  const meshRef = useRef();
  const model = useGLTF("./model/NoctaForceOnes8-stitches-002.glb");
  const model2 = useGLTF("./model/NoctaForceOnes8-stitches-002.glb");
  
  console.log(model);

  // useFrame is a hook that runs on each frame
  useFrame(() => {
    // Rotate the mesh around the y-axis
    meshRef.current.rotation.y -= 0.004;
  });


  const lacesTextures = useTexture("./textures/LacesBaked001.jpg");
  const bodyTextures = useTexture("./textures/ShoesBaked004.jpg");
  const interorTextures = useTexture("./textures/InteriorSole001.jpg");

  bodyTextures.flipY = false
  lacesTextures.flipY = false
  interorTextures.flipY = false



  return (
    <>
      <group ref={meshRef}>
        {/* <primitive object={model2.scene}/> */}
        {model.scene.children.map((child, index) => {
          if (child.isMesh) {
            // Apply a different material to each child
            let material;
            // Customize material properties based on your requirements
            if (child.name === "BodyLeft" || child.name === "BodyRight") {
              const originalMaterial = child.material;

              material = new THREE.MeshStandardMaterial({
                side: THREE.DoubleSide,
                wireframe: props.isWireFrame,

              }); // Adjust color as needed

              
              // material.wireframe = true
            } else if (
              child.name === "LacesLeft" ||
              child.name === "LacesRight"
            ) {
              // Access the material directly from the child

              // Apply a different material to each child
              material = new THREE.MeshStandardMaterial({
                map: lacesTextures, // Apply the texture map
                // wireframe: true
              });
              material.wireframe = props.isWireFrame;
            } else if (
              child.name === "InnerSoleRight" ||
              child.name === "InnerSoleLeft"
            ) {

              // Apply a different material to each child
              material = new THREE.MeshStandardMaterial({
                map: interorTextures, // Apply the texture map

                // wireframe: true
              });
              material.wireframe = props.isWireFrame;
            } else if (
              child.name === "LacesAttachmentRight" ||
              child.name === "LacesAttachmentLeft"
            ) {
              // Access the material directly from the child
              const originalMaterial = child.material;

              // Apply a different material to each child
              material = new THREE.MeshStandardMaterial({
                color: "white", // Adjust color as needed
                metalness: "0.6",
                roughness: "0.2",
                // wireframe: true
              });
              material.wireframe = props.isWireFrame;
            } else if (
              child.name === "LacesAttachmentRight" ||
              child.name === "LacesAttachmentLeft"
            ) {
              // Access the material directly from the child
              const originalMaterial = child.material;

              // Apply a different material to each child
              material = new THREE.MeshStandardMaterial({
                color: "white", // Adjust color as needed
                metalness: "0.8",
                roughness: "0.2",
                // wireframe: true
              });
              material.wireframe = props.isWireFrame;
            } else if (
              child.name === "LogoBackRight" ||
              child.name === "LogoBackLeft"
            ) {
              // Access the material directly from the child
              const originalMaterial = child.material;

              // Apply a different material to each child
              material = new THREE.MeshStandardMaterial({
                color: "white", // Adjust color as needed
                metalness: "0.5",
                roughness: "0.2",
                // wireframe: true
              });
              material.wireframe = props.isWireFrame;
            } else {
              // Default material for other parts
              material = new THREE.MeshStandardMaterial();
              material.wireframe = props.isWireFrame;
              material.side = THREE.DoubleSide;
            }

            return (
              <mesh
                key={index}
                geometry={child.geometry}
                material={material}
                scale={1}
              />
            );
          }

          return null;
        })}
      </group>
    </>
  );
}
