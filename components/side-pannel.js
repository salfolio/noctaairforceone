import React from "react";
import styles from "./main.module.css";

export default function SidePannel() {
  return (
    <div className={styles["section-left-container"]}>
      <div className={styles["section-title"]}>
        <h1>NOCTA AIR FORCE 1</h1>
      </div>
      <div className={styles["section-description"]}>
        <p>
          {
            "This premium-leather, triple-white AF-1 is a love letter to the classic model. Redesigned perforated toe panel. Molded outsole with minature hearts. Synthetic leather lining. North stars embroidered on left back heel tab. Plastic alphabet & number beads included."
          }
        </p>
      </div>
      <div className={styles["product-info"]}>
        <p>{"SKU: CZ8065-100"}</p>
        <p>{"White | $215.00"}</p>
      </div>
      <div className={styles["purchase-button"]}>
        <button
          onClick={() =>
            window.open(
              "https://www.nocta.com/products/white-lyf-af1",
              "_blank"
            )
          }
        >
          {"Purchase"}
        </button>
      </div>
    </div>
  );
}
