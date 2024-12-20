"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import useStore from "../../useStore/Store";
import styles from "./AddSales.module.css";
import CurrencyFormatter from "../currency/Currency";
import SalePreview from "../Model/ModelBox/SalePreview"; // Import the SalePreview component
import SalesReceipt from "../receipt/SalesReceipt"; // Import the SalePreview component
import { useReactToPrint } from "react-to-print"; // Import useReactToPrint
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import { useNotification } from "@/src/Context/NotificationContext";

// Import notification hooks and component


export default function AddSale() {

  const now = new Date();
  const formattedDate = format(now, "yyyy-MM-dd"); // "2024-10-02"

  const { stocks, fetchStocks, addSale, currentSalesId, getCustomerDetails } =
    useStore((state) => ({
      stocks: state.stocks,
      fetchStocks: state.fetchStocks,
      addSale: state.addSale,
      currentSalesId: state.currentSalesId,
      getCustomerDetails: state.getCustomerDetails,
    }));

  const initialFormState = {
    date: formattedDate,
    customer_name: "",
    brand: "",
    bank_or_pos: "",
    supplied_by: "",
    status: "",
    number: "",
    items: [],
    total_sale_value: 0,
  };

  const [form, setForm] = useState(initialFormState);
  const [showPreview, setShowPreview] = useState(false);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [category, setCategory] = useState("roofing");
  const printRef = useRef(null);
  const router = useRouter();

  // New state to check if there are valid items
  const [itemsAreValid, setItemsAreValid] = useState(false);

  const { showNotification } = useNotification(); // Use the notification hook

  useEffect(() => {
    fetchStocks();
  }, [fetchStocks]);

  useEffect(() => {
    const dayToDayStocks = stocks.filter(
      (stock) => stock.record_type === "day_to_day"
    );
    setFilteredStocks(dayToDayStocks);
    setStatusOptions(["pending", "supplied"]);
  }, [stocks]);

  useEffect(() => {
    const dayToDayStocks = stocks.filter(
      (stock) =>
        stock.record_type === "day_to_day" && stock.category === category
    );
    setFilteredStocks(dayToDayStocks);
  }, [stocks, category]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    if (index !== undefined) {
      const updatedItems = [...form.items];
      updatedItems[index] = { ...updatedItems[index], [name]: value };

      if (name === "amount_per_item" || name === "quantity_purchased") {
        updatedItems[index].total_value =
          updatedItems[index].amount_per_item *
          updatedItems[index].quantity_purchased;
      }

      setForm((prevForm) => ({
        ...prevForm,
        items: updatedItems,
        total_sale_value: updatedItems.reduce(
          (sum, item) => sum + item.total_value,
          0
        ),
      }));

      // Check if items are valid after change
      checkItemsValidity(updatedItems);
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const handleCustomerChange = async (field, value) => {
    setForm((prevForm) => ({ ...prevForm, [field]: value })); // Update form state

    if (field === "customer_name") {
      try {
        const details = await getCustomerDetails(value);
        if (details) {
          setForm((prevForm) => ({ ...prevForm, number: details.number })); // Update number in form state
        }
      } catch (error) {
        console.error("Error fetching customer details:", error);
      }
    }
  };

  const handleAddItem = () => {
    setForm((prevForm) => ({
      ...prevForm,
      items: [
        ...prevForm.items,
        { item: "", amount_per_item: 0, quantity_purchased: 0, total_value: 0 },
      ],
    }));

    // Reset items validity after adding a new item
    setItemsAreValid(false);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = form.items.filter((_, i) => i !== index);
    setForm((prevForm) => ({
      ...prevForm,
      items: updatedItems,
      total_sale_value: updatedItems.reduce(
        (sum, item) => sum + item.total_value,
        0
      ),
    }));

    // Check if items are valid after removing an item
    checkItemsValidity(updatedItems);
  };

  const checkItemsValidity = (items) => {
    const isValid = items.every(
      (item) =>
        item.item !== "" &&
        item.amount_per_item > 0 &&
        item.quantity_purchased > 0
    );
    setItemsAreValid(isValid);
  };

  const handlePreview = () => {
    if (!form.date || !form.customer_name || form.items.length === 0) {
      showNotification(
        "Please fill in all required fields and add at least one item.",
        "error"
      );
    } else {
      setShowPreview(true);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.date ||
      !form.customer_name ||
      form.items.length === 0 ||
      form.items.some(
        (item) => item.amount_per_item <= 0 || item.quantity_purchased <= 0
      )
    ) {
      showNotification(
        "Please fill in all required fields and add valid item amounts.",
        "error"
      );
      return;
    }

    setIsLoading(true); // Set loading to true when submitting

    try {
      const response = await addSale(form);

      if (response.error) {
        showNotification(response.error, "error");
      } else {
        showNotification(response.message,"sales add success.", "success");
        setShowPreview(false);

        if (printRef.current) {
          handlePrint();
        }

        setForm(initialFormState);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";
      showNotification(errorMessage, "error");
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const [scrolled, setScrolled] = useState(false);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.container}>
      {/* {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>} */}
      {/* Display the notification */}
  

      {/* Error message display */}
      <form className={styles.form}>
        <div className={styles.userbox}>
          <div className={styles.top}>
            <h1 className={styles.title}>Add Sale</h1>
            {/* className={`${styles.category} ${
                scrolled ? styles.scrolled : ""
              }`} */}
            <div
              className={styles.category}
            >
              <span className={styles.category_label}>Category:</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={styles.category_select}
              >
                <option value="roofing">Roofing</option>
                <option value="water_collector">Water Collector</option>
                {/* Add more categories as needed */}
              </select>
            </div>

            {/* <div className={styles.category}>
              <span className={styles.category_label}>Category:</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={styles.category_select}
              >
                <option value="roofing">Roofing</option>
                <option value="water_collector">Water Collector</option>
              </select>

            </div> */}
          </div>

          <div className={styles.userinputs}>
            <div className={styles.inputGroup}>
              {/* <div className={styles.formField}>
                <label htmlFor="date" className={styles.label}>
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  value={form.date}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
                {form.date}
              </div> */}

              <div className={styles.formField}>
                <label htmlFor="date" className={styles.label}>
                  Date
                </label>
                <span className={styles.input}>
                  {form.date} {/* Display the formatted date */}
                </span>
              </div>

              <div className={styles.formField}>
                <label htmlFor="customer_name" className={styles.label}>
                  Customer Name
                </label>
                <input
                  type="text"
                  name="customer_name"
                  id="customer_name"
                  value={form.customer_name}
                  onChange={(e) =>
                    handleCustomerChange("customer_name", e.target.value)
                  } // Use handleCustomerChange
                  className={styles.input}
                  placeholder="Enter customer name"
                  required
                />
              </div>
              <div className={styles.formField}>
                <label htmlFor="number" className={styles.label}>
                  Phone Number
                </label>
                <input
                  type="text"
                  name="number"
                  id="number"
                  value={form.number}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Enter phone number"
                  required
                />
              </div>
            </div>
            <div className={styles.inputGroup}>
              <div className={styles.formField}>
                <label htmlFor="brand" className={styles.label}>
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  value={form.brand}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Enter brand"
                  required
                />
              </div>
              <div className={styles.formField}>
                <label htmlFor="bank_or_pos" className={styles.label}>
                  Bank/POS
                </label>
                <input
                  type="text"
                  name="bank_or_pos"
                  id="bank_or_pos"
                  value={form.bank_or_pos}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Enter bank or POS"
                  required
                />
              </div>
              {/* {form.status === "supplied" && (
                <div className={styles.formField}>
                  <label htmlFor="supplied_by" className={styles.label}>
                    Supplied By
                  </label>
                  <input
                    type="text"
                    name="supplied_by"
                    id="supplied_by"
                    value={form.supplied_by}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Enter supplier"
                    required
                  />
                </div>
              )} */}

              {form.status === "supplied" && (
                <div className={styles.formField}>
                  <label htmlFor="supplied_by" className={styles.label}>
                    Supplied By
                  </label>
                  <select
                    name="supplied_by"
                    id="supplied_by"
                    value={form.supplied_by}
                    onChange={handleChange}
                    className={styles.input}
                    required
                  >
                    <option value="">Select a supplier</option>
                    {/* Replace these with your actual supplier names */}
                    <option value="Cyprian">Cyprian</option>
                    <option value="Stelle">Stelle</option>
                    <option value="Juliana">Juliana</option>
                    <option value="Comfort">Comfort</option>
                  </select>
                </div>
              )}
            </div>
            <div className={styles.formField}>
              <label htmlFor="status" className={styles.label}>
                Status
              </label>
              <select
                name="status"
                id="status"
                value={form.status}
                onChange={handleChange}
                className={styles.input}
                required
              >
                <option value="">Select status</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className={styles.itembox}>
          <h2 className={styles.subtitle}>Items</h2>
          <div className={styles.itemscontainer}>
            {form.items.map((item, index) => (
              <div key={index} className={styles.itemCard}>
                <div className={styles.itemGroup}>
                  <div className={styles.formField}>
                    <label htmlFor={`item-${index}`} className={styles.label}>
                      Item
                    </label>
                    <select
                      name="item"
                      id={`item-${index}`}
                      value={item.item}
                      onChange={(e) => handleChange(e, index)}
                      className={styles.input}
                      required
                    >
                      <option value="">Select an item</option>
                      {filteredStocks.map((stock) => (
                        <option key={stock.id} value={stock.description}>
                          {stock.description}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.formField}>
                    <label
                      htmlFor={`amount_per_item-${index}`}
                      className={styles.label}
                    >
                      Amount Per Item
                    </label>
                    <input
                      type="number"
                      name="amount_per_item"
                      id={`amount_per_item-${index}`}
                      value={item.amount_per_item}
                      onChange={(e) => handleChange(e, index)}
                      className={styles.input}
                      placeholder="Enter amount per item"
                      required
                    />
                  </div>
                  <div className={styles.formField}>
                    <label
                      htmlFor={`quantity_purchased-${index}`}
                      className={styles.label}
                    >
                      Quantity Purchased
                    </label>
                    <input
                      type="number"
                      name="quantity_purchased"
                      id={`quantity_purchased-${index}`}
                      value={item.quantity_purchased}
                      onChange={(e) => handleChange(e, index)}
                      className={styles.input}
                      placeholder="Enter quantity purchased"
                      required
                    />
                  </div>
                </div>
                <div className={styles.itemValue}>
                  <span>Total Value:</span>{" "}
                  <span>
                    <CurrencyFormatter amount={item.total_value} />
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className={styles.removeButton}
                >
                  Remove Item
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddItem}
              className={styles.addButton}
            >
              Add Item
            </button>
          </div>
        </div>

        <div className={styles.totalbox}>
          <div className={styles.totalValue}>
            <span>Total Sale Value:</span>{" "}
            <span>
              <CurrencyFormatter amount={form.total_sale_value} />
            </span>
          </div>
        </div>
      </form>
      {/* <button
        type="button"
        onClick={handlePreview}
        className={styles.previewButton}
      >
        Preview Sale
      </button>
      <button
        type="submit"
        className={styles.submitButton}
        onClick={handleSubmit}
        disabled={isLoading} // Disable while loading
      >
        {isLoading ? "Submitting..." : "Submit Sale"}{" "}
      </button> */}
      {/* Conditionally render buttons based on items validity */}
      {itemsAreValid && (
        <div className={styles.buttonContainer}>
          <button
            type="button"
            onClick={handlePreview}
            className={styles.previewButton}
            aria-label="Preview Sale"
          >
            Preview
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className={styles.submitButton}
            disabled={isLoading}
            aria-label="Submit Sale"
          >
            {isLoading ? "Submitting..." : "Submit Sale"}
          </button>
        </div>
      )}

      {/* Optionally show a loading spinner */}
      {isLoading && <div className={styles.loadingSpinner}>Loading...</div>}
      {/* style={{ display: "none" }} */}
      <div style={{ display: "none" }}>
        <SalesReceipt
          ref={printRef} // Attach the ref to the SalePreview component
          items={form.items}
          date={form.date}
          brand={form.brand}
          name={form.customer_name}
          number={form.number}
          status={form.status}
          totalSaleValue={form.total_sale_value}
          currentSalesId={currentSalesId}
          suppliedBy={form.supplied_by}
          payment={form.bank_or_pos}
        />
      </div>
      {showPreview && (
        <div>
          <SalePreview
            items={form.items}
            totalSaleValue={form.total_sale_value}
            onClose={() => setShowPreview(false)}
          />
          <button
            type="button"
            onClick={handlePrint} // Trigger the print function
            className={styles.printButton}
          >
            <FontAwesomeIcon icon={faPrint} />
          </button>
        </div>
      )}
    </div>
  );
}
