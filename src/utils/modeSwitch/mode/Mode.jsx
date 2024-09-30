"use client";

import styles from "./mode.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { ThemeContext, useTheme } from "../../../Context/ThemeContext";

const Mode = () => {
  // const { mode, setMode } = useContext(ThemeContext);
  const { mode, setMode } = useTheme();
  const handleTheme = () => setMode(mode === "light" ? "dark" : "light");
  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      className={styles.container}
    >
      <div className={styles.switch}>
        <div onClick={handleTheme}>
          <FontAwesomeIcon icon={mode === "light" ? faSun : faMoon} />
        </div>
      </div>
    </motion.div>
  );
};

export default Mode;
