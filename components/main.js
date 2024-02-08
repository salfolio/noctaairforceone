"use client";
import React from "react";
import Experience from "./3d-components/experience";
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
import ShoesSection from "./shoes-section";

export default function main() {
  return (
    <div className={styles["container"]}>
      {/* <Header /> */}
      <div className={styles["section"]}>
        <ShoesSection />
      </div>
      {/* <About /> */}
      {/* <div className={styles["section"]}>
      <BookSection />
      </div> */}
      {/* <Heritage /> */}
    </div>
  );
}
