import { memo } from "../../hocs";
import { useUserState, useUserActions } from "../../context";
import { Button } from "../common";

export const UserSection = memo(() => {
  const user = useUserState();
  const { login, logout } = useUserActions();

  const handleLogin = () => {
    // 실제 애플리케이션에서는 사용자 입력을 받아야 합니다.
    login("user@example.com", "password");
  };

  return user ? (
    <div className="flex items-center">
      <span className="mr-2">{user.name}님 환영합니다!</span>
      <Button onClick={logout} color="red">
        로그아웃
      </Button>
    </div>
  ) : (
    <Button onClick={handleLogin} color="green">
      로그인
    </Button>
  );
});
