/* istanbul ignore file */

import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback';
import RouterWrapper from './components/RouterWrapper';

function App() {
	return (
		<ErrorBoundary FallbackComponent={ErrorFallback}>
			<div>
				<RouterWrapper />
			</div>
		</ErrorBoundary>
	);
}

export default App;
