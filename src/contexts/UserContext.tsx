// import { createContext, useContext, useMemo, useState } from "react";

// interface User {
//   id: number;
//   name: string;
//   email: string;
// }

// const UserContext = createContext<{
//   user: User | null;
//   login: (email: string, password: string) => void;
//   logout: () => void;
// } | undefined>(undefined);

// export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   // const { addNotification } = useNotification(); // ✅ 여기서 사용

//   const login = (email: string, password: string) => {
//     setUser({ id: 1, name: "홍길동", email });
//     // addNotification("로그인 성공", "success");
//   };

//   const logout = () => {
//     setUser(null)
//     // addNotification("로그아웃", "success");
//   };

//   const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

//   return (
//     <UserContext.Provider value={value}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => {
//   const ctx = useContext(UserContext);
//   if (!ctx) throw new Error("useUser must be used within UserProvider");
//   return ctx;
// };

import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useCallback, useMemo } from "../@lib";
import { User } from "../App";
import { useNotification } from "./NotificationContext";

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  check: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { addNotification } = useNotification();
  //여기서 notification을 안쓰려고 했던이유는 notification에 변형이 생기면 userProvider도 변형이 생기고, 그러면 user를 사용하는 header도 불필요한
  //렌더링이 일어났었기 때문임. 그런데 useCallback과 useMemo로 안생기게 되는것 같다.
  //useCallback 안쓴 check 함수가 있는것만으로도 알림추가시 header까지 렌더링이 일어난다.

  // userConext가 실행되겠지? 그러면 check 함수도 어쨋든 무조건 생성될거고.
  // 새롭게 생성된다는건 렌더링을 의미하는거고 notification 알림을 닫는데도
  // header가 렌더링되는건 userContext안에 notification을 사용하고 있기때문이야.

  //로그인할때 addNotification 까지.
  //   const login =
  //     (email: string) => {
  //   setUser({ id: 1, name: "홍길동", email });
  //   addNotification("로그인 성공", "success");
  // };

  const check = useCallback(() => {
    setUser({ id: 1, name: "빵야", email: "빵야@naver.com" });
    // addNotification 렌더링이 일어나지 않는다.
  }, []);

  const login = useCallback(
    //여기도 useCallback 써야하네
    (email: string) => {
      setUser({ id: 1, name: "홍길동", email });
      addNotification("성공적으로 로그인되었습니다", "success");
    },
    [addNotification],
  );

  const logout = useCallback(() => {
    setUser(null);
    addNotification("로그아웃되었습니다", "info");
  }, [addNotification]);

  const contextValue: UserContextType = useMemo(
    //메모가 직격탄이네
    () => ({
      user,
      login,
      logout,
      check,
    }),
    [login, logout, user, check],
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within an UserProvider");
  }
  return context;
}
