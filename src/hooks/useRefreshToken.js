// import axios from '../api/axios';
// import {useAuth} from '../Context/AuthContext'


// const useRefreshToken = () => {
//     const { setUser } = useAuth();

//     const refresh = async () => {
//         const response = await axios.get('/api/token/refresh_token', {
//             withCredentials: true
//         });
//         setUser(prev => {
//             console.log(JSON.stringify(prev));
//             console.log(response.data.accessToken);
//             return { ...prev, accessToken: response.data.accessToken }
//         });
//         return response.data.accessToken;
//     }
//     return refresh;
// };

// export default useRefreshToken;

// import { useAuth } from '../Context/AuthContext';
// import {axiosInstance} from '../api/axios';

// const useRefreshToken = () => {
//     const { setUser } = useAuth();

//     const refresh = async () => {
//         const response = await axiosInstance.get('/api/token/refresh_token');

//         setUser(prev => ({ ...prev, accessToken: response.data.accessToken }));

//         return response.data.accessToken;
//     };

//     return refresh;
// };

// export default useRefreshToken;


// import { useAuth } from "../Context/AuthContext";
// import { axiosInstance } from "../api/axios";

// const useRefreshToken = () => {
//     const {  setUser } = useAuth();

//     const refresh = async () => {
//         try {
//             console.log("Sending refresh request...");
//             // const response = await axiosInstance.post("/api/token/refresh_token", {
//             //     withCredentials: true, // Ensure cookies are sent
//             // });
          
//             const response = await axiosInstance.get('/api/token/refresh_token', {
//                 withCredentials: true, // Send cookies for refresh please work
//             });

//             console.log("Refresh response:", response.data);
//             const { accessToken } = response.data;
//             setUser((prev) => ({
//                 ...prev,
//                 accessToken,
//             }));
//             return accessToken;
//         } catch (error) {
//             console.error("Error refreshing token:", error);
//             throw error;
//         }
//     };

//     return refresh;
// };

// export default useRefreshToken;



import { useAuth } from "../Context/ThemeContext";
import { axiosInstance } from "../hooks/api/axios";

const useRefreshToken = () => {
    const { setUser } = useAuth();

    // const refresh = async () => {
    //     try {
    //         console.log("Sending refresh request...");

    //         const response = await axiosInstance.post('/api/auth/refresh', {
    //             withCredentials: true, // Send cookies for refresh
    //         });

    //         console.log("Full Refresh Response:", response); // Log the entire response object
    //         console.log("Refresh Response Data:", response.data); // Log just the data part of the response

    //         // console.log("Access Token:", accessToken); // Log the extracted accessToken
           

    //         setUser(prev => {
    //             console.log(JSON.stringify(prev))
    //             console.log("Access Token:", response.data.accessToken);
    //             console.log("role:", response.data.roles);
    //             console.log("username:", response.data.username);
    //             return {
    //                 ...prev,
    //                 roles: response.data.roles,
    //                 username: response.data.username,
    //                 accessToken: response.data.accessToken
    //             }
    //         });
    //         return response.data.accessToken;

        
    //     } catch (error) {
    //         console.error("Error refreshing token:", error);
    //         throw error;
    //     }
    // };

    const refresh = async () => {
        try {
          console.log(`[useRefreshToken] Sending refresh request at: ${new Date().toISOString()}`);
      
          // Ensure `withCredentials` is part of the Axios config, not the data payload
          const response = await axiosInstance.post(
            '/api/auth/refresh',
            {}, // No payload needed for refresh
            {
              withCredentials: true, // Send cookies
            }
          );
      
          console.log("[useRefreshToken] Refresh response:", response.data);
      
          setUser((prev) => {
            console.log("[useRefreshToken] Previous user state:", JSON.stringify(prev));
            console.log("[useRefreshToken] Updating user state with:", response.data);
            return {
              ...prev,
              role: response.data.role,
              username: response.data.username,
              accessToken: response.data.accessToken,
            };
          });
      
          return response.data.accessToken;
        } catch (error) {
          console.error("[useRefreshToken] Error refreshing token:", error);
          throw error;
        }
      };
      
    

    return refresh;
};



// const useRefreshToken = () => {
//     const { setUser } = useAuth();

//     const refresh = async () => {
//         try {
//             console.log("Sending refresh request...");

//             const response = await axiosInstance.post(
//                 '/api/auth/refresh',
//                 {}, // Empty request body
//                 { withCredentials: true } // Send cookies for refresh
//             );

//             console.log("Full Refresh Response:", response); // Log the entire response
//             console.log("Refresh Response Data:", response.data); // Log response data
            
//             // Extract the new access token, username, and roles from the response
//             const { accessToken, username, role } = response.data;

//             setUser(prev => {
//                 console.log("Previous User State:", JSON.stringify(prev));
//                 console.log("New Access Token:", accessToken);
//                 console.log("New Roles:", role);
//                 console.log("New Username:", username);

//                 return {
//                     ...prev,
//                     accessToken, // Update token
//                     username,    // Update username
//                     role        // Update roles
//                 };
//             });

//             return accessToken; // Return the new token for immediate use if needed
//         } catch (error) {
//             console.error("Error refreshing token:", error.message);
//             console.error("Full Error:", error); // Log the full error object
//             throw error; // Rethrow the error to handle it upstream
//         }
//     };

//     return refresh;
// };

export default useRefreshToken;
