import React from "react";
import { useRef } from "react";
import { useFrame } from "react-three-fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three"; // Import THREE

export default function Product(props) {
  const meshRef = useRef();
  const model = useGLTF("./model/NoctaForceOnes4.glb");
  console.log(model);

  // useFrame is a hook that runs on each frame
  useFrame(() => {
    // Rotate the mesh around the y-axis
    meshRef.current.rotation.y -= 0.004;
  });

  return (
    <>
      <group ref={meshRef}>
        {model.scene.children.map((child, index) => {
          if (child.isMesh) {
            // Apply a different material to each child
            let material;

            // Customize material properties based on your requirements
            if (child.name === "BodyLeft" || child.name === "BodyRight") {
              // Example: Apply a standard material with a specific color to the sole
              material = new THREE.MeshStandardMaterial({ color: "white" }); // Adjust color as needed
              material.side = THREE.DoubleSide;
              material.wireframe = props.isWireFrame;
              // material.wireframe = true
            } else if (
              child.name === "LacesLeft" ||
              child.name === "LacesRight"
            ) {
              // Access the material directly from the child

              // Apply a different material to each child
              material = new THREE.MeshStandardMaterial({
                color: "white", // Adjust color as needed
                // map: originalMaterial.map, // Apply the texture map
                // wireframe: true
              });
              material.wireframe = props.isWireFrame;
            } else if (
              child.name === "InnerSoleRight" ||
              child.name === "InnerSoleLeft"
            ) {
              // Access the material directly from the child
              const originalMaterial = child.material;

              // Apply a different material to each child
              material = new THREE.MeshStandardMaterial({
                map: originalMaterial.map, // Apply the texture map
                
                // wireframe: true
              });
              material.wireframe = props.isWireFrame;
            }
            
            
            else if (
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
                scale={8}
              />
            );
          }

          return null;
        })}
      </group>
    </>
  );
}
