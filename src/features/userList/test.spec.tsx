import { render, screen } from '@testing-library/react';
import UserList from '.';

describe('UserList', () => {
	beforeEach(() => {
		render(<UserList />);
	});

	test('should render button', async () => {
		expect(screen.getByRole('button')).toBeInTheDocument();
	});
});
