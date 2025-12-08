// "use client"

// import React from 'react';
// import styles from './notification.module.css';

// interface NotificationProps {
//   notification: {
//     type: string; // Assuming type is a string, you can replace it with the correct type
//     message: string;
//   } | null; // The notification can be null if there's no notification to show
// }

// const Notification: React.FC<NotificationProps> = ({ notification }) => {
//   return (
//     <div className={`${styles.notification} ${notification && styles[`show-${notification.type}`]}`}>
//       {notification && <p>{notification.message}</p>}
//     </div>
//   );
// };

// export default Notification;





"use client";

import React from 'react';
import styles from './notification.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleExclamation, faTriangleExclamation, faCircleInfo, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNotification } from '@/src/Context/NotificationContext'; // Ensure this points to your actual context

const Notification = () => {
  const { notification, showNotification, progress } = useNotification();

  // No notification to display
  if (!notification) return null;

  // Get icon based on notification type
  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return faCircleCheck;
      case 'error':
        return faCircleExclamation;
      case 'warning':
        return faTriangleExclamation;
      case 'info':
        return faCircleInfo;
      case 'item upload': // Handle specific case for item upload
        return faCircleInfo;
      default:
        return faCircleInfo;
    }
  };

  return (
    <div className={`${styles.notification} ${styles[notification.type] || styles.info}`}>
      <div className={styles.container}>
        <div className={styles.box}>
          <FontAwesomeIcon icon={getIcon()} className={styles.icon} />
          <div className={styles.message}>
            <p>{notification.message || 'Notification'}</p>
          </div>
        </div>

        <FontAwesomeIcon
          icon={faXmark}
          className={styles.close}
          onClick={() => showNotification(null)} // Manually close notification
        />
      </div>

      {/* Progress bar */}
      {notification.type === 'item upload' && (
        <div className={styles.progress} style={{ width: `${progress}%` }}></div>
      )}
    </div>
  );
};

export default Notification;