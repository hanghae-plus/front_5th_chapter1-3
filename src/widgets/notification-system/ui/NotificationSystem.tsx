import { useNotification } from "@features/notification/model";

import { renderLog } from "@/utils";

import { NotificationItem } from "./Notificationitem";

export function NotificationSystem() {
  renderLog("NotificationSystem rendered");
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="fixed bottom-4 right-4 space-y-2">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          removeNotification={removeNotification}
        />
      ))}
    </div>
  );
}
