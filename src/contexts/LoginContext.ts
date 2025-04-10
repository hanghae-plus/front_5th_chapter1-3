import { createContext, useContext } from "react";
import { LoginContextType } from "../types";

export const LoginContext = createContext<LoginContextType>({
  user: {
    id: 0,
    name: "",
    email: "",
  },
  setUser: () => {},
});

export const useLoginContext = () => useContext(LoginContext);
