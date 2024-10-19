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
import useStore from "../../useStore/Store";
import { generatePdf } from "../../utils/GeneratePdf/generatePdf";
import UseNotifications from "../../utils/Middlewares/Notifications/UseNotifications";
import Notification from "../../utils/Middlewares/Notifications/notification/Notification";
import CurrencyFormatter from "../../utils/currency/Currency";
import Calendar from "../calender/Calender";
import SalesReceipt from "../receipt/SalesReceipt";
import SearchBox from "../searchExtr/searchbar";
import "./table.css"; // Ensure your CSS is updated

const Table = () => {
  const { notification, showNotification } = UseNotifications();
  const [expandedCustomer, setExpandedCustomer] = useState(null);
  const [filteredSales, setFilteredSales] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [category, setCategory] = useState("all");
  const [selectedSale, setSelectedSale] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
  });

  const printRef = useRef(null);
  const receiptRef = useRef({});

  // Added new state for transaction type
  const [selectedTransactionType, setSelectedTransactionType] = useState("all");

  const {
    sales,
    returns,
    exchanges,
    fetchExchanges,
    fetchReturns,
    fetchSales,
    updateSale,
    fetchSalesById,
  } = useStore((state) => ({
    sales: state.sales,
    returns: state.returns,
    fetchReturns: state.fetchReturns,
    exchanges: state.exchanges,
    fetchExchanges: state.fetchExchanges,
    fetchSales: state.fetchSales,
    updateSale: state.updateSale,
    fetchSalesById: state.fetchSalesById,
  }));

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const handlePrintBySalesId = async (salesId) => {
    try {
      const sale = await fetchSalesById(salesId);
      if (sale) {
        setSelectedSale(sale);
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        console.log("Fetching returns..."); // Add this log
        await fetchSales(); // Fetch sales data
        await fetchReturns(); // Fetch returns data
        await fetchExchanges(); // Fetch exchanges data

        console.log("sales Data:", sales); // Ensure this line logs the data after fetching
        console.log("Returns Data:", returns); // Ensure this line logs the data after fetching
        console.log("exchange Data:", exchanges); // Ensure this line logs the data after fetching
        showNotification("Data fetched successfully!", "success");
      } catch (error) {
        console.error("Failed to fetch data:", error);
        showNotification("Failed to fetch data!", "error");
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchData();
  }, [fetchSales, fetchReturns, fetchExchanges]);

  useEffect(() => {
    const testFetchReturns = async () => {
      try {
        const returnsData = await fetchReturns();
        console.log("Fetched Returns Data:", returnsData); // Log the raw return data here
      } catch (error) {
        console.error("Error fetching returns:", error);
      }
    };
    testFetchReturns();
  }, []);

  // const applyFilters = useCallback(() => {
  //   let filtered = [];

  //   // Select data based on the selected transaction type
  //   if (selectedTransactionType === "sales") {
  //     filtered = [...sales];
  //   } else if (selectedTransactionType === "returns") {
  //     filtered = [...returns];
  //   } else if (selectedTransactionType === "exchanges") {
  //     filtered = [...exchanges];
  //   }

  //   if (filterStatus !== "all") {
  //     filtered = filtered.filter((order) => order.status === filterStatus);
  //   }

  //   if (filterType !== "all") {
  //     filtered = filtered.filter(
  //       (order) => order.transaction_type === filterType
  //     );
  //   }

  //   if (category !== "all") {
  //     filtered = filtered.filter((order) => order.category === category);
  //   }

  //   if (dateRange.startDate && dateRange.endDate) {
  //     filtered = filtered.filter((order) => {
  //       const orderDate = new Date(order.date).setHours(0, 0, 0, 0);
  //       const startDate = new Date(dateRange.startDate).setHours(0, 0, 0, 0);
  //       const endDate = new Date(dateRange.endDate).setHours(23, 59, 59, 999);
  //       return orderDate >= startDate && orderDate <= endDate;
  //     });
  //   }

  //   setFilteredSales(filtered);
  //   setSearchResults(filtered);
  // }, [
  //   filterStatus,
  //   filterType,
  //   category,
  //   dateRange,
  //   sales,
  //   returns,
  //   exchanges,
  //   selectedTransactionType,
  // ]);

  // Logging here after useEffect will also show the current value of returns

  // useEffect(() => {
  //   console.log("Final Returns Data after Fetch:", returns);
  // }, [returns]); // This logs the 'returns' data when it changes
  // const applyFilters = useCallback(() => {
  //   let filtered = []; // Initialize filtered as an empty array
  //   console.log("Filtered before date range:", filtered);
  //   // Select data based on the selected transaction type
  //   if (selectedTransactionType === "sales") {
  //     filtered = Array.isArray(sales) ? [...sales] : []; // Ensure sales is an array
  //   } else if (selectedTransactionType === "returns") {
  //     filtered = Array.isArray(returns) ? [...returns] : []; // Ensure returns is an array
  //   } else if (selectedTransactionType === "exchanges") {
  //     filtered = Array.isArray(exchanges) ? [...exchanges] : []; // Ensure exchanges is an array
  //   }

  //   // Apply filters based on status
  //   if (filterStatus !== "all") {
  //     filtered = filtered.filter((order) => order.status === filterStatus);
  //   }

  //   // Apply filters based on transaction type
  //   if (filterType !== "all") {
  //     filtered = filtered.filter(
  //       (order) => order.transaction_type === filterType
  //     );
  //   }

  //   // Apply filters based on category
  //   if (category !== "all") {
  //     filtered = filtered.filter((order) => order.category === category);
  //   }

  //   // Apply filters based on date range
  //   if (dateRange.startDate && dateRange.endDate) {
  //     filtered = filtered.filter((order) => {
  //       const orderDate = new Date(order.date).setHours(0, 0, 0, 0);
  //       const startDate = new Date(dateRange.startDate).setHours(0, 0, 0, 0);
  //       const endDate = new Date(dateRange.endDate).setHours(23, 59, 59, 999);
  //       return orderDate >= startDate && orderDate <= endDate;
  //     });
  //   }

  //   // Update the state with the filtered results
  //   setFilteredSales(filtered);
  //   setSearchResults(filtered);
  // }, [
  //   filterStatus,
  //   filterType,
  //   category,
  //   dateRange,
  //   sales,
  //   returns,
  //   exchanges,
  //   selectedTransactionType,
  // ]);

  // console.log('Filtered before date range:', filtered);

  // const applyFilters = useCallback(() => {
  //   console.log("Category:", category); // Log the category for debugging
  //   let filtered = []; // Initialize filtered as an empty array

  //   // If "all" is selected, combine all records from sales, returns, and exchanges
  //   if (selectedTransactionType === "all") {
  //     filtered = [
  //       ...(Array.isArray(sales) ? sales : []),
  //       ...(Array.isArray(returns) ? returns : []),
  //       ...(Array.isArray(exchanges) ? exchanges : []),
  //     ]; // Combine all arrays into one
  //   } else if (selectedTransactionType === "sales") {
  //     filtered = Array.isArray(sales) ? [...sales] : [];
  //   } else if (selectedTransactionType === "returns") {
  //     filtered = Array.isArray(returns) ? [...returns] : [];
  //   } else if (selectedTransactionType === "exchanges") {
  //     filtered = Array.isArray(exchanges) ? [...exchanges] : [];
  //   }

  //   // Apply filters based on status
  //   if (filterStatus !== "all") {
  //     filtered = filtered.filter((order) => order.status === filterStatus);
  //   }

  //   // Apply filters based on transaction type
  //   if (filterType !== "all") {
  //     filtered = filtered.filter(
  //       (order) => order.transaction_type === filterType
  //     );
  //   }

  //   // Apply filters based on category
  //   // if (category !== "all") {
  //   //   console.log("Order Category:", order.category); // Log the category of each order
  //   //   filtered = filtered.filter((order) => order.category === category);
  //   // }

  //   if (category !== "all") {
  //     filtered = filtered.filter((order) => {
  //       console.log("Order Category:", order.category); // Log the category of each order
  //       return order.category === category;
  //     });
  //   }

  //   // Apply filters based on date range
  //   if (dateRange.startDate && dateRange.endDate) {
  //     filtered = filtered.filter((order) => {
  //       const orderDate = new Date(order.date).setHours(0, 0, 0, 0);
  //       const startDate = new Date(dateRange.startDate).setHours(0, 0, 0, 0);
  //       const endDate = new Date(dateRange.endDate).setHours(23, 59, 59, 999);
  //       return orderDate >= startDate && orderDate <= endDate;
  //     });
  //   }

  //   // Update the state with the filtered results
  //   setFilteredSales(filtered);
  //   setSearchResults(filtered);
  // }, [
  //   filterStatus,
  //   filterType,
  //   category,
  //   dateRange,
  //   sales,
  //   returns,
  //   exchanges,
  //   selectedTransactionType,
  // ]);

  const applyFilters = useCallback(() => {
    console.log("Selected Category Filter:", category); // Log the selected category for filtering

    let filtered = []; // Initialize filtered as an empty array

    // Log the arrays for sales, returns, and exchanges to see if they have the expected structure
    console.log("Sales Array:", sales);
    console.log("Returns Array:", returns);
    console.log("Exchanges Array:", exchanges);

    // If "all" is selected, combine all records from sales, returns, and exchanges
    if (selectedTransactionType === "all") {
      filtered = [
        ...(Array.isArray(sales) ? sales : []),
        ...(Array.isArray(returns) ? returns : []),
        ...(Array.isArray(exchanges) ? exchanges : []),
      ]; // Combine all arrays into one
    } else if (selectedTransactionType === "sales") {
      filtered = Array.isArray(sales) ? [...sales] : [];
    } else if (selectedTransactionType === "returns") {
      filtered = Array.isArray(returns) ? [...returns] : [];
    } else if (selectedTransactionType === "exchanges") {
      filtered = Array.isArray(exchanges) ? [...exchanges] : [];
    }

    console.log("Combined Filtered Data (Before Filters):", filtered); // Log the combined array before applying filters

    // Apply filters based on status
    if (filterStatus !== "all") {
      filtered = filtered.filter((order) => {
        console.log("Order Status:", order.status); // Log each order's status before filtering by status
        return order.status === filterStatus;
      });
    }

    // Apply filters based on transaction type
    if (filterType !== "all") {
      filtered = filtered.filter((order) => {
        console.log("Order Transaction Type:", order.transaction_type); // Log the transaction type of each order
        return order.transaction_type === filterType;
      });
    }

    // Apply filters based on category, and log order.category for each item
    if (category !== "all") {
      filtered = filtered.filter((order) => {
        console.log("Order Object:", order); // Log the entire order object
        console.log("Order Category:", order?.category); // Log the order category (if it exists)
        if (!order.category) {
          console.warn("Order missing category:", order); // Warn if the category field is missing
          return false; // Skip the order if it doesn't have a category
        }
        return order.category === category;
      });
    }

    // Apply filters based on date range
    if (dateRange.startDate && dateRange.endDate) {
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.date).setHours(0, 0, 0, 0);
        const startDate = new Date(dateRange.startDate).setHours(0, 0, 0, 0);
        const endDate = new Date(dateRange.endDate).setHours(23, 59, 59, 999);
        console.log(
          "Order Date:",
          order.date,
          "Start Date:",
          startDate,
          "End Date:",
          endDate
        ); // Log date comparison details
        return orderDate >= startDate && orderDate <= endDate;
      });
    }

    // Log the filtered result
    console.log("Filtered Sales After All Filters:", filtered);

    // Update the state with the filtered results
    setFilteredSales(filtered);
    setSearchResults(filtered);
  }, [
    filterStatus,
    filterType,
    category,
    dateRange,
    sales,
    returns,
    exchanges,
    selectedTransactionType,
  ]);

  useEffect(() => {
    applyFilters();
  }, [
    filterStatus,
    filterType,
    category,
    sales,
    returns,
    exchanges,
    dateRange,
    selectedTransactionType,
    applyFilters,
  ]);

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
          transaction_type: order.transaction_type,
          category: order.category,
        };
      }

      // Ensure `order.amount_paid` is a number before adding
      const amountPaid = parseFloat(order.amount_paid) || 0;

      acc[order.customer_name][order.sales_id].orders.push(order);
      acc[order.customer_name][order.sales_id].totalAmount += amountPaid;
      acc[order.customer_name][order.sales_id].totalPaid += amountPaid;

      return acc;
    }, {});
  }, [searchResults, filteredSales]);

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  console.log("Selected Transaction Type:", selectedTransactionType);

  const handleTransactionTypeChange = (event) => {
    setSelectedTransactionType(event.target.value); // Update selected transaction type
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

  // const handleStatusChange = async (
  //   customerName,
  //   salesId,
  //   newStatus,
  //   supplier
  // ) => {
  //   if (newStatus === "supplied" && supplier) {
  //     const confirm = window.confirm(
  //       `Are you sure you want to mark this sale as "Supplied" with ${supplier}? This action cannot be undone.`
  //     );
  //     if (!confirm) {
  //       return;
  //     }
  //   }
  //   try {
  //     await updateSale(salesId.toString(), newStatus, {
  //       supplier: selectedSupplier,
  //     });
  //     await fetchSales();
  //     showNotification(
  //       "Sale status and supplier updated successfully!",
  //       "success"
  //     );
  //   } catch (error) {
  //     console.error("Failed to update status and supplier:", error);
  //     showNotification("Failed to update sale status and supplier!", "error");
  //   }
  // };

  // const handleStatusChange = async (
  //   customerName,
  //   salesId,
  //   newStatus,
  //   supplier
  // ) => {
  //   const orderId = salesId.orderId; // Ensure salesId contains the correct orderId field
  //   if (!orderId) {
  //     console.error("No orderId found in salesId object.");
  //     return;
  //   }

  //   console.log("Sales ID (orderId):", orderId); // Logging to check the correct ID

  //   if (newStatus === "supplied" && selectedSupplier) { // Make sure you are checking the correct variable
  //     const confirm = window.confirm(
  //       `Are you sure you want to mark this sale as "Supplied" with ${selectedSupplier}? This action cannot be undone.`
  //     );
  //     if (!confirm) {
  //       return;
  //     }
  //   }

  //   try {
  //     // Use orderId instead of salesId
  //     console.log(
  //       "Updating sale with Sales ID:",
  //       orderId,
  //       "New Status:",
  //       newStatus,
  //       "Supplier:",
  //       selectedSupplier // Use selectedSupplier directly
  //     );

  //     // Correct call to updateSale
  //     await updateSale(orderId.toString(), newStatus, selectedSupplier);

  //     await fetchSales(); // Fetch updated sales
  //     showNotification(
  //       "Sale status and supplier updated successfully!",
  //       "success"
  //     );
  //   } catch (error) {
  //     console.error("Failed to update status and supplier:", error);
  //     showNotification("Failed to update sale status and supplier!", "error");
  //   }
  // };

  const handleStatusChange = async (
    customerName,
    salesId,
    newStatus,
    selectedSupplier // Use selectedSupplier directly in the parameters
  ) => {
    const orderId = salesId?.orderId; // Ensure salesId contains the correct orderId field
    if (!orderId) {
      console.error("No orderId found in salesId object.");
      showNotification("No orderId found. Please try again.", "error");
      return;
    }

    console.log("Sales ID (orderId):", orderId); // Logging to check the correct ID

    // If the newStatus is "supplied" but no supplier is selected, show an error message
    if (newStatus === "supplied" && !selectedSupplier) {
      showNotification(
        "Please select a supplier before marking as 'supplied'.",
        "error"
      );
      console.error("No supplier selected.");
      return;
    }

    // Confirm action if status is "supplied" and selectedSupplier is set
    if (newStatus === "supplied" && selectedSupplier) {
      const confirm = window.confirm(
        `Are you sure you want to mark this sale as "Supplied" with ${selectedSupplier}? This action cannot be undone.`
      );
      if (!confirm) {
        return;
      }
    }

    try {
      // Logging the update details
      console.log(
        "Updating sale with Sales ID:",
        orderId,
        "New Status:",
        newStatus,
        "Supplier:",
        selectedSupplier // Use selectedSupplier directly
      );

      // Correct call to updateSale
      const result = await updateSale(
        orderId.toString(),
        newStatus,
        selectedSupplier
      );

      // If result contains success messages, show them
      if (result && result.message && result.stockUpdateMessage) {
        showNotification(result.message, "success");
        showNotification(result.stockUpdateMessage, "info");
      }

      // Fetch updated sales data after successful update
      await fetchSales();
    } catch (error) {
      console.error("Failed to update status and supplier:", error);
      showNotification("Failed to update sale status and supplier!", "error");
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

  // A loading fallback UI
  const LoadingIndicator = () => (
    <div className="loading">
      <span>Loading...</span>
    </div>
  );

  // Function to count pending orders
  const countPendingOrders = (groupedOrders) => {
    let pendingCount = 0;

    // Loop through each customerName in groupedOrders
    Object.keys(groupedOrders).forEach((customerName) => {
      // Loop through each salesId for the customer
      Object.keys(groupedOrders[customerName]).forEach((salesId) => {
        // Check if the status is "pending"
        if (groupedOrders[customerName][salesId].status === "pending") {
          pendingCount++;
        }
      });
    });

    return pendingCount;
  };

  // Example usage
  const pendingOrders = countPendingOrders(groupedOrders);
  console.log(`Number of pending orders: ${pendingOrders}`);

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

            <Calendar setDateRange={setDateRange} />
            <div className="seperate">
              {/* <div className="sortby">
                <span className="sortby-label">Sort by:</span>
                <select className="sortby-select" onChange={handleFilterChange}>
                  <option value="all">All</option>
                  <option value="sales">Sales</option>
                  <option value="return">Return</option>
                  <option value="exchange">Exchanges</option>
                </select>
              </div> */}

              <div className="sortby">
                <span className="sortby-label">Sort by:</span>
                <select
                  className="sortby-select"
                  onChange={(event) => {
                    // Update the selected transaction type
                    setSelectedTransactionType(event.target.value);
                    // Optionally, call applyFilters if needed
                    applyFilters(); // Call applyFilters here to refresh data based on the new selection
                  }}
                >
                  <option value="all">All</option>
                  <option value="sales">Sales</option>
                  <option value="returns">Returns</option>{" "}
                  {/* Corrected to "returns" */}
                  <option value="exchanges">Exchanges</option>
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

            <div className="base_extr">
              <div className="additem">
                <FontAwesomeIcon icon={faPlus} />
              </div>
              <div className="generate-pdf" onClick={() => generatePdf(sales)}>
                <FontAwesomeIcon icon={faFilePdf} />
                Generate PDF
              </div>
            </div>
          </div>

          <div className="filter_buttons">
            <button
              onClick={() => filterSalesByStatus("all")}
              className={`btn_shift ${filterStatus === "all" ? "active" : ""}`}
            >
              All Sales
            </button>
            <div className="pending_btn">
              <div className="number_pending">
                <span>{countPendingOrders(groupedOrders)}</span>
              </div>
              <button
                onClick={() => filterSalesByStatus("pending")}
                className={`btn_shift ${
                  filterStatus === "pending" ? "active" : ""
                }`}
              >
                Pending Sales
              </button>
            </div>

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

        <div className="body_box">
          <div className="table_body">
            <Suspense fallback={<LoadingIndicator />}>
              {loading ? (
                <LoadingIndicator />
              ) : (
                <>
                  {Object.keys(groupedOrders).length > 0 &&
                    Object.keys(groupedOrders).map((customerName) => (
                      <div key={customerName} className="customer-section">
                        {Object.keys(groupedOrders[customerName]).map(
                          (salesId) => (
                            <div key={salesId} className="sales-section">
                              <div
                                className="customer-header"
                                onClick={() =>
                                  toggleCustomerDetails(customerName, salesId)
                                }
                              >
                                <div className="pictureBox">
                                  <div className="box_sort">
                                    <div className="brandsales">
                                      <Image
                                        src={
                                          groupedOrders[customerName][salesId]
                                            .customerImage
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
                                      {
                                        groupedOrders[customerName][salesId]
                                          .transaction_type
                                      }
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
                                              groupedOrders[customerName][
                                                salesId
                                              ].orderId
                                            )
                                          }
                                        />
                                      </div>
                                    </div>

                                    {/* <div className="div">
                                      <div className="status-dropdown">
                                        <select
                                          value={
                                            groupedOrders[customerName][salesId]
                                              .status
                                          }
                                          onChange={(e) => {
                                            handleStatusChange(
                                              customerName,
                                              groupedOrders[customerName][
                                                salesId
                                              ],
                                              e.target.value,
                                              selectedSupplier // Pass the supplier value
                                            );
                                          }}
                                        >
                                          <option value="pending">
                                            Pending
                                          </option>
                                          <option value="supplied">
                                            Supplied
                                          </option>
                                        </select>
                                      </div>

                                      {groupedOrders[customerName][salesId]
                                        .status !== "supplied" && ( // Check the status
                                        <div className="formField">
                                          <label
                                            htmlFor="supplied_by"
                                            className="label"
                                          >
                                            Supplied By
                                          </label>
                                          <select
                                            name="supplied_by"
                                            id="supplied_by"
                                            value={selectedSupplier} // The supplier value you are managing in state
                                            onChange={(e) =>
                                              setSelectedSupplier(
                                                e.target.value
                                              )
                                            } // Handle the change event
                                            className="input"
                                            required
                                          >
                                            <option value="">
                                              Select a supplier
                                            </option>
                                            <option value="Cyprian">
                                              Cyprian
                                            </option>
                                            <option value="Stelle">
                                              Stelle
                                            </option>
                                            <option value="Juliana">
                                              Juliana
                                            </option>
                                            <option value="Comfort">
                                              Comfort
                                            </option>
                                          </select>
                                        </div>
                                      )}

                                      <div className="supplied_">
                                        <span>Supplied by:</span>
                                        <p>
                                          {
                                            groupedOrders[customerName][salesId]
                                              .suppliedBy
                                          }
                                        </p>
                                      </div>
                                    </div>

                                    <div className="status">
                                      <span>{groupedOrders[customerName][
                                            salesId
                                          ].status}</span>
                                    </div> */}

                                    <div className="div">
                                      {groupedOrders[customerName][salesId]
                                        .status === "pending" ? (
                                        // Render this block when status is "pending"
                                        <>
                                          <div className="status-dropdown">
                                            <select
                                              value={
                                                groupedOrders[customerName][
                                                  salesId
                                                ].status
                                              }
                                              onChange={(e) => {
                                                handleStatusChange(
                                                  customerName,
                                                  groupedOrders[customerName][
                                                    salesId
                                                  ],
                                                  e.target.value,
                                                  selectedSupplier // Pass the supplier value
                                                );
                                              }}
                                            >
                                              <option value="pending">
                                                Pending
                                              </option>
                                              <option value="supplied">
                                                Supplied
                                              </option>
                                            </select>
                                          </div>

                                          {/* Render supplier selection only when status is pending */}
                                          <div className="formField">
                                            <label
                                              htmlFor="supplied_by"
                                              className="label"
                                            >
                                              Supplied By
                                            </label>
                                            <select
                                              name="supplied_by"
                                              id="supplied_by"
                                              value={selectedSupplier} // The supplier value you are managing in state
                                              onChange={(e) =>
                                                setSelectedSupplier(
                                                  e.target.value
                                                )
                                              } // Handle the change event
                                              className="input"
                                              required
                                            >
                                              <option value="">
                                                Select a supplier
                                              </option>
                                              <option value="Cyprian">
                                                Cyprian
                                              </option>
                                              <option value="Stelle">
                                                Stelle
                                              </option>
                                              <option value="Juliana">
                                                Juliana
                                              </option>
                                              <option value="Comfort">
                                                Comfort
                                              </option>
                                            </select>
                                          </div>
                                        </>
                                      ) : (
                                        // Render this block when status is "supplied"
                                        <div className="status">
                                          <span>status:</span>
                                          <p>
                                            {
                                              groupedOrders[customerName][
                                                salesId
                                              ].status
                                            }
                                          </p>
                                        </div>
                                      )}

                                      {/* Display the supplied by information if it exists */}
                                      {groupedOrders[customerName][salesId]
                                        .suppliedBy && (
                                        <div className="supplied_">
                                          <span>Supplied by:</span>
                                          <p>
                                            {
                                              groupedOrders[customerName][
                                                salesId
                                              ].suppliedBy
                                            }
                                          </p>
                                        </div>
                                      )}
                                    </div>

                                    <div
                                      className="print"
                                      onClick={() =>
                                        handlePrintBySalesId(salesId)
                                      }
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
                                            groupedOrders[customerName][salesId]
                                              .totalPaid
                                          }
                                        />
                                      </p>

                                      <p>
                                        Date:
                                        {formatDate(
                                          groupedOrders[customerName][salesId]
                                            .date
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

                              {expandedCustomer ===
                                `${customerName}-${salesId}` && (
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
                                      {groupedOrders[customerName][
                                        salesId
                                      ]?.orders.map((order, index) => (
                                        <tr key={index}>
                                          <td>{order.item}</td>
                                          <td>
                                            <CurrencyFormatter
                                              amount={order.amount_per_item}
                                            />
                                          </td>
                                          {/* <td>{order.quantity_purchased}</td> */}
                                          <td>
                                            {groupedOrders[customerName][
                                              salesId
                                            ].transaction_type === "sales"
                                              ? order.quantity_purchased
                                              : order.quantity}
                                          </td>
                                          <td>
                                            <CurrencyFormatter
                                              amount={order.amount_paid}
                                            />
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              )}
                            </div>
                          )
                        )}
                      </div>
                    ))}
                </>
              )}
            </Suspense>
          </div>
        </div>
      </div>

      <div style={{ display: "none" }}>
        <SalesReceipt
          ref={receiptRef}
          items={selectedSale?.items || []}
          date={selectedSale?.date || ""}
          brand={selectedSale?.brand || ""}
          name={selectedSale?.customer_name || ""}
          number={selectedSale?.number || ""}
          status={selectedSale?.status || ""}
          suppliedBy={selectedSale?.supplied_by || ""}
          totalSaleValue={selectedSale?.totalSaleValue || 0}
          currentSalesId={selectedSale?.sales_id || ""}
        />
      </div>
    </div>
  );
};

export default Table;
