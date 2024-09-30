"use client";

import React, { useState, useEffect } from "react";
import useStore from "@/src/useStore/Store";
import StockForm from "@/src/component/StockForm/StockForm";
import Protected from "@/src/ProtectedRoute/Protected";
import LockRoute from "@/src/Lockprovider/LockProvider";

const StockManagementPage = () => {
  const [selectedStock, setSelectedStock] = useState(null);
  const { fetchStocks } = useStore();

  useEffect(() => {
    fetchStocks(); // Fetch stocks when the component mounts
  }, [fetchStocks]);

  const handleStockSelect = (stock) => {
    setSelectedStock(stock);
  };

  const handleStockUpdate = () => {
    setSelectedStock(null);
    fetchStocks(); // Refresh stock list after update
  };

  return (
    <div>
      <Protected>
        <LockRoute>
          <StockForm stock={selectedStock} onSuccess={handleStockUpdate} />
        </LockRoute>
      </Protected>
    </div>
  );
};

export default StockManagementPage;
