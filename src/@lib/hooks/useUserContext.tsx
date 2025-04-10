import { useContext } from "react";
import { UserContext } from "../../context/UserProvider";

// 커스텀 훅: useAppContext
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
