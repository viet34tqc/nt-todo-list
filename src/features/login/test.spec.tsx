import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '.';

describe('Test Login button', () => {
	beforeEach(() => {
		render(
			<BrowserRouter>
				<Login />
			</BrowserRouter>
		);
	});
	test('should display login button', async () => {
		expect(screen.getByRole('button')).toBeInTheDocument();
		expect(screen.getByText(/Login/)).toBeInTheDocument();
	});
});
