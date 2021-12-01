import { fireEvent, render, screen } from '@testing-library/react';
import UserList from '.';

describe('UserList', () => {
	beforeEach(() => {
		render(<UserList />);
	});

	test('should render button', async () => {
		expect(
			screen.getByRole('button', { name: 'Fetch user list' })
		).toBeInTheDocument();
		expect(
			screen.getByRole('button', { name: /Fetch user list with expired token/ })
		).toBeInTheDocument();
	});

	test('should render userList', async () => {
		const button = screen.getByRole('button', { name: 'Fetch user list' });
		fireEvent.click(button);
		expect(await screen.findByText(/Viet Nguyen/)).toBeInTheDocument();
	});
});
