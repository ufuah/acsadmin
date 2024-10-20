"use client";

import React, { useState, useEffect, useRef } from "react";
import useStore from "../../useStore/Store";
import styles from "./exchange.module.css";
import CurrencyFormatter from "../currency/Currency";
import Receipt from "../../utils/receipt/Receipt";
import { useReactToPrint } from "react-to-print";
import { format, parse } from "date-fns";
import ConfirmationModal from "../Modal/ConfirmationModal";

const ReturnExchange = () => {
  const {
    stocks,
    fetchStocks,
    addReturn,
    addExchange,
    getCustomerDetails,
    returnId, // Include returnId for direct access
    exchangeId, // Include exchangeId for direct access
  } = useStore((state) => ({
    stocks: state.stocks,
    addReturn: state.addReturn,
    addExchange: state.addExchange,
    fetchStocks: state.fetchStocks,
    getCustomerDetails: state.getCustomerDetails,
    returnId: state.returnId, // Access returnId from the store after return is added
    exchangeId: state.exchangeId, // Access exchangeId from the store after exchange is added
    // updateStock: state.updateStock, // Add this if you need stock updates later
  }));

  console.log("Return ID:", returnId);
  console.log("Exchange ID:", exchangeId);

  // const formatDate = (date) => {
  //   return date.toLocaleDateString('en-GB', {
  //     day: '2-digit',
  //     month: 'long',
  //     year: 'numeric'
  //   });
  // };

  const now = new Date();
  const formattedDate = format(now, "dd/MM/yyyy"); // "16/09/2024"

  const parsedDate = parse("16/09/2024", "dd/MM/yyyy", new Date());

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const [customer, setCustomer] = useState({
    customer_name: "",
    number: "",
    date: formattedDate,
  });
  const [returnItems, setReturnItems] = useState([
    { item: "", qty: "", amount_per_item: "" },
  ]);
  const [exchangeItems, setExchangeItems] = useState([
    { item: "", qty: "", amount_per_item: "" },
  ]);
  const [returnTotal, setReturnTotal] = useState(0);
  const [exchangeTotal, setExchangeTotal] = useState(0);
  const [balanceMessage, setBalanceMessage] = useState("");
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [errors, setErrors] = useState({});
  const [category, setCategory] = useState("all");

  // const receiptRef = useRef(null);

  const receiptRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => receiptRef.current, // Refers to the SalePreview component
  });
  console.log(stocks);
  useEffect(() => {
    fetchStocks();
  }, [fetchStocks]);

  useEffect(() => {
    const dayToDayStocks = stocks.filter(
      (stock) => stock.record_type === "day_to_day"
    );
    setFilteredStocks(dayToDayStocks);
  }, [stocks]);

  useEffect(() => {
    const totalReturnValue = returnItems.reduce(
      (total, item) =>
        total +
        (parseFloat(item.qty) || 0) * (parseFloat(item.amount_per_item) || 0),
      0
    );
    setReturnTotal(totalReturnValue);

    const totalExchangeValue = exchangeItems.reduce(
      (total, item) =>
        total +
        (parseFloat(item.qty) || 0) * (parseFloat(item.amount_per_item) || 0),
      0
    );
    setExchangeTotal(totalExchangeValue);
  }, [returnItems, exchangeItems]);

  useEffect(() => {
    if (exchangeTotal > returnTotal) {
      const balanceAmount = (exchangeTotal - returnTotal).toFixed(2);
      setBalanceMessage(
        `${customer.customer_name} to balance ACS ROOFING with ${balanceAmount}.`
      );
    } else if (returnTotal > exchangeTotal) {
      const refundAmount = (returnTotal - exchangeTotal).toFixed(2);
      setBalanceMessage(
        `ACS ROOFING to refund ${customer.customer_name} ${refundAmount}.`
      );
    } else {
      setBalanceMessage(
        "No balance is needed; the exchange and return values are equal."
      );
    }
  }, [returnTotal, exchangeTotal, customer.customer_name]);

  // const handleCustomerChange = (field, value) => {
  //   setCustomer({ ...customer, [field]: value });
  // };

  const handleCustomerChange = async (field, value) => {
    setCustomer({ ...customer, [field]: value });

    if (field === "customer_name") {
      // Fetch customer details when the customer name is changed
      try {
        const details = await getCustomerDetails(value);
        if (details) {
          setCustomer((prev) => ({ ...prev, number: details.number }));
        }
      } catch (error) {
        console.error("Error fetching customer details:", error);
        // Do not set error state; allow backend to handle it
      }
    }
  };

  const handleCategoryChange = (event) => {
    const categoryValue = event.target.value;
    setCategory(categoryValue); // Update the category state

    // Logic to filter by category
    console.log("Category selected:", categoryValue);
  };

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
    setReturnItems([
      ...returnItems,
      { item: "", qty: "", amount_per_item: "" },
    ]);
  };

  const addExchangeItem = () => {
    setExchangeItems([
      ...exchangeItems,
      { item: "", qty: "", amount_per_item: "" },
    ]);
  };

  const removeReturnItem = (index) => {
    const newReturnItems = returnItems.filter((_, i) => i !== index);
    setReturnItems(newReturnItems);
  };

  const removeExchangeItem = (index) => {
    const newExchangeItems = exchangeItems.filter((_, i) => i !== index);
    setExchangeItems(newExchangeItems);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!customer.customer_name) {
      newErrors.customer_name = "Customer name is required";
    }
    if (!customer.number) {
      newErrors.number = "Customer contact is required";
    }

    returnItems.forEach((item, index) => {
      if (!item.item) {
        newErrors[`returnItem${index}`] = "Return item is required";
      }
      if (!item.qty || parseFloat(item.qty) <= 0) {
        newErrors[`returnQty${index}`] = "Valid quantity is required";
      }
      if (!item.amount_per_item || parseFloat(item.amount_per_item) <= 0) {
        newErrors[`returnAmount${index}`] = "Valid amount is required";
      }
    });

    exchangeItems.forEach((item, index) => {
      if (!item.item) {
        newErrors[`exchangeItem${index}`] = "Exchange item is required";
      }
      if (!item.qty || parseFloat(item.qty) <= 0) {
        newErrors[`exchangeQty${index}`] = "Valid quantity is required";
      }
      if (!item.amount_per_item || parseFloat(item.amount_per_item) <= 0) {
        newErrors[`exchangeAmount${index}`] = "Valid amount is required";
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = async () => {
  //   if (validateForm()) {
  //     try {
  //       // Add return data if there are return items
  //       if (returnItems.length > 0) {
  //         await addReturn({
  //           customer,
  //           items: returnItems,
  //           total: returnTotal,
  //         });
  //       }

  //       // Add exchange data if there are exchange items
  //       if (exchangeItems.length > 0) {
  //         await addExchange({
  //           customer,
  //           items: exchangeItems,
  //           total: exchangeTotal,
  //         });
  //       }

  //       // Clear the balance message
  //       // setBalanceMessage("");

  //       // Log customer and items data
  //       console.log("Customer Information:", customer);
  //       console.log("Return Items:", returnItems);
  //       console.log("Exchange Items:", exchangeItems);
  //       handlePrint();
  //     } catch (error) {
  //       console.error("Failed to process returns and/or exchanges:", error);
  //     }
  //   } else {
  //     console.log("Form validation failed");
  //   }
  // };

  // const handleSubmit = async () => {
  //   const isConfirmed = window.confirm("Are you sure you want to submit the return and exchange?");
  //   if (!isConfirmed) {
  //     return; // Exit if the user cancels
  //   }

  //   if (validateForm()) {
  //     try {
  //       // Add return data if there are return items
  //       if (returnItems.length > 0) {
  //         await addReturn({
  //           customer,
  //           items: returnItems,
  //           total: returnTotal,
  //         });
  //       }

  //       // Add exchange data if there are exchange items
  //       if (exchangeItems.length > 0) {
  //         await addExchange({
  //           customer,
  //           items: exchangeItems,
  //           total: exchangeTotal,
  //         });
  //       }

  //       console.log("Customer Information:", customer);
  //       console.log("Return Items:", returnItems);
  //       console.log("Exchange Items:", exchangeItems);
  //       handlePrint();
  //     } catch (error) {
  //       console.error("Failed to process returns and/or exchanges:", error);
  //     }
  //   } else {
  //     console.log("Form validation failed");
  //   }
  // };

  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async () => {
    setShowModal(true); // Show modal when submit is clicked
  };

  const handleConfirmSubmit = async () => {
    setShowModal(false); // Close modal after confirmation

    if (validateForm()) {
      try {
        // Add return data if there are return items
        if (returnItems.length > 0) {
          await addReturn({
            customer,
            items: returnItems,
            total: returnTotal,
          });
        }

        // Add exchange data if there are exchange items
        if (exchangeItems.length > 0) {
          await addExchange({
            customer,
            items: exchangeItems,
            total: exchangeTotal,
          });
        }
        // Clear the inputs after successful submission
        setCustomer({ customer_name: "", number: "", date: formattedDate });
        setReturnItems([{ item: "", qty: "", amount_per_item: "" }]);
        setExchangeItems([{ item: "", qty: "", amount_per_item: "" }]);
        setReturnTotal(0);
        setExchangeTotal(0);
        setBalanceMessage("");

        // Print the receipt
        handlePrint();

        // Log data (optional)
        console.log("Customer Information:", customer);
        console.log("Return Items:", returnItems);
        console.log("Exchange Items:", exchangeItems);
      } catch (error) {
        console.error("Failed to process returns and/or exchanges:", error);
      }
    } else {
      console.log("Form validation failed");
    }
  };

  const handleCancelSubmit = () => {
    setShowModal(false); // Close modal if user cancels
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1 className={styles.title}>Returns & Exchanges</h1>

        <div className={styles.category}>
          <span className={styles.category_label}>Category:</span>
          <select
            className={styles.category_select}
            onChange={handleCategoryChange}
          >
            <option value="all">All Categories</option>
            <option value="roofing">Roofing</option>
            <option value="water_collector">Water collector</option>
          </select>
        </div>
      </div>

      <div className={styles.form}>
        <div className={styles.usercontainer}>
          <div className={styles.userinputs}>
            <h2 className={styles.subtitle}>Customer Information</h2>
            <div className={styles.formField}>
              <label className={styles.label} htmlFor="customerName">
                Name
              </label>
              <input
                id="customerName"
                type="text"
                value={customer.customer_name}
                onChange={(e) =>
                  handleCustomerChange("customer_name", e.target.value)
                }
                placeholder="Enter customer name"
                className={styles.input}
              />
              {errors.customer_name && (
                <p className={styles.error}>{errors.customer_name}</p>
              )}
            </div>
            <div className={styles.formField}>
              <label className={styles.label} htmlFor="customerContact">
                Contact
              </label>
              <input
                id="customerContact"
                type="text"
                value={customer.number}
                onChange={(e) => handleCustomerChange("number", e.target.value)}
                placeholder="Enter contact details"
                className={styles.input}
              />
              {errors.number && <p className={styles.error}>{errors.number}</p>}
            </div>
            {/* 
            <div className={styles.formField}>
              <label className={styles.label} htmlFor="date">
                Date
              </label>
              <input
                type="date"
                id="date_of_return"
                value={customer.date}
                onChange={(e) => handleCustomerChange("date", e.target.value)}
                className={styles.input}
              />
            </div> */}
            <div className={styles.formField}>
              <label className={styles.label} htmlFor="date">
                Date
              </label>
              <input
                type="text"
                id="date_of_return"
                value={customer.date} // Display formatted date
                readOnly // Prevent user from changing the date
                className={styles.input}
              />
            </div>
          </div>
        </div>

        <div className={styles.userbox}>
          <div className={styles.userinputs}>
            <h2 className={styles.subtitle}>Return Items</h2>
            {returnItems.map((returnItem, index) => (
              <div key={index} className={styles.itembox}>
                <div className={styles.formField}>
                  <label
                    className={styles.label}
                    htmlFor={`returnItem-${index}`}
                  >
                    Item to Return
                  </label>
                  <select
                    id={`returnItem-${index}`}
                    value={returnItem.item}
                    onChange={(e) =>
                      handleReturnChange(index, "item", e.target.value)
                    }
                    className={styles.input}
                  >
                    <option value="">Select Item</option>
                    {filteredStocks.map((stock) => (
                      <option key={stock.id} value={stock.description}>
                        {stock.description}
                      </option>
                    ))}
                  </select>
                  {errors[`returnItem${index}`] && (
                    <p className={styles.error}>
                      {errors[`returnItem${index}`]}
                    </p>
                  )}
                </div>

                <div className={styles.inputGroup}>
                  <div className={styles.formField}>
                    <label
                      className={styles.label}
                      htmlFor={`returnQty-${index}`}
                    >
                      Quantity
                    </label>
                    <input
                      id={`returnQty-${index}`}
                      type="number"
                      value={returnItem.qty}
                      onChange={(e) =>
                        handleReturnChange(index, "qty", e.target.value)
                      }
                      placeholder="Enter quantity"
                      className={styles.input}
                    />
                    {errors[`returnQty${index}`] && (
                      <p className={styles.error}>
                        {errors[`returnQty${index}`]}
                      </p>
                    )}
                  </div>

                  <div className={styles.formField}>
                    <label
                      className={styles.label}
                      htmlFor={`returnAmount-${index}`}
                    >
                      Amount per Item ($)
                    </label>
                    <input
                      id={`returnAmount-${index}`}
                      type="number"
                      value={returnItem.amount_per_item}
                      onChange={(e) =>
                        handleReturnChange(
                          index,
                          "amount_per_item",
                          e.target.value
                        )
                      }
                      placeholder="Enter amount"
                      className={styles.input}
                    />
                    {errors[`returnAmount${index}`] && (
                      <p className={styles.error}>
                        {errors[`returnAmount${index}`]}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeReturnItem(index)}
                  className={styles.removeButton}
                >
                  Remove Item
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addReturnItem}
              className={styles.addButton}
            >
              Add Another Item
            </button>
          </div>
        </div>

        <div className={styles.userbox}>
          <div className={styles.userinputs}>
            <h2 className={styles.subtitle}>Exchange Items</h2>
            {exchangeItems.map((exchangeItem, index) => (
              <div key={index} className={styles.itembox}>
                <div className={styles.formField}>
                  <label
                    className={styles.label}
                    htmlFor={`exchangeItem-${index}`}
                  >
                    Item to Exchange
                  </label>
                  <select
                    id={`exchangeItem-${index}`}
                    value={exchangeItem.item}
                    onChange={(e) =>
                      handleExchangeChange(index, "item", e.target.value)
                    }
                    className={styles.input}
                  >
                    <option value="">Select Item</option>
                    {filteredStocks.map((stock) => (
                      <option key={stock.id} value={stock.description}>
                        {stock.description}
                      </option>
                    ))}
                  </select>
                  {errors[`exchangeItem${index}`] && (
                    <p className={styles.error}>
                      {errors[`exchangeItem${index}`]}
                    </p>
                  )}
                </div>

                <div className={styles.inputGroup}>
                  <div className={styles.formField}>
                    <label
                      className={styles.label}
                      htmlFor={`exchangeQty-${index}`}
                    >
                      Quantity
                    </label>
                    <input
                      id={`exchangeQty-${index}`}
                      type="number"
                      value={exchangeItem.qty}
                      onChange={(e) =>
                        handleExchangeChange(index, "qty", e.target.value)
                      }
                      placeholder="Enter quantity"
                      className={styles.input}
                    />
                    {errors[`exchangeQty${index}`] && (
                      <p className={styles.error}>
                        {errors[`exchangeQty${index}`]}
                      </p>
                    )}
                  </div>

                  <div className={styles.formField}>
                    <label
                      className={styles.label}
                      htmlFor={`exchangeAmount-${index}`}
                    >
                      Amount per Item ($)
                    </label>
                    <input
                      id={`exchangeAmount-${index}`}
                      type="number"
                      value={exchangeItem.amount_per_item}
                      onChange={(e) =>
                        handleExchangeChange(
                          index,
                          "amount_per_item",
                          e.target.value
                        )
                      }
                      placeholder="Enter amount"
                      className={styles.input}
                    />
                    {errors[`exchangeAmount${index}`] && (
                      <p className={styles.error}>
                        {errors[`exchangeAmount${index}`]}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeExchangeItem(index)}
                  className={styles.removeButton}
                >
                  Remove Item
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addExchangeItem}
              className={styles.addButton}
            >
              Add Another Item
            </button>
          </div>
        </div>
      </div>
      <div className={styles.balanceMessage}>{balanceMessage}</div>
      {/* <ReactToPrint
        trigger={() => (
         
        )}
        content={() => receiptRef.current}
      /> */}
      {/* <button onClick={handleSubmit} className={styles.printButton}>
        Print Receipt
      </button> */}
      <button
        type="button"
        onClick={handleSubmit}
        className={styles.submitButton}
      >
        Submit
      </button>

      <div style={{ display: "none" }}>
        <Receipt
          ref={receiptRef}
          customer={customer}
          returnItems={returnItems}
          exchangeItems={exchangeItems}
          returnTotal={returnTotal}
          exchangeTotal={exchangeTotal}
          balanceMessage={balanceMessage}
          returnId={returnId}
          exchangeId={exchangeId}
        />
      </div>
      {/* <Receipt
        customer={customer}
        returnItems={returnItems}
        exchangeItems={exchangeItems}
        returnTotal={returnTotal}
        exchangeTotal={exchangeTotal}
        balanceMessage={balanceMessage}
      /> */}

      {showModal && (
        <ConfirmationModal
        message="Are you sure you want to submit the return and exchange?"
        onConfirm={handleConfirmSubmit}
        onCancel={handleCancelSubmit}
        customer={customer} // Pass customer details
        returnItems={returnItems} // Pass return items
        exchangeItems={exchangeItems} // Pass exchange items
        returnTotal={returnTotal} // Pass return total
        exchangeTotal={exchangeTotal} // Pass exchange total
        balanceMessage={balanceMessage} // Pass balance message
        />
      )}
    </div>
  );
};

export default ReturnExchange;
