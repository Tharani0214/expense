import React, { useEffect } from 'react';

const NotificationManager = () => {
  useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    const notify = () => {
      if (Notification.permission === 'granted') {
        new Notification("💡 Reminder: Check your planned expenses!");
      }
    };

    const interval = setInterval(notify, 1000 * 60 * 60 * 6); // every 6 hours
    return () => clearInterval(interval);
  }, []);

  return null;
};

export default NotificationManager;
