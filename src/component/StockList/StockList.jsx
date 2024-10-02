"use clent"


import React, { useEffect } from "react";
import useStore from "../../useStore/Store";
import styles from "./StockList.module.css";
import CurrencyFormatter from "@/src/utils/currency/Currency";

const StockList = () => {
  const { stocks, fetchStocks, filteredStocks, setFilteredStocks } = useStore(
    (state) => ({
      stocks: state.stocks,
      fetchStocks: state.fetchStocks,
      filteredStocks: state.filteredStocks,
      setFilteredStocks: state.setFilteredStocks,
    })
  );

  // Calculate the total closing value
  const totalClosingValue = filteredStocks.reduce((total, stock) => {
    return total + (stock.closing_value ?? 0);
  }, 0);

  useEffect(() => {
    fetchStocks();
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
