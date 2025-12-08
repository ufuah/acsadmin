"use clent"


import React, { useEffect, useState } from "react";
import useStore from "../../useStore/Store";
import styles from "./StockList.module.css";
import CurrencyFormatter from "@/src/utils/currency/Currency";
import useLoad from "../../hooks/useLoad";
import SlideBtn from "../../utils/customeBtn/SlideBtn"

const StockList = () => {
  const { stocks, fetchStocks, filteredStocks, setFilteredStocks } = useStore(
    (state) => ({
      stocks: state.stocks,
      fetchStocks: state.fetchStocks,
      filteredStocks: state.filteredStocks,
      setFilteredStocks: state.setFilteredStocks,
    })
  );

  const { deleteStock } = useLoad();

  // State for selected stocks
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state for delete button

  // Calculate the total closing value
  const totalClosingValue = filteredStocks.reduce((total, stock) => {
    return total + (stock.closing_value ?? 0);
  }, 0);

  // useEffect(() => {
  //   fetchStocks();
  // }, [fetchStocks]);


  useEffect(() => {
    // Fetch stocks on mount
    fetchStocks();

    // Poll for updates every 5 seconds (adjust as needed)
    const intervalId = setInterval(() => {
      fetchStocks();
    }, 5000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [fetchStocks]);

  useEffect(() => {
    // Filter stocks to include only those with 'day_to_day' record_type
    const dayToDayStocks = stocks.filter(
      (stock) => stock.record_type === "day_to_day"
    );
    setFilteredStocks(dayToDayStocks);
  }, [stocks, setFilteredStocks]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    // Conditionally load html2pdf.js on the client-side only
    if (typeof window !== "undefined") {
      const html2pdf = (await import("html2pdf.js")).default;
      const element = document.getElementById("printable-area");
      if (element) {
        html2pdf()
          .from(element)
          .set({
            margin: 1,
            filename: "stock-list.pdf",
            html2canvas: { scale: 2 },
            jsPDF: { orientation: "portrait" },
          })
          .save();
      }
    }
  };


  const handleSelectStock = (id) => {
    setSelectedStocks((prev) =>
      prev.includes(id) ? prev.filter((stockId) => stockId !== id) : [...prev, id]
    );
  };

  //   // Handle "Mark All" checkbox
  //   const handleSelectAll = () => {
  //     if (selectedStocks.length === filteredStocks.length) {
  //       setSelectedStocks([]);
  //     } else {
  //       setSelectedStocks(filteredStocks.map((stock) => stock.id));
  //     }
  //   };


  //   // Handle delete action for selected stocks
  // const handleDeleteSelected = async () => {
  //   try {
  //     // Iterate over selectedStocks and delete each one based on the description
  //     for (const description of selectedStocks) {
  //       await deleteStock(description); // Pass description to deleteStock
  //     }
  //     setSelectedStocks([]); // Clear selection after deletion
  //   } catch (error) {
  //     console.error("Failed to delete selected stocks:", error);
  //   }
  // };


  // // Handle "Mark All" checkbox
  // const handleSelectAll = () => {
  //   if (selectedStocks.length === filteredStocks.length) {
  //     setSelectedStocks([]); // Deselect all if everything is already selected
  //   } else {
  //     setSelectedStocks(filteredStocks.map((stock) => stock.id)); // Select all IDs from the filtered list
  //   }
  // };

  // // Handle delete action for selected stocks
  // const handleDeleteSelected = async () => {
  //   try {
  //     // Iterate over selectedStocks and delete each one based on the ID
  //     for (const id of selectedStocks) {
  //       await deleteStock(id); // Pass ID to deleteStock
  //     }
  //     setSelectedStocks([]); // Clear selection after deletion
  //     console.log("Selected stocks deleted successfully.");
  //   } catch (error) {
  //     console.error("Failed to delete selected stocks:", error);
  //   }
  // };


  // Handle "Mark All" checkbox
  const handleSelectAll = () => {
    if (selectedStocks.length === filteredStocks.length) {
      setSelectedStocks([]); // Deselect all if everything is already selected
    } else {
      setSelectedStocks(filteredStocks.map((stock) => stock.id)); // Select all IDs from the filtered list
    }
  };

  // Handle delete action for selected stocks
  // const handleDeleteSelected = async () => {
  //   try {
  //     if (selectedStocks.length > 0) {
  //       // Iterate over selectedStocks and delete each one based on the ID
  //       for (const id of selectedStocks) {
  //         await deleteStock(id); // Pass ID to deleteStock
  //       }
  //       setSelectedStocks([]); // Clear selection after deletion
  //       console.log("Selected stocks deleted successfully.");
  //     } else {
  //       console.log("No stocks selected for deletion.");
  //     }
  //   } catch (error) {
  //     console.error("Failed to delete selected stocks:", error);
  //   }
  // };

  // const handleDeleteSelected = async () => {
  //   try {
  //     if (selectedStocks.length === 0) {
  //       console.warn("No stocks selected for deletion");
  //       return;
  //     }

  //     // Pass all selected stock IDs to the deleteStock function
  //     await deleteStock(selectedStocks);
  //     setSelectedStocks([]); // Clear selection after deletion
  //     console.log("Selected stocks deleted successfully");
  //   } catch (error) {
  //     console.error("Failed to delete selected stocks:", error);
  //   }
  // };

  const handleDeleteSelected = async () => {
    try {
      if (selectedStocks.length === 0) {
        console.warn("No stocks selected for deletion");
        return;
      }

      // Start loading state
      setLoading(true);

      // Perform the deletion on the backend
      await deleteStock(selectedStocks);

      // Filter out deleted items from the state (UI update)
      const updatedStocks = filteredStocks.filter(
        (stock) => !selectedStocks.includes(stock.id)
      );
      setFilteredStocks(updatedStocks); // Update the filteredStocks state

      setSelectedStocks([]); // Clear selection after deletion
      console.log("Selected stocks deleted successfully");
    } catch (error) {
      console.error("Failed to delete selected stocks:", error);
    } finally {
      // Stop loading state
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Stock Management</h1>
      <div className={styles.buttonContainer}>
        <button onClick={handleDownloadPDF} className={styles.button}>
          Download PDF
        </button>
        <button onClick={handlePrint} className={styles.button}>
          Print
        </button>
        <button
          onClick={handleDeleteSelected}
          className={`${styles.button} ${selectedStocks.length === 0 ? styles.disabled : ""}`}
          disabled={selectedStocks.length === 0 || loading} // Disable if loading
        >
          {loading ? (
            <div className={styles.spinner}></div> // Show spinner inside button when loading
          ) : (
            "Delete Selected" // Show text when not loading
          )}
        </button>
      </div>
      <div id="printable-area" className={styles.table_container}>
        <div className={styles.stock_hearding}>
          <span>water collector</span>
        </div>
        {filteredStocks.length > 0 ? (
          <>
            <table className={styles.tableContainer}>
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={selectedStocks.length === filteredStocks.length}
                    />
                  </th>
                  <th>Description</th>
                  <th>Opening Qty</th>
                  <th>Purchase Qty</th>
                  <th>Exchange Qty</th>
                  <th>Return Qty</th>
                  <th>Standard Price</th>
                  <th>Closing Stock</th>
                  <th>Closing Value</th>
                </tr>
              </thead>
              <tbody>
                {filteredStocks.map((stock) => (
                  <tr key={stock.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedStocks.includes(stock.id)}
                        onChange={() => handleSelectStock(stock.id)}
                      />
                    </td>
                    <td>{stock.description}</td>
                    <td>{stock.opening_qty}</td>
                    <td>{stock.purchase_qty}</td>
                    <td>{stock.exchange_qty ?? 0}</td>
                    <td>{stock.return_qty ?? 0}</td>
                    <td>{stock.standard_price}</td>
                    {/* <td>{stock.closing_stock ?? 0}</td>
                  <td>{stock.closing_value ?? 0}</td> */}
                    <td>
                      {stock.closing_stock ?? 0}
                      {stock.closing_stock < 200 && (
                        <span className={styles.dot}></span>
                      )}
                    </td>
                    <td>
                      <CurrencyFormatter amount={stock.closing_value ?? 0} />
                      {/* {stock.closing_value ?? 0} */}
                      {stock.closing_value < 200 && (
                        <span className={styles.dot}></span>
                      )}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={3} className={styles.totalLabel}>
                    Total Closing Value
                  </td>
                  <td>
                    <CurrencyFormatter amount={totalClosingValue} />
                  </td>
                </tr>
                {/* <td className={styles.totalContainer}>
                  Total Closing Value: {totalClosingValue.toFixed(2)}
                </td> */}
              </tbody>
            </table>
          </>
        ) : (
          <p>No stock data available.</p>
        )}
      </div>

      <div id="printable-area" className={styles.table_container}>
        <div className={styles.stock_hearding}>
          <span>roofing</span>
        </div>
        {filteredStocks.length > 0 ? (
          <>
            <table className={styles.tableContainer}>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Opening Qty</th>
                  <th>Purchase Qty</th>
                  <th>Exchange Qty</th>
                  <th>Return Qty</th>
                  <th>Standard Price</th>
                  <th>Closing Stock</th>
                  <th>Closing Value</th>
                </tr>
              </thead>
              <tbody>
                {filteredStocks.map((stock) => (
                  <tr key={stock.id}>
                    <td>{stock.description}</td>
                    <td>{stock.opening_qty}</td>
                    <td>{stock.purchase_qty}</td>
                    <td>{stock.exchange_qty ?? 0}</td>
                    <td>{stock.return_qty ?? 0}</td>
                    <td>{stock.standard_price}</td>
                    {/* <td>{stock.closing_stock ?? 0}</td>
                  <td>{stock.closing_value ?? 0}</td> */}
                    <td>
                      {stock.closing_stock ?? 0}
                      {stock.closing_stock < 200 && (
                        <span className={styles.dot}></span>
                      )}
                    </td>
                    <td>
                      {stock.closing_value ?? 0}
                      {stock.closing_value < 200 && (
                        <span className={styles.dot}></span>
                      )}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={3} className={styles.totalLabel}>
                    Total Closing Value
                  </td>
                  <td>
                    <CurrencyFormatter amount={totalClosingValue} />
                  </td>
                </tr>
                {/* <td className={styles.totalContainer}>
                  Total Closing Value: {totalClosingValue.toFixed(2)}
                </td> */}
              </tbody>
            </table>
          </>
        ) : (
          <p>No stock data available.</p>
        )}
      </div>
    </div>
  );
};

export default StockList;
