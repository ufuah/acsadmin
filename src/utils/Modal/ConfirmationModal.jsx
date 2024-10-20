import React from "react";
import styles from "./confirmationModal.module.css";
import CurrencyFormatter from "../currency/Currency";
; // Ensure to import this if you haven't

const ConfirmationModal = ({ 
    message, 
    onConfirm, 
    onCancel, 
    customer, 
    returnItems, 
    exchangeItems, 
    returnTotal, 
    exchangeTotal, 
    balanceMessage 
}) => {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modal}>
          <h3 className={styles.heading}>{message}</h3>
          
          <h4 className={styles.heading}>Customer Details</h4>
          <p>Name: {customer.customer_name}</p>
          <p>Contact: {customer.number}</p>

          <h4 className={styles.heading}>Return Items</h4>
          <table className={styles.table}>
              <thead>
                <tr className={styles.tr}>
                  <th className={styles.th}>Item</th>
                  <th className={styles.th}>Amount per Item</th>
                  <th className={styles.th}>Quantity</th>
                  <th className={styles.th}>Total</th>
                </tr>
              </thead>
              <tbody>
                {returnItems.length > 0 ? (
                  returnItems.map((item, index) => (
                    <tr key={index} className={styles.tr}>
                      <td className={styles.td}>{item.item}</td>
                      <td className={styles.td}>
                        <div className={styles.price}>
                          <div className={styles.amount}>
                            <span>
                              <CurrencyFormatter amount={item.amount_per_item} />
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className={styles.td}>{item.qty}</td>
                      <td className={styles.td}>
                        <p className={styles.brand}>
                          {/* {item.qty * item.amount_per_item} */}
                          <CurrencyFormatter amount={item.qty * item.amount_per_item} />
                        </p>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4}>No items to display</td>
                  </tr>
                )}
              </tbody>
            </table>

          {exchangeItems.length > 0 && (
            <>
              <h4 className={styles.heading}>Exchange Items</h4>
              <table className={styles.table}>
                <thead>
                  <tr className={styles.tr}>
                    <th className={styles.th}>Item</th>
                    <th className={styles.th}>Amount per Item</th>
                    <th className={styles.th}>Quantity</th>
                    <th className={styles.th}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {exchangeItems.map((item, index) => (
                    <tr key={index} className={styles.tr}>
                      <td className={styles.td}>{item.item}</td>
                      <td className={styles.td}>
                        <div className={styles.price}>
                          <div className={styles.amount}>
                            <span>
                              <CurrencyFormatter amount={item.amount_per_item} />
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className={styles.td}>{item.qty}</td>
                      <td className={styles.td}>
                        <p className={styles.brand}>
                          {/* {item.qty * item.amount_per_item} */}
                          <CurrencyFormatter amount={item.qty * item.amount_per_item} />
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {returnTotal > 0 && <p>Total Return:<CurrencyFormatter amount={returnTotal} /></p>}
          {exchangeTotal > 0 && <p>Total Exchange: <CurrencyFormatter amount={exchangeTotal} /></p>}
          
          <h4 className={styles.heading}>Balance</h4>
          <p>{balanceMessage}</p>

          <div className={styles.modalButtons}>
            <button className={styles.confirmButton} onClick={onConfirm}>Confirm</button>
            <button className={styles.cancelButton} onClick={onCancel}>Cancel</button>
          </div>
        </div>
      </div>
    );
};

export default ConfirmationModal;
