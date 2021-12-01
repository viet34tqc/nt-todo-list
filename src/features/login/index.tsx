import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import AuthenticationService from 'src/core/authenticationService';
import authApi from './authApi';

const Login = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [path, setPath] = useState('');

	const history = useHistory();

	useEffect(() => {
		if (!isLoading) return;
		const authentication = AuthenticationService.getInstance();
		setIsLoading(true);
		(async () => {
			try {
				// Call API and set the token to the authentication instance
				const tokens = await authApi.login({
					email: 'user002@gmail.com',
					password: '123',
				});
				setIsLoading(false);

				authentication.authenticated(tokens);

				console.log('authentication.token', authentication.token);
				if (authentication.token) {
					history.push(path);
				}
			} catch (error) {
				setIsLoading(false);
				console.log(error);
			}
		})();
	}, [isLoading, path, history]);

	const handleClick = async (path: string) => {
		setIsLoading(true);
		setPath(path);
	};

	return (
		<div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
			<button
				disabled={isLoading}
				type="button"
				onClick={() => handleClick('/profile')}
			>
				Login to profile page
			</button>
			<button
				disabled={isLoading}
				type="button"
				onClick={() => handleClick('/userList')}
			>
				Login to fetch user page
			</button>
		</div>
	);
};

export default Login;
