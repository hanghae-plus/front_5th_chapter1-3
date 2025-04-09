import { createContext } from "react";
import { User } from "../../types";

export const UserStateContext = createContext<User | null>(null);
