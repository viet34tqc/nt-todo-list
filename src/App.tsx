import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './component/routeConfig';

function App() {
	return (
		<Suspense fallback={<span>Loading...</span>}>
			<Router>
				<Switch>
					{routes.map((route) => (
						<Route
							key={route.path}
							path={route.path}
							render={() => <route.component />}
							exact={route?.exact}
						/>
					))}
				</Switch>
			</Router>
		</Suspense>
	);
}

export default App;
