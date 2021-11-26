import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import i18n from 'src/core/i18n/i18n';
import Screen1 from '.';

describe('Test screen 1', () => {
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
		render(
			<I18nextProvider i18n={i18n}>
				<BrowserRouter>
					<Screen1 />
				</BrowserRouter>
			</I18nextProvider>
		);
	});
	test('should display the title of todo fetched from API', async () => {
		expect(await screen.findByText(/Task One/)).toBeInTheDocument();
		expect(await screen.findByText(/This is screen 1/)).toBeInTheDocument();
	});
});
