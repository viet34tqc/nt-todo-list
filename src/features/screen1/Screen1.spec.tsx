import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Screen1 from './Screen1';

describe('Test screen 1', () => {
	beforeEach(() => {
		render(
			<BrowserRouter>
				<Screen1 />
			</BrowserRouter>
		);
	});
	test('should display the title of todo fetched from API', async () => {
		expect(await screen.findByText(/Task One/)).toBeInTheDocument();
		expect(await screen.findByText('This is screen 1')).toBeInTheDocument();
	});
});
