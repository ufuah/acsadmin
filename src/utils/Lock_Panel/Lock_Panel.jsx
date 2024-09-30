"use client";

import React from "react";
import styles from "./Lock_Panel.module.css";
import logo from "../../../public/logo2.jpg";
import Image from "next/image";
const Lock_Panel = () => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.img}>
          <Image src={logo} alt="" />
        </div>
      </div>

      <div className={styles.background}>
        <span>
          The store is currently closed. Please ensure all tasks related to
          closing procedures are completed properly. If you have any urgent work
          or questions, feel free to reach out to your manager or supervisor.
          Otherwise, we’ll resume normal operations during our next business
          hours. Thank you for your cooperation and hard work!
        </span>
      </div>
    </div>
  );
};

export default Lock_Panel;
