import { render, screen } from '@testing-library/react';
import LanguageSwitcher from './LanguageSwitcher';

jest.mock('react-i18next', () => ({
	// this mock makes sure any components using the translate hook can use it without a warning being shown
	useTranslation: () => {
		return {
			t: (str: any) => str,
			i18n: {
				changeLanguage: () => new Promise(() => {}),
			},
		};
	},
}));
describe('Language Switcher', () => {
	test('should render properly', () => {
		render(<LanguageSwitcher />);
		expect(screen.getByRole('button', { name: /English/ })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /Vietnam/ })).toBeInTheDocument();
	});
});
