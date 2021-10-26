import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from './App';

describe('Test Router', () => {
	beforeEach(() => {
		const history = createMemoryHistory();
		render(
			<Router history={history}>
				<App />
			</Router>
		);
	});

	test('should navigate to other page when click the navigate', async () => {
		expect(await screen.findByText(/Task One/)).toBeInTheDocument(); // Wait for the API to finish and the component to re-render, then do all the test
		fireEvent.click(await screen.findByTestId('screen1-btn'));
		expect(screen.queryByText(/Task One/)).not.toBeInTheDocument();
		expect(await screen.findByText(/Task Two/)).toBeInTheDocument();

		expect(await screen.findByText(/Task Two/)).toBeInTheDocument();
		fireEvent.click(await screen.findByTestId('screen2-btn'));
		expect(screen.queryByText(/Task Two/)).not.toBeInTheDocument();
		expect(await screen.findByText(/Task One/)).toBeInTheDocument();
	});
});
