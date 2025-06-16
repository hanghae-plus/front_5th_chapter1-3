import { createContext, ReactNode, useContext } from "react";
import { useNotificationStore } from "./NotificationStore";
import { NotificationContextType } from "./NotificationTypes";

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const notificationsContextValue = useNotificationStore();

  return (
    <NotificationContext.Provider value={notificationsContextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotificationContext must be used within NotificationProvider",
    );
  }
  return context;
};
