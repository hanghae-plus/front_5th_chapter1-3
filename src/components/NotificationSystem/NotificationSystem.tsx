import { memo } from "../../hocs";
import { useNotificationState, useNotificationActions } from "../../context";
import { renderLog } from "../../utils";
import { NotificationItem } from "./NotificationItem";

export const NotificationSystem: React.FC = memo(() => {
  renderLog("NotificationSystem rendered");

  const notifications = useNotificationState();
  const { removeNotification } = useNotificationActions();

  return (
    <div className="fixed bottom-4 right-4 space-y-2">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRemove={removeNotification}
        />
      ))}
    </div>
  );
});
