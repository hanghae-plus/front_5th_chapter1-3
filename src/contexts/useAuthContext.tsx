import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AppProvider");
  }
  return context;
};

export default useAuthContext;
