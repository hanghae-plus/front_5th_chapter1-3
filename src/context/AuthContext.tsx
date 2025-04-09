// AuthContext.tsx
import React, { createContext } from "react";
import { useMemo } from "../@lib/hooks/useMemo";
import { AuthContextType } from "../types";

import { useAuth } from "../hooks/auth/useAuth";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, login, logout } = useAuth();
  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
