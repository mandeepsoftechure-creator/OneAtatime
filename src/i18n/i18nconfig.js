import i18next from "i18next";

import { initReactI18next } from "react-i18next";
import { en, hi } from "./translations";
import AsyncStorage from '@react-native-async-storage/async-storage';

const resources = {

    en : {
        translation : en,
    }, 
    hi :  {
        translation : hi,
    }
}

i18next.use(initReactI18next).init({
   // debug: false,
    lng : 'en',
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    resources,
})

AsyncStorage.getItem('user-language')
  .then((lang) => {
    if (lang) {
        i18next.changeLanguage(lang);
    }
  })
  .catch((error) => console.error('Failed to load language from AsyncStorage:', error));


export default i18next;