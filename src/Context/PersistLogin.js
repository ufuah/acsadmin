"use client"


// import { useEffect } from 'react';
// import useRefreshToken from '../hooks/useRefreshToken';
// import { useAuth } from './AuthContext';


// const PersistLogin = ({ children }) => {
//     const refresh = useRefreshToken();
//     const { auth} = useAuth();

//     useEffect(() => {
//         let isMounted = true;

//         const verifyRefreshToken = async () => {
//             try {
//                 await refresh();
//             }
//             catch (err) {
//                 console.error(err);
//             }
//             finally {
//                 isMounted && setIsLoading(false);
//             }
//         }

//         // persist added here AFTER tutorial video
//         // Avoids unwanted call to verifyRefreshToken
//         !auth?.accessToken  ? verifyRefreshToken() : setIsLoading(false);

//         return () => isMounted = false;
//     }, [auth?.accessToken, refresh])

//     useEffect(() => {
//         console.log(`isLoading: ${isLoading}`)
//         console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
//     }, [isLoading])

//     return <>{auth?.accessToken ? children : null}</>;
// };

// export default PersistLogin;

// "use client";

// import React, { createContext, useState, useEffect, useContext } from "react";
// import useRefreshToken from "../hooks/useRefreshToken";
// import { useAuth } from "./AuthContext";

// const PersistContext = createContext();

// export const PersistProvider = ({ children }) => {
//     const refresh = useRefreshToken();
//     const { auth } = useAuth();
//     const [isLoading, setIsLoading] = useState(true); // Track loading state

//     useEffect(() => {
//         let isMounted = true;

//         const verifyRefreshToken = async () => {
//             try {
//                 console.log("Attempting to refresh token...");
//                 await refresh(); // Call the refresh token hook
//                 console.log("Token refreshed successfully!");
//             } catch (err) {
//                 console.error("Error refreshing token:", err);
//             } finally {
//                 if (isMounted) setIsLoading(false);
//             }
//         };

//         // If no access token, verify and refresh; otherwise, stop loading
//         if (!auth?.accessToken) {
//             verifyRefreshToken();
//         } else {
//             setIsLoading(false);
//         }

//         return () => {
//             isMounted = false; // Cleanup function
//         };
//     }, [auth?.accessToken, refresh]);

//     useEffect(() => {
//         console.log(`isLoading: ${isLoading}`);
//         console.log(`auth.accessToken: ${JSON.stringify(auth?.accessToken)}`);
//     }, [isLoading]);



//     useEffect(() => {
//         let isMounted = true;

//         const verifyRefreshToken = async () => {
//             try {
//                 await refresh();
//             } catch (err) {
//                 console.error(err);
//             } finally {
//                 if (isMounted) {
//                     setIsLoading(false);
//                 }
//             }
//         };

//         if (!auth?.accessToken) {
//             verifyRefreshToken();
//         } else {
//             setIsLoading(false);
//         }

//         return () => {
//             isMounted = false;
//         };
//     }, []); // Run only once on mount

//     useEffect(() => {
//         console.log(`isLoading: ${isLoading}`);
//         console.log(`accessToken: ${JSON.stringify(auth?.accessToken)}`);
//     }, [isLoading]);

//     return (
//         <PersistContext.Provider value={{ isLoading }}>
//             {!isLoading && children}
//         </PersistContext.Provider>
//     );
// };

// // Custom hook to use PersistContext
// export const usePersist = () => {
//     return useContext(PersistContext);
// };



"use client";

// import React, { createContext, useState, useEffect, useContext } from "react";
// // import useRefreshToken from "../hooks/useRefreshToken";
// import { useAuth } from "./AuthContext";


// const PersistContext = createContext();

// export const PersistProvider = ({ children }) => {
//     const refresh = useRefreshToken();
//     const { user } = useAuth();
//     const [isLoading, setIsLoading] = useState(true); // Track loading state

//     useEffect(() => {
//         let isMounted = true;

//         const verifyRefreshToken = async () => {
//             try {
//                 console.log("Attempting to refresh token...");
//                 await refresh(); // Call the refresh token hook
//                 console.log("Token refreshed successfully!");
//             } catch (err) {
//                 console.error("Error refreshing token:", err);
//             } finally {
//                 if (isMounted) {
//                     setIsLoading(false); // Stop loading after attempting refresh
//                 }
//             }
//         };

//         // If no access token exists, verify and refresh; otherwise, stop loading
//         if (!user?.accessToken) {
//             verifyRefreshToken();
//         } else {
//             setIsLoading(false);
//         }

//         return () => {
//             isMounted = false; // Cleanup function to prevent updates on unmounted component
//         };
//     }, [user?.accessToken, refresh]); // Include `auth?.accessToken` and `refresh` as dependencies

//     return (
//         <PersistContext.Provider value={{ isLoading }}>
//             {children}
//         </PersistContext.Provider>
//     );
// };

// // Custom hook to access PersistContext
// export const usePersist = () => {
//     return useContext(PersistContext);
// };




"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import { useAuth } from "./ThemeContext";


const PersistContext = createContext();

export const PersistProvider = ({ children }) => {
    const refresh = useRefreshToken();
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(true); // Track loading state

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                console.log("Attempting to refresh token...");
                await refresh(); // Call the refresh token hook
                console.log("Token refreshed successfully!");
            } catch (err) {
                console.error("Error refreshing token:", err);
            } finally {
                if (isMounted) {
                    setIsLoading(false); // Stop loading after attempting refresh
                }
            }
        };

        // If no access token exists, verify and refresh; otherwise, stop loading
        if (!user?.accessToken) {
            verifyRefreshToken();
        } else {
            setIsLoading(false);
        }

        return () => {
            isMounted = false; // Cleanup function to prevent updates on unmounted component
        };
    }, [user?.accessToken, refresh])

    return (
        <PersistContext.Provider value={{ isLoading }}>
            {children}
        </PersistContext.Provider>
    );
};

// Custom hook to access PersistContext
export const usePersist = () => {
    return useContext(PersistContext);
};





// "use client";

// import React, { createContext, useState, useEffect, useContext } from "react";
// import useRefreshToken from "../hooks/useRefreshToken";

// const PersistContext = createContext();

// export const PersistProvider = ({ children }) => {
//     const refresh = useRefreshToken();
//     const [auth, setAuth] = useState(null); // Manage auth state
//     const [isLoading, setIsLoading] = useState(true); // Manage loading state

//     // Function to verify the refresh token
//     const verifyRefreshToken = async () => {
//         try {
//             console.log("Verifying refresh token...");
//             await refresh(); // Fetch and set the new access token
//             console.log("Token refreshed successfully!");
//         } catch (err) {
//             console.error("Error refreshing token:", err);
//         } finally {
//             setIsLoading(false); // End loading state
//         }
//     };

//     // Run on initial load
//     useEffect(() => {
//         if (!auth?.accessToken) {
//             verifyRefreshToken();
//         } else {
//             setIsLoading(false);
//         }
//     }, [auth?.accessToken, refresh]);

//     useEffect(() => {
//         console.log(`isLoading: ${isLoading}`);
//         console.log(`auth.accessToken: ${JSON.stringify(auth?.accessToken)}`);
//     }, [isLoading]);

//     return (
//         <PersistContext.Provider value={{ auth, setAuth, isLoading }}>
//             {!isLoading && children}
//         </PersistContext.Provider>
//     );
// };

// // Custom hook to use the PersistContext
// export const usePersist = () => {
//     return useContext(PersistContext);
// };


// "use client";

// import React, { createContext, useState, useEffect, useContext } from "react";
// import useRefreshToken from "../hooks/useRefreshToken";

// const PersistContext = createContext();

// export const PersistProvider = ({ children }) => {
//     const refresh = useRefreshToken();
//     const [auth, setAuth] = useState(null); // Manage auth state
//     const [isLoading, setIsLoading] = useState(true); // Manage loading state

//     // Function to verify the refresh token
//     const verifyRefreshToken = async () => {
//         try {
//             console.log("Verifying refresh token...");
//             await refresh(); // Fetch and set the new access token
//             console.log("Token refreshed successfully!");
//         } catch (err) {
//             console.error("Error refreshing token:", err);
//         } finally {
//             setIsLoading(false); // End loading state
//         }
//     };

//     useEffect(() => {
//         const isInitialLoad = performance?.navigation?.type === 1; // Check if the page was refreshed

//         if (isInitialLoad && !auth?.accessToken) {
//             verifyRefreshToken();
//         } else {
//             setIsLoading(false); // No refresh required
//         }
//     }, [auth?.accessToken]);

//     useEffect(() => {
//         console.log(`isLoading: ${isLoading}`);
//         console.log(`auth.accessToken: ${JSON.stringify(auth?.accessToken)}`);
//     }, [isLoading]);

//     return (
//         <PersistContext.Provider value={{ auth, setAuth, isLoading }}>
//             {!isLoading && children}
//         </PersistContext.Provider>
//     );
// };

// // Custom hook to use the PersistContext
// export const usePersist = () => {
//     return useContext(PersistContext);
// };
