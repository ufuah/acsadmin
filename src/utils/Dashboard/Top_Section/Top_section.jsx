import React from "react";
import styles from "./Topsection.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleDown,
  faArrowDown,
  faArrowUp,
  faBiking,
  faBoxesPacking,
  faBus,
  faNairaSign,
  faShoppingBasket,
} from "@fortawesome/free-solid-svg-icons";

const TopSection = () => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.title}>
          <div className={styles.space}>
            <div className={styles.icon}>
                <FontAwesomeIcon icon={faShoppingBasket}/>
            </div>
            <span>orders</span>
          </div>
          <div className={styles.rate}>
            <div className={styles.icon}>
              <FontAwesomeIcon icon={faArrowDown} />
            </div>
            <div className={styles.percentage}>
              <span>-10%</span>
            </div>
          </div>
        </div>

        <div className={styles.figular}>
          <strong>320</strong>
        </div>

        <div className={styles.graph}></div>
      </div>

      <div className={styles.box}>
        <div className={styles.title}>
          <div className={styles.space}>
            <div className={styles.icon}>
                <FontAwesomeIcon icon={faNairaSign}/>
            </div>
            <span>total revenue</span>
          </div>
          <div className={styles.rate_raise}>
            <div className={styles.icon}>
              <FontAwesomeIcon icon={faArrowUp} />
            </div>
            <div className={styles.percentage}>
              <span>+30%</span>
            </div>
          </div>
        </div>

        <div className={styles.figular}>
          <strong>100k</strong>
        </div>

        <div className={styles.graph}></div>
      </div>

      <div className={styles.box}>
        <div className={styles.title}>
          <div className={styles.space}>
            <div className={styles.icon}>
                <FontAwesomeIcon icon={faShoppingBasket}/>
            </div>
            <span>orders</span>
          </div>
          <div className={styles.rate}>
            <div className={styles.icon}>
              <FontAwesomeIcon icon={faArrowDown} />
            </div>
            <div className={styles.percentage}>
              <span>-10%</span>
            </div>
          </div>
        </div>

        <div className={styles.figular}>
          <strong>67</strong>
        </div>

        <div className={styles.graph}></div>
      </div>

      <div className={styles.box}>
        <div className={styles.title}>
          <div className={styles.space}>
            <div className={styles.icon}>
                <FontAwesomeIcon icon={faBoxesPacking}/>
            </div>
            <span>delivery time</span>
          </div>
          <div className={styles.rate_raise}>
            <div className={styles.icon}>
              <FontAwesomeIcon icon={faArrowUp} />
            </div>
            <div className={styles.percentage}>
              <span>+50%</span>
            </div>
          </div>
        </div>

        <div className={styles.figular}>
          <strong>60%</strong>
        </div>

        <div className={styles.graph}></div>
      </div>

      <div className={styles.box}>
        <div className={styles.title}>
          <div className={styles.space}>
            <div className={styles.icon}>
                <FontAwesomeIcon icon={faBoxesPacking}/>
            </div>
            <span>delivery time</span>
          </div>
          <div className={styles.rate_raise}>
            <div className={styles.icon}>
              <FontAwesomeIcon icon={faArrowUp} />
            </div>
            <div className={styles.percentage}>
              <span>+50%</span>
            </div>
          </div>
        </div>

        <div className={styles.figular}>
          <strong>60%</strong>
        </div>

        <div className={styles.graph}></div>
      </div>


    </div>
  );
};

export default TopSection;
