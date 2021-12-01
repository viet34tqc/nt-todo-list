import { useEffect, useState } from 'react';
import LogoutButton from 'src/components/LogoutButton';
import authApi from '../login/authApi';

const UserList = () => {
	const [users, setUsers] = useState<any>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isExpiredToken, setIsExpiredToken] = useState(false);
	useEffect(() => {
		if (!isLoading) {
			return;
		}
		let mounted = true;

		(async () => {
			try {
				if (mounted) {
					const users = await authApi.getUserList(
						isExpiredToken ? { isExpiredToken: true } : {}
					);
					setIsLoading(false);
					setUsers(users);
				}
			} catch (error) {
				setIsLoading(false);
				console.log('error', error);
			}
		})();

		return () => {
			mounted = false;
		};
	}, [isLoading, users, isExpiredToken]);

	const handleClick = async () => {
		setIsLoading(true);
	};

	const handleClickWithExpiredToken = () => {
		setIsLoading(true);
		setIsExpiredToken(true);
	};

	return (
		<>
			<h1>User List</h1>
			<LogoutButton />

			<div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
				<button disabled={isLoading} onClick={handleClick}>
					Fetch user list
				</button>
				<button disabled={isLoading} onClick={handleClickWithExpiredToken}>
					Fetch user list with expired token
				</button>
			</div>
			<div>
				{users.length > 0 &&
					users.map((user: any) => (
						<div key={user.uid}>
							{user.firstname}&nbsp;
							{user.lastname}
						</div>
					))}
			</div>
		</>
	);
};

export default UserList;
