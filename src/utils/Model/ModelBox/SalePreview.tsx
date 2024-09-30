import React, { forwardRef } from "react";
import styles from "./SalePreview.module.css";
import CurrencyFormatter from "../../currency/Currency";

// Define the SaleItem interface
interface SaleItem {
  item: string;
  amount_per_item: number;
  quantity_purchased: number;
  total_value: number;
}

// Define the prop types for SalePreview
interface SalePreviewProps {
  items: SaleItem[];
  totalSaleValue: number;
  onClose: () => void;
}

// Use forwardRef to accept a ref, and define the props with SalePreviewProps
const SalePreview = forwardRef<HTMLDivElement, SalePreviewProps>(
  ({ items, totalSaleValue, onClose }) => {
    return (
      <div className={styles.container}>
        <h2 className={styles.header}>Sales Preview</h2>
        <div className={styles.table_container}>
          <div className={styles.tableContainer}>
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Amount Per Item</th>
                  <th>Quantity Purchased</th>
                  <th>Total Value</th>
                </tr>
              </thead>
              <tbody>
                {items.length > 0 ? (
                  items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.item}</td>
                      <td>
                        <CurrencyFormatter amount={item.amount_per_item} />
                      </td>
                      <td>{item.quantity_purchased}</td>
                      <td>
                        <CurrencyFormatter amount={item.total_value} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4}>No items to display</td>
                  </tr>
                )}
                <tr>
                  <td colSpan={3} className={styles.totalLabel}>
                    Total Sale Value
                  </td>
                  <td>
                    <CurrencyFormatter amount={totalSaleValue} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <button onClick={onClose} className={styles.additem}>
          Close
        </button>
      </div>
    );
  }
);

export default SalePreview;
