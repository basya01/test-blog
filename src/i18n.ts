import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { AlertsEN, MainEN, NavigationEN, NewsEN, ProfileEN } from './locales/en';
import { AlertsUK, MainUK, NavigationUK, NewsUK, ProfileUK } from './locales/uk';

const resources = {
  en: {
    main: MainEN,
    navigation: NavigationEN,
    news: NewsEN,
    profile: ProfileEN,
    alerts: AlertsEN,
  },
  uk: {
    main: MainUK,
    navigation: NavigationUK,
    news: NewsUK,
    profile: ProfileUK,
    alerts: AlertsUK,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
