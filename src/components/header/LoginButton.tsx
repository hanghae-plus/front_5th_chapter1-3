import { useNotificationContext } from "../../contexts/NotificationContext";
import { LoginContextType } from "../../types";

export default function LoginButton({ user, setUser }: LoginContextType) {
  const { addNotification } = useNotificationContext();
  const login = (email: string) => {
    setUser({ id: 1, name: "홍길동", email });
    addNotification("성공적으로 로그인되었습니다", "success");
  };

  const logout = () => {
    setUser(null);
    addNotification("로그아웃되었습니다", "info");
  };

  const handleLogin = () => {
    // 실제 애플리케이션에서는 사용자 입력을 받아야 합니다.
    login("user@example.com");
  };

  return user ? (
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
  );
}
