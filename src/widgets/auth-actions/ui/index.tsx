import { User } from "@features/auth/model";
import { useNotification } from "@features/notification/model";

interface AuthActionsProps {
  user: User | null;
  onLogin: (email: string, password: string) => void;
  onLogout: () => void;
}

export function AuthActions({ user, onLogin, onLogout }: AuthActionsProps) {
  const { addNotification } = useNotification();

  const handleLogin = () => {
    // 실제 애플리케이션에서는 사용자 입력을 받아야 합니다.
    onLogin("user@example.com", "password");
    addNotification("로그인되었습니다", "success");
  };

  const handleLogout = () => {
    onLogout();
    addNotification("로그아웃되었습니다", "info");
  };

  return user ? (
    <div className="flex items-center">
      <span className="mr-2">{user.name}님 환영합니다!</span>
      <button
        onClick={handleLogout}
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
