import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      "home": "Home",
      "ideas": "Ideas",
      "create_idea": "Create Idea",
      "events": "Events",
      "profile": "Profile",
      "login": "Login",
      "register": "Register",
      "sign_out": "Sign Out"
    }
  },
  ar: {
    translation: {
      "home": "الرئيسية",
      "ideas": "الأفكار",
      "create_idea": "أضف فكرة",
      "events": "الفعاليات",
      "profile": "الملف الشخصي",
      "login": "تسجيل الدخول",
      "register": "إنشاء حساب",
      "sign_out": "تسجيل الخروج"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  });

export default i18n;