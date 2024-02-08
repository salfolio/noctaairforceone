import React from "react";
import styles from "./experience.module.css";
import Experience from "./3d-components/experience";
import { useState } from "react";
import { Canvas } from "react-three-fiber";

export default function ShoesSection() {
  const [openBoxAnim, setOpenBoxAnim] = useState(null);

  const toggleAnim = () => {
    if (openBoxAnim === false || openBoxAnim === null) {
      setOpenBoxAnim(true);
    } else if (openBoxAnim === true) {
      setOpenBoxAnim(false);
    }
  };

  return (
    <div className={styles["canvas"]}>
      <Canvas>
        <Experience openBoxAnim={openBoxAnim} />
      </Canvas>
      <div className={styles["toggle-box-button"]}>
        <div className={styles["toggle-box-button-container"]}>
          <div onClick={toggleAnim}>{"open box"}</div>
          <div onClick={toggleAnim}>{"close box"}</div>
       
        </div>
      </div>
    </div>
  );
}
