import React from "react";

const Sales_Management = ({}) => {
  const groupedOrders = useMemo(() => {
    const salesData = searchResults.length > 0 ? searchResults : filteredSales;
    return salesData.reduce((acc, order) => {
      if (!acc[order.customer_name]) {
        acc[order.customer_name] = {};
      }
      if (!acc[order.customer_name][order.sales_id]) {
        acc[order.customer_name][order.sales_id] = {
          orders: [],
          totalAmount: 0,
          totalPaid: 0,
          status: order.status,
          suppliedBy: order.supplied_by || "",
          customerImage: order.customer_image || logo,
          orderId: order.sales_id,
          date: order.date,
          methodOfPayment: order.bank_or_pos,
        };
      }
      acc[order.customer_name][order.sales_id].orders.push(order);
      acc[order.customer_name][order.sales_id].totalAmount += order.amount_paid;
      acc[order.customer_name][order.sales_id].totalPaid += order.amount_paid;
      return acc;
    }, {});
  }, [searchResults, filteredSales]);
  return (
    <div className="sales-section">
      <h2>Sales</h2>
      {Object.keys(groupedOrders).length > 0 ? (
        Object.keys(groupedOrders).map((customerName) => (
          <div key={customerName} className="customer-section">
            {Object.keys(groupedOrders[customerName]).map((salesId) => (
              <div key={salesId} className="sales-section">
                <div
                  className="customer-header"
                  onClick={() => toggleCustomerDetails(customerName, salesId)}
                >
                  <div className="pictureBox">
                    <div className="box_sort">
                      <div className="brandsales">
                        <Image
                          src={
                            groupedOrders[customerName][salesId].customerImage
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
                        {groupedOrders[customerName][salesId].transaction_type}
                      </span>
                    </div>
                  </div>

                  <div className="customer-info">
                    <div className="left">
                      <div className="orderid">
                        <p>Order ID:</p>
                        <div className="order-id">
                          <span>
                            {groupedOrders[customerName][
                              salesId
                            ].orderId?.substring(0, 8)}
                          </span>
                          <FontAwesomeIcon
                            icon={faCopy}
                            onClick={() =>
                              handleCopyOrderId(
                                groupedOrders[customerName][salesId].orderId
                              )
                            }
                          />
                        </div>
                      </div>

                      <div className="status-dropdown">
                        <select
                          value={groupedOrders[customerName][salesId].status}
                          onChange={(e) => {
                            handleStatusChange(
                              customerName,
                              groupedOrders[customerName][salesId],
                              e.target.value,
                              selectedSupplier // Pass the supplier value
                            );
                          }}
                        >
                          <option value="pending">Pending</option>
                          <option value="supplied">Supplied</option>
                        </select>
                      </div>

                      {groupedOrders[customerName][salesId].status !==
                        "supplied" && ( // Check the status
                        <div className="formField">
                          <label htmlFor="supplied_by" className="label">
                            Supplied By
                          </label>
                          <select
                            name="supplied_by"
                            id="supplied_by"
                            value={selectedSupplier} // The supplier value you are managing in state
                            onChange={(e) =>
                              setSelectedSupplier(e.target.value)
                            } // Handle the change event
                            className="input"
                            required
                          >
                            <option value="">Select a supplier</option>
                            <option value="Cyprian">Cyprian</option>
                            <option value="Stelle">Stelle</option>
                            <option value="Juliana">Juliana</option>
                            <option value="Comfort">Comfort</option>
                          </select>
                        </div>
                      )}

                      <div className="supplied_">
                        <span>Supplied by:</span>
                        <p>{groupedOrders[customerName][salesId].suppliedBy}</p>
                      </div>

                      <div
                        className="print"
                        onClick={() => handlePrintBySalesId(salesId)}
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
                              groupedOrders[customerName][salesId].totalAmount
                            }
                          />
                        </p>
                        <p>
                          Amount Paid:
                          <CurrencyFormatter
                            amount={
                              groupedOrders[customerName][salesId].totalPaid
                            }
                          />
                        </p>

                        <p>
                          Date:
                          {formatDate(
                            groupedOrders[customerName][salesId].date
                          )}
                        </p>
                        <p>
                          Payment Method:
                          {groupedOrders[customerName][salesId].methodOfPayment}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {expandedCustomer === `${customerName}-${salesId}` && (
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
                        {groupedOrders[customerName][salesId]?.orders.map(
                          (order, index) => (
                            <tr key={index}>
                              <td>{order.item}</td>
                              <td>
                                <CurrencyFormatter
                                  amount={order.amount_per_item}
                                />
                              </td>
                              <td>{order.quantity_purchased}</td>
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

export default Sales_Management;
