import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Login from '.';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useHistory: () => ({
		push: mockHistoryPush,
	}),
}));

describe('Test Login button', () => {
	test('should display login button', async () => {
		const history = createMemoryHistory();
		render(
			<Router history={history}>
				<Login />
			</Router>
		);
		const button = screen.getByRole('button', { name: /Login/ });
		expect(button).toBeInTheDocument();
		fireEvent.click(button);
		expect(history.location.pathname).toBe('/profile');
	});
});
