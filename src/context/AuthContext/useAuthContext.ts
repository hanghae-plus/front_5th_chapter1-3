import { createContext, useContext } from "react";

import { AuthContextType } from "../../types/type";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error("useAuthContext must be used within a AuthProvider");
  return context;
};
