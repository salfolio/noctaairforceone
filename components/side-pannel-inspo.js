import React from "react";
import styles from './main.module.css'

export default function SidePannelInspo() {
  return (
    <div className={styles["section-left-container"]}>
      <div className={styles["section-title"]}>
        <h1>INSPIRATION</h1>
      </div>
      <div className={styles["section-description"]}>
      <p>
          {
            "Inspired by Drake's favourite childhood book, Love You Forever"
          }
          {
            ", and the sentiment of the phrase, the intent was to enhance the quality of the shoe and add subtle details that would tell the story but wouldn't change the iconic silhouette. "}
        </p>
        <p>
        {"For the first time, the midsole is revised to read "}
          <span>{'"Love You Forever,"'}</span>
          {
            " with complementary hearts that replace the stars on the outsole. Additional design elements include alphabetical beads to customise the lace dubrae, a NOCTA logo in place of Nike Air on the left heel, and a new perforation pattern on the toe box."
          }
        </p>
      </div>
    </div>
  );
}
