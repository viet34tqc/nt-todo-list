import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Screen2 from '.';

describe('Test screen 2', () => {
	beforeEach(() => {
		render(
			<BrowserRouter>
				<Screen2 />
			</BrowserRouter>
		);
	});
	test('should display the title of todo fetched from API', async () => {
		expect(await screen.findByText(/Task Two/)).toBeInTheDocument();
		expect(await screen.findByText('This is screen 2')).toBeInTheDocument();
	});
});
