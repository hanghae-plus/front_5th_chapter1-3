import React from "react";
import { renderLog } from "../utils";
import { useNotiContext } from "../contexts/notification/useNotiContext";
import { memo } from "../@lib";

// NotificationSystem 컴포넌트
const NotificationSystem: React.FC = () => {
  renderLog("NotificationSystem rendered");
  const { notifications, removeNotification } = useNotiContext();

  return (
    <div className="fixed space-y-2 bottom-4 right-4">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 rounded shadow-lg ${
            notification.type === "success"
              ? "bg-green-500"
              : notification.type === "error"
                ? "bg-red-500"
                : notification.type === "warning"
                  ? "bg-yellow-500"
                  : "bg-blue-500"
          } text-white`}
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
};

export default memo(NotificationSystem);
