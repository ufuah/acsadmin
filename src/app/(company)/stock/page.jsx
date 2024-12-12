"use client";

import StockList from "@/src/component/StockList/StockList";
import LockRoute from "@/src/Lockprovider/LockProvider";
import Protected from "@/src/ProtectedRoute/Protected";

import React, { useState } from "react";

const Stock = () => {
  const [selectedStock, setSelectedStock] = useState(null);
  const handleStockSelect = (stock) => {
    setSelectedStock(stock);
  };
  return (
    <div>
        <Protected allowedRoles={['admin', 'manager']}>
          <LockRoute>
            <StockList onSelect={handleStockSelect} />
          </LockRoute>
        </Protected>

    </div>
  );
};

export default Stock;
