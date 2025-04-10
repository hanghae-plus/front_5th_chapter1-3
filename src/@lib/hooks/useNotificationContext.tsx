import { useContext } from "react";
import { NotificationContext } from "../../context/NotificationProvider";

// 커스텀 훅: useAppContext
export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (context === null) {
    throw new Error(
      "useNotificationContext must be used within a NotificationProvider"
    );
  }
  return context;
};

// export const useNotificationState = () => {
//   const context = useContext(NotificationStateContext);
//   if (context === null) {
//     throw new Error(
//       "useNotificationState must be used within a NotificationProvider"
//     );
//   }
//   return context;
// };

// export const useNotificationActions = () => {
//   const context = useContext(NotificationActionsContext);
//   if (context === null) {
//     throw new Error(
//       "useNotificationActions must be used within a NotificationProvider"
//     );
//   }
//   return context;
// };
