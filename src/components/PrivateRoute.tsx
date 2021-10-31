import { Redirect, Route, RouteProps } from 'react-router';

const PrivateRoute = (props: RouteProps) => {
	const isLoggedIn = Boolean(localStorage.getItem('access_token'));

	if (!isLoggedIn) {
		return <Redirect to="/login" />;
	}

	return <Route {...props} />;
};

export default PrivateRoute;
