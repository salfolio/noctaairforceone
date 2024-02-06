"use client";
import React from "react";
import Experience from "./experience";
import styles from "./main.module.css";
import { Canvas } from "react-three-fiber";
import {
  Html,
  OrbitControls,
  PerspectiveCamera,
  Environment,
} from "@react-three/drei";
import Heritage from "./heritage";
import About from "./about";
import Header from "./header";
import BookSection from "./book-section";

export default function main() {
  return (
    <>
      {/* <Header /> */}
      <Experience />
      {/* <About /> */}
      {/* <BookSection/> */}
      {/* <Heritage /> */}
    </>
  );
}
