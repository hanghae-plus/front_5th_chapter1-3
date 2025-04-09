import { PropsWithChildren, useCallback, useState } from 'react';
import { Notification } from '../types/Notification';
import { NotificationContext } from './NotificationContext';

export const NotificationProvider = ({
  children }: PropsWithChildren) => { 
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const addNotification = useCallback(
      (message: string, type: Notification["type"]) => {
        const newNotification: Notification = {
          id: Date.now(),
          message,
          type,
        };
        setNotifications((prev) => [...prev, newNotification]);
      }, [setNotifications])
    
    const removeNotification = useCallback(
      (id: number) => {
        setNotifications((prev) => 
          prev.filter((notification) => notification.id !== id),
        )
      },
      [setNotifications]
    )

    const contextValue = {
      notifications,
      addNotification,
      removeNotification,
    }

    return (
      <NotificationContext.Provider value={contextValue}>
        {children}
      </NotificationContext.Provider>
    )
  }