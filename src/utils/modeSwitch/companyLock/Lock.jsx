// // "use client"

// // import React, { useEffect } from "react";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import useStore from "@/src/useStore/Store";
// // import styles from "./lockControl.module.css";
// // import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";

// // const LockControl = () => {
// //   const { role, isLocked, checkLock, toggleLock } = useStore((state) => ({
// //     role: state.role,
// //     isLocked: state.isLocked,
// //     checkLock: state.checkLock,
// //     toggleLock: state.toggleLock,
// //   }));

// //   useEffect(() => {
// //     checkLock(); // Fetch lock status when the component mounts
// //   }, [checkLock]);

// //   useEffect(() => {
// //     console.info(`Current lock status: ${isLocked ?  "Locked" :"Unlocked" }`);
// //   }, [isLocked]);

// //   const handleToggleLock = async () => {
// //     try {
// //       await toggleLock();
// //       console.info(`Lock status successfully toggled. New status: ${isLocked ? "Locked" :"Unlocked" }`);
// //     } catch (error) {
// //       console.error("Error toggling lock status:", error);
// //     }
// //   };

// //   if (role !== "admin") {
// //     console.info("User role is not admin. LockControl component will not be rendered.");
// //     return null;
// //   }

// //     // Automatically toggle lock/unlock at specific times (lock at 6 PM, unlock at 8 AM)
// //     useEffect(() => {
// //       const checkTimeAndToggleLock = () => {
// //         const now = new Date();
// //         const currentHour = now.getHours();

// //         // Lock at 6 PM (18:00) and unlock at 8 AM (08:00)
// //         if (currentHour === 18 && !isLocked) {
// //           handleToggleLock(); // Lock at 6 PM
// //         } else if (currentHour === 8 && isLocked) {
// //           handleToggleLock(); // Unlock at 8 AM
// //         }
// //       };

// //       // Check every minute
// //       const interval = setInterval(checkTimeAndToggleLock, 60000); // 60,000 ms = 1 minute

// //       return () => clearInterval(interval); // Cleanup the interval on component unmount
// //     }, [isLocked, toggleLock]);

// //   const icon = isLocked ? faLock : faUnlock;

// //   return (
// //     <div
// //       onClick={handleToggleLock}
// //       className={styles.container}
// //       aria-label={`Click to ${isLocked ?  "lock" :"unlock" } routes`}
// //     >
// //       <FontAwesomeIcon icon={icon} />
// //     </div>
// //   );
// // };

// // export default LockControl;

// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import useStore from "@/src/useStore/Store";
// import styles from "./lockControl.module.css";
// import {
//   faHourglass,
//   faHourglassHalf,
//   faHourglassStart,
//   faLock,
//   faUnlock,
// } from "@fortawesome/free-solid-svg-icons";

// const LockControl = () => {
//   const { role, isLocked, checkLock, toggleLock } = useStore((state) => ({
//     role: state.role,
//     isLocked: state.isLocked,
//     checkLock: state.checkLock,
//     toggleLock: state.toggleLock,
//   }));

//   const [isAutoMode, setIsAutoMode] = useState(true); // State for auto/manual mode
//   const [showAutoModeButton, setShowAutoModeButton] = useState(false); // State to show/hide the auto mode button
//   const longPressTimer = useRef(null); // Ref to handle long press

//   useEffect(() => {
//     checkLock(); // Fetch lock status when the component mounts
//   }, [checkLock]);

//   useEffect(() => {
//     console.info(`Current lock status: ${isLocked ? "Locked" : "Unlocked"}`);
//   }, [isLocked]);

//   const handleToggleLock = async () => {
//     try {
//       await toggleLock();
//       console.info(
//         `Lock status successfully toggled. New status: ${
//           isLocked ? "Locked" : "Unlocked"
//         }`
//       );
//     } catch (error) {
//       console.error("Error toggling lock status:", error);
//     }
//   };

//   // Automatically toggle lock/unlock at specific times (lock at 6 PM, unlock at 8 AM) if in auto mode
//   useEffect(() => {
//     if (!isAutoMode) return; // Skip automatic toggling in manual mode

//     const checkTimeAndToggleLock = () => {
//       const now = new Date();
//       const currentHour = now.getHours();

//       // Lock at 6 PM (18:00) and unlock at 8 AM (08:00)
//       if (currentHour === 18 && !isLocked) {
//         handleToggleLock(); // Lock at 6 PM
//       } else if (currentHour === 8 && isLocked) {
//         handleToggleLock(); // Unlock at 8 AM
//       }
//     };

//     // Check every minute
//     const interval = setInterval(checkTimeAndToggleLock, 60000); // 60,000 ms = 1 minute

//     return () => clearInterval(interval); // Cleanup the interval on component unmount
//   }, [isLocked, isAutoMode, toggleLock]);

//   // Handle long press detection to show the auto/manual mode toggle button
//   const handleMouseDown = () => {
//     longPressTimer.current = setTimeout(() => {
//       setShowAutoModeButton(true); // Show the button after long press
//     }, 1000); // 1-second long press
//   };

//   const handleMouseUp = () => {
//     clearTimeout(longPressTimer.current); // Clear the timer on mouse up
//   };

//   // Handle the auto/manual mode toggle
//   const handleToggleAutoMode = () => {
//     setIsAutoMode((prev) => !prev); // Toggle auto mode
//     setShowAutoModeButton(false); // Hide the button after toggling
//     console.info(`Automatic mode ${isAutoMode ? "disabled" : "enabled"}.`);
//   };

//   if (role !== "admin") {
//     console.info(
//       "User role is not admin. LockControl component will not be rendered."
//     );
//     return null;
//   }

//   const icon = isLocked ? faLock : faUnlock;
//   const Autoicon = isAutoMode ? faHourglassHalf : faHourglass;

//   return (
//     <div>
//       {/* Lock/Unlock Icon with long press */}
//       <div
//         onMouseDown={handleMouseDown} // Detect long press
//         onMouseUp={handleMouseUp} // Clear on mouse up
//         onTouchStart={handleMouseDown} // Mobile support for long press
//         onTouchEnd={handleMouseUp} // Mobile support for touch end
//         onClick={handleToggleLock} // Regular click to toggle lock
//         className={styles.container}
//         aria-label={`Click to ${isLocked ? "lock" : "unlock"} routes`}
//       >
//         <FontAwesomeIcon icon={icon} />
//       </div>

//       {/* Button to enable/disable auto mode, shown after long press */}
//       {showAutoModeButton && (
//         <div className={styles.autoModeButton} onClick={handleToggleAutoMode}>
//           <p>{isAutoMode ? "Auto Mode Enabled": "Auto Mode Disabled" }</p>
//           <div className={styles.switch}>
//             {/* Icon for enabling auto mode */}
//             <div
//               className={`${styles.icon} ${isAutoMode ? styles.active : ""}`}
//             >
//               <FontAwesomeIcon icon={faHourglassHalf} />
//             </div>
//             {/* Icon for manual mode */}
//             <div
//               className={`${styles.icon} ${!isAutoMode ? styles.active : ""}`}
//             >
//               <FontAwesomeIcon icon={faHourglass} />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LockControl;

"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useStore from "@/src/useStore/Store";
import styles from "./lockControl.module.css";
import {
  faHourglass,
  faHourglassHalf,
  faLock,
  faUnlock,
} from "@fortawesome/free-solid-svg-icons";
import useLoad from "@/src/hooks/useLoad";
import { useAuth } from "@/src/Context/ThemeContext";

const LockControl = () => {
  const {isLocked} = useStore((state) => ({
    role: state.role,
    isLocked: state.isLocked,
   
  }));

  const {  checkLock, toggleLock } = useLoad();
  const { user} = useAuth();

  const [isAutoMode, setIsAutoMode] = useState(true); // State for auto/manual mode
  const [showAutoModeButton, setShowAutoModeButton] = useState(false); // State to show/hide the auto mode button
  const longPressTimer = useRef(null); // Ref to handle long press

  // Memoize handleToggleLock to prevent unnecessary re-renders
  const handleToggleLock = useCallback(async () => {
    try {
      await toggleLock();
      console.info(
        `Lock status successfully toggled. New status: ${
          isLocked ? "Locked" : "Unlocked"
        }`
      );
    } catch (error) {
      console.error("Error toggling lock status:", error);
    }
  }, [isLocked, toggleLock]);

  useEffect(() => {
    checkLock(); // Fetch lock status when the component mounts
  }, [checkLock]);

  useEffect(() => {
    console.info(`Current lock status: ${isLocked ? "Locked" : "Unlocked"}`);
  }, [isLocked]);

  // Automatically toggle lock/unlock at specific times (lock at 6 PM, unlock at 8 AM) if in auto mode
  useEffect(() => {
    if (!isAutoMode) return; // Skip automatic toggling in manual mode

    const checkTimeAndToggleLock = () => {
      const now = new Date();
      const currentHour = now.getHours();

      // Lock at 6 PM (18:00) and unlock at 8 AM (08:00)
      if (currentHour === 18 && !isLocked) {
        handleToggleLock(); // Lock at 6 PM
      } else if (currentHour === 8 && isLocked) {
        handleToggleLock(); // Unlock at 8 AM
      }
    };

    // Check every minute
    const interval = setInterval(checkTimeAndToggleLock, 60000); // 60,000 ms = 1 minute

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [isLocked, isAutoMode, handleToggleLock]);

  // Handle long press detection to show the auto/manual mode toggle button
  const handleMouseDown = (e) => {
    e.preventDefault(); // Prevent default action to avoid unexpected behavior
    longPressTimer.current = setTimeout(() => {
      setShowAutoModeButton(true); // Show the button after long press
    }, 1000); // 1-second long press
  };

  const handleMouseUp = () => {
    clearTimeout(longPressTimer.current); // Clear the timer on mouse up
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    handleMouseDown(e); // Handle touch start as long press
  };

  const handleTouchEnd = () => {
    clearTimeout(longPressTimer.current); // Clear the timer on touch end
  };

  // Handle the auto/manual mode toggle
  const handleToggleAutoMode = () => {
    setIsAutoMode((prev) => !prev); // Toggle auto mode
    setShowAutoModeButton(false); // Hide the button after toggling
    console.info(`Automatic mode ${isAutoMode ? "disabled" : "enabled"}.`);
  };

  if (user?.role !== "admin") {
    console.info(
      "User role is not admin. LockControl component will not be rendered."
    );
    return null;
  }

  const icon = isLocked ? faLock : faUnlock;
  const Autoicon = isAutoMode ? faHourglassHalf : faHourglass;

  return (
    <div>
      {/* Lock/Unlock Icon with long press */}
      <div
        onMouseDown={handleMouseDown} // Detect long press
        onMouseUp={handleMouseUp} // Clear on mouse up
        onTouchStart={handleTouchStart} // Mobile support for long press
        onTouchEnd={handleTouchEnd} // Mobile support for touch end
        onClick={handleToggleLock} // Regular click to toggle lock
        className={styles.container}
        aria-label={`Click to ${isLocked ? "lock" : "unlock"} routes`}
      >
        <FontAwesomeIcon icon={icon} />
      </div>

      {/* Button to enable/disable auto mode, shown after long press */}
      {showAutoModeButton && (
        <div className={styles.autoModeButton} onClick={handleToggleAutoMode}>
          <p>{isAutoMode ? "Auto Mode Enabled" : "Auto Mode Disabled"}</p>
          <div className={styles.switch}>
            {/* Icon for enabling auto mode */}
            <div
              className={`${styles.icon} ${isAutoMode ? styles.active : ""}`}
            >
              <FontAwesomeIcon icon={faHourglassHalf} />
            </div>
            {/* Icon for manual mode */}
            <div
              className={`${styles.icon} ${!isAutoMode ? styles.active : ""}`}
            >
              <FontAwesomeIcon icon={faHourglass} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LockControl;
