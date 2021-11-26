import { fireEvent, render, screen } from '@testing-library/react';
import RouterWrapper from './RouterWrapper';

describe('Test Router', () => {
	beforeEach(() => {
		jest.mock('react-i18next', () => ({
			// this mock makes sure any components using the translate hook can use it without a warning being shown
			useTranslation: () => {
				return {
					t: (key: any) => key,
					i18n: {
						changeLanguage: () => new Promise(() => {}),
					},
				};
			},
		}));
		render(<RouterWrapper />);
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
