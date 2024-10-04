import React, { useMemo } from "react";

const Exchange_Comp = ({filteredSales,searchResults}) => {
    const groupedExchangeOrders = useMemo(() => {
        const data = searchResults.length > 0 ? searchResults : filteredSales;
        return data
          .filter((order) => order.transaction_type === "exchanges")
          .reduce((acc, order) => {
            if (!acc[order.customer_name]) {
              acc[order.customer_name] = {};
            }
            if (!acc[order.customer_name][order.exchange_id]) {
              acc[order.customer_name][order.exchange_id] = {
                orders: [],
                totalAmount: 0,
                totalPaid: 0,
                customerImage: order.customer_image || logo,
                orderId: order.exchange_id,
                date: order.date,
              };
            }
            acc[order.customer_name][order.exchange_id].orders.push(order);
            acc[order.customer_name][order.exchange_id].totalAmount += order.amount_paid;
            acc[order.customer_name][order.exchange_id].totalPaid += order.amount_paid;
            return acc;
          }, {});
      }, [searchResults, filteredSales]);
  return (
    <div className="returns-section">
      <h2>Returns</h2>
      {Object.keys(groupedExchangeOrders).length > 0 ? (
        Object.keys(groupedExchangeOrders).map((customerName) => (
          <div key={customerName} className="customer-section">
            {Object.keys(groupedExchangeOrders[customerName]).map((salesId) => (
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
                            groupedExchangeOrders[customerName][salesId].customerImage
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
                        {groupedExchangeOrders[customerName][salesId].transaction_type}
                      </span>
                    </div>
                  </div>

                  <div className="customer-info">
                    <div className="left">
                      <div className="orderid">
                        <p>Return ID:</p>
                        <div className="order-id">
                          <span>
                            {groupedExchangeOrders[customerName][
                              salesId
                            ].orderId?.substring(0, 8)}
                          </span>
                          <FontAwesomeIcon
                            icon={faCopy}
                            onClick={() =>
                              handleCopyOrderId(
                                groupedExchangeOrders[customerName][salesId].orderId
                              )
                            }
                          />
                        </div>
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
                              groupedExchangeOrders[customerName][salesId].totalAmount
                            }
                          />
                        </p>
                        <p>
                          Amount Paid:
                          <CurrencyFormatter
                            amount={
                              groupedExchangeOrders[customerName][salesId].totalPaid
                            }
                          />
                        </p>

                        <p>
                          Date:
                          {formatDate(
                            groupedExchangeOrders[customerName][salesId].date
                          )}
                        </p>
                        <p>
                          Payment Method:
                          {groupedExchangeOrders[customerName][salesId].methodOfPayment}
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
                        {groupedExchangeOrders[customerName][salesId]?.orders.map(
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

export default Exchange_Comp;
