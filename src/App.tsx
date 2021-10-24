import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Screen1 from './features/screen1/Screen1';
import Screen2 from './features/screen2/Screen2';

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" exact>
					<Screen1 />
				</Route>
				<Route path="/screen2">
					<Screen2 />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
