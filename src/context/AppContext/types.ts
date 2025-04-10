import { User } from "../../models";

// AppContext 타입 정의
export interface AppContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}
