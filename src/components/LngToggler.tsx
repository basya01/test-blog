import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import EngIcon from '../assets/english.svg';
import UkIcon from '../assets/ukrainian.svg';

enum Langs {
  ENG = 'en',
  UK = 'uk',
}

export const LngToggler = () => {
  const { i18n } = useTranslation();
  const isEng = i18n.language === Langs.ENG;

  const togglerHandler = (lng: Langs) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('lng', lng);
  };

  return (
    <Button onClick={() => togglerHandler(isEng ? Langs.UK : Langs.ENG)}>
      <img src={isEng ? EngIcon : UkIcon} alt={isEng ? 'eng' : 'uk'} width="40px" />
    </Button>
  );
};
