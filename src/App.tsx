import React, { useState, createContext, useContext } from "react";
import { generateItems, renderLog } from "./utils";
import { memo } from "./@lib/hocs";
import { useMemo } from "./@lib/hooks";

// 타입 정의
interface Item {
  id: number;
  name: string;
  category: string;
  price: number;
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface Notification {
  id: number;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

/**
 * 테마 관련 Context
 * - theme: 현재 적용된 테마 ("light" | "dark")
 * - toggleTheme: 테마를 전환하는 함수
 */
const ThemeContext = createContext<
  { theme: string; toggleTheme: () => void } | undefined
>(undefined);

/**
 * 사용자 인증 관련 Context
 * - user: 현재 로그인된 사용자 정보 (로그아웃 상태일 경우 null)
 * - login: 이메일과 비밀번호로 로그인하는 함수
 * - logout: 로그아웃 처리 함수
 */
const UserContext = createContext<
  | {
      user: User | null;
      login: (email: string, password: string) => void;
      logout: () => void;
    }
  | undefined
>(undefined);

/**
 * 알림 시스템 관련 Context
 * - notifications: 현재 표시된 알림들의 배열
 * - addNotification: 새로운 알림을 추가하는 함수
 * - removeNotification: 특정 ID의 알림을 제거하는 함수
 */
const NotificationContext = createContext<
  | {
      notifications: Notification[];
      addNotification: (message: string, type: Notification["type"]) => void;
      removeNotification: (id: number) => void;
    }
  | undefined
>(undefined);

/**
 * 테마 Context를 사용하기 위한 커스텀 훅
 * @throws {Error} ThemeProvider 외부에서 호출될 경우 에러 발생
 * @returns {Object} theme와 toggleTheme 함수를 포함한 객체
 */
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};

/**
 * 사용자 Context를 사용하기 위한 커스텀 훅
 * @throws {Error} UserProvider 외부에서 호출될 경우 에러 발생
 * @returns {Object} user 정보와 login/logout 함수를 포함한 객체
 */
const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};

/**
 * 알림 Context를 사용하기 위한 커스텀 훅
 * @throws {Error} NotificationProvider 외부에서 호출될 경우 에러 발생
 * @returns {Object} notifications 배열과 알림 관리 함수들을 포함한 객체
 */
const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error("useNotification must be used within NotificationProvider");
  return context;
};

// Header 컴포넌트
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface HeaderProps {}

export const Header = memo<HeaderProps>(() => {
  renderLog("Header rendered");
  const { theme, toggleTheme } = useTheme();
  const { user, login, logout } = useUser();

  const handleLogin = () => {
    // 실제 애플리케이션에서는 사용자 입력을 받아야 합니다.
    login("user@example.com", "password");
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">샘플 애플리케이션</h1>
        <div className="flex items-center">
          <button
            onClick={toggleTheme}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            {theme === "light" ? "다크 모드" : "라이트 모드"}
          </button>
          {user ? (
            <div className="flex items-center">
              <span className="mr-2">{user.name}님 환영합니다!</span>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              로그인
            </button>
          )}
        </div>
      </div>
    </header>
  );
});

// ItemList 컴포넌트
interface ItemListProps {
  items: Item[];
  onAddItemsClick: () => void;
}

export const ItemList = memo<ItemListProps>(({ items, onAddItemsClick }) => {
  renderLog("ItemList rendered");
  const [filter, setFilter] = useState("");
  const { theme } = useTheme();

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(filter.toLowerCase()) ||
      item.category.toLowerCase().includes(filter.toLowerCase()),
  );

  const totalPrice = filteredItems.reduce((sum, item) => sum + item.price, 0);

  const averagePrice = Math.round(totalPrice / filteredItems.length) || 0;

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">상품 목록</h2>
        <div>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs"
            onClick={onAddItemsClick}
          >
            대량추가
          </button>
        </div>
      </div>
      <input
        type="text"
        placeholder="상품 검색..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
      />
      <ul className="mb-4 mx-4 flex gap-3 text-sm justify-end">
        <li>검색결과: {filteredItems.length.toLocaleString()}개</li>
        <li>전체가격: {totalPrice.toLocaleString()}원</li>
        <li>평균가격: {averagePrice.toLocaleString()}원</li>
      </ul>
      <ul className="space-y-2">
        {filteredItems.map((item, index) => (
          <li
            key={index}
            className={`p-2 rounded shadow ${theme === "light" ? "bg-white text-black" : "bg-gray-700 text-white"}`}
          >
            {item.name} - {item.category} - {item.price.toLocaleString()}원
          </li>
        ))}
      </ul>
    </div>
  );
});

// ComplexForm 컴포넌트
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ComplexFormProps {}

export const ComplexForm = memo<ComplexFormProps>(() => {
  renderLog("ComplexForm rendered");
  const { addNotification } = useNotification();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: 0,
    preferences: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addNotification("폼이 성공적으로 제출되었습니다", "success");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? parseInt(value) || 0 : value,
    }));
  };

  const handlePreferenceChange = (preference: string) => {
    setFormData((prev) => ({
      ...prev,
      preferences: prev.preferences.includes(preference)
        ? prev.preferences.filter((p) => p !== preference)
        : [...prev.preferences, preference],
    }));
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">복잡한 폼</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="이름"
          className="w-full p-2 border border-gray-300 rounded text-black"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="이메일"
          className="w-full p-2 border border-gray-300 rounded text-black"
        />
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
          placeholder="나이"
          className="w-full p-2 border border-gray-300 rounded text-black"
        />
        <div className="space-x-4">
          {["독서", "운동", "음악", "여행"].map((pref) => (
            <label key={pref} className="inline-flex items-center">
              <input
                type="checkbox"
                checked={formData.preferences.includes(pref)}
                onChange={() => handlePreferenceChange(pref)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2">{pref}</span>
            </label>
          ))}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          제출
        </button>
      </form>
    </div>
  );
});

// NotificationSystem 컴포넌트
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface NotificationSystemProps {}

export const NotificationSystem = memo<NotificationSystemProps>(() => {
  renderLog("NotificationSystem rendered");
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="fixed bottom-4 right-4 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 rounded shadow-lg ${
            notification.type === "success"
              ? "bg-green-500"
              : notification.type === "error"
                ? "bg-red-500"
                : notification.type === "warning"
                  ? "bg-yellow-500"
                  : "bg-blue-500"
          } text-white`}
        >
          {notification.message}
          <button
            onClick={() => removeNotification(notification.id)}
            className="ml-4 text-white hover:text-gray-200"
          >
            닫기
          </button>
        </div>
      ))}
    </div>
  );
});

// 메인 App 컴포넌트
const App: React.FC = () => {
  const [theme, setTheme] = useState("light");

  /**
   * 초기 아이템 목록을 생성하고 메모이제이션
   * - 컴포넌트가 리렌더링되어도 generateItems 함수는 한 번만 호출됨
   * - 빈 의존성 배열로 인해 초기 렌더링 시에만 실행
   */
  const initialItems = useMemo(() => generateItems(1000), []);
  const [items, setItems] = useState(initialItems);
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const toggleTheme = React.useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  /**
   * 새로운 아이템을 추가하는 콜백 함수
   * - generateItems 함수 호출 대신 동일한 로직을 인라인으로 구현
   * - 기존 아이템 배열의 길이를 기준으로 새로운 ID 생성
   * - 1000개의 새로운 아이템을 생성하여 기존 배열에 추가
   */
  const addItems = React.useCallback(() => {
    setItems((prevItems) => [
      ...prevItems,
      ...Array.from({ length: 1000 }, (_, index) => ({
        id: prevItems.length + index,
        name: `상품 ${prevItems.length + index}`,
        category: ["전자기기", "의류", "도서", "식품"][
          Math.floor(Math.random() * 4)
        ],
        price: Math.floor(Math.random() * 100000) + 1000,
      })),
    ]);
  }, []);

  const addNotification = React.useCallback(
    (message: string, type: Notification["type"]) => {
      const newNotification: Notification = {
        id: Date.now(),
        message,
        type,
      };
      setNotifications((prev) => [...prev, newNotification]);
    },
    [],
  );

  const login = React.useCallback(
    (email: string) => {
      setUser({ id: 1, name: "홍길동", email });
      addNotification("성공적으로 로그인되었습니다", "success");
    },
    [addNotification],
  );

  const logout = React.useCallback(() => {
    setUser(null);
    addNotification("로그아웃되었습니다", "info");
  }, [addNotification]);

  const removeNotification = React.useCallback((id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  }, []);

  /**
   * 테마 Context 값 메모이제이션
   * - theme이나 toggleTheme가 변경될 때만 새로운 객체 생성
   */
  const themeContextValue = React.useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme, toggleTheme],
  );

  /**
   * 사용자 Context 값 메모이제이션
   * - user, login, logout이 변경될 때만 새로운 객체 생성
   */
  const userContextValue = React.useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user, login, logout],
  );

  /**
   * 알림 Context 값 메모이제이션
   * - notifications나 관련 함수들이 변경될 때만 새로운 객체 생성
   */
  const notificationContextValue = React.useMemo(
    () => ({
      notifications,
      addNotification,
      removeNotification,
    }),
    [notifications, addNotification, removeNotification],
  );

  /**
   * ItemList 컴포넌트에 전달할 props를 메모이제이션
   * - items나 addItems가 변경될 때만 새로운 객체 생성
   * - ItemList 컴포넌트의 불필요한 리렌더링 방지
   */
  const itemListProps = useMemo(
    () => ({
      items,
      onAddItemsClick: addItems,
    }),
    [items, addItems],
  );

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <UserContext.Provider value={userContextValue}>
        <NotificationContext.Provider value={notificationContextValue}>
          <div
            className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
          >
            <Header />
            <div className="container mx-auto px-4 py-8">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 md:pr-4">
                  <ItemList {...itemListProps} />
                </div>
                <div className="w-full md:w-1/2 md:pl-4">
                  <ComplexForm />
                </div>
              </div>
            </div>
            <NotificationSystem />
          </div>
        </NotificationContext.Provider>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
