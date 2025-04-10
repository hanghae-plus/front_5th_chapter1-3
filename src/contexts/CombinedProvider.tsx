import { ReactNode } from "react";
import ThemeProvider from "./theme/ThemeProvider";
import NotiProvider from "./notification/NotiProvider";
import UserProvider from "./user/UserProvider";

export const CombinedProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <ThemeProvider>
      <NotiProvider>
        <UserProvider>{children}</UserProvider>
      </NotiProvider>
    </ThemeProvider>
  );
};

export default CombinedProvider;
