// UserContext.js

"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import UseStorage from "../useStorage/UseStorage";
import { userLogin, storeOwnerLogin, logisticsLogin, userLogout, storeOwnerLogout,  logisticsLogout} from "./auth";
import { useRouter } from "next/navigation";
import useNotifications from "../../src/utils/Middlewares/Notifications/UseNotifications";

export const ThemeContext = createContext();
export const AuthContext = createContext();
export const BtnContext = createContext();
export const SubscriptionContext = createContext();

const getFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem("theme");
    return value || "dark";
  }
};

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState(() => getFromLocalStorage());

  useEffect(() => {
    if (typeof window !== "undefined") {
      const element = document.documentElement;
      const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const onWindowsMatch = () => {
        if (
          localStorage.theme === "dark" ||
          (!("theme" in localStorage) && darkQuery.matches)
        ) {
          element.setAttribute("color-scheme", "dark");
        } else {
          element.setAttribute("color-scheme", "light");
        }
      };

      switch (mode) {
        case "dark":
          element.setAttribute("color-scheme", "dark");
          localStorage.setItem("theme", "dark");
          break;

        case "light":
          element.setAttribute("color-scheme", "light");
          localStorage.setItem("theme", "light");
          break;

        default:
          localStorage.removeItem("theme");
          onWindowsMatch();
          break;
      }

      darkQuery.addEventListener("change", (e) => {
        if (!("theme" in localStorage)) {
          if (e.matches) {
            element.setAttribute("color-scheme", "dark");
          } else {
            element.setAttribute("color-scheme", "light");
          }
        }
      });
    }
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};




// export const AuthContextProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [accessToken, setAccessToken] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const router = useRouter(); // Use router for redirection
//   const { notification, showNotification } = useNotifications(); // Use notifications

//   const handleLogin = async (inputs, userType) => {
//     try {
//       let loginFunction;
//       switch (userType) {
//         case "user":
//           loginFunction = userLogin;
//           break;
//         case "storeOwner":
//           loginFunction = storeOwnerLogin;
//           break;
//         case "logistics":
//           loginFunction = logisticsLogin;
//           break;
//         default:
//           throw new Error(`Invalid user type: ${userType}`);
//       }

//       const loginResponse = await loginFunction(inputs);
     
//       console.log(loginResponse.role);

//        // Handle the login response
//        if (loginResponse.success) {
//         const { data } = loginResponse;
//         const roles = data.roles;
//         const username = data.username;
//         const accessToken = data.accessToken;
//         console.log(loginResponse.role);

//         // Log successful login data
//         console.log("Login successful, response data:", data);

//         // Update context state
//         setUser({ username, roles,accessToken });
//         console.log("Auth state updated:", { username, roles, accessToken });
//     } else {
//         console.error("Login failed, server message:", loginResponse.message);
//         throw new Error(loginResponse.message); // Handle unsuccessful login
//     }
      

//       // Redirect based on role
//       if (loginResponse.role === "admin") {
//         router.push("/dashboard");
//       } else {
//         router.push("/sales");
//       }
//     } catch (error) {
//       showNotification("Login failed. Please try again.", "error");
//       console.error(`${userType} login error:`, error);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       // Perform logout logic (e.g., clearing user data, tokens)
//       setUser(null);
//       setIsAuthenticated(false);
//       router.push("/login");
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   useEffect(() => {
//     // Check if user is already logged in from localStorage or session
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//       setIsAuthenticated(true);
//     }
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isAuthenticated,
//         handleLogin,
//         handleLogout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };


export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  // const { showNotification } = useNotifications();

  console.log("user info",user);
  

   // Logs the initial state of auth when the provider is mounted
   useEffect(() => {
    console.log("AuthContext mounted with initial state:", user);
}, [user]);

// const handleLogin = async (inputs, userType) => {
//     console.log("Attempting login with inputs:", "and userType:", userType);

//     try {
//         let loginFunction;

//         // Select the appropriate login function based on user type
//         switch (userType) {
//             case "user":
//                 loginFunction = userLogin;
//                 break;
//             case "storeOwner":
//                 loginFunction = storeOwnerLogin;
//                 break;
//             case "logistics":
//                 loginFunction = logisticsLogin;
//                 break;
//             default:
//                 const errorMessage = `Invalid user type: ${userType}`;
//                 console.error(errorMessage);
//                 throw new Error(errorMessage);
//         }

//         console.log("Login function selected for userType:", userType);

//         // Call the selected login function with the inputs
//         const loginResponse = await loginFunction(inputs);
//         console.log("Login function response:", loginResponse);

//         // Handle the login response
//         if (loginResponse.success) {
//             const { data } = loginResponse;
//             const role = data.role;
//             const username = data.username;
//             const accessToken = data.accessToken;

//             // Log successful login data
//             console.log("Login successful, response data:", data);

//             // Update context state
//             setUser({ username, role,accessToken });
//             console.log("Auth state updated:", { username, role,accessToken });
//         } else {
//             console.error("Login failed, server message:", loginResponse.message);
//             throw new Error(loginResponse.message); // Handle unsuccessful login
//         }
//     } catch (error) {
//         console.error("Login error:", error);
//         return error.message; // Return the error message for further handling
//     }
// };

// Logs any changes to the auth state

const handleLogin = async (inputs, userType) => {
  console.log("Attempting login with inputs:", inputs, "and userType:", userType);

  try {
      let loginFunction;

      // Select the appropriate login function based on user type
      switch (userType) {
          case "user":
              loginFunction = userLogin;
              break;
          case "storeOwner":
              loginFunction = storeOwnerLogin;
              break;
          case "logistics":
              loginFunction = logisticsLogin;
              break;
          default:
              const errorMessage = `Invalid user type: ${userType}`;
              console.error(errorMessage);
              throw new Error(errorMessage);
      }

      console.log("Login function selected for userType:", userType);

      // Call the selected login function with the inputs
      const loginResponse = await loginFunction(inputs);
      console.log("Login function response:", loginResponse);

      // Handle the login response
      if (loginResponse.success) {
          const { data } = loginResponse;
          const role = data.role;
          const username = data.username;
          const accessToken = data.accessToken;

          // Log successful login data
          console.log("Login successful, response data:", data);

          // Update context state
          setUser({ username, role, accessToken });
          console.log("Auth state updated:", { username, role, accessToken });

          // Redirect based on the user's role
          if (role === "admin") {
              router.push("/dashboard"); // Redirect to admin dashboard
          } else if (role === "manager") {
              router.push("/stock"); // Redirect to stock management page
          } else {
              router.push("/sales"); // Default redirect for other users
          }
      } else {
          console.error("Login failed, server message:", loginResponse.message);
          throw new Error(loginResponse.message); // Handle unsuccessful login
      }
  } catch (error) {
      console.error("Login error:", error);
      return error.message; // Return the error message for further handling
  }
};




useEffect(() => {
    console.log("Auth state updated:", user);
}, [user]);

  // const handleLogin = async (inputs, userType) => {
  //   try {
  //     let loginFunction;
  //     switch (userType) {
  //       case "user":
  //         loginFunction = userLogin;
  //         break;
  //       case "storeOwner":
  //         loginFunction = storeOwnerLogin;
  //         break;
  //       case "logistics":
  //         loginFunction = logisticsLogin;
  //         break;
  //       default:
  //         throw new Error(`Invalid user type: ${userType}`);
  //     }

  //     const loginResponse = await loginFunction(inputs);

  //     if (loginResponse.success) {
  //       const { username, roles, accessToken } = loginResponse.data;

  //       setUser({ username, roles, accessToken }); // Update context state
  //       // localStorage.setItem("user", JSON.stringify({ username, roles, accessToken }));

  //       // Redirect based on role
  //       return null; // No error
  //     } else {
  //       throw new Error(loginResponse.message || "Login failed");
  //     }
  //   } catch (error) {
  //     console.error(`${userType} login error:`, error);
  //     return error.message;
  //   }
  // };

  const handleLogout = () => {
    setUser(null);
    router.push("/login");
  };

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};












// export const AuthContextProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const router = useRouter(); // Use router for redirection
//   const { showNotification } = useNotifications(); // Use notifications

//   const handleLogin = async (inputs, userType) => {
//     try {
//       let loginFunction;
//       switch (userType) {
//         case "user":
//           loginFunction = userLogin;
//           break;
//         case "storeOwner":
//           loginFunction = storeOwnerLogin;
//           break;
//         case "logistics":
//           loginFunction = logisticsLogin;
//           break;
//         default:
//           throw new Error(`Invalid user type: ${userType}`);
//       }

//       const userData = await loginFunction(inputs);
//       setUser(userData);
//       setIsAuthenticated(true);

//       // Redirect based on role
//       if (userData.role === "admin") {
//         router.push("/dashboard");
//       } else {
//         router.push("/sales");
//       }
//     } catch (error) {
//       showNotification("Login failed. Please try again.", "error");
//       console.error(`${userType} login error:`, error);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       // Perform logout logic (e.g., clearing user data, tokens)
//       setUser(null);
//       setIsAuthenticated(false);
//       router.push("/login");
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   useEffect(() => {
//     // Ensure code runs only on the client-side (browser)
//     if (typeof window !== "undefined") {
//       // Check if user is already logged in from localStorage or session
//       const storedUser = localStorage.getItem("user");
//       if (storedUser) {
//         setUser(JSON.parse(storedUser));
//         setIsAuthenticated(true);
//       }
//     }
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isAuthenticated,
//         handleLogin,
//         handleLogout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

export const SubscriptionContextProvider = ({ children }) => {
  const [showSubscription, setShowSubscription] = useState(false);
  const [isStoreOwner, setIsStoreOwner] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      const isStoreOwner = user?.role === "store_owner";
      setShowSubscription(isStoreOwner);
    }, 30 * 1000); // 5 seconds in milliseconds

    return () => clearTimeout(timer);
  }, [user?.role]);

  return (
    <SubscriptionContext.Provider
      value={{ isStoreOwner, showSubscription, setIsStoreOwner }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const BtnContextProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(false);
  const [track, setTrack] = useState(false);
  const [analysis, setAnalysis] = useState("overviews");
  const [filter, setFilter] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [loginbtn, setLogintBtn] = useState(false);
  const [signupbtn, setSignBtn] = useState(false);
  const [stream, setStream] = useState(null);
  const [loginpanel, setLoginPanel] = useState(false);

  return (
    <BtnContext.Provider
      value={{
        loginbtn,
        setLogintBtn,
        signupbtn,
        setSignBtn,
        loginpanel,
        setLoginPanel,
        filter,
        setFilter,
        track,
        setTrack,
        open,
        setOpen,
        profile,
        setProfile,
        activeLink,
        setActiveLink,
        analysis,
        setAnalysis,
      }}
    >
      {children}
    </BtnContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useBtn = () => {
  return useContext(BtnContext);
};

export const useSubscription = () => {
  return useContext(SubscriptionContext);
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
