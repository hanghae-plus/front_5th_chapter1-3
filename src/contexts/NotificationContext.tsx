import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface Notification {
  id: number;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

const NotificationContext = createContext<
  | {
      notifications: Notification[];
      addNotification: (message: string, type: Notification["type"]) => void;
      removeNotification: (id: number) => void;
    }
  | undefined
>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback(
    (message: string, type: Notification["type"]) => {
      //함수에 useCallback 해야되네
      const newNotification: Notification = {
        id: Date.now(),
        message,
        type,
      };
      setNotifications((prev) => [...prev, newNotification]);
    },
    [],
  );

  const removeNotification = useCallback((id: number) => {
    //함수에 useCallback 해야되네
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      notifications,
      addNotification,
      removeNotification,
    }),
    [notifications, addNotification, removeNotification],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx)
    throw new Error("useNotification must be used within NotificationProvider");
  return ctx;
};

// import { createContext, PropsWithChildren, useContext, useState } from "react";
// import { useCallback, useMemo } from "../@lib";
// import { Notification } from "../App";

// interface NotificationContextType {
//   notifications: Notification[];
//   addNotification: (message: string, type: Notification["type"]) => void;
//   removeNotification: (id: number) => void;
// }

// const NotificationContext = createContext<NotificationContextType | undefined>(
//   undefined,
// );

// export const NotificationProvider: React.FC<PropsWithChildren> = ({
//   children,
// }) => {
//   const [notifications, setNotifications] = useState<Notification[]>([]);

//   const addNotification = useCallback(
//     (message: string, type: Notification["type"]) => {
//       const newNotification: Notification = {
//         id: Date.now(),
//         message,
//         type,
//       };
//       setNotifications((prev) => [...prev, newNotification]);
//     },
//     [],
//   );

//   const removeNotification = useCallback((id: number) => {
//     setNotifications((prev) =>
//       prev.filter((notification) => notification.id !== id),
//     );
//   }, []);

//   const contextValue: NotificationContextType = useMemo(
//     () => ({
//       notifications,
//       addNotification,
//       removeNotification,
//     }),
//     [addNotification, notifications, removeNotification],
//   );

//   return (
//     <NotificationContext.Provider value={contextValue}>
//       {children}
//     </NotificationContext.Provider>
//   );
// };

// export function useNotification() {
//   const context = useContext(NotificationContext);
//   if (context === undefined) {
//     throw new Error(
//       "useNotificationContext must be used within an NotificationProvider",
//     );
//   }
//   return context;
// }
