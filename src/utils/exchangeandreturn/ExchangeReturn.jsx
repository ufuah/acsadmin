"use client"

import React, { useState } from 'react';
import useStore from '../../useStore/Store';
import styles from "./AddTransaction.module.css";

const ExchangeReturn = () => {
  const { stocks, updateStock } = useStore((state) => ({
    stocks: state.stocks,
    updateStock: state.updateStock,
  }));

  const [returnItems, setReturnItems] = useState([{ item: '', qty: 0 }]);
  const [exchangeItems, setExchangeItems] = useState([{ item: '', qty: 0 }]);

  const handleReturnChange = (index, field, value) => {
    const newReturnItems = [...returnItems];
    newReturnItems[index][field] = value;
    setReturnItems(newReturnItems);
  };

  const handleExchangeChange = (index, field, value) => {
    const newExchangeItems = [...exchangeItems];
    newExchangeItems[index][field] = value;
    setExchangeItems(newExchangeItems);
  };

  const addReturnItem = () => {
    setReturnItems([...returnItems, { item: '', qty: 0 }]);
  };

  const addExchangeItem = () => {
    setExchangeItems([...exchangeItems, { item: '', qty: 0 }]);
  };

  const handleReturnSubmit = () => {
    returnItems.forEach(({ item, qty }) => {
      const stockItem = stocks.find((stock) => stock.description === item);
      if (stockItem) {
        updateStock(stockItem.id, stockItem.closing_stock + qty);
      }
    });
  };

  const handleExchangeSubmit = () => {
    exchangeItems.forEach(({ item, qty }) => {
      const stockItem = stocks.find((stock) => stock.description === item);
      if (stockItem) {
        updateStock(stockItem.id, stockItem.closing_stock - qty);
      }
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.returnSection}>
        <h2>Return Items</h2>
        {returnItems.map((returnItem, index) => (
          <div key={index} className={styles.formGroup}>
            <label htmlFor={`returnItem-${index}`}>Item to Return</label>
            <select
              id={`returnItem-${index}`}
              value={returnItem.item}
              onChange={(e) => handleReturnChange(index, 'item', e.target.value)}
            >
              <option value="">Select Item</option>
              {stocks.map((stock) => (
                <option key={stock.id} value={stock.description}>
                  {stock.description}
                </option>
              ))}
            </select>
            <label htmlFor={`returnQty-${index}`}>Quantity</label>
            <input
              id={`returnQty-${index}`}
              type="number"
              value={returnItem.qty}
              onChange={(e) => handleReturnChange(index, 'qty', parseInt(e.target.value))}
            />
          </div>
        ))}
        <button onClick={addReturnItem} className={styles.button}>
          Add Another Return Item
        </button>
        <button onClick={handleReturnSubmit} className={styles.button}>
          Submit Returned Items
        </button>
      </div>

      <div className={styles.exchangeSection}>
        <h2>Exchange Items</h2>
        {exchangeItems.map((exchangeItem, index) => (
          <div key={index} className={styles.formGroup}>
            <label htmlFor={`exchangeItem-${index}`}>Item to Exchange</label>
            <select
              id={`exchangeItem-${index}`}
              value={exchangeItem.item}
              onChange={(e) => handleExchangeChange(index, 'item', e.target.value)}
            >
              <option value="">Select Item</option>
              {stocks.map((stock) => (
                <option key={stock.id} value={stock.description}>
                  {stock.description}
                </option>
              ))}
            </select>
            <label htmlFor={`exchangeQty-${index}`}>Quantity</label>
            <input
              id={`exchangeQty-${index}`}
              type="number"
              value={exchangeItem.qty}
              onChange={(e) => handleExchangeChange(index, 'qty', parseInt(e.target.value))}
            />
          </div>
        ))}
        <button onClick={addExchangeItem} className={styles.button}>
          Add Another Exchange Item
        </button>
        <button onClick={handleExchangeSubmit} className={styles.button}>
          Submit Exchanged Items
        </button>
      </div>
    </div>
  );
};

export default ExchangeReturn;
