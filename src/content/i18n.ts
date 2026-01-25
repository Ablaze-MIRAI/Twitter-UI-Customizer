import { langList } from "@i18nData/_langList";

const langRes = import.meta.glob(["@i18nData/*.json", "@i18nData/ti18n/*.json"]);
const i18nCache = {};

/** i18n データを読み込みます。 */
export async function loadI18n(): Promise<void> {
    for (const language of langList) {
        i18nCache[language] = Object.assign(
            (await langRes[`../i18n/${language}.json`]() as { default: object }).default,
            (await langRes[`../i18n/ti18n/${language}.json`]() as { default: object }).default,
        );
    }
}

/**
 * 翻訳されたテキストデータを取得します。
 * @param key 翻訳キー
 * @param language 言語コード
 * @returns 翻訳されたテキストデータ
 */
export function translate(key: string, language?: string): string {
    const preferLanguage = language ?? document.documentElement.getAttribute("lang");
    for (const lang of [preferLanguage, "en", "ja"]) {
        if (lang in i18nCache && key in i18nCache[lang]) {
            return i18nCache[lang][key];
        }
    }
    return `TUIC 404: ${key}`;
};
