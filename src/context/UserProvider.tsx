import { PropsWithChildren, useCallback, useState } from 'react';
import { User } from '../types/User';
import { useContextValue } from './useContextValue';
import { NotificationContext } from './NotificationContext';
import { UserContext } from './UserContext';

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { addNotification } = useContextValue(NotificationContext);

  const login = useCallback(
    (email: string) => {
      setUser({ id: 1, name: '홍길동', email });
      addNotification('성공적으로 로그인되었습니다', 'success');
    },
    [addNotification],
  )

  const logout = useCallback(() => {
    setUser(null);
    addNotification('로그아웃되었습니다', 'info');
  }, [addNotification])

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}