import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from 'src/core/routeConfig';
import LogoutButton from './LogoutButton';
import LanguageSwitcher from './LanguageSwitcher';
import PrivateRoute from './PrivateRoute';
import ThemeButton from './ThemeButton';

const RouterWrapper = () => {
	return (
		<Suspense fallback={<span>Loading...</span>}>
			<Router>
				<header className="site-header">
					<ThemeButton />
					<LanguageSwitcher />
				</header>
				<Switch>
					{routes.map(route =>
						route.private ? (
							<PrivateRoute
								key={route.path}
								path={route.path}
								render={() => <route.component />}
								exact={route?.exact}
							/>
						) : (
							<Route
								key={route.path}
								path={route.path}
								render={() => <route.component />}
								exact={route?.exact}
							/>
						)
					)}
				</Switch>
			</Router>
		</Suspense>
	);
};

export default RouterWrapper;
