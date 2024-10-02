"use client"


import Image from "next/image";
import styles from "./topbar.module.css";
import Calendar from "../calender/Calender";
import Searchbar from "../searchExtr/searchbar";
import Profile from "../profile/Profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import useStore from "../../useStore/Store";

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

          <Calendar />
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
