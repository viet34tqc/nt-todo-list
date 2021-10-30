import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFound from './NotFound';

describe('Test screen 1', () => {
	beforeEach(() => {
		render(
			<BrowserRouter>
				<NotFound />
			</BrowserRouter>
		);
	});
	test('should display not found text', async () => {
		expect(await screen.findByText(/Not Found/)).toBeInTheDocument();
	});
});
