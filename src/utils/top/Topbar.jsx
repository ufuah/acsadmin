import Image from "next/image";
import styles from "./topbar.module.css";
import Calendar from "../calender/Calender";
import Searchbar from "../searchExtr/searchbar";
import Profile from "../profile/Profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const Topbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.topbar}>
        <div className={styles.greatings}>
          <span>welcome back,</span>
          <p>scott</p>
        </div>

        <div className={styles.searcharea}>
          <div className={styles.search}>
            <Searchbar />
          </div>

          <div className={styles.notification}>
            <Profile />
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
