// "use client"

// import { useState } from "react";

// const useNotifications = () => {
//   const [notification, setNotification] = useState(null);

//   const showNotification = (message, type = "success") => {
//     setNotification({ message, type });
//     setTimeout(() => {
//       setNotification(null);
//     }, 10000); // Hide notification after 10 seconds
//   };
  
//   return { notification, showNotification };
// };

// export default useNotifications;


"use client";

import { useState, useCallback } from "react";

const useNotifications = () => {
  const [notification, setNotification] = useState(null);

  const showNotification = useCallback((message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 10000); // Hide notification after 10 seconds
  }, []); // No dependencies, so it will be stable across renders

  return { notification, showNotification };
};

export default useNotifications;
