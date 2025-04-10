export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UserContextProps {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}
