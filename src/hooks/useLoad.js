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




import { useAuth } from "../Context/ThemeContext";
import { axiosInstance } from "../hooks/api/axios";



const useLoad = () => {
  const { user } = useAuth(); // Access user from useAuth context



  // Function to delete stock
  // const deleteStock = async (ids) => {

  //   try {
  //     await axiosInstance.post('/api/stocks/delete', {
  //       data: { ids }, // Send the array of IDs in the request body
  //       headers: {
  //         Authorization: `Bearer ${user?.accessToken}`,
  //         'Content-Type': 'application/json',
  //       },
  //       withCredentials: true,
  //     });
  //     console.log(`Stocks with IDs '${ids.join(', ')}' deleted successfully.`);
  //   } catch (error) {
  //     console.error("Error deleting stocks:", error);
  //     throw new Error("Failed to delete stocks");
  //   }
  // };

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


  // export const deleteStock = async (id) => {
  //   try {
  //     const response = await axiosInstance.delete(`/api/stocks`, {
  //       params: { id }, // Send ID as query param
  //       headers: {
  //         'Authorization': `Bearer ${user?.accessToken}`,
  //         'Content-Type': 'application/json',
  //       },
  //       withCredentials: true,
  //     });
  //     console.log(`Stock with ID '${id}' deleted successfully.`);
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error deleting stock:", error);
  //     throw new Error("Failed to delete stock");
  //   }
  // };



  // const checkLock = async (set) => {
  //   try {
  //     console.log("Checking lock status...");
  //     console.log("Headers being sent: ", {
  //       'Authorization': `Bearer ${user?.accessToken}`,
  //       'Content-Type': 'application/json',
  //     });

  //     const response = await axiosInstance.get(`/api/auth/checklock`, {
  //       headers: {
  //         'Authorization': `Bearer ${user?.accessToken}`,
  //       'Content-Type': 'application/json',
  //       },
  //       withCredentials: true,
  //     });

  //     set({ isLocked: response.data.isLocked });
  //     console.log("Lock status checked successfully:", response.data.isLocked);
  //   } catch (error) {
  //     console.error("Failed to fetch lock status:", error.response?.data || error.message);
  //     if (error.response?.status === 403) {
  //       console.error("Forbidden: Check token validity and role-based access.");
  //     }
  //   }
  // };


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
      // const { networkSpeed } = set.get();
      // if (networkSpeed === "Slow") {
      //   console.warn("Network is too slow, delaying the lock status toggle.");
      //   return;
      // }
      // const headers = getHeaders();
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

  return {
    deleteStock,
    checkLock,
    toggleLock,
  };
};

export default useLoad;
