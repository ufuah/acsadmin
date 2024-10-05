"use client";

import Image from "next/image";
import styles from "./topbar.module.css";
import Calendar from "../calender/Calender";
import Searchbar from "../searchExtr/searchbar";
import Profile from "../profile/Profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faGauge, faGaugeHigh, faGaugeMed, faWifi3 } from "@fortawesome/free-solid-svg-icons";
import useStore from "../../useStore/Store";
import { useEffect } from "react";

const Topbar = () => {
  // Get the user and role from the Zustand store
  const { user, role } = useStore((state) => ({
    user: state.user,
    role: state.role,
  }));



  return (
    <div className={styles.container}>
      <div className={styles.topbar}>
        <div className={styles.greatings}>
          <span>
            {role === "admin" ? "welcome back, boss" : "welcome back,"}
          </span>
          <p>{user}</p>
        </div>

        <div className={styles.searcharea}>
          <div className={styles.search}>
            <Searchbar />
          </div>

          <div className={styles.notification}>
            <Profile user={user} />
            <div className={styles.bell}>
              <div className={styles.icon}>
                <FontAwesomeIcon icon={faBell} />
              </div>
              <span>6</span>
            </div>
          </div>



          {/* <div className={styles.profile}>

          </div> */}

          {/* <Calendar /> */}
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.right}></div>

        <div className={styles.left}></div>
      </div>
    </div>
  );
};

export default Topbar;




// "use client";

// import Image from "next/image";
// import styles from "./topbar.module.css";
// import Calendar from "../calender/Calender";
// import Searchbar from "../searchExtr/searchbar";
// import Profile from "../profile/Profile";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBell } from "@fortawesome/free-solid-svg-icons";
// import useStore from "../../useStore/Store";
// import { useEffect } from "react";

// const Topbar = () => {
//   // Get the user and role from the Zustand store
//   const { user, role } = useStore((state) => ({
//     user: state.user,
//     role: state.role,
//   }));

//   // Access state and functions from your store
//   const {
//     checkNetworkSpeed,
//     checkConnectionType,
//     networkSpeed,
//     connectionType,
//   } = useStore((state) => ({
//     checkNetworkSpeed: state.checkNetworkSpeed,
//     checkConnectionType: state.checkConnectionType,
//     networkSpeed: state.networkSpeed,
//     connectionType: state.connectionType,
//   }));

//   // Real-time update for network speed and connection type
//   useEffect(() => {
//     // Function to check network and connection type
//     const updateNetworkInfo = () => {
//       checkNetworkSpeed();
//       checkConnectionType();
//     };

//     // Initial check when the component mounts
//     updateNetworkInfo();

//     // Set up an interval to check network speed periodically (fallback)
//     const interval = setInterval(() => {
//       updateNetworkInfo();
//     }, 10000); // Check every 10 seconds (adjust as needed)

//     // Optional: Listen for changes in connection type and speed using `navigator.connection`
//     const connection =
//       navigator.connection ||
//       navigator.mozConnection ||
//       navigator.webkitConnection;

//     if (connection) {
//       // Function to handle changes in the connection
//       const handleConnectionChange = () => {
//         updateNetworkInfo();
//       };

//       // Add event listener to detect network connection changes
//       connection.addEventListener("change", handleConnectionChange);

//       // Cleanup event listener when component unmounts
//       return () => {
//         clearInterval(interval);
//         connection.removeEventListener("change", handleConnectionChange);
//       };
//     } else {
//       // Cleanup interval only if no connection object exists
//       return () => clearInterval(interval);
//     }
//   }, [checkNetworkSpeed, checkConnectionType]);

//   return (
//     <div className={styles.container}>
//       <div className={styles.topbar}>
//         <div className={styles.greatings}>
//           <span>
//             {role === "admin" ? "welcome back, boss" : "welcome back,"}
//           </span>
//           <p>{user}</p>
//         </div>

//         <div className={styles.searcharea}>
//           <div className={styles.search}>
//             <Searchbar />
//           </div>

//           <div className={styles.notification}>
//             <Profile user={user} />
//             <div className={styles.bell}>
//               <div className={styles.icon}>
//                 <FontAwesomeIcon icon={faBell} />
//               </div>
//               <span>6</span>
//             </div>
//           </div>

//           <div className={styles.networkInfo}>
//             {/* Display network connection type and speed */}
//             <span>Connection Type: {connectionType || "Unknown"}</span>
//             <span>Network Speed: {networkSpeed || "Unknown"}</span>
//           </div>

//           {/* <div className={styles.profile}> */}
//           {/* Your profile component can be added here */}
//           {/* </div> */}

//           {/* <Calendar /> */}
//         </div>
//       </div>

//       <div className={styles.grid}>
//         <div className={styles.right}></div>
//         <div className={styles.left}></div>
//       </div>
//     </div>
//   );
// };

// export default Topbar;
