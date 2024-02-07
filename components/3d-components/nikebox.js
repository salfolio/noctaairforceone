import React from "react";
import { useRef } from "react";
import { useFrame } from "react-three-fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three"; // Import THREE
import { AxesHelper } from "three"; // Import AxesHelper directly from three

export default function nikebox(props) {
  const box = useGLTF("./model/box/box.glb");
  const boxlid = useGLTF("./model/box/boxlid02.glb");

  console.log(box);
  console.log(boxlid);

  // const boxLidRotation = { x: 0, y: 0, z: -Math.PI / 1.25 }; 
  const boxLidRotation = { x: 0, y: 0, z: 0}; // Rotate by 90 degrees around y-axis

  return (
    <>
      {/* Visualize the origin with AxesHelper */}
      <axesHelper args={[3]} />

      <primitive object={box.scene} />
      <group position={[-0.115, 0.059, 0]} rotation={[boxLidRotation.x, boxLidRotation.y, boxLidRotation.z]} >
        {/* <mesh scale={[0.005, 0.005, 0.3]}>
          <boxGeometry></boxGeometry>
          <meshStandardMaterial color={"red"} />
        </mesh> */}
        <primitive object={boxlid.scene} />
      </group>
    </>
  );
}
