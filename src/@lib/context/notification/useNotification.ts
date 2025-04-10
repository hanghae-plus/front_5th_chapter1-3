import { useValidContext } from "../../hooks";
import { NotificationContext } from "./NotificationContext";

export const useNotification = () => useValidContext(NotificationContext);
