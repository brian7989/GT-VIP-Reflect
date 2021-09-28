import i18n from "i18next";
import { initReactI18next } from 'react-i18next';
import LanguageDetector from "i18next-browser-languagedetector";
import XHR from "i18next-xhr-backend";

import translationEng from "./locales/en/translation.json";
import instructionsEng from "./locales/en/InstructionsDataLoc";
import translationPig from "./locales/pig/translation.json";
import instructionsPig from "./locales/pig/InstructionsDataLoc";


import translationDe from "./locales/de/translation.json";
import instructionsDe from "./locales/de/InstructionsDataLoc";

// import translationGer from "./locales/ger/translation.json";
// import translationFre from "./locales/fre/translation.json";
// import translationHin from "./locales/hin/translation.json";
// import translationJap from "./locales/jap/translation.json";


//Some notes about use cases that vary with how component is declared
//https://react.i18next.com/latest/using-with-hooks





i18n
    .use(XHR)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        lng: "en",
        fallbackLng: "en", // use en if detected lng is not available

        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false // react already safes from xss
        },

        resources: {
            en: {
                translations: translationEng,
                instructions: {"data":instructionsEng}
            },

            pig_latin: {
                translations: translationPig,
                instructions: {"data":instructionsPig}
            },

            de: {
                translations: translationDe,
                instructions: {"data":instructionsDe}
            },
            // ger: {
            //     translations: translationGer
            // },
            // fre: {
            //     translations: translationFre
            // },
            // hin: {
            //     translations: translationHin
            // },
            // jap: {
            //     translations: translationJap
            // }
        },
        // have a common namespace used around the full app
        ns: ["translations", "instructions"],
        defaultNS: "translations"
    });

export default i18n;
