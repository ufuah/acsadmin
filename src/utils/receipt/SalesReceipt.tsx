"use client"

import React, { forwardRef, Ref } from "react";
import "./salesreceipt.css";
import CurrencyFormatter from "../../utils/currency/Currency";
import Image from "next/image";
import logo from "../../../public/logo2.jpg";
import { format, parse } from "date-fns";

// Define the SaleItem interface
interface SaleItem {
  item: string;
  amount_per_item: number;
  quantity_purchased: number;
  total_value: number;
}

// Define the props for the SalesReceipt component
interface SalesReceiptProps {
  items: SaleItem[];
  date: string;
  brand: string;
  name: string;
  number: string;
  status: string;
  suppliedBy: string;
  totalSaleValue: number;
  currentSalesId: string;
}

// ForwardRef component for SalesReceipt
const SalesReceipt = forwardRef<HTMLDivElement, SalesReceiptProps>(
 
  (
    {
      items,
      date,
      name,
      number,
      brand,
      totalSaleValue,
      currentSalesId,
      status,
      suppliedBy,
    },
    ref
  ) => {
    const now = new Date(); // Get the current date
    const formattedDate = format(now, "dd/MM/yyyy"); // "16/09/2024"
    console.log("Current Sales ID:", currentSalesId);
    const shortSalesId = currentSalesId ? currentSalesId.substring(0, 8) : null;
    return (
      <div className="container_receipt" ref={ref}>
        <div className="order-details_receipt">
          <div className="brandarea">
            <h2 className="receiptTitle">Receipt</h2>
            <div className="logo">
              <Image src={logo} alt="Logo" />
            </div>
            <div className="address">
              <p>
                along sepele road, country home junction, (inside noma family
                filling station) benin edo state.
              </p>
            </div>
            <div className="number">
              <p>07059144319</p>
              <p>07032495118</p>
            </div>
          </div>

          <div className="receipt_details">
            <h2>Receipt Info</h2>
            <div className="item">
              <p>Sales ID:</p>
              <p>{shortSalesId}</p>
            </div>
            <div className="item">
              <p>Date:</p>
              <p>{date}</p>
            </div>
            <div className="item">
              <p>Brand:</p>
              <p>{brand}</p>
            </div>

            
            <div className="item">
              <p>Status:</p>
              <p>{status}</p>
            </div>

            {status === "supplied" && (
              <div className="item">
                <p>Supplied by:</p>
                <p>{suppliedBy}</p>{" "}
                {/* Make sure you have 'suppliedBy' defined */}
              </div>
            )}
          </div>

          <div className="customer_info">
            <h3>Customer Info</h3>
            <div className="item">
              <p>Customer Name:</p>
              <p>{name}</p>
            </div>

            <div className="item">
              <p>Contact:</p>
              <p>{number}</p>
            </div>

          </div>

          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Amount per Item</th>
                <th>Quantity</th>
                <th>total</th>
              </tr>
            </thead>
            <tbody>
              {items?.length > 0 ? (
                items?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.item}</td>
                    <td>
                      <div className="price">
                        <div className="amount">
                          <span>
                            <CurrencyFormatter amount={item.amount_per_item} />
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>{item.quantity_purchased}</td>
                    <td>
                      <p className="brand">
                        {item.quantity_purchased * item.amount_per_item}
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

          <div className="total_value">
            <td colSpan={3} className="totalLabel">
              <p>Total Sale Value</p>
            </td>
            <td>
              <p>
                <CurrencyFormatter amount={totalSaleValue} />
              </p>
            </td>
          </div>

          <div className="space">
            <div className="sign_r">
              <p className="line"></p>
              <p>customer signature</p>
            </div>

            <div className="sign_l">
              <div className="line"></div>
              <p>manager signature</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

// Set display name for the component
SalesReceipt.displayName = "SalesReceipt";

export default SalesReceipt;
