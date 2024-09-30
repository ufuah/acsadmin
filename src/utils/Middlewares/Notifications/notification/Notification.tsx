"use client"

import React from 'react';
import styles from './notification.module.css';

interface NotificationProps {
  notification: {
    type: string; // Assuming type is a string, you can replace it with the correct type
    message: string;
  } | null; // The notification can be null if there's no notification to show
}

const Notification: React.FC<NotificationProps> = ({ notification }) => {
  return (
    <div className={`${styles.notification} ${notification && styles[`show-${notification.type}`]}`}>
      {notification && <p>{notification.message}</p>}
    </div>
  );
};

export default Notification;
