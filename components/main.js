"use client";
import React from "react";
import Experience from "./3d-components/experience";
import Cursor from "./cursor";
import styles from "./main.module.css";
import { Canvas } from "react-three-fiber";
import {
  Html,
  OrbitControls,
  PerspectiveCamera,
  Environment,
} from "@react-three/drei";
import Heritage from "./heritage";
import { useState } from "react";
import About from "./about";
import Header from "./header";
import BookSection from "./book-section";
import ShoesSection from "./shoes-section";
import SidePannel from "./side-pannel";
import SidePannelHeritage from "./side-pannel-heritage";
import SidePannelInspo from "./side-pannel-inspo";


export default function main() {
  const [tab, setTab] = useState("shoes");
  const [start, setStart] = useState(false);


  const changeTabHandler = (option) => {
    setTab(option);
  };

  return (
    <div className={styles["container"]}>

      <div className={styles["nav-bar"]}>
        <div className={styles["nav-bar-options"]}>
          <div
            className={
              tab === "shoes" ? styles["option-active"] : styles["option"]
            }
            onClick={() => changeTabHandler("shoes")}
          >
            <p>Shoes</p>
          </div>
          <div
            className={
              tab === "inspiration" ? styles["option-active"] : styles["option"]
            }
            onClick={() => changeTabHandler("inspiration")}
          >
            <p>Inspiration</p>
          </div>
          <div
            className={
              tab === "history" ? styles["option-active"] : styles["option"]
            }
            onClick={() => changeTabHandler("history")}
          >
            <p>History</p>
          </div>
        </div>
      </div>

      {tab === "shoes" && <SidePannel />}
      {tab === "inspiration" && <SidePannelInspo />}
      {tab === "history" && <SidePannelHeritage />}

      <div className={styles["section"]}>
        {tab === "shoes" && <ShoesSection />}
        {tab === "inspiration" && <BookSection />}
        {tab === "history" && <Heritage />}
        {/* Add other conditions here for additional sections */}
      </div>
    </div>
  );
}
