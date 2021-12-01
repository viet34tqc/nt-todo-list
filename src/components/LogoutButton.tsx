import { useHistory } from 'react-router';
import AuthenticationService from 'src/core/authenticationService';

const LogoutButton = () => {
	const history = useHistory();
	const authentication = AuthenticationService.getInstance();

	const handleClick = () => {
		authentication.logout();
		history.push('/login');
	};
	return (
		<button onClick={handleClick} data-testid="logout-button">
			Logout
		</button>
	);
};

export default LogoutButton;
