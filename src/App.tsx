/* istanbul ignore file */

import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback';
import RouterWrapper from './components/RouterWrapper';
import ThemeButton from './components/ThemeButton';

function App() {
	return (
		<ErrorBoundary FallbackComponent={ErrorFallback}>
			<div>
				<ThemeButton />
				<RouterWrapper />
			</div>
		</ErrorBoundary>
	);
}

export default App;
