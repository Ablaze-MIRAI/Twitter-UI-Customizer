import { langList } from "@i18nData/_langList";

const langRes = import.meta.glob(["@i18nData/*.json", "@i18nData/ti18n/*.json"]);
const i18nData = { en: {}, ja: {} };

export const TUICI18N = {
    fetch: async () => {
        for (const elem of langList) {
            i18nData[elem] = Object.assign(
                (await langRes[`../i18n/${elem}.json`]() as { default: object }).default,
                (await langRes[`../i18n/ti18n/${elem}.json`]() as { default: object }).default,
            );
            if (elem.includes("ja")) {
                console.log(i18nData[elem]);
            }
        }
        return true;
    },
    get: (key: string, selectLang?: string) => {
        const lang = selectLang ?? document.documentElement.getAttribute("lang");
        for (const _lang of [lang, "en", "ja"]) {
            if (_lang in i18nData && key in i18nData[_lang]) {
                return i18nData[_lang][key];
            }
        }

        return `TUIC 404: ${key}`;
    },
};
