/* istanbul ignore file */

import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback';
import LanguageSwitcher from './components/LanguageSwitcher';
import RouterWrapper from './components/RouterWrapper';
import ThemeButton from './components/ThemeButton';

function App() {
	return (
		<ErrorBoundary FallbackComponent={ErrorFallback}>
			<div>
				<header className="site-header">
					<ThemeButton />
					<LanguageSwitcher />
				</header>
				<RouterWrapper />
			</div>
		</ErrorBoundary>
	);
}

export default App;
