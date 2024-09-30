// import { create } from "zustand";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";

// // Set up Axios Interceptors for request handling
// axios.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     console.log("Request config:", config); // Log the config to verify headers
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// const useStore = create((set, get) => ({
//   // State variables
//   stocks: [],
//   filteredStocks: [],
//   sales: [],
//   categories: [],
//   user: null,
//   token: null,
//   role: null,
//   isLocked: false,
//   loading: false,

//   /** =============================== CATEGORY SECTION ============================ */
//   fetchCategories: async () => {
//     try {
//       const response = await axios.get("${baseURL}/api/categories");
//       set({ categories: response.data });
//     } catch (error) {
//       console.error("Failed to fetch categories:", error);
//     }
//   },

//   addCategory: async (category) => {
//     try {
//       const response = await axios.post(
//         "${baseURL}/api/categories/add",
//         category
//       );
//       set((state) => ({
//         categories: [...state.categories, response.data],
//       }));
//     } catch (error) {
//       console.error("Failed to add category:", error);
//     }
//   },

//   updateCategory: async (id, updatedCategory) => {
//     try {
//       const response = await axios.put(
//         `${baseURL}/api/categories/${id}`,
//         updatedCategory
//       );
//       set((state) => ({
//         categories: state.categories.map((cat) =>
//           cat.id === id ? { ...cat, ...response.data } : cat
//         ),
//       }));
//     } catch (error) {
//       console.error("Failed to update category:", error);
//     }
//   },

//   deleteCategory: async (id) => {
//     try {
//       await axios.delete(`${baseURL}/api/categories/${id}`);
//       set((state) => ({
//         categories: state.categories.filter((cat) => cat.id !== id),
//       }));
//     } catch (error) {
//       console.error("Failed to delete category:", error);
//     }
//   },

//   /** =============================== STOCK SECTION ============================ */
//   saveStock: async (stock) => {
//     try {
//       const response = stock.description
//         ? await axios.put(
//             `${baseURL}/api/stocks/${stock.description}`,
//             stock
//           )
//         : await axios.post("${baseURL}/api/stocks/add", stock);

//       set((state) => ({
//         stocks: [
//           ...state.stocks.filter((s) => s.id !== stock.id),
//           response.data,
//         ],
//       }));
//     } catch (error) {
//       console.error("Failed to save stock:", error);
//     }
//   },

//   // Update filteredStocks
//   setFilteredStocks: (filteredStocks) => set({ filteredStocks }),

//   // Example fetchStocks function
//   fetchStocks: async () => {
//     try {
//       const response = await axios.get("${baseURL}/api/stocks");
//       set({ stocks: response.data });
//     } catch (error) {
//       console.error("Failed to fetch stocks:", error.response?.data || error.message);
//     }
//   },

//   fetchStockByDescription: async (description) => {
//     try {
//       // Encode the description to ensure special characters are handled
//       const encodedDescription = encodeURIComponent(description);
//       const response = await axios.get(
//         `${baseURL}/api/stocks/description?description=${encodedDescription}`
//       );

//       // Check if the response data contains the stock item and return it
//       return response.data?.length > 0 ? response.data[0] : null;
//     } catch (error) {
//       console.error("Failed to fetch stock by description:", error);
//       // Optionally, return more specific information based on the error type
//       return null;
//     }
//   },

//   deleteStock: async (id) => {
//     try {
//       await axios.delete(`${baseURL}/api/stocks/${id}`);
//       set((state) => ({
//         stocks: state.stocks.filter((stock) => stock.id !== id),
//       }));
//     } catch (error) {
//       console.error("Failed to delete stock:", error);
//     }
//   },

//   /** =============================== SALES SECTION ============================ */
//   fetchSales: async () => {
//     try {
//       const response = await axios.get("${baseURL}/api/sales/");
//       console.log('Fetched Sales Data:', response.data); // Log the full data received
//       set({ sales: response.data });
//     } catch (error) {
//       console.error(
//         "Failed to fetch sales:",
//         error.response?.data || error.message
//       );
//     }
//   },

//   addSale: async (sale) => {
//     try {
//       const response = await axios.post(
//         "${baseURL}/api/sales/add",
//         sale
//       );
//       set((state) => ({
//         sales: [...state.sales, response.data],
//       }));
//     } catch (error) {
//       console.error("Failed to add sale:", error);
//     }
//   },

//   updateSale: async (id, newStatus) => {
//     try {
//       // Construct the URL using the sale ID
//       const url = `${baseURL}/api/sales/${id}/status`;

//       // Make the PUT request with the new status
//       const response = await axios.put(url, { status: newStatus });

//       // Update the state with the new sale data
//       set((state) => ({
//         sales: state.sales.map((sale) =>
//           sale.id === id ? { ...sale, ...response.data } : sale
//         ),
//       }));
//     } catch (error) {
//       console.error("Failed to update sale:", error);
//     }
//   },

//   /** =============================== RETURN SECTION ============================ */
//   addReturn: async (returnData) => {
//     try {
//       const response = await axios.post(
//         "${baseURL}/api/sales/return",
//         returnData
//       );
//       set((state) => ({
//         returns: [...state.returns, response.data],
//       }));
//     } catch (error) {
//       console.error("Failed to add return:", error);
//     }
//   },

//   /** =============================== EXCHANGE SECTION ============================ */
//   addExchange: async (exchangeData) => {
//     try {
//       const response = await axios.post(
//         "${baseURL}/api/sales/exchange",
//         exchangeData
//       );
//       set((state) => ({
//         exchanges: [...state.exchanges, response.data],
//       }));
//     } catch (error) {
//       console.error("Failed to add exchange:", error);
//     }
//   },

//   /** =============================== AUTH SECTION ============================ */
//   signup: async (userData) => {
//     try {
//       await axios.post("${baseURL}/api/auth/signup", userData);
//     } catch (error) {
//       console.error("Signup failed:", error);
//     }
//   },

//   login: async (username, password, onSuccess) => {
//     try {
//       const response = await axios.post(
//         "${baseURL}/api/auth/login",
//         { username, password }
//       );
//       const { token } = response.data;

//       if (token) {
//         localStorage.setItem("token", token);
//         const decodedToken = jwtDecode(token);

//         set({
//           user: decodedToken.username,
//           token,
//           role: decodedToken.role,
//         });

//         // Call the success callback for redirecting
//         if (onSuccess) onSuccess(decodedToken.role);
//       } else {
//         throw new Error("No token received");
//       }
//     } catch (error) {
//       console.error("Login failed:", error);
//       throw new Error("Login failed.");
//     }
//   },

//   logout: async () => {
//     try {
//       await axios.post("${baseURL}/api/auth/logout");
//       localStorage.removeItem("token");
//       set({ user: null, token: null, role: null });
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   },

//   loadUserFromLocalStorage: () => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token);
//         set({
//           user: decodedToken.username,
//           role: decodedToken.role || null,
//           token,
//         });
//       } catch (error) {
//         console.error("Failed to decode token:", error);
//         set({ user: null, role: null, token: null });
//       }
//     }
//   },

//   checkLock: async () => {
//     try {
//       const { token } = get();
//       const response = await axios.get(
//         "${baseURL}/api/auth/checklock",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       set({ isLocked: response.data.lock_status === "locked" });
//     } catch (error) {
//       console.error("Failed to fetch lock status:", error);
//     }
//   },

//   toggleLock: async () => {
//     try {
//       const { token } = get();
//       const response = await axios.post(
//         "${baseURL}/api/auth/togglelock",
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       set({ isLocked: response.data.lock_status === "locked" });
//     } catch (error) {
//       console.error("Failed to toggle lock status:", error);
//     }
//   },

//    // Check if user is authenticated
//    isAuthenticated: () => {
//     if (typeof window !== "undefined") {
//       const token = localStorage.getItem("token");
//       return !!token;
//     }
//     return false;
//   },
// }));

// export default useStore;

// import { create } from "zustand";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
// import Cookies from "js-Cookies";

// // Set up Axios Interceptors for request handling
// // axios.interceptors.request.use(
// //   (config) => {
// //     const token = localStorage.getItem("token");
// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     }
// //     console.log("Request config:", config); // Log the config to verify headers
// //     return config;
// //   },
// //   (error) => Promise.reject(error)
// // );

// axios.interceptors.request.use(
//   (config) => {
//     const token = Cookies.get("token"); // Get the token from Cookies
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     console.log("Request config:", config); // Log the config to verify headers
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// const useStore = create((set, get) => ({
//   // State variables
//   stocks: [],
//   filteredStocks: [],
//   sales: [],
//   categories: [],
//   user: null,
//   token: null,
//   role: null,
//   isLocked: false,
//   loading: false,

//   /** =============================== CATEGORY SECTION ============================ */
//   fetchCategories: async () => {
//     try {
//       const response = await axios.get("${baseURL}/api/categories");
//       set({ categories: response.data });
//     } catch (error) {
//       console.error("Failed to fetch categories:", error);
//     }
//   },

//   addCategory: async (category) => {
//     try {
//       const response = await axios.post(
//         "${baseURL}/api/categories/add",
//         category
//       );
//       set((state) => ({
//         categories: [...state.categories, response.data],
//       }));
//     } catch (error) {
//       console.error("Failed to add category:", error);
//     }
//   },

//   updateCategory: async (id, updatedCategory) => {
//     try {
//       const response = await axios.put(
//         `${baseURL}/api/categories/${id}`,
//         updatedCategory
//       );
//       set((state) => ({
//         categories: state.categories.map((cat) =>
//           cat.id === id ? { ...cat, ...response.data } : cat
//         ),
//       }));
//     } catch (error) {
//       console.error("Failed to update category:", error);
//     }
//   },

//   deleteCategory: async (id) => {
//     try {
//       await axios.delete(`${baseURL}/api/categories/${id}`);
//       set((state) => ({
//         categories: state.categories.filter((cat) => cat.id !== id),
//       }));
//     } catch (error) {
//       console.error("Failed to delete category:", error);
//     }
//   },

//   /** =============================== STOCK SECTION ============================ */
//   saveStock: async (stock) => {
//     try {
//       const response = stock.description
//         ? await axios.put(
//             `${baseURL}/api/stocks/${stock.description}`,
//             stock
//           )
//         : await axios.post("${baseURL}/api/stocks/add", stock);

//       set((state) => ({
//         stocks: [
//           ...state.stocks.filter((s) => s.id !== stock.id),
//           response.data,
//         ],
//       }));
//     } catch (error) {
//       console.error("Failed to save stock:", error);
//     }
//   },

//   setFilteredStocks: (filteredStocks) => set({ filteredStocks }),

//   fetchStocks: async () => {
//     try {
//       const response = await axios.get("${baseURL}/api/stocks");
//       set({ stocks: response.data });
//     } catch (error) {
//       console.error(
//         "Failed to fetch stocks:",
//         error.response?.data || error.message
//       );
//     }
//   },

//   fetchStockByDescription: async (description) => {
//     try {
//       const encodedDescription = encodeURIComponent(description);
//       const response = await axios.get(
//         `${baseURL}/api/stocks/description?description=${encodedDescription}`
//       );
//       return response.data?.length > 0 ? response.data[0] : null;
//     } catch (error) {
//       console.error("Failed to fetch stock by description:", error);
//       return null;
//     }
//   },

//   deleteStock: async (id) => {
//     try {
//       await axios.delete(`${baseURL}/api/stocks/${id}`);
//       set((state) => ({
//         stocks: state.stocks.filter((stock) => stock.id !== id),
//       }));
//     } catch (error) {
//       console.error("Failed to delete stock:", error);
//     }
//   },

//   /** =============================== SALES SECTION ============================ */
//   fetchSales: async () => {
//     try {
//       const response = await axios.get("${baseURL}/api/sales/");
//       console.log("Fetched Sales Data:", response.data);
//       set({ sales: response.data.sales });
//     } catch (error) {
//       console.error(
//         "Failed to fetch sales:",
//         error.response?.data || error.message
//       );
//     }
//   },

//   // New function to fetch sale by ID
//   fetchSalesById: async (id) => {
//     try {
//       const response = await axios.get(`${baseURL}/api/sales/${id}`);
//       return response.data; // Return the fetched sale data
//     } catch (error) {
//       console.error("Failed to fetch sale by ID:", error);
//       return null; // Return null if there's an error
//     }
//   },

//   // fetchSales: async () => {
//   //   try {
//   //     const response = await axios.get("${baseURL}/api/sales/");
//   //     console.log("Fetched Sales Data:", response.data);
//   //     set({ sales: response.data.sales }); // Ensure you're setting the data correctly
//   //   } catch (error) {
//   //     console.error("Failed to fetch sales:", error.response?.data || error.message);
//   //   }
//   // },

//   // addSale: async (sale) => {
//   //   // try {
//   //   //   const response = await axios.post("${baseURL}/api/sales/add", sale);
//   //   //   set((state) => ({
//   //   //     sales: [...state.sales, response.data],
//   //   //   }));
//   //   // } catch (error) {
//   //   //   console.error("Failed to add sale:", error);
//   //   //   throw error; // Re-throw error to handle it in the calling function
//   //   // }

//   //   // try {
//   //   //   const response = await axios.post('/api/sales', saleData);
//   //   //   return response;  // Return the response on success
//   //   // } catch (error) {
//   //   //   if (error.response) {
//   //   //     // Return error response if the request failed
//   //   //     return { error: error.response.data.error };
//   //   //   } else {
//   //   //     // Return a generic error message if no response was received
//   //   //     return { error: "An unknown error occurred. Please try again." };
//   //   //   }
//   //   // }
//   //   try {
//   //     const response = await axios.post(
//   //       "${baseURL}/api/sales/add",
//   //       sale
//   //     );
//   //     console.log("Sale added successfully:", response.data);
//   //     return response.data; // Return the response data
//   //   } catch (error) {
//   //     if (error.response) {
//   //       // Server responded with a status other than 2xx
//   //       console.error("Error response:", error.response.data.error);
//   //       return { error: error.response.data.error }; // Return the error message
//   //     } else if (error.request) {
//   //       // Request was made but no response received
//   //       console.error("No response received:", error.request);
//   //       return { error: "No response received from the server." }; // Return specific error
//   //     } else {
//   //       // Something else happened
//   //       console.error("Error setting up request:", error.message);
//   //       return { error: "An unknown error occurred. Please try again." }; // Return generic error
//   //     }
//   //   }
//   // },

//   addSale: async (sale) => {
//     try {
//       // Send the sale data to the backend
//       const response = await axios.post(
//         "${baseURL}/api/sales/add",
//         sale
//       );

//       // Log the response for debugging purposes
//       console.log("Sale added successfully:", response.data);

//       // Check if the sales_id is part of the response data
//       const { sales_id } = response.data;

//       if (sales_id) {
//         console.log("Sales ID received:", sales_id);

//         // Here, you can use this sales_id for your receipt
//         set((state) => ({
//           sales: [...state.sales, { ...sale, sales_id }],
//           currentSalesId: sales_id, // Optionally set it to state for receipt generation
//         }));

//         return { sales_id }; // Return the sales_id for further use (e.g., receipt printing)
//       } else {
//         console.error("No sales ID returned from the server.");
//         return { error: "Sale added but no sales ID received." };
//       }
//     } catch (error) {
//       // Handle errors
//       if (error.response) {
//         console.error("Error response:", error.response.data.error);
//         return { error: error.response.data.error }; // Return the error message from the server
//       } else if (error.request) {
//         console.error("No response received:", error.request);
//         return { error: "No response received from the server." };
//       } else {
//         console.error("Error setting up request:", error.message);
//         return { error: "An unknown error occurred. Please try again." };
//       }
//     }
//   },

//   updateSale: async (id, newStatus) => {
//     try {
//       const url = `${baseURL}/api/sales/${id}/status`;
//       const response = await axios.put(url, { status: newStatus });
//       set((state) => ({
//         sales: state.sales.map((sale) =>
//           sale.id === id ? { ...sale, ...response.data } : sale
//         ),
//       }));
//     } catch (error) {
//       console.error("Failed to update sale:", error);
//     }
//   },

//   /** =============================== RETURN SECTION ============================ */
//   // addReturn: async (returnData) => {
//   //   try {
//   //     const response = await axios.post(
//   //       "${baseURL}/api/sales/return",
//   //       returnData
//   //     );
//   //     set((state) => ({
//   //       returns: [...state.returns, response.data],
//   //     }));
//   //   } catch (error) {
//   //     console.error("Failed to add return:", error);
//   //   }
//   // },

//   addReturn: async (returnData) => {
//     try {
//       const response = await axios.post(
//         "${baseURL}/api/sales/return",
//         returnData
//       );

//       console.log("Full Return Response:", response.data); // Log full response
//       const { return_Id } = response.data;

//       if (return_Id) {
//         console.log("Return ID received:", return_Id);

//         // Here, you can use this sales_id for your receipt
//         // Update the state to include the returnId
//         set((state) => ({
//           returns: [...state.returns, { ...returnData, return_Id }],
//           returnId: return_Id, // Storing returnId for immediate access
//         }));

//         return { return_Id }; // Return the sales_id for further use (e.g., receipt printing)
//       } else {
//         console.error("No sales ID returned from the server.");
//         return { error: "Sale added but no sales ID received." };
//       }
//     } catch (error) {
//       console.error("Failed to add return:", error);
//     }
//   },

//   /** =============================== EXCHANGE SECTION ============================ */
//   // addExchange: async (exchangeData) => {
//   //   try {
//   //     const response = await axios.post(
//   //       "${baseURL}/api/sales/exchange",
//   //       exchangeData
//   //     );
//   //     set((state) => ({
//   //       exchanges: [...state.exchanges, response.data],
//   //     }));
//   //   } catch (error) {
//   //     console.error("Failed to add exchange:", error);
//   //   }
//   // },

//   addExchange: async (exchangeData) => {
//     try {
//       const response = await axios.post(
//         "${baseURL}/api/sales/exchange",
//         exchangeData
//       );

//       console.log("Full Exchange Response:", response.data); // Log full response
//       const { exchangeId } = response.data;

//       // Log to check if exchangeId is coming through
//       console.log("Exchange ID received:", exchangeId);

//       // Update the state to include the exchangeId
//       set((state) => ({
//         exchanges: [...state.exchanges, { ...exchangeData, exchangeId }],
//         exchangeId: exchangeId, // Storing exchangeId for immediate access
//       }));

//       return { exchangeId };
//     } catch (error) {
//       console.error("Failed to add exchange:", error);
//     }
//   },

//   /** =============================== AUTH SECTION ============================ */
//   signup: async (userData) => {
//     try {
//       await axios.post("${baseURL}/api/auth/signup", userData);
//     } catch (error) {
//       console.error("Signup failed:", error);
//     }
//   },

//   // login: async (username, password, onSuccess) => {
//   //   try {
//   //     const response = await axios.post(
//   //       "${baseURL}/api/auth/login",
//   //       { username, password }
//   //     );
//   //     const { token } = response.data;

//   //     if (token) {
//   //       localStorage.setItem("token", token);
//   //       const decodedToken = jwtDecode(token);

//   //       set({
//   //         user: decodedToken.username,
//   //         token,
//   //         role: decodedToken.role,
//   //       });

//   //       if (onSuccess) onSuccess(decodedToken.role);
//   //     } else {
//   //       throw new Error("No token received");
//   //     }
//   //   } catch (error) {
//   //     console.error("Login failed:", error);
//   //     throw new Error("Login failed.");
//   //   }
//   // },

//   login: async (username, password, onSuccess) => {
//     try {
//       const response = await axios.post(
//         "${baseURL}/api/auth/login",
//         { username, password },
//         { withCredentials: true } // This tells Axios to include Cookies in the request
//       );

//       const { user } = response.data; // Receive the user details from the response

//       console.log("Response headers:", response.headers);
//       if (user) {
//         set({
//           user: user.username,
//           role: user.role,
//         });

//         if (onSuccess) onSuccess(user.role); // Execute onSuccess callback if provided
//       } else {
//         throw new Error("Login failed. User data not received.");
//       }
//     } catch (error) {
//       console.error("Login failed:", error);
//       throw new Error("Login failed.");
//     }
//   },

//   logout: async () => {
//     try {
//       await axios.post("${baseURL}/api/auth/logout");
//       localStorage.removeItem("token");
//       set({ user: null, token: null, role: null });
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   },

//   /** =============================== CUSTOMER SECTION ============================ */
//   getCustomerDetails: async (customer_name) => {
//     try {
//       const response = await axios.get(
//         `${baseURL}/api/sales/customers/${encodeURIComponent(
//           customer_name
//         )}`
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Failed to get customer details:", error);
//       return null;
//     }
//   },

//   loadUserFromLocalStorage: () => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token);
//         set({
//           user: decodedToken.username,
//           role: decodedToken.role || null,
//           token,
//         });
//       } catch (error) {
//         console.error("Failed to decode token:", error);
//         set({ user: null, role: null, token: null });
//       }
//     }
//   },

//   loadUserFromCookies: () => {
//     const token = Cookies.get("token"); // Get the token from Cookies
//     console.log("Token from Cookies:", token); // Log the token

//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token);
//         console.log("Decoded token:", decodedToken); // Log the decoded token
//         set({
//           user: decodedToken.username,
//           role: decodedToken.role || null,
//           token,
//         });
//       } catch (error) {
//         console.error("Failed to decode token:", error);
//         set({ user: null, role: null, token: null });
//       }
//     } else {
//       console.log("No token found in Cookies."); // Log if no token is found
//       set({ user: null, role: null, token: null });
//     }
//   },

//   checkLock: async () => {
//     try {
//       const { token } = get();
//       const response = await axios.get(
//         "${baseURL}/api/auth/checklock",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       set({ isLocked: response.data.lock_status === "locked" });
//     } catch (error) {
//       console.error("Failed to fetch lock status:", error);
//     }
//   },

//   toggleLock: async () => {
//     try {
//       const { token } = get();
//       const response = await axios.post(
//         "${baseURL}/api/auth/togglelock",
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       set({ isLocked: response.data.lock_status === "locked" });
//     } catch (error) {
//       console.error("Failed to toggle lock status:", error);
//     }
//   },

//   isAuthenticated: () => {
//     if (typeof window !== "undefined") {
//       const token = localStorage.getItem("token");
//       return !!token;
//     }
//     return false;
//   },

//   fetchUser: async () => {
//     try {
//       console.log("Attempting to fetch the token from Cookies...");

//       // Try to get the token from Cookies
//       const token = Cookies.get('token');

//       if (token) {
//         console.log("Token retrieved from Cookies:", token);

//         // Decode the token
//         const decoded = jwtDecode(token);
//         console.log("Decoded token:", decoded);

//         // Set the user and role in the state
//         set({ user: decoded.username, role: decoded.role });
//         console.log("User and role set:", { username: decoded.username, role: decoded.role });
//       } else {
//         console.log("Token from Cookies: undefined");
//       }
//     } catch (error) {
//       console.error("Failed to fetch user:", error);
//     }
//   },

// }));

// export default useStore;

// import { create } from "zustand";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode"; // corrected import
// import Cookies from "js-Cookies"; // Using js-Cookies for handling Cookies

// // Axios interceptor to add the Authorization header
// // Axios interceptor to attach token in Cookies to the request headers
// axios.interceptors.request.use(
//   (config) => {
//     const token = Cookies.get("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// const useStore = create((set, get) => ({
//   // State variables
//   stocks: [],
//   filteredStocks: [],
//   sales: [],
//   categories: [],
//   user: null,
//   token: null,
//   role: null,
//   isLocked: false,
//   loading: false,

//   /** =============================== CATEGORY SECTION ============================ */
//   fetchCategories: async () => {
//     try {
//       const response = await axios.get("${baseURL}/api/categories");
//       set({ categories: response.data });
//     } catch (error) {
//       console.error("Failed to fetch categories:", error);
//     }
//   },

//   addCategory: async (category) => {
//     try {
//       const response = await axios.post(
//         "${baseURL}/api/categories/add",
//         category
//       );
//       set((state) => ({
//         categories: [...state.categories, response.data],
//       }));
//     } catch (error) {
//       console.error("Failed to add category:", error);
//     }
//   },

//   updateCategory: async (id, updatedCategory) => {
//     try {
//       const response = await axios.put(
//         `${baseURL}/api/categories/${id}`,
//         updatedCategory
//       );
//       set((state) => ({
//         categories: state.categories.map((cat) =>
//           cat.id === id ? { ...cat, ...response.data } : cat
//         ),
//       }));
//     } catch (error) {
//       console.error("Failed to update category:", error);
//     }
//   },

//   deleteCategory: async (id) => {
//     try {
//       await axios.delete(`${baseURL}/api/categories/${id}`);
//       set((state) => ({
//         categories: state.categories.filter((cat) => cat.id !== id),
//       }));
//     } catch (error) {
//       console.error("Failed to delete category:", error);
//     }
//   },

//   /** =============================== STOCK SECTION ============================ */
//   saveStock: async (stock) => {
//     try {
//       const response = stock.description
//         ? await axios.put(
//             `${baseURL}/api/stocks/${stock.description}`,
//             stock
//           )
//         : await axios.post("${baseURL}/api/stocks/add", stock);

//       set((state) => ({
//         stocks: [
//           ...state.stocks.filter((s) => s.id !== stock.id),
//           response.data,
//         ],
//       }));
//     } catch (error) {
//       console.error("Failed to save stock:", error);
//     }
//   },

//   setFilteredStocks: (filteredStocks) => set({ filteredStocks }),

//   fetchStocks: async () => {
//     try {
//       const response = await axios.get("${baseURL}/api/stocks");
//       set({ stocks: response.data });
//     } catch (error) {
//       console.error(
//         "Failed to fetch stocks:",
//         error.response?.data || error.message
//       );
//     }
//   },

//   fetchStockByDescription: async (description) => {
//     try {
//       const encodedDescription = encodeURIComponent(description);
//       const response = await axios.get(
//         `${baseURL}/api/stocks/description?description=${encodedDescription}`
//       );
//       return response.data?.length > 0 ? response.data[0] : null;
//     } catch (error) {
//       console.error("Failed to fetch stock by description:", error);
//       return null;
//     }
//   },

//   deleteStock: async (id) => {
//     try {
//       await axios.delete(`${baseURL}/api/stocks/${id}`);
//       set((state) => ({
//         stocks: state.stocks.filter((stock) => stock.id !== id),
//       }));
//     } catch (error) {
//       console.error("Failed to delete stock:", error);
//     }
//   },

//   /** =============================== SALES SECTION ============================ */
//   fetchSales: async () => {
//     try {
//       const response = await axios.get("${baseURL}/api/sales/");
//       console.log("Fetched Sales Data:", response.data);
//       set({ sales: response.data.sales });
//     } catch (error) {
//       console.error(
//         "Failed to fetch sales:",
//         error.response?.data || error.message
//       );
//     }
//   },

//   fetchSalesById: async (id) => {
//     try {
//       const response = await axios.get(`${baseURL}/api/sales/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error("Failed to fetch sale by ID:", error);
//       return null;
//     }
//   },

//   addSale: async (sale) => {
//     try {
//       const response = await axios.post(
//         "${baseURL}/api/sales/add",
//         sale
//       );
//       const { sales_id } = response.data;

//       if (sales_id) {
//         set((state) => ({
//           sales: [...state.sales, { ...sale, sales_id }],
//           currentSalesId: sales_id,
//         }));

//         return { sales_id };
//       } else {
//         console.error("No sales ID returned from the server.");
//         return { error: "Sale added but no sales ID received." };
//       }
//     } catch (error) {
//       return error.response
//         ? { error: error.response.data.error }
//         : { error: "An unknown error occurred. Please try again." };
//     }
//   },

//   /** =============================== AUTH SECTION ============================ */
//   signup: async (userData) => {
//     try {
//       await axios.post("${baseURL}/api/auth/signup", userData);
//     } catch (error) {
//       console.error("Signup failed:", error);
//     }
//   },

//   // login: async (username, password, onSuccess) => {
//   //   try {
//   //     const response = await axios.post(
//   //       "${baseURL}/api/auth/login",
//   //       { username, password },
//   //       { withCredentials: true }
//   //     );

//   //     const { user, token } = response.data;

//   //     if (user) {
//   //       // Store non-sensitive user info in localStorage
//   //       localStorage.setItem("user", JSON.stringify({ username: user.username, role: user.role }));

//   //       // Store JWT token in an httpOnly Cookies (server has already done this in the response)
//   //       set({ user: user.username, role: user.role });
//   //       Cookies.set("token", token); // Store token in Cookies for axios interceptor
//   //       if (onSuccess) onSuccess(user.role);
//   //     } else {
//   //       throw new Error("Login failed. User data not received.");
//   //     }
//   //   } catch (error) {
//   //     console.error("Login failed:", error);
//   //     throw new Error("Login failed.");
//   //   }
//   // },

//   // logout: async () => {
//   //   try {
//   //     await axios.post("${baseURL}/api/auth/logout");
//   //     // Clear token from Cookies
//   //     Cookies.remove("token");
//   //     // Clear user info from localStorage
//   //     localStorage.removeItem("user");

//   //     set({ user: null, role: null, token: null });
//   //   } catch (error) {
//   //     console.error("Logout failed:", error);
//   //   }
//   // },

//   login: async (username, password, onSuccess) => {
//     try {
//       const response = await axios.post(
//         "${baseURL}/api/auth/login",
//         { username, password },
//         { withCredentials: true } // Allow sending Cookies
//       );

//       const { user } = response.data;

//       if (user) {
//         // Store non-sensitive user info in localStorage
//         localStorage.setItem(
//           "user",
//           JSON.stringify({ username: user.username, role: user.role })
//         );

//         // Set user state
//         set({ user: user.username, role: user.role });

//         if (onSuccess) onSuccess(user.role);
//       } else {
//         throw new Error("Login failed. User data not received.");
//       }
//     } catch (error) {
//       console.error("Login failed:", error);
//       throw new Error("Login failed.");
//     }
//   },

//   logout: async () => {
//     try {
//       await axios.post("${baseURL}/api/auth/logout");
//       // Clear user info from localStorage
//       localStorage.removeItem("user");
//       set({ user: null, role: null });
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   },

//   /** =============================== Cookies & AUTH HANDLING ============================ */
//   loadUserFromStorage: () => {
//     const token = Cookies.get("accessToken"); // Changed to accessToken
//     const storedUser = localStorage.getItem("user");

//     if (token && storedUser) {
//       try {
//         const decodedToken = jwtDecode(token);
//         const user = JSON.parse(storedUser);

//         // Check if the token has expired
//         const isTokenExpired = Date.now() >= decodedToken.exp * 1000;
//         if (isTokenExpired) {
//           console.log("Token expired");
//           Cookies.remove("accessToken"); // Changed to accessToken
//           localStorage.removeItem("user");
//           set({ user: null, role: null });
//         } else {
//           set({
//             user: user.username,
//             role: user.role,
//           });
//         }
//       } catch (error) {
//         console.error("Error loading user from Cookies/localStorage:", error);
//         set({ user: null, role: null });
//       }
//     } else {
//       set({ user: null, role: null });
//     }
//   },

//   isAuthenticated: () => {
//     const token = Cookies.get("accessToken"); // Changed to accessToken
//     return !!token;
//   },

//   checkLock: async () => {
//     try {
//       const response = await axios.get(
//         "${baseURL}/api/auth/checklock"
//       );
//       set({ isLocked: response.data.lock_status === "locked" });
//     } catch (error) {
//       console.error("Failed to fetch lock status:", error);
//     }
//   },

//   toggleLock: async () => {
//     try {
//       const response = await axios.post(
//         "${baseURL}/api/auth/togglelock"
//       );
//       set({ isLocked: response.data.lock_status === "locked" });
//     } catch (error) {
//       console.error("Failed to toggle lock status:", error);
//     }
//   },

//   // checkLock: async () => {
//   //   try {
//   //     const { token } = get();
//   //     const response = await axios.get(
//   //       "${baseURL}/api/auth/checklock",
//   //       {
//   //         headers: { Authorization: `Bearer ${token}` },
//   //       }
//   //     );
//   //     set({ isLocked: response.data.lock_status === "locked" });
//   //   } catch (error) {
//   //     console.error("Failed to fetch lock status:", error);
//   //   }
//   // },

//   // toggleLock: async () => {
//   //   try {
//   //     const { token } = get();
//   //     const response = await axios.post(
//   //       "${baseURL}/api/auth/togglelock",
//   //       {},
//   //       {
//   //         headers: { Authorization: `Bearer ${token}` },
//   //       }
//   //     );
//   //     set({ isLocked: response.data.lock_status === "locked" });
//   //   } catch (error) {
//   //     console.error("Failed to toggle lock status:", error);
//   //   }
//   // },

//   // isAuthenticated: () => {
//   //   if (typeof window !== "undefined") {
//   //     const token = Cookies.get("token");
//   //     return !!token;
//   //   }
//   //   return false;
//   // },
// }));

// export default useStore;

import { create } from "zustand";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // corrected import
import Cookies from "js-cookie"; // Using js-Cookies for handling Cookies
import dotenv from "dotenv";

dotenv.config();

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

// Assuming you have a way to retrieve the auth token, e.g. from local storage or a global state
const getAuthToken = () => {
  // Replace with your method to retrieve the token
  return Cookies.get("accessToken");
};


if (process.env.NODE_ENV === "production") {
  // Use the public URL provided by Coolify
  baseURL = "https://server.e-palateoasis.com"; // Replace with your actual Coolify URL
} else {
  // Use localhost for development
  baseURL = "http://localhost:5000";
}

// Function to update the base URL
export const setBaseURL = (url) => {
  baseURL = url;
};

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

  /** =============================== CATEGORY SECTION ============================ */
  fetchCategories: async () => {
    try {
      apiGet("/categories")
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
  // saveStock: async (stock) => {
  //   try {
  //     const response = stock.description
  //       ? await axios.put(
  //           `${baseURL}/api/stocks/${stock.description}`,
  //           stock
  //         )
  //       : await axios.post("${baseURL}/api/stocks/add", stock);

  //     set((state) => ({
  //       stocks: [
  //         ...state.stocks.filter((s) => s.id !== stock.id),
  //         response.data,
  //       ],
  //     }));
  //   } catch (error) {
  //     console.error("Failed to save stock:", error);
  //   }
  // },

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
    try {
      const response = await axios.post(`${baseURL}/api/stocks/add/`, stock);
      // Update the local state with the new stock
      set((state) => ({
        stocks: [...state.stocks, response.data],
      }));
    } catch (error) {
      console.error("Failed to add stock:", error);
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
    try {
      const response = await axios.get(`${baseURL}/api/stocks`);
      set({ stocks: response.data });
    } catch (error) {
      console.error(
        "Failed to fetch stocks:",
        error.response?.data || error.message
      );
    }
  },

  fetchStockByDescription: async (description) => {
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

  /** =============================== SALES SECTION ============================ */
  fetchSales: async () => {
    try {
      const response = await axios.get(`${baseURL}/api/sales/`);
      console.log("Fetched Sales Data:", response.data);
      set({ sales: response.data.sales });
    } catch (error) {
      console.error(
        "Failed to fetch sales:",
        error.response?.data || error.message
      );
    }
  },

  fetchSalesById: async (id) => {
    try {
      const response = await axios.get(`${baseURL}/api/sales/${id}`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch sale by ID:", error);
      return null;
    }
  },

  addSale: async (sale) => {
    try {
      const response = await axios.post(`${baseURL}/api/sales/add`, sale);
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
  },

  /** =============================== AUTH SECTION ============================ */
  signup: async (userData) => {
    try {
      await axios.post(`${baseURL}/api/auth/signup`, userData);
    } catch (error) {
      console.error("Signup failed:", error);
    }
  },


  login: async (username, password, onSuccess) => {
    try {
      const response = await axios.post(
        `${baseURL}/api/auth/login`,
        { username, password },
        { withCredentials: true } // Important for sending and receiving cookies
      );

      console.log("Login response:", response.data); // Log the response data

      const { user} = response.data;

      if (user) {
        // Store user data (including role) in localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({ username: user.username, role: user.role })
        );
        // Cookies.set("accessToken", accessToken, { sameSite: "Strict" });
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
  },

  /** =============================== CUSTOMER SECTION ============================ */
  getCustomerDetails: async (customer_name) => {
    try {
      const response = await axios.get(
        `${baseURL}/api/sales/customers/${encodeURIComponent(customer_name)}`
      );
      return response.data;
    } catch (error) {
      console.error("Failed to get customer details:", error);
      return null;
    }
  },

  logout: async () => {
    try {
      await axios.post(`${baseURL}/api/auth/logout`);
      // Clear user info from localStorage
      localStorage.removeItem("user");
      set({ user: null, role: null });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  },

  /** =============================== Cookies & AUTH HANDLING ============================ */
  // loadUserFromStorage: () => {
  //   const token = Cookies.get("accessToken"); // Access token from Cookies
  //   console.log("Access token from Cookies:", token); // Log the token

  //   const storedUser = localStorage.getItem("user"); // User info from localStorage
  //   console.log("Stored user from localStorage:", storedUser); // Log the stored user

  //   if (token && storedUser) {
  //     try {
  //       const decodedToken = jwtDecode(token); // Decode JWT token
  //       const user = JSON.parse(storedUser); // Parse stored user data

  //       // Check if the token is expired
  //       const isTokenExpired = Date.now() >= decodedToken.exp * 1000;
  //       console.log("Is token expired?", isTokenExpired); // Log the token expiration status

  //       if (isTokenExpired) {
  //         console.log("Token expired");
  //         Cookies.remove("accessToken"); // Remove token from Cookies
  //         localStorage.removeItem("user"); // Clear user info from localStorage
  //         set({ user: null, role: null });
  //       } else {
  //         console.log("Token valid. Setting user and role in state.");
  //         set({
  //           user: user.username,
  //           role: user.role,
  //         });
  //       }
  //     } catch (error) {
  //       console.error("Error loading user from Cookies/localStorage:", error);
  //       set({ user: null, role: null });
  //     }
  //   } else {
  //     console.log("No token or stored user found.");
  //     set({ user: null, role: null });
  //   }
  // },

  // const refreshAccessToken = async () => {
  //   try {
  //     // Make a POST request to refresh the access token
  //     const response = await axios.post(`${baseURL}/api/auth/refresh`, null, {
  //       withCredentials: true, // To include cookies (for refreshToken)
  //     });
  
  //     // Log success if the token is refreshed
  //     if (response.status === 200) {
  //       console.log("Access token refreshed successfully");
  //       return true;
  //     }
  //   } catch (error) {
  //     console.error("Failed to refresh access token:", error);
  //     return false; // Return false on failure to refresh the token
  //   }
  // }


  loadUserFromStorage: async () => {
    const token = Cookies.get("accessToken"); // Access token from Cookies
    const refreshToken = Cookies.get("refreshToken"); // Refresh token from Cookies
    console.log("Access token from Cookies:", token); // Log the token
  
    const storedUser = localStorage.getItem("user"); // User info from localStorage
    console.log("Stored user from localStorage:", storedUser); // Log the stored user
  
    if (token && storedUser) {
      try {
        const decodedToken = jwtDecode(token); // Decode JWT token
        const user = JSON.parse(storedUser); // Parse stored user data
  
        // Check if the token is expired or about to expire (within 5 minutes)
        const isTokenExpired = Date.now() >= decodedToken.exp * 1000;
        const isTokenAboutToExpire = Date.now() >= decodedToken.exp * 1000 - 5 * 60 * 1000;
        
        if (isTokenExpired) {
          console.log("Token expired");
          Cookies.remove("accessToken"); // Remove token from Cookies
          Cookies.remove("refreshToken"); // Remove refresh token (if applicable)
          localStorage.removeItem("user"); // Clear user info from localStorage
          set({ user: null, role: null });
          return false; // Token is expired, not authenticated
        } else if (isTokenAboutToExpire && refreshToken) {
          // Token is about to expire, try refreshing
          const refreshed = await refreshAccessToken();
          if (refreshed) {
            console.log("Token refreshed successfully");
          } else {
            console.log("Failed to refresh token");
            set({ user: null, role: null });
            return false;
          }
        }
  
        console.log("Token valid. Setting user and role in state.");
        set({
          user: user.username,
          role: user.role,
        });
        return true; // User is authenticated
      } catch (error) {
        console.error("Error loading user from Cookies/localStorage:", error);
        set({ user: null, role: null });
        return false;
      }
    } else {
      console.log("No token or stored user found.");
      set({ user: null, role: null });
      return false;
    }
  },
  
  // Function to refresh access token
  
  
  refreshAccessToken: async () => {
    try {
      // Make a POST request to refresh the access token
      const response = await axios.post(`${baseURL}/api/auth/refresh`, null, {
        withCredentials: true, // To include cookies (for refreshToken)
      });
  
      // Log success if the token is refreshed
      if (response.status === 200 && response.data.newAccessToken) {
        // Update the new access token in Cookies
        Cookies.set("accessToken", response.data.newAccessToken, { expires: 1 / 96 }); // Set it to expire in 15 minutes (optional)
        console.log("Access token refreshed and updated in cookies");
        return true;
      }
    } catch (error) {
      console.error("Failed to refresh access token:", error);
      return false; // Return false on failure to refresh the token
    }
  },
  




  isAuthenticated: () => {
    const token = Cookies.get("accessToken"); // Access token from Cookies
    const user = localStorage.getItem("user"); // User info from localStorage
    return !!token && !!user; // Both token and user data should be present
  },


  checkLock: async () => {
    try {
      const response = await axios.get(`${baseURL}/api/auth/checklock`, {
        withCredentials: true,
      });
      set({ isLocked: response.data.isLocked }); // Expecting a Boolean from the backend
    } catch (error) {
      console.error("Failed to fetch lock status:", error);
      // You can decide how to handle errors here
    }
  },

  // checkLock: async () => {
  //   try {
  //     const response = await axios.get("http://192.168.43.194:5000/api/auth/checklock", {
  //       withCredentials: true,
  //     });
  
  //     // Set the isLocked state based on the response
  //     set({ isLocked: response.data.isLocked });
      
  //     // Handle the message if needed
  //     if (response.data.isLocked) {
  //       console.warn(response.data.message); // Log the message if the system is locked
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch lock status:", error);
  //     // Handle other types of errors if necessary
  //   }
  // },

  
  

  // checkLock: async () => {
  //   try {
  //     const response = await axios.get(`${baseURL}/api/auth/checklock`, {
  //       headers: {
  //         Authorization: `Bearer ${getAuthToken()}`, // Add the auth token to the request
  //       },
  //     });
  //     set({ isLocked: response.data.lock_status === "locked" });
  //   } catch (error) {
  //     console.error("Failed to fetch lock status:", error);
  //     // Optionally handle specific error messages
  //   }
  // },

  // toggleLock: async () => {
  //   try {
  //     const response = await axios.post(
  //       `${baseURL}/api/auth/togglelock`,
  //       {},
  //       {
  //         withCredentials: true, // Ensures cookies are sent with the request
  //       }
  //     );
  //     set({ isLocked: response.data.lock_status === "locked" });
  //   } catch (error) {
  //     console.error("Failed to toggle lock status:", error);
  //   }
  // },

  //   toggleLock: async () => {
  //   try {
  //     const response = await axios.post(
  //       "http://192.168.43.194:5000/api/auth/togglelock",
  //       {},
  //       {
  //         withCredentials: true, // Ensures cookies are sent with the request
  //       }
  //     );
  //     set({ isLocked: response.data.lock_status === "locked" });
  //   } catch (error) {
  //     console.error("Failed to toggle lock status:", error);
  //   }
  // },

  checkLock: async () => {
    try {
      const response = await axios.get(`${baseURL}/api/auth/checklock`, {
        withCredentials: true, // Ensures cookies are sent with the request
      });
      
      set({ isLocked: response.data.isLocked }); // Expecting a Boolean from the backend
    } catch (error) {
      console.error("Failed to fetch lock status:", error);
      // You can decide how to handle errors here (e.g., set a default lock state, show a notification, etc.)
    }
  },
  
}));

export default useStore;











// import { create } from "zustand";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode"; // corrected import
// import Cookies from "js-cookie"; // Using js-Cookies for handling Cookies

// // Axios interceptor to attach token in Cookies to the request headers
// axios.interceptors.request.use(
//   (config) => {
//     const token = Cookies.get("accessToken"); // Changed to accessToken
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Assuming you have a way to retrieve the auth token, e.g. from local storage or a global state
// const getAuthToken = () => {
//   // Replace with your method to retrieve the token
//   return Cookies.get("accessToken");
// };

// console.log("Auth Token:", getAuthToken()); // Log the token for debugging

// const useStore = create((set, get) => ({
//   // State variables
//   stocks: [],
//   filteredStocks: [],
//   sales: [],
//   categories: [],
//   user: null,
//   role: null,
//   isLocked: false,
//   loading: false,

//   /** =============================== CATEGORY SECTION ============================ */
//   fetchCategories: async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/categories");
//       set({ categories: response.data });
//     } catch (error) {
//       console.error("Failed to fetch categories:", error);
//     }
//   },

//   addCategory: async (category) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/categories/add",
//         category
//       );
//       set((state) => ({
//         categories: [...state.categories, response.data],
//       }));
//     } catch (error) {
//       console.error("Failed to add category:", error);
//     }
//   },

//   updateCategory: async (id, updatedCategory) => {
//     try {
//       const response = await axios.put(
//         `http://localhost:5000/api/categories/${id}`,
//         updatedCategory
//       );
//       set((state) => ({
//         categories: state.categories.map((cat) =>
//           cat.id === id ? { ...cat, ...response.data } : cat
//         ),
//       }));
//     } catch (error) {
//       console.error("Failed to update category:", error);
//     }
//   },

//   deleteCategory: async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/categories/${id}`);
//       set((state) => ({
//         categories: state.categories.filter((cat) => cat.id !== id),
//       }));
//     } catch (error) {
//       console.error("Failed to delete category:", error);
//     }
//   },

//   /** =============================== STOCK SECTION ============================ */
//   // saveStock: async (stock) => {
//   //   try {
//   //     const response = stock.description
//   //       ? await axios.put(
//   //           `http://localhost:5000/api/stocks/${stock.description}`,
//   //           stock
//   //         )
//   //       : await axios.post("http://localhost:5000/api/stocks/add", stock);

//   //     set((state) => ({
//   //       stocks: [
//   //         ...state.stocks.filter((s) => s.id !== stock.id),
//   //         response.data,
//   //       ],
//   //     }));
//   //   } catch (error) {
//   //     console.error("Failed to save stock:", error);
//   //   }
//   // },

//   saveStock: async (stock) => {
//     try {
//       if (stock.description) {
//         // If description exists, try to update the existing stock
//         await updateStock(stock);
//       } else {
//         // If no description, add new stock
//         await addStock(stock);
//       }
//     } catch (error) {
//       console.error("Failed to save stock:", error);
//     }
//   },

//   // Function to add new stock
//   addStock: async (stock) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/stocks/add",
//         stock
//       );
//       // Update the local state with the new stock
//       set((state) => ({
//         stocks: [...state.stocks, response.data],
//       }));
//     } catch (error) {
//       console.error("Failed to add stock:", error);
//     }
//   },

//   // Function to update existing stock
//   updateStock: async (stock) => {
//     try {
//       const response = await axios.put(
//         `http://localhost:5000/api/stocks/${stock.description}`,
//         stock
//       );
//       // Update the local state with the updated stock
//       set((state) => ({
//         stocks: [
//           ...state.stocks.filter((s) => s.id !== stock.id),
//           response.data,
//         ],
//       }));
//     } catch (error) {
//       console.error("Failed to update stock:", error);
//     }
//   },

//   setFilteredStocks: (filteredStocks) => set({ filteredStocks }),

//   fetchStocks: async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/stocks");
//       set({ stocks: response.data });
//     } catch (error) {
//       console.error(
//         "Failed to fetch stocks:",
//         error.response?.data || error.message
//       );
//     }
//   },

//   fetchStockByDescription: async (description) => {
//     try {
//       const encodedDescription = encodeURIComponent(description);
//       const response = await axios.get(
//         `http://localhost:5000/api/stocks/description?description=${encodedDescription}`
//       );
//       return response.data?.length > 0 ? response.data[0] : null;
//     } catch (error) {
//       console.error("Failed to fetch stock by description:", error);
//       return null;
//     }
//   },

//   deleteStock: async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/stocks/${id}`);
//       set((state) => ({
//         stocks: state.stocks.filter((stock) => stock.id !== id),
//       }));
//     } catch (error) {
//       console.error("Failed to delete stock:", error);
//     }
//   },

//   /** =============================== SALES SECTION ============================ */
//   fetchSales: async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/sales/");
//       console.log("Fetched Sales Data:", response.data);
//       set({ sales: response.data.sales });
//     } catch (error) {
//       console.error(
//         "Failed to fetch sales:",
//         error.response?.data || error.message
//       );
//     }
//   },

//   fetchSalesById: async (id) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/sales/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error("Failed to fetch sale by ID:", error);
//       return null;
//     }
//   },

//   addSale: async (sale) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/sales/add",
//         sale
//       );
//       const { sales_id } = response.data;

//       if (sales_id) {
//         set((state) => ({
//           sales: [...state.sales, { ...sale, sales_id }],
//           currentSalesId: sales_id,
//         }));

//         return { sales_id };
//       } else {
//         console.error("No sales ID returned from the server.");
//         return { error: "Sale added but no sales ID received." };
//       }
//     } catch (error) {
//       return error.response
//         ? { error: error.response.data.error }
//         : { error: "An unknown error occurred. Please try again." };
//     }
//   },

//   /** =============================== AUTH SECTION ============================ */
//   signup: async (userData) => {
//     try {
//       await axios.post("http://localhost:5000/api/auth/signup", userData);
//     } catch (error) {
//       console.error("Signup failed:", error);
//     }
//   },

//   // login: async (username, password, onSuccess) => {
//   //   try {
//   //     const response = await axios.post(
//   //       "http://localhost:5000/api/auth/login",
//   //       { username, password },
//   //       { withCredentials: true } // Allow sending Cookies
//   //     );

//   //     const { user } = response.data;

//   //     if (user) {
//   //       // Store non-sensitive user info in localStorage
//   //       localStorage.setItem(
//   //         "user",
//   //         JSON.stringify({ username: user.username, role: user.role })
//   //       );

//   //       // Set user state
//   //       set({ user: user.username, role: user.role });
//   //       // No need to store token in localStorage since it's in httpOnly Cookies

//   //       if (onSuccess) onSuccess(user.role);
//   //     } else {
//   //       throw new Error("Login failed. User data not received.");
//   //     }
//   //   } catch (error) {
//   //     console.error("Login failed:", error);
//   //     throw new Error("Login failed.");
//   //   }
//   // },

//   // login: async (username, password, onSuccess) => {
//   //   try {
//   //     const response = await axios.post(
//   //       "http://localhost:5000/api/auth/login",
//   //       { username, password },
//   //       { withCredentials: true } // Allow sending Cookiess (accessToken should be set in the response headers)
//   //     );

//   //     const { user } = response.data;

//   //     if (user) {
//   //       // Set access token in Cookiess
//   //       // Cookies.set("accessToken", accessToken, { sameSite: 'Strict' });

//   //       // Store user data (including role) in localStorage
//   //       localStorage.setItem("user", JSON.stringify({ username: user.username, role: user.role }));

//   //       // Update state with user and role
//   //       set({ user: user.username, role: user.role });

//   //       if (onSuccess) onSuccess(user.role);
//   //     } else {
//   //       throw new Error("Login failed. User or token not received.");
//   //     }
//   //   } catch (error) {
//   //     console.error("Login failed:", error);
//   //     throw new Error("Login failed.");
//   //   }
//   // },
//   login: async (username, password, onSuccess) => {
//     try {
//       const response = await axios.post(
//         "http://192.168.43.194:5000/api/auth/login",
//         { username, password },
//         { withCredentials: true } // Important for sending and receiving cookies
//       );

//       console.log("Login response:", response.data); // Log the response data

//       const { user, accessToken } = response.data;

//       if (user && accessToken) {
//         // Store user data (including role) in localStorage
//         localStorage.setItem(
//           "user",
//           JSON.stringify({ username: user.username, role: user.role })
//         );
//         Cookies.set("accessToken", accessToken, { sameSite: "Strict" });
//         // Update state with user and role
//         set({ user: user.username, role: user.role });

//         if (onSuccess) onSuccess(user.role);
//       } else {
//         throw new Error("Login failed. User or token not received.");
//       }
//     } catch (error) {
//       console.error("Login failed:", error.response?.data || error.message);
//       throw new Error("Login failed.");
//     }
//   },

//   /** =============================== CUSTOMER SECTION ============================ */
//   getCustomerDetails: async (customer_name) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/sales/customers/${encodeURIComponent(
//           customer_name
//         )}`
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Failed to get customer details:", error);
//       return null;
//     }
//   },

//   logout: async () => {
//     try {
//       await axios.post("http://localhost:5000/api/auth/logout");
//       // Clear user info from localStorage
//       localStorage.removeItem("user");
//       set({ user: null, role: null });
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   },

//   /** =============================== Cookies & AUTH HANDLING ============================ */
//   loadUserFromStorage: () => {
//     const token = Cookies.get("accessToken"); // Access token from Cookies
//     console.log("Access token from Cookies:", token); // Log the token

//     const storedUser = localStorage.getItem("user"); // User info from localStorage
//     console.log("Stored user from localStorage:", storedUser); // Log the stored user

//     if (token && storedUser) {
//       try {
//         const decodedToken = jwtDecode(token); // Decode JWT token
//         const user = JSON.parse(storedUser); // Parse stored user data

//         // Check if the token is expired
//         const isTokenExpired = Date.now() >= decodedToken.exp * 1000;
//         console.log("Is token expired?", isTokenExpired); // Log the token expiration status

//         if (isTokenExpired) {
//           console.log("Token expired");
//           Cookies.remove("accessToken"); // Remove token from Cookies
//           localStorage.removeItem("user"); // Clear user info from localStorage
//           set({ user: null, role: null });
//         } else {
//           console.log("Token valid. Setting user and role in state.");
//           set({
//             user: user.username,
//             role: user.role,
//           });
//         }
//       } catch (error) {
//         console.error("Error loading user from Cookies/localStorage:", error);
//         set({ user: null, role: null });
//       }
//     } else {
//       console.log("No token or stored user found.");
//       set({ user: null, role: null });
//     }
//   },

//   isAuthenticated: () => {
//     const token = Cookies.get("accessToken"); // Access token from Cookies
//     const user = localStorage.getItem("user"); // User info from localStorage
//     return !!token && !!user; // Both token and user data should be present
//   },

//   // Store.jsx
//   checkLock: async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/auth/checklock",
//         {
//           withCredentials: true,
//         }
//       );
//       set({ isLocked: response.data.isLocked }); // Expecting a Boolean from the backend
//     } catch (error) {
//       console.error("Failed to fetch lock status:", error);
//       // You can decide how to handle errors here
//     }
//   },

//   // checkLock: async () => {
//   //   try {
//   //     const response = await axios.get("http://localhost:5000/api/auth/checklock", {
//   //       headers: {
//   //         Authorization: `Bearer ${getAuthToken()}`, // Add the auth token to the request
//   //       },
//   //     });
//   //     set({ isLocked: response.data.lock_status === "locked" });
//   //   } catch (error) {
//   //     console.error("Failed to fetch lock status:", error);
//   //     // Optionally handle specific error messages
//   //   }
//   // },

//   toggleLock: async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/togglelock",
//         {},
//         {
//           withCredentials: true, // Ensures cookies are sent with the request
//         }
//       );
//       set({ isLocked: response.data.lock_status === "locked" });
//     } catch (error) {
//       console.error("Failed to toggle lock status:", error);
//     }
//   },
// }));

// export default useStore;