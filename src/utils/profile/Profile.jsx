import React from "react";
import logo from "../../../public/logo.png";
import styles from "./profile.module.css";
import Image from "next/image";

const Profile = ({user}) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.img}>
          <Image src={logo} alt="profile" />
        </div>

        {/* <div className={styles.greatings}>
          <span>
            {user?.role === "admin" ? "welcome back, boss" : "welcome back,"}
          </span>
          <p>{user?.username}</p>
        </div> */}

      </div>
    </div>
  );
};

export default Profile;
