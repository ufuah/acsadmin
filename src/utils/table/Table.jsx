"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faFilePdf,
  faNairaSign,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { generatePdf } from "../../utils/GeneratePdf/generatePdf";
import CurrencyFormatter from "../../utils/currency/Currency";
import UseNotifications from "../../utils/Middlewares/Notifications/UseNotifications";
import Notification from "../../utils/Middlewares/Notifications/notification/Notification";
import SearchBox from "../searchExtr/searchbar";
import useStore from "../../useStore/Store";
import "./table.css"; // Ensure your CSS is updated
import logo from "../../../public/logo2.jpg";
import SalesReceipt from "../receipt/SalesReceipt";
import { useReactToPrint } from "react-to-print";
import Calendar from "../calender/Calender";
import { addDays } from "date-fns";

const Table = () => {
  // const { notification, showNotification } = UseNotifications();
  // const [expandedCustomer, setExpandedCustomer] = useState(null);
  // const [filteredSales, setFilteredSales] = useState([]);
  // const [searchResults, setSearchResults] = useState([]);
  // const [filterStatus, setFilterStatus] = useState("all");
  // const [filterType, setFilterType] = useState("all");
  // const [category, setCategory] = useState("all");
  // const [selectedSale, setSelectedSale] = useState(null); // New state to store the selected sale
  // const [dateRange, setDateRange] = useState({
  //   startDate: new Date(),
  //   endDate: addDays(new Date(), 7),
  // });

  // const printRef = useRef(null);
  // const receiptRef = useRef({});

  // const { sales, fetchSales, updateSale, fetchSalesById } = useStore(
  //   (state) => ({
  //     sales: state.sales,
  //     fetchSales: state.fetchSales,
  //     updateSale: state.updateSale,
  //     fetchSaleById: state.fetchSaleById,
  //   })
  // );

  // // const { sales, fetchSales, fetchSalesById } = useStore((state) => ({
  // //   sales: state.sales,
  // //   fetchSales: state.fetchSales,
  // //   fetchSalesById: state.fetchSalesById,
  // // }));

  // const handlePrint = useReactToPrint({
  //   content: () => printRef.current,
  // });

  // const handlePrintBySalesId = async (salesId) => {
  //   try {
  //     // Ensure fetchSalesById is accessible
  //     const sale = await fetchSalesById(salesId);
  //     // If the sale is successfully fetched, proceed to print
  //     if (sale) {
  //       const ref = receiptRef.current[salesId];
  //       if (ref) {
  //         printRef.current = ref;
  //         handlePrint(); // Call the print function
  //         setSelectedSale(null); // Reset after print
  //       } else {
  //         console.error(`No print reference found for salesId: ${salesId}`);
  //       }
  //       showNotification("Sale data fetched successfully!", "success");
  //     } else {
  //       showNotification("Sale not found!", "error");
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch sale:", error);
  //     showNotification("Failed to fetch sale data!", "error");
  //   }
  // };

  // const toggleCustomerDetails = (customerName, salesId) => {
  //   setExpandedCustomer((prev) =>
  //     prev === `${customerName}-${salesId}`
  //       ? null
  //       : `${customerName}-${salesId}`
  //   );
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       await fetchSales();
  //       showNotification("Sales data fetched successfully!", "success");
  //     } catch (error) {
  //       console.error("Failed to fetch sales:", error);
  //       showNotification("Failed to fetch sales data!", "error");
  //     }
  //   };
  //   fetchData();
  // }, [fetchSales, showNotification]); // Add showNotification here

  // useEffect(() => {
  //   applyFilters();
  // }, [filterStatus, filterType, category, sales, applyFilters]); // Add applyFilters here

  // const applyFilters = () => {
  //   let filtered = [...sales]; // Start with full sales data

  //   // Console log current filter values
  //   console.log("Applying filters. Current filters:", {
  //     filterStatus,
  //     filterType,
  //     category,
  //     dateRange,
  //   });

  //   // Filter by status
  //   if (filterStatus !== "all") {
  //     filtered = filtered.filter((order) => order.status === filterStatus);
  //   }

  //   // Filter by type (sales, returns, exchange_and_return)
  //   if (filterType !== "all") {
  //     filtered = filtered.filter(
  //       (order) => order.transaction_type === filterType
  //     );
  //   }

  //   // Filter by category (roofing, water_collector, etc.)
  //   if (category !== "all") {
  //     filtered = filtered.filter((order) => order.category === category);
  //   }

  //   // Filter by date range
  //   if (dateRange.startDate && dateRange.endDate) {
  //     console.log("Filtering by date range:", dateRange);

  //     filtered = filtered.filter((order) => {
  //       const orderDate = new Date(order.date).setHours(0, 0, 0, 0); // Set time to 00:00:00
  //       const startDate = new Date(dateRange.startDate).setHours(0, 0, 0, 0); // Set time to 00:00:00
  //       const endDate = new Date(dateRange.endDate).setHours(23, 59, 59, 999); // Set time to the end of the day

  //       // Check if the order date is within the start and end date range
  //       const isWithinRange = orderDate >= startDate && orderDate <= endDate;
  //       console.log(`Order ${order.sales_id} is within range: ${isWithinRange}`);

  //       return isWithinRange;
  //     });
  //   }

  //   console.log("Filtered sales after applying all filters:", filtered);
  //   setFilteredSales(filtered);
  //   setSearchResults(filtered); // Also update search results when filters change
  // };

  // console.log(sales.transaction_type);

  // // Apply filters whenever filterStatus, filterType, or category changes
  // useEffect(() => {
  //   applyFilters();
  // }, [filterStatus, filterType, category, sales]);

  // // Group filtered sales by customer and salesId
  // const groupedOrders = useMemo(() => {
  //   const salesData = searchResults.length > 0 ? searchResults : filteredSales;

  //   return salesData.reduce((acc, order) => {
  //     if (!acc[order.customer_name]) {
  //       acc[order.customer_name] = {};
  //     }
  //     if (!acc[order.customer_name][order.sales_id]) {
  //       acc[order.customer_name][order.sales_id] = {
  //         orders: [],
  //         totalAmount: 0,
  //         totalPaid: 0,
  //         status: order.status,
  //         suppliedBy: order.supplied_by || "",
  //         customerImage: order.customer_image || logo,
  //         orderId: order.sales_id,
  //         date: order.date,
  //         methodOfPayment: order.bank_or_pos,
  //       };
  //     }
  //     acc[order.customer_name][order.sales_id].orders.push(order);
  //     acc[order.customer_name][order.sales_id].totalAmount += order.amount_paid;
  //     acc[order.customer_name][order.sales_id].totalPaid += order.amount_paid;
  //     return acc;
  //   }, {});
  // }, [searchResults, filteredSales]);

  // const handleFilterChange = (event) => {
  //   setFilterType(event.target.value); // Filter by sales, returns, etc.
  // };

  // const handleCategoryChange = (event) => {
  //   setCategory(event.target.value); // Filter by category
  // };

  // const handleCopyOrderId = (orderId) => {
  //   navigator.clipboard
  //     .writeText(orderId)
  //     .then(() =>
  //       showNotification(`Order ID ${orderId} copied to clipboard!`, "success")
  //     )
  //     .catch((err) => {
  //       console.error("Failed to copy: ", err);
  //       showNotification("Failed to copy Order ID!", "error");
  //     });
  // };

  // const handleStatusChange = async (customerName, salesId, newStatus) => {
  //   try {
  //     await updateSale(salesId, newStatus);
  //     await fetchSales(); // Refresh sales data
  //     showNotification("Sale status updated successfully!", "success");
  //   } catch (error) {
  //     console.error("Failed to update status:", error);
  //     showNotification("Failed to update sale status!", "error");
  //   }
  // };

  // const handleSearch = (query) => {
  //   if (query.trim() === "") {
  //     setSearchResults(filteredSales);
  //   } else {
  //     const filteredResults = filteredSales.filter(
  //       (order) =>
  //         order.sales_id.toString().includes(query.toLowerCase()) ||
  //         order.customer_name.toLowerCase().includes(query.toLowerCase())
  //     );
  //     setSearchResults(filteredResults);
  //   }
  // };

  // const formatDate = (dateString) => {
  //   const options = { year: "numeric", month: "long", day: "numeric" };
  //   const date = new Date(dateString);
  //   return date.toLocaleDateString(undefined, options);
  // };

  // // Handle status filtering via buttons
  // const filterSalesByStatus = (status) => {
  //   setFilterStatus(status); // Update status and trigger filtering
  // };

  const { notification, showNotification } = UseNotifications();
  const [expandedCustomer, setExpandedCustomer] = useState(null);
  const [filteredSales, setFilteredSales] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [category, setCategory] = useState("all");
  const [selectedSale, setSelectedSale] = useState(null);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
  });

  const printRef = useRef(null);
  const receiptRef = useRef({});

  const { sales, fetchSales, updateSale, fetchSalesById } = useStore(
    (state) => ({
      sales: state.sales,
      fetchSales: state.fetchSales,
      updateSale: state.updateSale,
      fetchSaleById: state.fetchSaleById,
    })
  );

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const handlePrintBySalesId = async (salesId) => {
    try {
      const sale = await fetchSalesById(salesId);
      if (sale) {
        const ref = receiptRef.current[salesId];
        if (ref) {
          printRef.current = ref;
          handlePrint();
          setSelectedSale(null);
        } else {
          console.error(`No print reference found for salesId: ${salesId}`);
        }
        showNotification("Sale data fetched successfully!", "success");
      } else {
        showNotification("Sale not found!", "error");
      }
    } catch (error) {
      console.error("Failed to fetch sale:", error);
      showNotification("Failed to fetch sale data!", "error");
    }
  };

  const toggleCustomerDetails = (customerName, salesId) => {
    setExpandedCustomer((prev) =>
      prev === `${customerName}-${salesId}`
        ? null
        : `${customerName}-${salesId}`
    );
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       await fetchSales();
  //       showNotification("Sales data fetched successfully!", "success");
  //     } catch (error) {
  //       console.error("Failed to fetch sales:", error);
  //       showNotification("Failed to fetch sales data!", "error");
  //     }
  //   };
  //   fetchData();
  // }, [fetchSales, showNotification]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchSales();
        showNotification("Sales data fetched successfully!", "success");
      } catch (error) {
        console.error("Failed to fetch sales:", error);
        showNotification("Failed to fetch sales data!", "error");
      }
    };
    fetchData();
  }, [fetchSales]);

  
  const applyFilters = useCallback(() => {
    let filtered = [...sales];

    if (filterStatus !== "all") {
      filtered = filtered.filter((order) => order.status === filterStatus);
    }

    if (filterType !== "all") {
      filtered = filtered.filter(
        (order) => order.transaction_type === filterType
      );
    }

    if (category !== "all") {
      filtered = filtered.filter((order) => order.category === category);
    }

    if (dateRange.startDate && dateRange.endDate) {
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.date).setHours(0, 0, 0, 0);
        const startDate = new Date(dateRange.startDate).setHours(0, 0, 0, 0);
        const endDate = new Date(dateRange.endDate).setHours(23, 59, 59, 999);

        return orderDate >= startDate && orderDate <= endDate;
      });
    }

    setFilteredSales(filtered);
    setSearchResults(filtered);
  }, [filterStatus, filterType, category, dateRange, sales]);

  useEffect(() => {
    applyFilters();
  }, [filterStatus, filterType, category, sales, dateRange, applyFilters]);

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

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleCopyOrderId = (orderId) => {
    navigator.clipboard
      .writeText(orderId)
      .then(() =>
        showNotification(`Order ID ${orderId} copied to clipboard!`, "success")
      )
      .catch((err) => {
        console.error("Failed to copy: ", err);
        showNotification("Failed to copy Order ID!", "error");
      });
  };

  const handleStatusChange = async (customerName, salesId, newStatus) => {
    try {
      await updateSale(salesId, newStatus);
      await fetchSales();
      showNotification("Sale status updated successfully!", "success");
    } catch (error) {
      console.error("Failed to update status:", error);
      showNotification("Failed to update sale status!", "error");
    }
  };

  const handleSearch = (query) => {
    if (query.trim() === "") {
      setSearchResults(filteredSales);
    } else {
      const filteredResults = filteredSales.filter(
        (order) =>
          order.sales_id.toString().includes(query.toLowerCase()) ||
          order.customer_name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredResults);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const filterSalesByStatus = (status) => {
    setFilterStatus(status);
  };

  return (
    <div className="container">
      <Notification notification={notification} />
      <div className="header_table">
        <span>Sales Management</span>
      </div>
      <div className="table_container">
        <div className="box_table">
          <div className="filt">
            <SearchBox onSearch={handleSearch} />
            <div className="seperate">
              <div className="sortby">
                <span className="sortby-label">Sort by:</span>
                <select className="sortby-select" onChange={handleFilterChange}>
                  <option value="all">All</option>
                  <option value="sales">Sales</option>
                  <option value="returns">Returns</option>
                  <option value="exchange_and_return">
                    Exchanges and Returns
                  </option>
                </select>
              </div>

              <div className="category">
                <span className="category-label">Category:</span>
                <select
                  className="category-select"
                  onChange={handleCategoryChange}
                >
                  <option value="all">All Categories</option>
                  <option value="roofing">Roofing</option>
                  <option value="water_collector">Water collector</option>
                </select>
              </div>
            </div>

            <div className="additem">
              <FontAwesomeIcon icon={faPlus} />
            </div>
            <div className="generate-pdf" onClick={() => generatePdf(sales)}>
              <FontAwesomeIcon icon={faFilePdf} />
              Generate PDF
            </div>

            <Calendar setDateRange={setDateRange} />
          </div>

          <div className="filter_buttons">
            <button
              onClick={() => filterSalesByStatus("all")}
              className={`btn_shift ${filterStatus === "all" ? "active" : ""}`}
            >
              All Sales
            </button>
            <button
              onClick={() => filterSalesByStatus("pending")}
              className={`btn_shift ${
                filterStatus === "pending" ? "active" : ""
              }`}
            >
              Pending Sales
            </button>
            <button
              onClick={() => filterSalesByStatus("supplied")}
              className={`btn_shift ${
                filterStatus === "supplied" ? "active" : ""
              }`}
            >
              Supplied Sales
            </button>
          </div>
        </div>

        <div className="table_body">
          {Object.keys(groupedOrders).length > 0 &&
            Object.keys(groupedOrders).map((customerName) => (
              <div key={customerName} className="customer-section">
                {Object.keys(groupedOrders[customerName]).map((salesId) => (
                  <div key={salesId} className="sales-section">
                    <div
                      className="customer-header"
                      onClick={() =>
                        toggleCustomerDetails(customerName, salesId)
                      }
                    >
                      <div className="pictureBox">
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

                      <div className="customer-info">
                        <div className="left">
                          <div className="orderid">
                            <p>Order ID:</p>
                            <div className="order-id">
                              <span>
                                {groupedOrders[customerName][
                                  salesId
                                ].orderId.substring(0, 8)}
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
                              value={
                                groupedOrders[customerName][salesId].status
                              }
                              onChange={(e) =>
                                handleStatusChange(
                                  customerName,
                                  groupedOrders[customerName][salesId].orderId,
                                  e.target.value
                                )
                              }
                            >
                              <option value="pending">Pending</option>
                              <option value="supplied">Supplied</option>
                            </select>
                          </div>

                          <div className="supplied_">
                            <span>Supplied by:</span>
                            <p>
                              {groupedOrders[customerName][salesId].suppliedBy}
                            </p>
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
                                  groupedOrders[customerName][salesId]
                                    .totalAmount
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
                              {
                                groupedOrders[customerName][salesId]
                                  .methodOfPayment
                              }
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
                                    <CurrencyFormatter
                                      amount={order.amount_paid}
                                    />
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
            ))}
        </div>
      </div>
      {/* <SalesReceipt
        ref={receiptRef}
        items={sales?.items || []}
        date={sales?.date || ""}
        brand={sales?.brand || ""}
        name={sales?.customer_name || ""}
        number={sales?.customer_number || ""}
        status={sales?.status || ""}
        suppliedBy={sales?.suppliedBy || ""}
        totalSaleValue={sales?.totalSaleValue || 0}
        currentSalesId={sales?.sales_id || ""}
      /> */}

      <div style={{ display: "none" }}>
        <SalesReceipt
          ref={receiptRef}
          items={selectedSale?.items || []}
          date={selectedSale?.date || ""}
          brand={selectedSale?.brand || ""}
          name={selectedSale?.customer_name || ""}
          number={selectedSale?.customer_number || ""}
          status={selectedSale?.status || ""}
          suppliedBy={selectedSale?.suppliedBy || ""}
          totalSaleValue={selectedSale?.totalSaleValue || 0}
          currentSalesId={selectedSale?.sales_id || ""}
        />
      </div>
    </div>
  );
};

export default Table;
