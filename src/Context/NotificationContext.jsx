"use client";

import React, { createContext, useContext } from "react";
// import { useRouter } from "next/navigation";
import useNotifications from "../utils/Middlewares/Notifications/UseNotifications";
// import { useSocket } from "./SocketContext";
 // Import SocketProvider

export const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
    const { notification, showNotification } = useNotifications();
   
  
    return (
      <NotificationContext.Provider value={{ notification, showNotification }}>
        {children}
      </NotificationContext.Provider>
    );
  };
  

  export const useNotification = () => useContext(NotificationContext);