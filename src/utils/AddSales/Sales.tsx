"use client";

import { useState, useEffect, ChangeEvent, FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import useStore from "../../useStore/Store";
import styles from "./AddSales.module.css";
import CurrencyFormatter from "../../utils/currency/Currency";
import SalePreview from "../Model/ModelBox/SalePreview"; // Import the SalePreview component
import SalesReceipt from "../../utils/receipt/SalesReceipt"; // Import the SalePreview component
import { useReactToPrint } from "react-to-print"; // Import useReactToPrint
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { format, parse } from "date-fns";

// Import notification hooks and component
import useNotifications from "../Middlewares/Notifications/UseNotifications"; // Assuming the file location
import Notification from "../Middlewares/Notifications/notification/Notification"; // Assuming the file location

interface SaleItem {
  item: string;
  amount_per_item: number;
  quantity_purchased: number;
  total_value: number;
}


interface FormState {
  date: string;
  customer_name: string;
  brand: string;
  bank_or_pos: string;
  supplied_by: string;
  status: string;
  number: string;
  items: SaleItem[];
  total_sale_value: number;
}

interface StockItem {
  id: number;
  description: string;
  record_type: string;
  category: string;
}

export default function AddSale() {
  // const now = new Date(); // Get the current date
  // const formattedDate = now.toISOString().split("T")[0]; // Format to YYYY-MM-DD


  const now = new Date();
  // const formattedDate = format(now, "dd/MM/yyyy"); // "16/09/2024"
  // const formattedDate = format(now, "dd-MM-yyyy"); // e.g., "02-10-2024"
  const formattedDate = format(now, "yyyy-MM-dd"); // "2024-10-02"

  const { stocks, fetchStocks, addSale, currentSalesId, getCustomerDetails } =
    useStore((state) => ({
      stocks: state.stocks,
      fetchStocks: state.fetchStocks,
      addSale: state.addSale,
      currentSalesId: state.currentSalesId,
      getCustomerDetails: state.getCustomerDetails,
    }));

  const initialFormState: FormState = {
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

  const [form, setForm] = useState<FormState>(initialFormState);
  const [showPreview, setShowPreview] = useState(false);
  const [filteredStocks, setFilteredStocks] = useState<StockItem[]>([]);
  const [statusOptions, setStatusOptions] = useState<string[]>([]);
  const [category, setCategory] = useState("roofing");
  const printRef = useRef(null);
  const router = useRouter();

  const { notification, showNotification } = useNotifications(); // Use the notification hook

  useEffect(() => {
    fetchStocks();
  }, [fetchStocks]);

  useEffect(() => {
    const dayToDayStocks = stocks.filter(
      (stock: StockItem) => stock.record_type === "day_to_day"
    );
    setFilteredStocks(dayToDayStocks);
    setStatusOptions(["pending", "supplied"]);
  }, [stocks]);

  useEffect(() => {
    const dayToDayStocks = stocks.filter(
      (stock: StockItem) =>
        stock.record_type === "day_to_day" && stock.category === category
    );
    setFilteredStocks(dayToDayStocks);
  }, [stocks, category]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index?: number
  ) => {
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
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const handleCustomerChange = async (field: string, value: string) => {
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
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = form.items.filter((_, i) => i !== index);
    setForm((prevForm) => ({
      ...prevForm,
      items: updatedItems,
      total_sale_value: updatedItems.reduce(
        (sum, item) => sum + item.total_value,
        0
      ),
    }));
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

  const handleSubmit = async (e: FormEvent) => {
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

    try {
      const response = await addSale(form);

      if (response.error) {
        showNotification(response.error, "error");
      } else {
        showNotification(response.message, "success");
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
    }
  };

  return (
    <div className={styles.container}>
      {/* {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>} */}
      {/* Display the notification */}
      <Notification notification={notification} />

      {/* Error message display */}
      <form className={styles.form}>
        <div className={styles.userbox}>
          <div className={styles.top}>
            <h1 className={styles.title}>Add Sale</h1>

            <div className={styles.category}>
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

              {/* <select
                className={styles.category_select}
                onChange={handleCategoryChange}
              >
                <option value="all">All Categories</option>
                <option value="roofing">Roofing</option>
                <option value="water_collector">Water collector</option>
              </select> */}
            </div>
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
              {form.status === "supplied" && (
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
      <button
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
      >
        Submit Sale
      </button>
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
