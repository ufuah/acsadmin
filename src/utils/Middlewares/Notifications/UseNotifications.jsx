"use client"

import { useState } from "react";

const useNotifications = () => {
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 6000); // Hide notification after 3 seconds
  };
  
  return { notification, showNotification };
};

export default useNotifications;
