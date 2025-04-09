import { memo } from "../../hocs";
import { Notification } from "../../types";
import { CloseButton } from "./CloseButton";

interface NotificationItemProps {
  notification: Notification;
  onRemove: (id: number) => void;
}

export const NotificationItem = memo(
  ({ notification, onRemove }: NotificationItemProps) => {
    const getBackgroundColor = () => {
      switch (notification.type) {
        case "success":
          return "bg-green-500";
        case "error":
          return "bg-red-500";
        case "warning":
          return "bg-yellow-500";
        default:
          return "bg-blue-500";
      }
    };

    return (
      <div
        className={`p-4 rounded shadow-lg ${getBackgroundColor()} text-white`}
      >
        {notification.message}
        <CloseButton onClick={() => onRemove(notification.id)} />
      </div>
    );
  }
);
