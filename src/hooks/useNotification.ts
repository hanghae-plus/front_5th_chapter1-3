import { NotificationContext } from "../context";
import { customHookMaker } from "./customHookMaker";

export const useNotification = customHookMaker(NotificationContext);
