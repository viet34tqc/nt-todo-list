import { fireEvent, render, screen } from '@testing-library/react';
import ThemeButton from './ThemeButton';

describe('ThemeButton', () => {
	beforeEach(() => {
		render(<ThemeButton />);
	});
	test('should display button', () => {
		expect(screen.getByTestId('theme-button')).toBeInTheDocument();
	});

	test('dark mode', () => {
		const button = screen.getByTestId('theme-button');
		fireEvent.click(button);
		expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
	});
});
