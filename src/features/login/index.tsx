import { useState } from 'react';
import { useHistory } from 'react-router';
import AuthenticationService from 'src/core/authenticationService';
import authApi from './authApi';

const Login = () => {
	const [isLoading, setIsLoading] = useState(false);

	const history = useHistory();

	const handleClick = async (path: string) => {
		const authentication = AuthenticationService.getInstance();
		setIsLoading(true);
		try {
			// Call API and set the token to the authentication instance
			const tokens = await authApi.login({
				email: 'user002@gmail.com',
				password: '123',
			});
			setIsLoading(false);

			authentication.authenticated(tokens);

			if (authentication.token) {
				history.push(path);
			}
		} catch (error) {
			setIsLoading(false);
			console.log(error);
		}
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
