import I18n from 'react-native-i18n';
import en from './en';
import hi from './hi';

I18n.fallbacks = true;
I18n.translations = {
  en,
  hi,
};
export const __ = (name, params = {}) => (I18n.t(name, {...params, defaultValue: name}))
