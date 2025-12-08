// import { useAuth } from "./ThemeContext"; // Import the useAuth hook
// import axios from "axios";

// const baseURL = "https://api.e-palateoasis.com";

// // Custom hook for performing actions
// const useLoad = () => {
//   const { user } = useAuth(); // Get accessToken from useAuth

//   // Function to delete stock
//   const deleteStock = async (description) => {
//     try {
//       if (!user.accessToken) {
//         throw new Error("No access token available");
//       }

//       const headers = {
//         'Authorization': `Bearer ${user.accessToken}`, // Add Authorization token
//         'Content-Type': 'application/json',
//       };

//       await axios.delete(`${baseURL}/api/stocks/${encodeURIComponent(description)}`, { headers });
//     } catch (error) {
//       console.error("Error deleting stock:", error);
//       throw new Error("Failed to delete stock");
//     }
//   };

//   // Function to check lock status
//   const checkLock = async (set) => {
//     const { networkSpeed } = set.get(); // Access networkSpeed from the state
//     if (networkSpeed !== "Slow") {
//       try {
//         const response = await axios.get(`${baseURL}/api/auth/checklock`, {
//           headers: { 'Authorization': `Bearer ${user.accessToken}` },
//           withCredentials: true,
//         });
//         set({ isLocked: response.data.isLocked });
//       } catch (error) {
//         console.error("Failed to fetch lock status:", error);
//       }
//     } else {
//       console.warn("Network is too slow, delaying the sales data fetch.");
//     }
//   };

//   // Function to toggle lock status
//   const toggleLock = async (set) => {
//     const { networkSpeed } = set.get();
//     if (networkSpeed !== "Slow") {
//       try {
//         const response = await axios.post(
//           `${baseURL}/api/auth/togglelock`,
//           {},
//           {
//             headers: { 'Authorization': `Bearer ${user.accessToken}` },
//             withCredentials: true,
//           }
//         );
//         set({ isLocked: response.data.lock_status === "locked" });
//       } catch (error) {
//         console.error("Failed to toggle lock status:", error);
//       }
//     } else {
//       console.warn("Network is too slow, delaying the sales data fetch.");
//     }
//   };

//   return {
//     deleteStock,
//     checkLock,
//     toggleLock,
//   };
// };

// export default useLoad;




import { useState } from "react";
import { useAuth } from "../Context/ThemeContext";
import { axiosInstance } from "../hooks/api/axios";



const useLoad = () => {
  const { user } = useAuth(); // Access user from useAuth context
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);


  const deleteStock = async (ids) => {
    try {
      await axiosInstance.post(
        '/api/stocks/delete',
        { ids }, // Request body
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(`Stocks with IDs '${ids.join(', ')}' deleted successfully.`);
    } catch (error) {
      console.error("Error deleting stocks:", error.response?.data || error.message);
      throw new Error("Failed to delete stocks");
    }
  };



  const checkLock = async (set) => {
    try {
      console.log("Checking lock status...");
      console.log("Authorization Header: ", `Bearer ${user?.accessToken}`);

      const response = await axiosInstance.get(`/api/auth/checklock`, {
        headers: {
          'Authorization': `Bearer ${user?.accessToken}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      set({ isLocked: response.data.isLocked });
      console.log("Lock status checked successfully:", response.data.isLocked);
    } catch (error) {
      console.error("Failed to fetch lock status:", error.response?.data || error.message);
    }
  };


  // Function to toggle lock status
  const toggleLock = async (set) => {
    try {

      const response = await axiosInstance.post(
        `/api/auth/togglelock`,
        {
          headers: {
            'Authorization': `Bearer ${user?.accessToken}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      const isLocked = response.data.lock_status === "locked";
      set({ isLocked });
      console.log(`Lock status toggled successfully. Current status: ${isLocked ? "Locked" : "Unlocked"}`);
    } catch (error) {
      console.error("Failed to toggle lock status:", error);
    }
  };


  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update user
  const updateUser = async (userId, updatedData, onSuccess) => {
    try {
      await axiosInstance.put(`/api/users/${userId}`, updatedData);
      alert("User updated successfully");
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Delete user
  const deleteUser = async (userId, onSuccess) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`/api/users/${userId}`);
      alert("User deleted successfully");
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return {
    deleteStock,
    checkLock,
    toggleLock,
    users,
    loading,
    fetchUsers,
    updateUser,
    deleteUser,
  };
};

export default useLoad;
