import React from "react";
import styles from "./main.module.css";

export default function SidePannelHeritage() {
  return (
    <div className={styles["section-left-container"]}>
      <div className={styles["section-title"]}>
        <h1>HERITAGE</h1>
      </div>
      <div className={styles["section-description"]}>
        <p>
          {
            "Introducd in 1982, the Air Force 1 redefined basketball footwear from the hardwood to the tarmac. It was the first basketball sneaker to house Nike Air, but it's innovative nature has since taken a back seat to its status as a street icon"
          }
        </p>
      </div>
      <div className={styles["product-info"]}>
        <div className={styles["history-table"]}>
          <p>{"YEAR"}</p>
          <p>{"1982"}</p>
        </div>
        <div className={styles["history-table"]}>
          <p>{"DESIGNER"}</p>
          <p>{"BRUCE KILGORE"}</p>
        </div>
      </div>
    </div>
  );
}
