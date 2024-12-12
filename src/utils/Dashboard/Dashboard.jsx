"use clent"



import React, { useContext } from "react";
import styles from "./dashboard.module.css";
// import { BtnContext } from "@/Context/ThemeContext";
import Doughnutchart from "../Charts/Doughnutchart/Doughnutchart";
import Linechart from "../Charts/Linechart/Linechart";
import GroupedStackedBarChart from "../Charts/GroupedStackedBarChart/GroupedStackedBarChart";
import TopSection from "./Top_Section/Top_section";
import { BtnContext } from "../../Context/ThemeContext";
// import { BtnContext } from "@/src/Context/BtnContext";

const Overviews = () => {
  const { analysis, setAnalysis } = useContext(BtnContext);
  return (
    <div
      className={styles.dashboard}>
      <TopSection />
      <div className={styles.container}>
        {/* <div className={styles.content}>
       
      </div> */}

        <div className={styles.report}>
          {/* <AreaCard/>
          <Chart/> */}

          <div className={styles.graftbuilds}>
            <div className={styles.chart}>
              <Doughnutchart />
            </div>

            <div className={styles.chart2}>
              <Linechart />
            </div>
          </div>

          <div className={styles.extra_contents}></div>
        </div>

        <div className={styles.spaceinfo}>
          <div className={styles.rating}>
            <div className={styles.count}>
              <div className={styles.sells}>
                <div className={styles.amount}>
                  <span>40,000</span>
                </div>
              </div>
              <div className={styles.box}>
                <div className={styles.space}>
                  <span>profit made</span>
                </div>
                <div className={styles.chartdown}>
                  <GroupedStackedBarChart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overviews;
