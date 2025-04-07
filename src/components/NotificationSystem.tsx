import { renderLog } from "../utils";
import type { Notification } from "../types/notification";
import { memo } from "../@lib";

type Props = {
  notifications: Notification[];
  removeNotification: (id: number) => void;
};

// NotificationSystem 컴포넌트
export const NotificationSystem = memo(
  ({ notifications, removeNotification }: Props) => {
    renderLog("NotificationSystem rendered");

    return (
      <div className="fixed bottom-4 right-4 space-y-2">
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
              type="button"
              onClick={() => removeNotification(notification.id)}
              className="ml-4 text-white hover:text-gray-200"
            >
              닫기
            </button>
          </div>
        ))}
      </div>
    );
  },
);
