import { useEffect, useState } from 'react';

// First we check if the theme of the system is already dark mode.
const matchDark = '(prefer-color-scheme: dark)';
const defaultDark = window.matchMedia && window.matchMedia(matchDark).matches;
const ThemeButton = () => {
	const [theme, setTheme] = useState<string>(() =>
		defaultDark ? 'dark' : 'light'
	);

	// Get the theme from local storage
	useEffect(() => {
		const currentTheme = localStorage.getItem('theme') || theme;
		document.documentElement.setAttribute('data-theme', currentTheme);
		saveTheme(currentTheme);
	}, []);

	const switchTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		saveTheme(newTheme);
	};

	const saveTheme = (theme: string) => {
		setTheme(theme);
		localStorage.setItem('theme', theme);
		document.documentElement.setAttribute('data-theme', theme);
	};

	return (
		<button className="theme-button" onClick={switchTheme} data-testid="theme-button">
			<svg
				fill="none"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				stroke="currentColor"
			>
				<path
					d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
				></path>
			</svg>
		</button>
	);
};

export default ThemeButton;
