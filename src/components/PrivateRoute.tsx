/* istanbul ignore file */
import { Redirect, Route, RouteProps } from 'react-router';
import AuthenticationService from 'src/core/authenticationService';

const PrivateRoute = (props: RouteProps) => {
	const authentication = AuthenticationService.getInstance();

	const token = authentication.getToken().token
	if (!token) {
		return <Redirect to="/login" />;
	}

	return <Route {...props} />;
};

export default PrivateRoute;
