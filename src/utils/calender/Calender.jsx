"use client"

import React, { useEffect, useRef, useState } from "react";
import "./Calendar.css"; // Ensure the CSS file name matches

import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css"; // Theme CSS file
import { addDays } from "date-fns";

const Calendar = ({setDateRange}) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const [showDatePicker, setShowDatePicker] = useState(false);

  const dateRangeRef = useRef(null);

  const handleInputClick = () => {
    setShowDatePicker(true);
  };

  const handleClickOutside = (event) => {
    if (dateRangeRef.current && !dateRangeRef.current.contains(event.target)) {
      setShowDatePicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDateChange = (item) => {
    setState([item.selection]);
    setDateRange({
      startDate: item.selection.startDate,
      endDate: item.selection.endDate,
    });
  };

  console.log(showDatePicker);

  return (
    <div
      className={`order_wrapper ${!showDatePicker ? "hide_order_range" : ""}`}
      ref={dateRangeRef}
      onClick={handleInputClick}
    >
      <DateRangePicker
        editableDateInputs={true}
        onChange={handleDateChange}
        moveRangOnFirstSelection={false}
        ranges={state}
        showMonthAndYearPickers={false}
      />
    </div>
  );
};

export default Calendar;
