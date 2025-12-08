import React from "react";
import Card from "./Card/Card";
import styles from './barchart.module.css'
const BarChart = () => {
  return (
    <div className={styles.container}>
      <Card
        colors={["#e4e8ef", "#475be8"]}
        percentFillValue={80}
        cardInfo={{
          title: "Todays sales",
          value: "70k",
          text: "we have sold 200 items.",
        }}
      />
      <Card
        colors={["#e4e8ef", "#4ce13f"]}
        percentFillValue={50}
        cardInfo={{
          title: "Todays Revenue",
          value: "8k",
          text: "Available to payout",
        }}
      />
      <Card
        colors={["#e4e8ef", "#f29a2e"]}
        percentFillValue={40}
        cardInfo={{
          title: "In Escrow",
          value: "20k",
          text: "Available to payout",
        }}
      />
    </div>
  );
};

export default BarChart;
