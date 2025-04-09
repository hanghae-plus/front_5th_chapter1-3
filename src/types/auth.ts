import { User } from "./user";

export interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
}
