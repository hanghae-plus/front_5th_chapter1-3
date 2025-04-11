import { cva } from "class-variance-authority";

import { Notification } from "@features/notification/model";

const notificationItemVariants = cva("p-4 rounded shadow-lg text-white", {
  variants: {
    type: {
      success: "bg-green-500",
      error: "bg-red-500",
      warning: "bg-yellow-500",
      info: "bg-blue-500",
    },
  },
});

interface NotificationItemProps {
  notification: Notification;
  removeNotification: (id: number) => void;
}

export function NotificationItem({
  notification,
  removeNotification,
}: NotificationItemProps) {
  const { id, type, message } = notification;

  return (
    <div key={id} className={notificationItemVariants({ type })}>
      {message}
      <button
        onClick={() => removeNotification(id)}
        className="ml-4 text-white hover:text-gray-200"
      >
        닫기
      </button>
    </div>
  );
}
