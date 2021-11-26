import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { en, vi } from './languages';

const resources = {
	en: {
		translation: en,
	},
	vi: {
		translation: vi,
	},
};

i18n
	// Detect user language from browser
	// Save the value to the local storage when switch the language
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: 'en',
		// Override the default language from browser
		// Then get the value from local storage when switch the language
		lng: localStorage.getItem('i18nextLng') || 'en',
		debug: true,
		interpolation: {
			escapeValue: false, // not needed for react as it escapes by default
		},
		resources,
	});

export default i18n;
