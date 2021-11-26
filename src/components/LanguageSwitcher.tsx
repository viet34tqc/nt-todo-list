import { useTranslation } from 'react-i18next';

const lngs : {
    [key: string]:  {
        [key: string]: string
    }
} = {
	en: { nativeName: 'English' },
	vi: { nativeName: 'Vietnam' },
};
const LanguageSwitcher = () => {
	const { i18n } = useTranslation();
	return (
		<div className="language-switcher">
			{Object.keys(lngs).map(lng => (
				<button
					key={lng}
					style={{
						fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal',
					}}
					type="submit"
					onClick={() => i18n.changeLanguage(lng)}
				>
					{lngs[lng].nativeName}
				</button>
			))}
		</div>
	);
};

export default LanguageSwitcher;
