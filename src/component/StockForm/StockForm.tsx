
"use client";

import React, { useState, useEffect, useCallback } from "react";
import useStore from "../../useStore/Store";
import styles from "./StockForm.module.css";

// Define Stock interface
interface Stock {
  id?: number;
  description: string;
  opening_qty: number;
  purchase_qty: number;
  exchange_qty?: number;
  return_qty?: number;
  standard_price: number;
  closing_stock: number;
  closing_value: number;
  category: string; // Added category field
}

// Define StockFormProps interface
interface StockFormProps {
  stock: Stock | null;
  onSuccess: () => void;
  existingStocks?: Stock[];
}

const StockForm: React.FC<StockFormProps> = ({ stock, onSuccess, existingStocks }) => {
  const { saveStock, fetchStockByDescription, updateStock, addStock } = useStore();

  const [formData, setFormData] = useState<Partial<Stock>>({
    description: "",
    opening_qty: 0,
    purchase_qty: 0,
    exchange_qty: 0,
    return_qty: 0,
    standard_price: 0,
    closing_stock: 0,
    closing_value: 0,
    category: "", // Initialize category
  });
  const [selectedStockId, setSelectedStockId] = useState<number | "">("");
  const [error, setError] = useState<string | null>(null);
  const [debouncedDescription, setDebouncedDescription] = useState(formData.description || "");

  useEffect(() => {
    if (stock) {
      setFormData({
        id: stock.id,
        description: stock.description || "",
        opening_qty: stock.opening_qty,
        purchase_qty: stock.purchase_qty,
        exchange_qty: stock.exchange_qty || 0,
        return_qty: stock.return_qty || 0,
        standard_price: stock.standard_price,
        closing_stock: stock.closing_stock,
        closing_value: stock.closing_value,
        category: stock.category || "", // Set category from the stock prop
      });
      setSelectedStockId(stock.id || "");
    }
  }, [stock]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedDescription(formData.description || "");
    }, 500); // 500ms debounce delay

    return () => clearTimeout(handler);
  }, [formData.description]);

  // Memoize fetchStockByDescription using useCallback
  const memoizedFetchStockByDescription = useCallback(async (description: string) => {
    return await fetchStockByDescription(description);
  }, [fetchStockByDescription]);

   // Fetch stock by debounced description
   useEffect(() => {
    const fetchStock = async () => {
      if (debouncedDescription.trim()) {
        try {
          const fetchedStock = await memoizedFetchStockByDescription(debouncedDescription.trim());
          if (fetchedStock) {
            setFormData((prevData) => ({
              ...prevData,
              ...fetchedStock,
            }));
            setSelectedStockId(fetchedStock.id!);
          }
        } catch (error) {
          setError("Error fetching stock. Please check console for details.");
        }
      }
    };

    fetchStock();
  }, [debouncedDescription, memoizedFetchStockByDescription]); // Include memoizedFetchStockByDescription in dependencies


  // useEffect(() => {
  //   const fetchStock = async () => {
  //     if (debouncedDescription.trim()) {
  //       try {
  //         const fetchedStock = await fetchStockByDescription(debouncedDescription.trim());
  //         if (fetchedStock) {
  //           setFormData((prevData) => ({
  //             ...prevData,
  //             ...fetchedStock,
  //           }));
  //           setSelectedStockId(fetchedStock.id!);
  //         }
  //       } catch (error) {
  //         setError("Error fetching stock. Please check console for details.");
  //       }
  //     }
  //   };

  //   fetchStock();
  // }, [debouncedDescription]);

  // useEffect(() => {
  //   const fetchStock = async () => {
  //     if (debouncedDescription.trim()) {
  //       try {
  //         const fetchedStock = await fetchStockByDescription(debouncedDescription.trim());
  //         if (fetchedStock) {
  //           setFormData((prevData) => ({
  //             ...prevData,
  //             ...fetchedStock,
  //           }));
  //           setSelectedStockId(fetchedStock.id!);
  //         }
  //       } catch (error) {
  //         setError("Error fetching stock. Please check console for details.");
  //       }
  //     }
  //   };
  
  //   fetchStock();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [debouncedDescription]); // Do not include fetchStockByDescription in this case
  


  useEffect(() => {
    const calculatedClosingValue = (formData.closing_stock || 0) * (formData.standard_price || 0);
    setFormData((prevData) => ({
      ...prevData,
      closing_value: calculatedClosingValue,
    }));
  }, [formData.closing_stock, formData.standard_price]);

  useEffect(() => {
    if (formData.description === "") {
      resetForm();
    }
  }, [formData.description]);

  const resetForm = () => {
    setFormData({
      description: "",
      opening_qty: 0,
      purchase_qty: 0,
      exchange_qty: 0,
      return_qty: 0,
      standard_price: 0,
      closing_stock: 0,
      closing_value: 0,
      category: "", // Reset category
    });
    setSelectedStockId("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "purchase_qty") {
      const purchaseQty = Number(value);
      const newClosingStock = (formData.opening_qty || 0) + purchaseQty;

      setFormData((prevData) => ({
        ...prevData,
        purchase_qty: purchaseQty,
        closing_stock: newClosingStock,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(e.target.value);
    setSelectedStockId(selectedId);

    if (selectedId && existingStocks) {
      const selectedStock = existingStocks.find((s) => s.id === selectedId);
      if (selectedStock) {
        setFormData({
          id: selectedStock.id,
          description: selectedStock.description,
          opening_qty: selectedStock.opening_qty,
          purchase_qty: selectedStock.purchase_qty,
          exchange_qty: selectedStock.exchange_qty || 0,
          return_qty: selectedStock.return_qty || 0,
          standard_price: selectedStock.standard_price,
          closing_stock: selectedStock.closing_stock,
          closing_value: selectedStock.closing_value,
          category: selectedStock.category || "", // Set category from the selected stock
        });
      }
    } else {
      resetForm();
    }
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError(null);

  //   const dataToSubmit = {
  //     ...formData,
  //     opening_qty: formData.opening_qty!,
  //     purchase_qty: formData.purchase_qty!,
  //     exchange_qty: formData.exchange_qty!,
  //     return_qty: formData.return_qty!,
  //     standard_price: formData.standard_price!,
  //     closing_stock: formData.closing_stock!,
  //     closing_value: formData.closing_value!,
  //     category: formData.category!, // Pass category to backend
  //   };

  //   try {
  //     await saveStock(dataToSubmit, selectedStockId);
  //     resetForm();
  //     onSuccess();
  //   } catch (error) {
  //     setError("Failed to submit stock. Please try again.");
  //   }
  // };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const dataToSubmit = {
      ...formData,
      opening_qty: formData.opening_qty!,
      purchase_qty: formData.purchase_qty!,
      exchange_qty: formData.exchange_qty!,
      return_qty: formData.return_qty!,
      standard_price: formData.standard_price!,
      closing_stock: formData.closing_stock!,
      closing_value: formData.closing_value!,
      category: formData.category!, // Pass category to backend
    };

    try {
      if (selectedStockId) {
        // If there's a selectedStockId, update the stock
        await updateStock(dataToSubmit);
      } else {
        // If there's no selectedStockId, add a new stock
        await addStock(dataToSubmit);
      }
      resetForm();
      onSuccess();
    } catch (error) {
      setError("Failed to submit stock. Please try again.");
    }
  };
  return (
    <div className={styles.container}>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div className={styles.contents}>
        <h1>{selectedStockId ? "Update Stock" : "Add Stock"}</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Select Stock (Optional)</label>
            <select value={selectedStockId || ""} onChange={handleSelectChange}>
              <option value="">Add New Stock</option>
              {existingStocks?.map((stock) => (
                <option key={stock.id} value={stock.id}>
                  {stock.description}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              placeholder="Description"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Category</label>
            <select
              name="category"
              value={formData.category || ""}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="roofing">Roofing</option>
              <option value="water_collector">Water Collector</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Opening Quantity (Non-editable)</label>
            <input
              type="number"
              name="opening_qty"
              value={formData.opening_qty || ""}
              disabled
            />
          </div>

          <div className={styles.formGroup}>
            <label>Purchase Quantity</label>
            <input
              type="number"
              name="purchase_qty"
              value={formData.purchase_qty || ""}
              onChange={handleChange}
              placeholder="Purchase Quantity"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Standard Price</label>
            <input
              type="number"
              name="standard_price"
              value={formData.standard_price || ""}
              onChange={handleChange}
              placeholder="Standard Price"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Closing Stock (Auto-calculated)</label>
            <input
              type="number"
              name="closing_stock"
              value={formData.closing_stock || ""}
              disabled
            />
          </div>

          <div className={styles.formGroup}>
            <label>Closing Value (Auto-calculated)</label>
            <input
              type="number"
              name="closing_value"
              value={formData.closing_value || 0}
              disabled
            />
          </div>

          <button className={styles.upload_btn} type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default StockForm;
