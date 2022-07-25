import I18n from 'react-native-i18n';
import en from './en';
import hi from './hi';
import { I18nManager } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import Storage from '../Storage'
I18n.fallbacks = true;
I18n.translations = {
  en,
  hi,
};
export const setLocale = (language, direction) => {
  I18n.locale = language;
  I18nManager.allowRTL(direction == "rtl");
};
I18nManager.allowRTL(true);






export const setDefaultLocale = async (data) => {
  // const code = await AsyncStorage.getItem('language')
  // const l = Languages.find(item => (item.code===code))
  if (data == 'English') {
      setLocale("en", "rtl")
      await AsyncStorage.setItem('language', 'eng')
     
  }else  if (data == 'Hindi') {
      setLocale("hi", "rtl")
      await AsyncStorage.setItem('language', 'hi')
     
  }
}






export const __ = (name, params = {}) => (I18n.t(name, {...params, defaultValue: name}))
