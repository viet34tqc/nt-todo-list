import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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
	const history = createMemoryHistory();

	beforeEach(() => {
		render(
			<Router history={history}>
				<Login />
			</Router>
		);
	});
	test('should display login to profile button', async () => {
		const button = screen.getByRole('button', {
			name: /Login to profile page/,
		});
		expect(button).toBeInTheDocument();
		fireEvent.click(button);
		await waitFor(() => expect(button).not.toBeDisabled());
		expect(history.location.pathname).toBe('/profile');
	});
	test('should display login to user list page', async () => {
		const button = screen.getByRole('button', {
			name: /Login to fetch user page/,
		});
		expect(button).toBeInTheDocument();
		fireEvent.click(button);
		await waitFor(() => expect(button).not.toBeDisabled());
		expect(history.location.pathname).toBe('/userList');
	});
});
