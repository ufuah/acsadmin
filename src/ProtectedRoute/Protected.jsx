"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../utils/LoadingComp/LoadingSpinner"; // Import the spinner for loading state

const Protected = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Loading state while checking auth
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Local state for auth

  useEffect(() => {
    // Check the authentication status, e.g., from local storage or cookies
    const token = localStorage.getItem("token"); // Adjust based on your auth implementation

    if (token) {
      setIsAuthenticated(true); // Set authenticated if token exists
    } else {
      setIsAuthenticated(false); // No token, user is not authenticated
    }
    setLoading(false); // Set loading to false as auth check is complete
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        console.log("User is NOT authenticated, redirecting to /login.");
        router.push("/login"); // Redirect to login if not authenticated
      }
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return <LoadingSpinner />; // Show a loading spinner while checking auth state
  }

  // If authenticated, render the children components
  return <>{isAuthenticated ? children : null}</>;
};

export default Protected;
