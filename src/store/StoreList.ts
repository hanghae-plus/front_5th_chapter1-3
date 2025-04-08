import { create } from './createStore';
import { Item, User, Notification } from '../type/types';

export const themeStore = create<{
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}>({
  theme: 'light',
  toggleTheme: () => {
    themeStore.setState((prev) => ({
      theme: prev.theme === 'light' ? 'dark' : 'light',
    }));
  },
});

export const userStore = create<{
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
}>({
  user: null,
  login: (email: string) => {
    userStore.setState((_) => ({
      user: { id: 1, name: '홍길동', email },
    }));
    notificationStore
      .getState()
      .addNotification('성공적으로 로그인되었습니다', 'success');
  },
  logout: () => {
    userStore.setState((_) => ({
      user: null,
    }));
    notificationStore.getState().addNotification('로그아웃되었습니다', 'info');
  },
});

export const notificationStore = create<{
  notifications: Notification[];
  addNotification: (message: string, type: Notification['type']) => void;
  removeNotification: (id: number) => void;
}>({
  notifications: [],
  addNotification: (message: string, type: Notification['type']) => {
    const newNotification: Notification = {
      id: Date.now(),
      message,
      type,
    };
    notificationStore.setState((prev) => ({
      notifications: [...prev.notifications, newNotification],
    }));
  },
  removeNotification: (id: number) => {
    notificationStore.setState((prev) => ({
      notifications: prev.notifications.filter(
        (notification) => notification.id !== id
      ),
    }));
  },
});

export const itemStore = create<{
  items: Item[];
  addItems: (items: Item[]) => void;
}>({
  items: [],
  addItems: (items: Item[]) => {
    itemStore.setState((prev) => ({
      items: [...prev.items, ...items],
    }));
  },
});
