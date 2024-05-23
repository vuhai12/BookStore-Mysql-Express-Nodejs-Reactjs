import { useTranslation, initReactI18next } from "react-i18next";
import i18n from "i18next";
import en from '../lng/en.json'
import vi from '../lng/vi.json'

const resources = {
    en: {
        translation: en
    },
    vi: {
        translation: vi
    },
}

i18n.use(initReactI18next).init({
    resources,
    lng: localStorage.getItem('lng') || 'vi',
    fallbackLng: "vi",
    interpolation: {
        escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }

})

export default i18n