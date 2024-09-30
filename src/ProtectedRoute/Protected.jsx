// // "use client";

// // import { useEffect, useState } from "react";
// // import { useRouter } from "next/navigation";
// // import useStore from "../useStore/Store";

// // const ProtectedRoute = ({ children }) => {
// //   const {
// //     isAuthenticated,
// //     loadUserFromStorage,
// //     role,
// //     isLocked,
// //     checkLock,
// //   } = useStore((state) => ({
// //     isAuthenticated: state.isAuthenticated,
// //     loadUserFromStorage: state.loadUserFromStorage,
// //     role: state.role,
// //     isLocked: state.isLocked, // This should be a boolean or a simple value, e.g., true/false or "locked"/"unlocked"
// //     checkLock: state.checkLock,
// //   }));

// //   const router = useRouter();
// //   const [authLoading, setAuthLoading] = useState(true);

// //   useEffect(() => {
// //     const initialize = async () => {
// //       try {
// //         await loadUserFromStorage(); // Load user from cookies
// //         await checkLock(); // Check the lock status
// //       } catch (error) {
// //         console.error("Error during initialization:", error);
// //       } finally {
// //         setAuthLoading(false); // Set loading to false after checks
// //       }
// //     };

// //     initialize(); // Execute the initialization logic
// //   }, [loadUserFromStorage, checkLock]);

// //   useEffect(() => {
// //     if (!authLoading) {
// //       const isAuth = isAuthenticated();
// //       if (!isAuth) {
// //         console.log("User not authenticated. Redirecting to /login.");
// //         router.push("/login"); // Redirect to login if not authenticated
// //         return;
// //       }

// //       // Check if the system is locked and the user is not an admin
// //       if (isLocked && role !== "admin") { // Assuming isLocked is a boolean or true/false
// //         console.log("System is locked for non-admin users. Redirecting to /locked.");
// //         router.push("/locked"); // Redirect non-admin users to locked page
// //         return;
// //       }

// //       console.log("User is authenticated and has access to the route.");
// //     }
// //   }, [authLoading, isAuthenticated, isLocked, role, router]);

// //   if (authLoading) {
// //     return <p>Loading...</p>; // Display a loading indicator while checks are ongoing
// //   }

// //   // Render the protected content if all checks pass
// //   return <>{children}</>;
// // };

// // export default ProtectedRoute;


// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, usePathname } from "next/navigation"; // usePathname to get the current route
// import useStore from "../useStore/Store";

// const ProtectedRoute = ({ children }) => {
//   const {
//     isAuthenticated,
//     loadUserFromStorage,
//     role,
//     isLocked,
//     checkLock,
//   } = useStore((state) => ({
//     isAuthenticated: state.isAuthenticated,
//     loadUserFromStorage: state.loadUserFromStorage,
//     role: state.role,
//     isLocked: state.isLocked,
//     checkLock: state.checkLock,
//   }));

//   const router = useRouter();
//   const pathname = usePathname(); // Get the current route path
//   const [authLoading, setAuthLoading] = useState(true);

//   useEffect(() => {
//     const initialize = async () => {
//       try {
//         await loadUserFromStorage(); // Load user from cookies
//         await checkLock(); // Check the lock status
//       } catch (error) {
//         console.error("Error during initialization:", error);
//       } finally {
//         setAuthLoading(false); // Set loading to false after checks
//       }
//     };

//     initialize(); // Execute the initialization logic
//   }, [loadUserFromStorage, checkLock]);

//   useEffect(() => {
//     if (!authLoading) {
//       const isAuth = isAuthenticated();

//       // If the user is not authenticated, redirect to /login
//       if (!isAuth) {
//         console.log("User not authenticated. Redirecting to /login.");
//         router.push("/login");
//         return;
//       }

//       // If the system is locked and the user is not admin or manager, redirect to /locked
//       if (isLocked && role !== "admin" && role !== "manager") {
//         console.log("System is locked for non-admin/manager users. Redirecting to /locked.");
//         router.push("/locked");
//         return;
//       }

//       // Restrict non-admin and non-manager users to only access the /sales route
//       if (role === "user" && pathname !== "/sales") {
//         console.log("Non-admin user trying to access restricted route. Redirecting to /sales.");
//         router.push("/sales");
//         return;
//       }

//       console.log("User is authenticated and has access to the route.");
//     }
//   }, [authLoading, isAuthenticated, isLocked, role, pathname, router]);

//   if (authLoading) {
//     return <p>Loading...</p>; // Display a loading indicator while checks are ongoing
//   }

//   // Render the protected content if all checks pass
//   return <>{children}</>;
// };

// export default ProtectedRoute;



"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation"; // usePathname to get the current route
import useStore from "../useStore/Store";

const ProtectedRoute = ({ children }) => {
  const {
    isAuthenticated,
    loadUserFromStorage,
    role,
    isLocked,
    checkLock,
  } = useStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    loadUserFromStorage: state.loadUserFromStorage,
    role: state.role,
    isLocked: state.isLocked,
    checkLock: state.checkLock,
  }));

  const router = useRouter();
  const pathname = usePathname(); // Get the current route path
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      try {
        // Load user from cookies and check lock status
        await loadUserFromStorage();
        await checkLock();
        
        // Perform authentication checks after loading
        const isAuth = isAuthenticated();
        
        if (!isAuth) {
          console.log("User not authenticated. Redirecting to /login.");
          router.push("/login");
          return;
        }

        // If the system is locked and the user is not admin or manager, redirect to /locked
        if (isLocked && role !== "admin" && role !== "manager") {
          console.log("System is locked for non-admin/manager users. Redirecting to /locked.");
          router.push("/locked");
          return;
        }

        // Restrict non-admin and non-manager users to only access the /sales route
        if (role === "user" && pathname !== "/sales") {
          console.log("Non-admin user trying to access restricted route. Redirecting to /sales.");
          router.push("/sales");
          return;
        }

        console.log("User is authenticated and has access to the route.");
      } catch (error) {
        console.error("Error during initialization:", error);
      } finally {
        setAuthLoading(false); // Set loading to false after checks
      }
    };

    initialize(); // Execute the initialization logic
  }, [loadUserFromStorage, checkLock, isAuthenticated, isLocked, role, pathname, router]);

  if (authLoading) {
    return <p>Loading...</p>; // Display a loading indicator while checks are ongoing
  }

  // Render the protected content if all checks pass
  return <>{children}</>;
};

export default ProtectedRoute;
