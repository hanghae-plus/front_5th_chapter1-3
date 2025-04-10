import { memo } from "react";

import { useNotification } from "../../contexts/NotificationContext";

import { renderLog } from "../../utils";

export const NotificationSystem = memo(() => {
  renderLog("NotificationSystem rendered");

  const { notifications, removeNotification } = useNotification();

  return (
    <div className="fixed bottom-4 right-4 space-y-2">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`p-4 rounded shadow-lg text-white ${
            n.type === "success"
              ? "bg-green-500"
              : n.type === "error"
                ? "bg-red-500"
                : n.type === "warning"
                  ? "bg-yellow-500"
                  : "bg-blue-500"
          }`}
        >
          {n.message}
          <button
            onClick={() => removeNotification(n.id)}
            className="ml-4 text-white hover:text-gray-200"
          >
            닫기
          </button>
        </div>
      ))}
    </div>
  );
});
