import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useHistory: () => ({
		push: mockHistoryPush,
	}),
}));
describe('LogoutButton', () => {
	const history = createMemoryHistory();
	beforeEach(() => {
		render(
			<Router history={history}>
				<LogoutButton />
			</Router>
		);
	});
	test('should display button', () => {
		expect(screen.getByTestId('logout-button')).toBeInTheDocument();
	});

	test('should redirect to login page', () => {
		const button = screen.getByTestId('logout-button');
		fireEvent.click(button);
		expect(history.location.pathname).toBe('/login');
	});
});
