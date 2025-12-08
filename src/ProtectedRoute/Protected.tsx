// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import LoadingSpinner from "../utils/LoadingComp/LoadingSpinner"; // Import the spinner for loading state

// const Protected = ({ children }) => {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true); // Loading state while checking auth
//   const [isAuthenticated, setIsAuthenticated] = useState(false); // Local state for auth

//   useEffect(() => {
//     // Check the authentication status, e.g., from local storage or cookies
//     const token = localStorage.getItem("token"); // Adjust based on your auth implementation

//     if (token) {
//       setIsAuthenticated(true); // Set authenticated if token exists
//     } else {
//       setIsAuthenticated(false); // No token, user is not authenticated
//     }
//     setLoading(false); // Set loading to false as auth check is complete
//   }, []);

//   useEffect(() => {
//     if (!loading) {
//       if (!isAuthenticated) {
//         console.log("User is NOT authenticated, redirecting to /login.");
//         router.push("/login"); // Redirect to login if not authenticated
//       }
//     }
//   }, [loading, isAuthenticated, router]);

//   if (loading) {
//     return <LoadingSpinner />; // Show a loading spinner while checking auth state
//   }

//   // If authenticated, render the children components
//   return <>{isAuthenticated ? children : null}</>;
// };

// export default Protected;


// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import LoadingSpinner from "../utils/LoadingComp/LoadingSpinner";
// import { useAuth } from "../Context/ThemeContext";
//  // Assuming the user role is in AuthContext

// const Protected = ({ children, allowedRoles = [] }) => {
//   const router = useRouter();
//   const { user, isAuthenticated} = useAuth(); // Assuming `user` contains the role and `isAuthenticated` exists in AuthContext
//   const [loading, setLoading] = useState(true);

  

//   useEffect(() => {
//     // Simulate an async auth check (if necessary)
//     const checkAuth = async () => {
//       try {
//         if (!isAuthenticated) {
//           console.log("User is NOT authenticated, redirecting to /login.");
//           router.push("/login"); // Redirect to login if not authenticated
//           return;
//         }

//         if (user && !allowedRoles.includes(user.role)) {
//           console.log("User does NOT have the required role, redirecting to /unauthorized.");
//           router.push("/unauthorized"); // Redirect if the role doesn't match
//           return;
//         }
//       } catch (error) {
//         console.error("Error during authentication/authorization check:", error);
//       } finally {
//         setLoading(false); // Mark the check as complete
//       }
//     };

//     checkAuth();
//   }, [isAuthenticated, user, allowedRoles, router]);

//   if (loading) {
//     return <LoadingSpinner />; // Display loading spinner while checking
//   }

//   // Render children only if authenticated and authorized
//   return <>{children}</>;
// };

// export default Protected;



// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import LoadingSpinner from "../utils/LoadingComp/LoadingSpinner";
// import { useAuth } from "../Context/ThemeContext"; // Assuming the user role is in AuthContext

// const Protected = ({ children, allowedRoles = [] }) => {
//   const router = useRouter();
//   const { user, isAuthenticated } = useAuth(); // Assuming `user` contains the role and `isAuthenticated` exists in AuthContext
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         // Log the user role to the console
//         console.log("User:", user); // Log the entire user object to check its structure
//         if (user) {
//           console.log("User role:", user.role); // Log the role specifically
//         }

//         if (!isAuthenticated) {
//           console.log("User is NOT authenticated, redirecting to /login.");
//           router.push("/login"); // Redirect to login if not authenticated
//           return;
//         }

//         if (user && !allowedRoles.includes(user.role)) {
//           console.log("User does NOT have the required role, redirecting to /unauthorized.");
//           router.push("/unauthorized"); // Redirect if the role doesn't match
//           return;
//         }
//       } catch (error) {
//         console.error("Error during authentication/authorization check:", error);
//       } finally {
//         setLoading(false); // Mark the check as complete
//       }
//     };

//     checkAuth();
//   }, [isAuthenticated, user, allowedRoles, router]);

//   if (loading) {
//     return <LoadingSpinner />; // Display loading spinner while checking
//   }

//   // Render children only if authenticated and authorized
//   return <>{children}</>;
// };

// export default Protected;

// "use client"

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import LoadingSpinner from "../utils/LoadingComp/LoadingSpinner";
// import { useAuth } from "../Context/ThemeContext";

// interface ProtectedProps {
//   children: React.ReactNode;
//   allowedRoles: string[]; // Correctly typing allowedRoles as an array of strings
// }

// const Protected: React.FC<ProtectedProps> = ({ children, allowedRoles }) => {
//   const router = useRouter();
//   const { user } = useAuth();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         if (!user) {
//           console.log("User is NOT authenticated, redirecting to /login.");
//           router.push("/login");
//           return;
//         }

//         if (user && !allowedRoles.includes(user?.role)) {
//           console.log("User does NOT have the required role, redirecting to /unauthorized.");
//           router.push("/unauthorized");
//           return;
//         }
//       } catch (error) {
//         console.error("Error during authentication/authorization check:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkAuth();
//   }, [ user, allowedRoles, router]);

//   if (loading) {
//     return <LoadingSpinner />;
//   }

//   return <>{children}</>;
// };

// export default Protected;


"use client";

import React, { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../utils/LoadingComp/LoadingSpinner";
import { useAuth } from "../Context/ThemeContext";
import { usePersist } from "../Context/PersistLogin";

interface ProtectedProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const Protected: React.FC<ProtectedProps> = ({ children, allowedRoles }) => {
  const router = useRouter();
  const { user} = useAuth(); // Use loading from context
  const { isLoading} = usePersist(); // Use loading from context

  const isAuthorized = useMemo(() => {
    if (!user) return false;
    return allowedRoles.includes(user.role);
  }, [user, allowedRoles]);

  useEffect(() => {
    if (isLoading) return; // Wait until authentication state is resolved

    if (!user) {
      console.log("User is NOT authenticated, redirecting to /login.");
      router.push("/login");
      return;
    }

    if (!isAuthorized) {
      console.log("User does NOT have the required role, redirecting to /unauthorized.");
      router.push("/unauthorized");
    }
  }, [user, isAuthorized, router, isLoading]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
};

export default Protected;
