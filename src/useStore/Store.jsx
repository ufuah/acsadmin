import { create } from "zustand";
import axios from "axios";
// import { jwtDecode } from "jwt-decode"; // corrected import
// import Cookies from "js-cookie"; // Using js-Cookies for handling Cookies

import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

// Axios interceptor to attach token in Cookies to the request headers
axios.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken"); // Changed to accessToken
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const store = useStore.getState();
    const originalRequest = error.config;

    // Check if the request is to login or refresh to avoid retry loop
    if (
      originalRequest.url.includes("/login") ||
      originalRequest.url.includes("/refresh")
    ) {
      return Promise.reject(error);
    }

    // Flag to prevent endless loop
    if (!originalRequest._retry) {
      originalRequest._retry = true; // Set a flag to indicate retry is happening

      // Handle 401 Unauthorized
      if (error.response && error.response.status === 401) {
        try {
          const success = await store.refreshAccessToken();
          if (success) {
            // Retry the original request with new token
            return axios(originalRequest);
          }
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          await store.logout();
          window.location.href = "/login"; // Redirect to login after logging out
        }
      }
    }

    return Promise.reject(error);
  }
);

// const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
const baseURL = "https://api.e-palateoasis.com";

const useStore = create((set, get) => ({
  // State variables
  stocks: [],
  filteredStocks: [],
  sales: [],
  categories: [],
  user: null,
  role: null,
  isLocked: false,
  loading: false,
  connectionType: null,
  networkSpeed: null,

  type: "unknown",
  effectiveType: "unknown",
  downlinkSpeed: "unknown",
  isWifi: false,
  isOnline: false,

  /** =============================== CATEGORY SECTION ============================ */
  fetchCategories: async () => {
    try {
      apiGet("/categories");
      const response = await axios.get(`${baseURL}/api/categories`);
      set({ categories: response.data });
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  },

  addCategory: async (category) => {
    try {
      const response = await axios.post(
        `${baseURL}/api/categories/add`,
        category
      );
      set((state) => ({
        categories: [...state.categories, response.data],
      }));
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  },

  updateCategory: async (id, updatedCategory) => {
    try {
      const response = await axios.put(
        `${baseURL}/api/categories/${id}`,
        updatedCategory
      );
      set((state) => ({
        categories: state.categories.map((cat) =>
          cat.id === id ? { ...cat, ...response.data } : cat
        ),
      }));
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  },

  deleteCategory: async (id) => {
    try {
      await axios.delete(`${baseURL}/api/categories/${id}`);
      set((state) => ({
        categories: state.categories.filter((cat) => cat.id !== id),
      }));
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  },

  /** =============================== STOCK SECTION ============================ */

  saveStock: async (stock) => {
    try {
      if (stock.description) {
        // If description exists, try to update the existing stock
        await updateStock(stock);
      } else {
        // If no description, add new stock
        await addStock(stock);
      }
    } catch (error) {
      console.error("Failed to save stock:", error);
    }
  },

  // Function to add new stock
  addStock: async (stock) => {
    const { networkSpeed } = get(); // Access networkSpeed from the state
    if (networkSpeed !== "Slow") {
      try {
        const response = await axios.post(`${baseURL}/api/stocks/add/`, stock);
        // Update the local state with the new stock
        set((state) => ({
          stocks: [...state.stocks, response.data],
        }));
      } catch (error) {
        console.error("Failed to add stock:", error);
      }
    } else {
      console.warn("Network is too slow, delaying the sales data fetch.");
    }
  },

  // Function to update existing stock
  updateStock: async (stock) => {
    try {
      const response = await axios.put(
        `${baseURL}/api/stocks/${stock.description}/`,
        stock
      );
      // Update the local state with the updated stock
      set((state) => ({
        stocks: [
          ...state.stocks.filter((s) => s.id !== stock.id),
          response.data,
        ],
      }));
    } catch (error) {
      console.error("Failed to update stock:", error);
    }
  },

  setFilteredStocks: (filteredStocks) => set({ filteredStocks }),

  fetchStocks: async () => {
    const { networkSpeed } = get(); // Access networkSpeed from the state
    if (networkSpeed !== "Slow") {
      try {
        const response = await axios.get(`${baseURL}/api/stocks`);
        set({ stocks: response.data });
      } catch (error) {
        console.error(
          "Failed to fetch stocks:",
          error.response?.data || error.message
        );
      }
    } else {
      console.warn("Network is too slow, delaying the sales data fetch.");
    }
  },

  fetchStockByDescription: async (description) => {
    const { networkSpeed } = get(); // Access networkSpeed from the state
    if (networkSpeed !== "Slow") {
      try {
        const encodedDescription = encodeURIComponent(description);
        const response = await axios.get(
          `${baseURL}/api/stocks/description?description=${encodedDescription}`
        );
        return response.data?.length > 0 ? response.data[0] : null;
      } catch (error) {
        console.error("Failed to fetch stock by description:", error);
        return null;
      }
    } else {
      console.warn("Network is too slow, delaying the sales data fetch.");
    }
  },

  deleteStock: async (id) => {
    try {
      await axios.delete(`${baseURL}/api/stocks/${id}/`);
      set((state) => ({
        stocks: state.stocks.filter((stock) => stock.id !== id),
      }));
    } catch (error) {
      console.error("Failed to delete stock:", error);
    }
  },

  fetchSales: async () => {
    const { networkSpeed } = get(); // Access networkSpeed from the state

    if (networkSpeed !== "Slow") {
      try {
        const response = await axios.get(`${baseURL}/api/transactions/sales`);
        console.log("Fetched Sales Data:", response.data);
        set({ sales: response.data.sales });
      } catch (error) {
        console.error(
          "Failed to fetch sales:",
          error.response?.data || error.message
        );
      }
    } else {
      console.warn("Network is too slow, delaying the sales data fetch.");
    }
  },

  fetchSalesById: async (salesId) => {
    const { networkSpeed } = get(); // Access networkSpeed from the state
    if (networkSpeed !== "Slow") {
      try {
        const response = await axios.get(
          `${baseURL}/api/transactions/sales/${salesId}`
        );
        return response.data;
      } catch (error) {
        console.error("Failed to fetch sale by ID:", error);
        return null;
      }
    } else {
      console.warn("Network is too slow, delaying the sales data fetch.");
    }
  },

  addSale: async (sale) => {
    const { networkSpeed } = get(); // Access networkSpeed from the state
    if (networkSpeed !== "Slow") {
      try {
        const response = await axios.post(
          `${baseURL}/api/transactions/sales/add`,
          sale
        );
        const { sales_id } = response.data;

        if (sales_id) {
          set((state) => ({
            sales: [...state.sales, { ...sale, sales_id }],
            currentSalesId: sales_id,
          }));

          return { sales_id };
        } else {
          console.error("No sales ID returned from the server.");
          return { error: "Sale added but no sales ID received." };
        }
      } catch (error) {
        return error.response
          ? { error: error.response.data.error }
          : { error: "An unknown error occurred. Please try again." };
      }
    } else {
      console.warn("Network is too slow, delaying the sales data fetch.");
    }
  },

  updateSale: async (orderId, newStatus, supplier) => {
    try {
      const url = `${baseURL}/api/transactions/sales/${orderId}/status`;

      // Send the new status and supplier in the request body
      const response = await axios.put(url, { status: newStatus, supplier });

      // Update the state with the new data returned from the API
      set((state) => ({
        sales: state.sales.map((sale) =>
          sale.sales_id === orderId ? { ...sale, ...response.data } : sale
        ),
      }));
    } catch (error) {
      console.error("Failed to update sale:", error);
    }


  },

  /** =============================== RETURN SECTION ============================ */

  fetchReturns: async () => {
    try {
      const response = await axios.get(`${baseURL}/api/transactions/returns`); // Adjust the API endpoint as needed
      console.log("Fetched Returns Data:", response.data);
      set({ returns: response.data.returns }); // Adjust based on response structure
    } catch (error) {
      console.error(
        "Failed to fetch returns:",
        error.response?.data || error.message
      );
    }
  },

  addReturn: async (returnData) => {
    const { networkSpeed } = get(); // Access networkSpeed from the state
    if (networkSpeed !== "Slow") {
      try {
        const response = await axios.post(
          `${baseURL}/api/transactions/returns/add`, // Adjust the API endpoint as needed
          returnData
        );
        set((state) => ({
          returns: [...state.returns, response.data],
        }));
      } catch (error) {
        console.error("Failed to add return:", error);
      }
    } else {
      console.warn("Network is too slow, delaying the sales data fetch.");
    }
  },

  updateReturn: async (returnId, updatedData) => {
    const { networkSpeed } = get(); // Access networkSpeed from the state
    if (networkSpeed !== "Slow") {
      try {
        const response = await axios.put(
          `${baseURL}/api/transactions/returns/${returnId}`, // Adjust the API endpoint as needed
          updatedData
        );
        set((state) => ({
          returns: state.returns.map((r) =>
            r.id === returnId ? { ...r, ...response.data } : r
          ),
        }));
      } catch (error) {
        console.error("Failed to update return:", error);
      }
    } else {
      console.warn("Network is too slow, delaying the sales data fetch.");
    }
  },

  deleteReturn: async (returnId) => {
    try {
      await axios.delete(`${baseURL}/api/transactions/returns/${returnId}`); // Adjust the API endpoint as needed
      set((state) => ({
        returns: state.returns.filter((r) => r.id !== returnId),
      }));
    } catch (error) {
      console.error("Failed to delete return:", error);
    }
  },

  /** =============================== EXCHANGE SECTION ============================ */

  fetchExchanges: async () => {
    const { networkSpeed } = get(); // Access networkSpeed from the state
    if (networkSpeed !== "Slow") {
      try {
        const response = await axios.get(
          `${baseURL}/api/transactions/exchanges`
        ); // Adjust the API endpoint as needed
        console.log("Fetched Exchanges Data:", response.data);
        set({ exchanges: response.data.exchanges }); // Adjust based on response structure
      } catch (error) {
        console.error(
          "Failed to fetch exchanges:",
          error.response?.data || error.message
        );
      }
    } else {
      console.warn("Network is too slow, delaying the sales data fetch.");
    }
  },

  addExchange: async (exchangeData) => {
    const { networkSpeed } = get(); // Access networkSpeed from the state
    if (networkSpeed !== "Slow") {
      try {
        const response = await axios.post(
          `${baseURL}/api/transactions/exchanges/add`, // Adjust the API endpoint as needed
          exchangeData
        );
        set((state) => ({
          exchanges: [...state.exchanges, response.data],
        }));
      } catch (error) {
        console.error("Failed to add exchange:", error);
      }
    } else {
      console.warn("Network is too slow, delaying the sales data fetch.");
    }
  },

  updateExchange: async (exchangeId, updatedData) => {
    try {
      const response = await axios.put(
        `${baseURL}/api/transactions/exchanges/${exchangeId}`, // Adjust the API endpoint as needed
        updatedData
      );
      set((state) => ({
        exchanges: state.exchanges.map((e) =>
          e.id === exchangeId ? { ...e, ...response.data } : e
        ),
      }));
    } catch (error) {
      console.error("Failed to update exchange:", error);
    }
  },

  deleteExchange: async (exchangeId) => {
    try {
      await axios.delete(`${baseURL}/api/transactions/exchanges/${exchangeId}`); // Adjust the API endpoint as needed
      set((state) => ({
        exchanges: state.exchanges.filter((e) => e.id !== exchangeId),
      }));
    } catch (error) {
      console.error("Failed to delete exchange:", error);
    }
  },

  /** =============================== AUTH SECTION ============================ */
  signup: async (userData) => {
    const { networkSpeed } = get(); // Access networkSpeed from the state
    if (networkSpeed !== "Slow") {
      try {
        await axios.post(`${baseURL}/api/auth/signup`, userData);
      } catch (error) {
        console.error("Signup failed:", error);
      }
    } else {
      console.warn("Network is too slow, delaying the sales data fetch.");
    }
  },

  /** =============================== RETURN SECTION ============================ */
  // addReturn: async (returnData) => {
  //   const { networkSpeed } = get(); // Access networkSpeed from the state
  //   if (networkSpeed !== "Slow") {
  //     try {
  //       const response = await axios.post(
  //         `${baseURL}/api/transactions/return`,
  //         returnData
  //       );
  //       set((state) => ({
  //         returns: [...state.returns, response.data],
  //       }));
  //     } catch (error) {
  //       console.error("Failed to add return:", error);
  //     }
  //   } else {
  //     console.warn("Network is too slow, delaying the sales data fetch.");
  //   }
  // },



  /** =============================== EXCHANGE SECTION ============================ */

  // addExchange: async (exchangeData) => {
  //   const { networkSpeed } = get(); // Access networkSpeed from the state
  //   if (networkSpeed !== "Slow") {
  //     try {
  //       const response = await axios.post(
  //         `${baseURL}/api/transactions/exchange`,
  //         exchangeData
  //       );
  //       set((state) => {
  //         // Ensure that exchanges is always an array
  //         const currentExchanges = Array.isArray(state.exchanges)
  //           ? state.exchanges
  //           : [];
  //         return {
  //           exchanges: [...currentExchanges, response.data],
  //         };
  //       });
  //     } catch (error) {
  //       console.error("Failed to add exchange:", error);
  //     }
  //   } else {
  //     console.warn("Network is too slow, delaying the sales data fetch.");
  //   }
  // },



  /** =============================== CUSTOMER SECTION ============================ */
  login: async (username, password, onSuccess) => {
    const { networkSpeed } = get(); // Access networkSpeed from the state
    if (networkSpeed !== "Slow") {
      try {
        const response = await axios.post(
          `${baseURL}/api/auth/login`,
          { username, password },
          { withCredentials: true } // Important for sending and receiving cookies
        );

        console.log("Login response:", response.data); // Log the response data

        const { user } = response.data;

        if (user) {
          // Store user data (including role) in localStorage
          localStorage.setItem(
            "user",
            JSON.stringify({ username: user.username, role: user.role })
          );

          // Update state with user and role
          set({ user: user.username, role: user.role });

          if (onSuccess) onSuccess(user.role);
        } else {
          throw new Error("Login failed. User or token not received.");
        }
      } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        throw new Error("Login failed.");
      }
    } else {
      console.warn("Network is too slow, delaying the sales data fetch.");
    }
  },

  getCustomerDetails: async (customer_name) => {
    try {
      const response = await axios.get(
        `${baseURL}/api/transactions/customers/${encodeURIComponent(
          customer_name
        )}`
      );
      return response.data;
    } catch (error) {
      console.error("Failed to get customer details:", error);
      return null;
    }
  },

  logout: async () => {
    const { networkSpeed } = get(); // Access networkSpeed from the state
    if (networkSpeed !== "Slow") {
      try {
        await axios.post(`${baseURL}/api/auth/logout`);
        // Clear user info from localStorage
        localStorage.removeItem("user");
        set({ user: null, role: null });
      } catch (error) {
        console.error("Logout failed:", error);
      }
    } else {
      console.warn("Network is too slow, delaying the sales data fetch.");
    }
  },

  /** =============================== Cookies & AUTH HANDLING ============================ */

  loadUserFromStorage: async function () {
    const storedUser = localStorage.getItem("user"); // User info from localStorage
    console.log("Stored user from localStorage:", storedUser); // Log the stored user

    if (storedUser) {
      try {
        const user = JSON.parse(storedUser); // Parse stored user data

        // You can't read `HttpOnly` cookies, so just set the user from localStorage
        set({
          user: user.username,
          role: user.role,
        });

        return true; // User is authenticated
      } catch (error) {
        console.error("Error loading user from localStorage:", error);
        set({ user: null, role: null });
        return false;
      }
    } else {
      console.log("No stored user found.");
      set({ user: null, role: null });
      return false;
    }
  },

  checkTokenValidity: async () => {
    try {
      await axios.get(`${baseURL}/api/protected-endpoint`);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const store = useStore.getState();
        await store.logout();
        window.location.href = "/login";
      }
    }
  },

  refreshAccessToken: async () => {
    try {
      // Make a POST request to refresh the access token
      const response = await axios.post(`${baseURL}/api/auth/refresh`, null, {
        withCredentials: true, // To include cookies (for refreshToken)
      });

      // Log success if the token is refreshed
      if (response.status === 200 && response.data.newAccessToken) {
        // Update the new access token in Cookies
        Cookies.set("accessToken", response.data.newAccessToken, {
          expires: 1 / 96,
        }); // Set it to expire in 15 minutes (optional)
        console.log("Access token refreshed and updated in cookies");
        return true;
      }
    } catch (error) {
      console.error("Failed to refresh access token:", error);
      return false; // Return false on failure to refresh the token
    }
  },

  isAuthenticated: () => {
    const user = localStorage.getItem("user"); // User info from localStorage
    return !!user; // Both token and user data should be present
  },

  checkLock: async () => {
    const { networkSpeed } = get(); // Access networkSpeed from the state
    if (networkSpeed !== "Slow") {
      try {
        const response = await axios.get(`${baseURL}/api/auth/checklock`, {
          withCredentials: true,
        });
        set({ isLocked: response.data.isLocked }); // Expecting a Boolean from the backend
      } catch (error) {
        console.error("Failed to fetch lock status:", error);
        // You can decide how to handle errors here
      }
    } else {
      console.warn("Network is too slow, delaying the sales data fetch.");
    }
  },

  toggleLock: async () => {
    const { networkSpeed } = get(); // Access networkSpeed from the state
    if (networkSpeed !== "Slow") {
      try {
        const response = await axios.post(
          `${baseURL}/api/auth/togglelock`,
          {},
          {
            withCredentials: true, // Ensures cookies are sent with the request
          }
        );
        set({ isLocked: response.data.lock_status === "locked" });
      } catch (error) {
        console.error("Failed to toggle lock status:", error);
        // Handle errors accordingly
      }
    } else {
      console.warn("Network is too slow, delaying the sales data fetch.");
    }
  },

  checkConnectionType: () => {
    if ("connection" in navigator) {
      const connection =
        navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection;

      const connectionType = connection.type || "unknown"; // Type of connection (e.g., wifi, cellular)
      const effectiveType = connection.effectiveType || "unknown"; // Quality of the connection (e.g., 4g, 3g, 2g)

      set({
        // If connectionType is unknown, fall back to effectiveType
        connectionType:
          connectionType !== "unknown" ? connectionType : effectiveType,
        isWifi: connectionType === "wifi", // Check if it's Wi-Fi
      });

      // Log the current connection type and quality
      console.log(
        `Connection type: ${connectionType}, Effective type: ${effectiveType}`
      );
      return { connectionType, effectiveType };
    } else {
      console.warn("Network Information API is not supported in this browser.");
      return { connectionType: "unknown", effectiveType: "unknown" };
    }
  },

  checkNetworkSpeed: () => {
    if ("connection" in navigator) {
      const connection =
        navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection;
      let speed;

      if (connection.downlink) {
        // Calculate speed based on downlink (in Mbps)
        speed = `${connection.downlink} Mbps`;
      } else if (connection.effectiveType) {
        // Fallback speed estimate based on effective connection type
        switch (connection.effectiveType) {
          case "4g":
            speed = "Fast"; // Assume fast speed for 4G
            break;
          case "3g":
            speed = "Moderate"; // Assume moderate speed for 3G
            break;
          case "2g":
            speed = "Slow"; // Assume slow speed for 2G
            break;
          default:
            speed = "Unknown"; // Default fallback
        }
      } else {
        speed = "Unknown";
      }

      set({ networkSpeed: speed });

      // Log the current network speed
      console.log(`Network speed: ${speed}`);
      return speed;
    } else {
      console.warn("Network Information API is not supported in this browser.");
      return "unknown";
    }
  },
}));

export default useStore;
