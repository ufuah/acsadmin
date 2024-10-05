"use client";

import React, { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faGauge,
  faGaugeHigh,
  faGaugeMed,
  faWifi3,
} from "@fortawesome/free-solid-svg-icons";
import useStore from "../../useStore/Store";
import styles from "./network.module.css";

const Network = () => {
  // State to control the visibility of network_info
  const [isNetworkInfoVisible, setIsNetworkInfoVisible] = useState(true);
  const [isNetworkDetailsVisible, setIsNetworkDetailsVisible] = useState(false); // Control visibility of network_details

  const {
    checkNetworkSpeed,
    checkConnectionType,
    networkSpeed, // Network speed in Mbps
    connectionType, // Connection type (e.g., wifi, cellular)
    isWifi, // Wi-Fi status (boolean)
  } = useStore((state) => ({
    checkNetworkSpeed: state.checkNetworkSpeed,
    checkConnectionType: state.checkConnectionType,
    networkSpeed: state.networkSpeed,
    connectionType: state.connectionType,
    isWifi: state.isWifi,
  }));

  // Function to hide network details after 20 seconds
  const hideNetworkDetailsAfterDelay = () => {
    setTimeout(() => {
      setIsNetworkDetailsVisible(false);
    }, 2000); // Hide after 20 seconds
  };

  // Real-time update for network speed and connection type
  useEffect(() => {
    const updateNetworkInfo = () => {
      checkNetworkSpeed();
      checkConnectionType();
    };

    updateNetworkInfo(); // Initial check on mount

    const interval = setInterval(updateNetworkInfo, 10000); // Check every 10 seconds

    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;

    if (connection) {
      const handleConnectionChange = () => {
        setIsNetworkDetailsVisible(true); // Show on network change
        hideNetworkDetailsAfterDelay(); // Hide after 20 seconds
        updateNetworkInfo();
      };

      connection.addEventListener("change", handleConnectionChange);

      return () => {
        clearInterval(interval);
        connection.removeEventListener("change", handleConnectionChange);
      };
    } else {
      return () => clearInterval(interval);
    }
  }, [checkNetworkSpeed, checkConnectionType]);

  // Automatically show network_info after a delay of 3 seconds on mount
  useEffect(() => {
    const showNetworkInfoTimeout = setTimeout(() => {
      setIsNetworkInfoVisible(true);
      setIsNetworkDetailsVisible(true); // Show the details after the timeout
      hideNetworkDetailsAfterDelay(); // Hide after 20 seconds
    }, 3000); // Show after 3 seconds

    return () => clearTimeout(showNetworkInfoTimeout); // Cleanup timeout on unmount
  }, []);

  // Function to toggle the visibility of network_info manually by user
  const toggleNetworkInfoVisibility = () => {
    setIsNetworkInfoVisible((prev) => !prev);
  };

  // Memoizing the network speed display for better performance
  const speedDisplay = useMemo(() => {
    if (networkSpeed && parseFloat(networkSpeed) > 5) {
      return {
        label: "fast",
        icon: faGaugeHigh,
      };
    } else if (networkSpeed && parseFloat(networkSpeed) > 2) {
      return {
        label: "normal",
        icon: faGaugeMed,
      };
    } else {
      return {
        label: "slow",
        icon: faGauge,
      };
    }
  }, [networkSpeed]);

  return (
    <>
      {/* nav btn */}
      <div
        onClick={toggleNetworkInfoVisibility}
        className={
          `${styles.arrow} ${
            !isNetworkInfoVisible ? styles.active : styles.arrow
          } ${
            !isNetworkDetailsVisible ? styles.inactive : styles.active
          }`
        }

        
      >
        <FontAwesomeIcon icon={faArrowDown} />
      </div>

      <div
        className={`${styles.network_info} ${
            !isNetworkInfoVisible ? styles.active : ""
          } ${!isNetworkDetailsVisible ? styles.network_info : styles.networkactive}`}
      >
        {/* Conditionally render the Wi-Fi icon only if connected to Wi-Fi */}

        {/* Render network speed status */}
        <div
          className={styles.network_details}
        >
          <div className={styles.type}>
            <div className={styles.header}>
              <p>Network Type:</p>
            </div>
            {isWifi ? (
              <div className={styles.icon}>
                <FontAwesomeIcon icon={faWifi3} aria-label="Wi-Fi connected" />
              </div>
            ) : (
              <span>{connectionType}</span>
            )}
          </div>

          <div className={styles.base}>
            <div className={styles.header}>
              <p>network speed</p>
            </div>

            <div className={styles.space}>
              <div className={styles.speed}>
                <p
                  className={`${styles.quality} ${styles[speedDisplay.label]}`}
                >
                  {speedDisplay.label}
                </p>
                <span>{networkSpeed}</span>
              </div>
              <div className={styles.icon}>
                <FontAwesomeIcon
                  icon={speedDisplay.icon}
                  aria-label={speedDisplay.label}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Network;
