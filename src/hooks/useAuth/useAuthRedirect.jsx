import { useEffect } from "react";
import { useRouter } from "next/router";
import useStore from "../store";

const useAuthRedirect = () => {
  const router = useRouter();
  const { user, role, token, loadUserFromLocalStorage } = useStore();

  useEffect(() => {
    loadUserFromLocalStorage(); // Ensure user data is loaded

    if (!token) {
      router.push("/login"); // Redirect to login if no token
    } else if (role === "admin" && router.pathname === "/sales") {
      router.push("/dashboard"); // Redirect admin away from sales if necessary
    } else if (role !== "admin" && router.pathname === "/dashboard") {
      router.push("/sales"); // Redirect non-admin from dashboard
    }
  }, [router, token, role, loadUserFromLocalStorage]);

  return null;
};

export default useAuthRedirect;
