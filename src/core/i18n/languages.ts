import { i18nProfileForm } from 'src/features/profile/i18n';
import { i18nScreen1 } from '../../features/screen1/i18n';
import { i18nScreen2 } from '../../features/screen2/i18n';

const en = { ...i18nScreen1.en, ...i18nScreen2.en, ...i18nProfileForm.en };
const vi = { ...i18nScreen1.vi, ...i18nScreen2.vi, ...i18nProfileForm.vi };

export { en, vi };
