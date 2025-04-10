// 타입 정의
export type Theme = "light" | "dark";
export type NewsCategory = "정치" | "경제" | "사회" | "문화";
export type NotificationType = "success" | "error" | "warning" | "info";

export interface NewsItem {
  id: number;
  title: string;
  category: NewsCategory;
  content: string;
  likes: number;
}

export interface User {
  name: string;
  email: string;
}

export interface Notification {
  id: number;
  message: string;
  type: NotificationType;
}

// Context 정의
export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export interface UserContextType {
  user: User | null;
  login: (name: string, email: string) => void;
  logout: () => void;
}

export interface NewsContextType {
  news: NewsItem[];
  addNews: (news: Omit<NewsItem, "id" | "likes">) => void;
  likeNews: (id: number) => void;
  filteredNews: NewsItem[];
  setCategory: (category: NewsCategory | null) => void;
}

export interface NotificationContextType {
  notifications: Notification[];
  addNotification: (message: string, type: NotificationType) => void;
  removeNotification: (id: number) => void;
}
