"use client"

import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useStore from "@/src/useStore/Store";
import styles from "./lockControl.module.css";
import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";

const LockControl = () => {
  const { role, isLocked, checkLock, toggleLock } = useStore((state) => ({
    role: state.role,
    isLocked: state.isLocked,
    checkLock: state.checkLock,
    toggleLock: state.toggleLock,
  }));

  useEffect(() => {
    checkLock(); // Fetch lock status when the component mounts
  }, [checkLock]);

  useEffect(() => {
    console.info(`Current lock status: ${isLocked ?  "Locked" :"Unlocked" }`);
  }, [isLocked]);

  const handleToggleLock = async () => {
    try {
      await toggleLock();
      console.info(`Lock status successfully toggled. New status: ${isLocked ? "Locked" :"Unlocked" }`);
    } catch (error) {
      console.error("Error toggling lock status:", error);
    }
  };

  if (role !== "admin") {
    console.info("User role is not admin. LockControl component will not be rendered.");
    return null;
  }

  const icon = isLocked ? faLock : faUnlock;

  return (
    <div
      onClick={handleToggleLock}
      className={styles.container}
      aria-label={`Click to ${isLocked ?  "lock" :"unlock" } routes`}
    >
      <FontAwesomeIcon icon={icon} />
    </div>
  );
};

export default LockControl;
