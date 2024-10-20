"use client";

import React, { useState } from "react";
import style from './pagination.module.css'; // Import your CSS module

const Pagination = ({ orders }) => {
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [itemsPerPage, setItemsPerPage] = useState(10); // State for items per page

  const totalPages = Math.ceil(orders.length / itemsPerPage); // Calculate total pages

  // Calculate the orders for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);

  // Function to change page
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Function to handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page on items per page change
  };

  // Function to display ellipsis pagination for long page lists
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Limit the number of pages shown

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, currentPage + 2);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (startPage > 1) pageNumbers.unshift("...");
      if (endPage < totalPages) pageNumbers.push("...");
    }

    return pageNumbers.map((number, index) => (
      <button
        key={index}
        onClick={() => paginate(number === "..." ? currentPage : number)}
        className={currentPage === number ? style.active : ""}
        disabled={number === "..."}
      >
        {number}
      </button>
    ));
  };

  return (
    <div className={style.ordersContainer}>
   

      {/* Pagination Controls */}
      <div className={style.paginationControls}>
        <div className={style.itemsPerPage}>
          <label>Items per page: </label>
          <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        <div className={style.pagination}>
          <button onClick={() => paginate(1)} disabled={currentPage === 1}>
            First
          </button>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {/* Page Numbers */}
          {renderPageNumbers()}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
          <button
            onClick={() => paginate(totalPages)}
            disabled={currentPage === totalPages}
          >
            Last
          </button>
        </div>

        <div className={style.jumpToPage}>
          <label>Jump to page: </label>
          <input
            type="number"
            min="1"
            max={totalPages}
            value={currentPage}
            onChange={(e) => paginate(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
