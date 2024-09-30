"use client"



import React, { useState } from "react";
import Styles from "./searchbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBox = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchQuery(newValue);
    onSearch(newValue); // Pass the current query to the parent component
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <form className={Styles.searchbar} onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Enter the tracking number or ID"
        value={searchQuery}
        onChange={handleInputChange}
        required
      />
      <button type="submit" className={Styles.submit}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </form>
  );
};

export default SearchBox;
