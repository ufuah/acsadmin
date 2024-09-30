"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import useStore from "../useStore/Store";

const LockProvider = ({ children }) => {
  const {
    isLocked,
    checkLock,
    isAuthenticated,
    role, // Include role to determine user access
  } = useStore((state) => ({
    isLocked: state.isLocked,
    checkLock: state.checkLock,
    isAuthenticated: state.isAuthenticated,
    role: state.role, // Accessing the user role
  }));

  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Memoize the handleLockCheck function
  const handleLockCheck = useCallback(async () => {
    try {
      await checkLock(); // Fetch lock status
    } catch (error) {
      console.error("Error during lock check:", error);
    } finally {
      setLoading(false); // Set loading to false after the lock check
    }
  }, [checkLock]);

  useEffect(() => {
    // Perform the initial lock check on mount
    handleLockCheck();
  }, [handleLockCheck]);

  useEffect(() => {
    if (!loading) {
      // Check if the user is authenticated
      if (!isAuthenticated()) {
        console.log("User not authenticated. Redirecting to /login.");
        router.push("/login"); // Redirect to the login page if not authenticated
      } else if (isLocked && role !== "admin") {
        // If the system is locked and the user is not an admin
        console.log("Redirecting to /locked because the system is locked for non-admin users.");
        router.push("/locked"); // Redirect to the locked page
      } else {
        // If unlocked or user is admin
        console.log("Access granted, rendering protected content.");
      }
    }
  }, [isLocked, loading, router, isAuthenticated, role]);

  if (loading) {
    // Display loading state until the lock check completes
    return <div>Loading...</div>; // You can replace this with a spinner or custom loading UI
  }

  // If no redirection occurred, render the protected content
  return <>{children}</>;
};

export default LockProvider;
