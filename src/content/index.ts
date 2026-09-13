/**
 * Twitter UI Customizer
 * << Twitter を思いのままに。 >>
 */

import { TUICObserver } from "@content/observer";
import { loadI18n, translate } from "@shared/i18n";
import { injectSettingsStyle, injectSystemIconStyle, injectSettingsIconStyle, injectSystemStyle, cleanModifiedElements, injectCustomStyle } from "@content/applyCSS";
import { isSafemode, runSafemode } from "@content/settings/ui/safemode";
import { startTluiObserver } from "@shared/tlui/observer";
import { changeLoadingLogo } from "@content/functions/changeIcon";
import { setTitleObserver } from "@content/functions/replaceTitleX";
import { runSettingComponentObserver } from "@content/settings/ui";
import { placePrintPrefButton } from "./printPref";
import { getPref, mergeDefaultPref, setPref, updatePref } from "@content/settings";
import { waitForElement } from "@content/utils/element";

(async () => {
    // TODO: twitter.com は x.com に強制的にリダイレクトされるため、これらは使用不可能
    if (location.href === "https://twitter.com/ja/tos") {
        injectSystemStyle();
        // NOTE: i18n データのフェッチ
        await loadI18n();
        // Pref救出
        placePrintPrefButton();
    } else if (location.href === "https://twitter.com//") {
        // NOTE: i18n データのフェッチ
        await loadI18n();
        //document.write("aaa");
        alert(translate("rescuePref-detail", "ja") + "\n\n" + translate("rescuePref-detail", "en"));
        alert(localStorage.getItem("TUIC"));
        alert(localStorage.getItem("TUIC_CSS"));
        alert(translate("rescuePref-complete", "ja") + "\n\n" + translate("rescuePref-complete", "en"));
    } else {
        await Promise.all([
            // NOTE: i18n データのフェッチ
            loadI18n(),
            // NOTE: 設定の更新
            updatePref(),

            // NOTE: Twitter のレンダリングを待機
            waitForElement("#react-root"),
        ]);

        setPref("", mergeDefaultPref(getPref("")));

        // 起動メッセージ
        console.log(
            `%cTwitter UI Customizer${isSafemode ? " (Safe Mode)" : ""}%cby kaonasi_biwa\n\nTwitter を思いのままに。⧸ Language: ${translate("@JapaneseLanguageName")}`,
            `font-family: system-ui, -apple-system, sans-serif, monospace; font-size: 1.2em; font-weight: bold; text-align: center; background: ${isSafemode ? "#5a9e1b" : "#1da1f2"}; color: #ffffff; padding: 0.5em 2em; margin-top: 0.5em; margin-left: 0.5em;`,
            `font-family: system-ui, -apple-system, sans-serif, monospace; margin: 0.5em; color: ${isSafemode ? "#5a9e1b" : "#1da1f2"};`,
        );

        if (getPref("XToTwitter.PwaManifest")) {
            chrome.runtime.sendMessage({
                type: "enableReplaceTwitterManifest",
                lang: document.documentElement.getAttribute("lang"),
            });
        } else {
            chrome.runtime.sendMessage({
                type: "disableReplaceTwitterManifest",
            });
        }

        // 前起動時のTUICの要素・Classが残っていればすべて削除
        cleanModifiedElements();
        for (const elem of document.querySelectorAll(".TUICOriginalContent")) {
            elem.remove();
        }

        // アップデート通知
        chrome.runtime.sendMessage({
            type: "update",
            updateType: "openTwitter",
        });

        // CSSの適用
        injectSystemStyle();
        injectSettingsStyle();
        injectCustomStyle();
        injectSystemIconStyle();
        injectSettingsIconStyle();

        // 起動時のTwitterアイコンを変更
        changeLoadingLogo();

        // タイトル変更のためのObserver
        waitForElement("title").then(setTitleObserver);

        // TLUI用のObserver
        startTluiObserver();

        // メインのObserver
        const observer = new TUICObserver(document.body);
        observer.bind();
        observer.callback();
        runSettingComponentObserver();

        // フォントサイズ変更の検出のためのObserver
        new MutationObserver(injectSettingsStyle).observe(document.body, {
            childList: false,
            subtree: false,
            attributes: true,
        });

        // セーフモード
        if (isSafemode) runSafemode();
    }
})();
