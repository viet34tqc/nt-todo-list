import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const ProfileForm = lazy(() => import('./features/profile/ProfileForm'));
const Screen1 = lazy(() => import('./features/screen1/Screen1'));
const Screen2 = lazy(() => import('./features/screen2/Screen2'));

function App() {
	return (
		<Suspense fallback={<span>Loading...</span>}>
			<Router>
				<Switch>
					<Route path="/" render={() => <Screen1 />} exact />
					<Route path="/screen2" render={() => <Screen2 />} />
					<Route path="/profile" render={() => <ProfileForm />} />
					<Route render={() => <div>Not found</div>} />
				</Switch>
			</Router>
		</Suspense>
	);
}

export default App;
