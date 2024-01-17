import React from "react";
import { useRef } from "react";
import { useFrame } from "react-three-fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three"; // Import THREE

export default function Product(props) {
  const meshRef = useRef();
  const model = useGLTF("./model/nike-air-force-one-04.glb");
  console.log(model);

  // useFrame is a hook that runs on each frame
  useFrame(() => {
    // Rotate the mesh around the y-axis
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <>
      <group ref={meshRef}>
        {model.scene.children.map((child, index) => {
          if (child.isMesh) {
            // Apply a different material to each child
            let material;

            // Customize material properties based on your requirements
            if (child.name === "Body") {
              // Example: Apply a standard material with a specific color to the sole
              material = new THREE.MeshStandardMaterial({ color: "white"}); // Adjust color as needed
              material.side = THREE.DoubleSide
              material.wireframe = props.isWireFrame;
              // material.wireframe = true
              

            } else if (child.name === "Laces") {
                // Access the material directly from the child
                const originalMaterial = child.material;
    
                // Apply a different material to each child
                material = new THREE.MeshStandardMaterial({
                  color: "white", // Adjust color as needed
                  // map: originalMaterial.map, // Apply the texture map
                  // wireframe: true
                });
                material.wireframe = props.isWireFrame;
            }
            
            else {
              // Default material for other parts
              material = new THREE.MeshStandardMaterial();
              material.wireframe = props.isWireFrame;

            }
            

            return (
              <mesh key={index} geometry={child.geometry} material={material} scale={12} />
            );
          }

          return null;
        })}
      </group>
    </>
  );
}
