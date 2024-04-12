import React from "react";
import { useRef } from "react";
import { useFrame, useThree } from "react-three-fiber";
import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three"; // Import THREE
import { useState } from "react";
import { PerspectiveCamera } from "@react-three/drei";

export default function Book() {
  const book = useGLTF("./model/book/book-02.glb");

  const bookRef = useRef();

  useFrame(() => {
    bookRef.current.rotation.z += 0.01;
  });

  return (
    <>
      <ambientLight intensity={2} />
      <directionalLight position={[2,2,2]} intensity={5}/>
      <OrbitControls enableZoom={false} enablePan={false} />
      <PerspectiveCamera
        makeDefault
        fov={25}
        near={0.1}
        far={1000}
        position={[-4, 1, 4]}
      />
      <group
        scale={[0.67, 0.67, 0.67]}
        rotation={[Math.PI / 2, 0, 0]}
        ref={bookRef}
      >
        <primitive object={book.scene} />
      </group>
    </>
  );
}
