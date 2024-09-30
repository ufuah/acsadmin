import React from "react";
import img from "../../../public/profile_pic.jpg";
import styles from "./profile.module.css";
import Image from "next/image";

const Profile = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.img}>
          <Image src={img} alt="profile" />
        </div>

        <span>hi,scott</span>
      </div>
    </div>
  );
};

export default Profile;
