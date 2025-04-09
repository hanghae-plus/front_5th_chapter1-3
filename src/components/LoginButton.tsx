import { NotificationContext } from '../context/NotificationContext';
import { UserContext } from '../context/UserContext';
import { useContextValue } from '../context/useContextValue';
import { User } from '../types/User';

export const LoginButton: React.FC<{ user: User | null }> = ({ user }) => {
	const { login, logout } = useContextValue(UserContext);
	const { addNotification } = useContextValue(NotificationContext);

	const handleLogin = () => {
		login('user@example.com', 'password');
		addNotification('성공적으로 로그인되었습니다', 'success');
	};

	const handleLogout = () => {
		logout();
		addNotification('로그아웃되었습니다', 'info');
	};

	if (user) {
		return (
			<div className="flex items-center">
				<span className="mr-2">{user.name}님 환영합니다!</span>
				<button
					onClick={handleLogout}
					className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
				>
					로그아웃
				</button>
			</div>
		);
	}

	return (
		<button
			onClick={handleLogin}
			className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
		>
			로그인
		</button>
	);
};
