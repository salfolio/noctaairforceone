import React from "react";
import styles from "./experience.module.css";
import { Canvas } from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";
import Book from "./3d-components/book";

export default function About() {
  return (
    <div className={styles["about-container"]}>
      <div className={styles["about-header-text"]}>
        <p>
          {
            "This premium-leather, triple-white AF-1 is a love letter to the classic model. Inspired by Drake's favourite childhood book, Love You Forever"
          }
          {
            ", and the sentiment of the phrase, the intent was to enhance the quality of the shoe and add subtle details that would tell the story but wouldn't change the iconic silhouette. For the first time, the midsole is revised to read "
          }
          <span>{'"Love You Forever,"'}</span>
          {
            " with complementary hearts that replace the stars on the outsole. Additional design elements include alphabetical beads to customise the lace dubrae, a NOCTA logo in place of Nike Air on the left heel, and a new perforation pattern on the toe box."
          }
        </p>
      </div>
    </div>
  );
}
