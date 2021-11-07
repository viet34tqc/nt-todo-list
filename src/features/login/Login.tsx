import { useHistory } from 'react-router';
import AuthenticationService from 'src/authenticationService';

const Login = () => {
	const history = useHistory();
	const handleClick = () => {
		const authentication = AuthenticationService.getInstance();

		// Call API and set the token to the authentication instance
		authentication.authenticated({ token: 'test' });
		if (authentication.token) {
			history.push('/profile');
		}
	};

	return (
		<div>
			<button type="button" onClick={handleClick}>
				Login
			</button>
		</div>
	);
};

export default Login;
