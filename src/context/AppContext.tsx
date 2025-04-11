import {
  AuthContextProvider,
  NotificationContextProvider,
  ThemeContextProvider,
  ItemListContextProvider,
} from "./index";
import { ContextProps } from "../type/type";

export const AppContextProvider = ({ children }: ContextProps) => {
  return (
    <ThemeContextProvider>
      <NotificationContextProvider>
        <AuthContextProvider>
          <ItemListContextProvider>{children}</ItemListContextProvider>
        </AuthContextProvider>
      </NotificationContextProvider>
    </ThemeContextProvider>
  );
};
