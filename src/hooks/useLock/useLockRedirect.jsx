"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import useStore from "../../useStore/Store";

const useLockRedirect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { token, isLocked, checkLock, role } = useStore();

  useEffect(() => {
    const handleLockStatus = async () => {
      await checkLock();

      if (!token) {
        router.push("/login");
        return;
      }

      if (isLocked && role !== "admin") {
        router.push("/locked");
      } else if (!isLocked && role === "admin" && pathname === "/locked") {
        router.push("/dashboard");
      } else if (!isLocked && role !== "admin" && pathname === "/dashboard") {
        router.push("/sales");
      }
    };

    handleLockStatus();
  }, [router, token, isLocked, role, pathname, checkLock]);

  return null;
};

export default useLockRedirect;
