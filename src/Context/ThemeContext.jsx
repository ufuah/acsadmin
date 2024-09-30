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

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = UseStorage("user", null);
  const [accessToken, setAccessToken] = UseStorage("accessToken", null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const {notification, showNotification } = useNotifications();


  const handleLogin = async (inputs, userType) => {
    try {
      let loginFunction;
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
          throw new Error(`Invalid user type: ${userType}`);
      }

      const userData = await loginFunction(inputs);
      setUser(userData);
      setIsAuthenticated(true);
      router.push("/market");
    } catch (error) {
      showNotification("Login failed. Please try again.", "error");
      console.error(`${userType} login error:`, error);
    }
  };


  console.log(notification);


  
  const handleLogout = async (userType) => {
    try {
      let outFunction;
      switch (userType) {
        case "user":
          outFunction = userLogout;
          break;
        case "storeOwner":
          outFunction = storeOwnerLogout;
          break;
        case "logistics":
          outFunction = logisticsLogout;
          break;
        default:
          throw new Error(`Invalid user type: ${userType}`);
      }

      await outFunction(accessToken);
      showNotification(`Logout successful`, "warning");
      setUser(null);
      setAccessToken(null);
      setIsAuthenticated(false);
      router.push("/market");
    } catch (error) {
    
      console.error(`${userType} logout error:`, error);
    }
  };


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("accessToken");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setAccessToken(storedToken);
      setIsAuthenticated(true);
    }
  }, [setUser, setAccessToken]);

  return (
    <AuthContext.Provider
      value={{ handleLogin, user, setUser, isAuthenticated, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

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
