import React, { useState } from "react";
import "./SlideBtn.css";

const SlideBtn = () => {
  const [clicked, setClicked] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [rangeValue, setRangeValue] = useState(0);

  const handleClick = () => {
    setClicked(true);
  };

  const handleRangeChange = (e) => {
    const value = Number(e.target.value);
    if (value < 80) {
      setRangeValue(0);
    } else {
      setRangeValue(100);
      setTimeout(() => {
        setConfirmed(true);
      }, 200);
    }
  };

  return (
    <div
      className={`btn ${clicked ? "clicked" : ""} ${
        confirmed ? "confirmed" : ""
      }`}
      onClick={!clicked ? handleClick : undefined}
    >
      {!clicked && <div className="outer">Buy now</div>}
      {!confirmed && (
        <div className="inner">
          <input
            type="range"
            min="0"
            max="100"
            value={rangeValue}
            onChange={handleRangeChange}
          />
          <p className="range-txt">Drag to confirm &gt;&gt;&gt;</p>
        </div>
      )}
      {confirmed && (
        <div className="final">
          <i className="fas fa-check"></i>
          <p>Confirmed</p>
        </div>
      )}
    </div>
  );
};

export default SlideBtn;
