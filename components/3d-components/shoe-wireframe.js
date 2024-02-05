import React from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three"; // Import THREE
import { useRef } from "react";
import { useFrame } from "react-three-fiber";

export default function Wireframe() {
  const nike = useGLTF("./model/shoe/nike-wireframe-02.glb");

  const ref = useRef();

  nike.scene.traverse((node) => {
    if (node.isMesh) {
      node.material = new THREE.MeshBasicMaterial({
        color: "white", // Adjust color as needed
        wireframe: true,
      });
    }
  });

  useFrame(() => {
    // Rotate the mesh around the y-axis
    ref.current.rotation.y -= 0.004;
  });

  return (
    <group scale={[7, 7, 7]} ref={ref}>
      <primitive object={nike.scene} />
    </group>
  );
}
