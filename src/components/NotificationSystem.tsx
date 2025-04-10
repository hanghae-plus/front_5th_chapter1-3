import { memo } from "../@lib";
import { useNotification } from "../@lib/context";
import { Notification } from "../types/common";
import { renderLog } from "../utils";

const NotificationSystem: React.FC = memo(() => {
  renderLog("NotificationSystem rendered");

  const { notifications, removeNotification } = useNotification();

  const setNotificationClassName = (type: Notification["type"]) => {
    let typeColor = "";

    switch (type) {
      case "success":
        typeColor = "bg-green-500";
        break;
      case "error":
        typeColor = "bg-red-500";
        break;
      case "warning":
        typeColor = "bg-yellow-500";
        break;

      default:
        typeColor = "bg-blue-500";
    }

    return `p-4 rounded shadow-lg ${typeColor} text-white`;
  };

  return (
    <div className="fixed bottom-4 right-4 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={setNotificationClassName(notification.type)}
        >
          {notification.message}
          <button
            onClick={() => removeNotification(notification.id)}
            className="ml-4 text-white hover:text-gray-200"
          >
            닫기
          </button>
        </div>
      ))}
    </div>
  );
});

export default NotificationSystem;
