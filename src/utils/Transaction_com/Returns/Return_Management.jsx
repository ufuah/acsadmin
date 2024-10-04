
"use client";

import { faCopy, faFilePdf, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addDays } from "date-fns";
import Image from "next/image";
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useReactToPrint } from "react-to-print";
import logo from "../../../public/logo2.jpg";
import CurrencyFormatter from "../../utils/currency/Currency";
import "./table.css"; // Ensure your CSS is updated


const Return_Management = ({filteredSales,searchResults}) => {
    const groupedReturnOrders = useMemo(() => {
        const data = searchResults.length > 0 ? searchResults : filteredSales;
        return data
          .filter((order) => order.transaction_type === "returns")
          .reduce((acc, order) => {
            if (!acc[order.customer_name]) {
              acc[order.customer_name] = {};
            }
            if (!acc[order.customer_name][order.return_id]) {
              acc[order.customer_name][order.return_id] = {
                orders: [],
                totalAmount: 0,
                totalPaid: 0,
                customerImage: order.customer_image || logo,
                orderId: order.return_id,
                date: order.date,
                methodOfPayment: order.bank_or_pos,
              };
            }
            acc[order.customer_name][order.return_id].orders.push(order);
            acc[order.customer_name][order.return_id].totalAmount += order.amount_paid;
            acc[order.customer_name][order.return_id].totalPaid += order.amount_paid;
            return acc;
          }, {});
      }, [searchResults, filteredSales]);
  return (
    <div className="returns-section">
      <h2>Returns</h2>
      {Object.keys(groupedReturnOrders).length > 0 ? (
        Object.keys(groupedReturnOrders).map((customerName) => (
          <div key={customerName} className="customer-section">
            {Object.keys(groupedReturnOrders[customerName]).map((returnId) => (
              <div key={returnId} className="sales-section">
                <div
                  className="customer-header"
                  onClick={() => toggleCustomerDetails(customerName, returnId)}
                >
                  <div className="pictureBox">
                    <div className="box_sort">
                      <div className="brandsales">
                        <Image
                          src={
                            groupedReturnOrders[customerName][returnId].customerImage
                          }
                          alt="customer"
                          width={50}
                          height={50}
                        />
                      </div>

                      <h3>{customerName}</h3>
                    </div>

                    <div className="type">
                      <p>transaction type:</p>
                      <span>
                        {groupedReturnOrders[customerName][returnId].transaction_type}
                      </span>
                    </div>
                  </div>

                  <div className="customer-info">
                    <div className="left">
                      <div className="orderid">
                        <p>Order ID:</p>
                        <div className="order-id">
                          <span>
                            {groupedReturnOrders[customerName][
                              returnId
                            ].orderId?.substring(0, 8)}
                          </span>
                          <FontAwesomeIcon
                            icon={faCopy}
                            onClick={() =>
                              handleCopyOrderId(
                                groupedReturnOrders[customerName][returnId].orderId
                              )
                            }
                          />
                        </div>
                      </div>

                    

                      <div
                        className="print"
                        onClick={() => handlePrintByreturnId(returnId)}
                      >
                        <FontAwesomeIcon icon={faFilePdf} />
                      </div>
                    </div>

                    <div className="right">
                      <div className="sumTotal">
                        <p>
                          Total Amount:
                          <CurrencyFormatter
                            amount={
                              groupedReturnOrders[customerName][returnId].totalAmount
                            }
                          />
                        </p>
                        <p>
                          Amount Paid:
                          <CurrencyFormatter
                            amount={
                              groupedReturnOrders[customerName][returnId].totalPaid
                            }
                          />
                        </p>

                        <p>
                          Date:
                          {formatDate(
                            groupedReturnOrders[customerName][returnId].date
                          )}
                        </p>
                        <p>
                          Payment Method:
                          {groupedReturnOrders[customerName][returnId].methodOfPayment}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {expandedCustomer === `${customerName}-${returnId}` && (
                  <div className="order-details">
                    <table>
                      <thead>
                        <tr>
                          <th>Item</th>
                          <th>Amount per Item</th>
                          <th>Quantity</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {groupedReturnOrders[customerName][returnId]?.orders.map(
                          (order, index) => (
                            <tr key={index}>
                              <td>{order.item}</td>
                              <td>
                                <CurrencyFormatter
                                  amount={order.amount_per_item}
                                />
                              </td>
                              <td>{order.quantity}</td>
                              <td>
                                <CurrencyFormatter amount={order.amount_paid} />
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>No sales data available</p>
      )}
    </div>
  );
};

export default Return_Management;
