"use client"

import { useTheme } from "@/Context/ThemeContext";
import React, { useContext, useEffect } from "react";
import styles from "./switch.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { options } from "./data";

const Switch = () => {
  const { mode, setMode} = useTheme();

 
  return (
    <div className={styles.container}>
       
      <div className={styles.mode_toggle} >
        {options?.map((opt) => (
          <div 
          key={opt.text}
          className={mode === opt.text ? `${styles.iconcontent} ${styles.active}` : styles.iconcontent}
          onClick={() => setMode(opt.text)}
        >
 
          <div className={styles.icon}>
            <FontAwesomeIcon icon={opt.icon} />
          </div>
          <div className={styles.name}>
            <span>{opt.text}</span>
          </div>
          
        </div>
        ))}
      </div>
    </div>
  );
};

export default Switch;
