import { useHistory } from 'react-router';
import AuthenticationService from 'src/authenticationService';

const Login = () => {
	const history = useHistory();
	const handleClick = () => {
		const authentication = new AuthenticationService();
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
