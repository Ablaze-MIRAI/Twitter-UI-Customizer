/**
 * Twitter UI Customizer
 * << Twitter を思いのままに。 >>
 */

import { TUICObserver } from "@modules/observer/index";
import { TUICI18N } from "@modules/i18n";
import { applySystemCss, addCssElement, applyDataCss, applyCustomIcon, applyDefaultStyle } from "@content/applyCSS";
import { isSafemode, runSafemode } from "@content/modules/settings/safemode";
import { startTluiObserver } from "@shared/tlui/observer";
import { initIconObserverFunction } from "@modules/observer/functions/changeIcon";
import { titleObserverFunction } from "@modules/observer/titleObserver";
import { updateClasses } from "./modules/htmlClass/classManager";
import { runSettingComponentObserver } from "./modules/settings";
import { placePrintPrefButton } from "./printPref";
import { getPref, mergeDefaultPref, setPref, updatePref } from "@modules/pref";
import { waitForElement } from "@modules/utils/controlElements";

(async () => {
    if (location.href === "https://twitter.com/ja/tos") {
        applyDefaultStyle();
        // NOTE: i18n データのフェッチ
        await TUICI18N.fetch();
        // Pref救出
        placePrintPrefButton();
    } else if (location.href === "https://twitter.com//") {
        // NOTE: i18n データのフェッチ
        await TUICI18N.fetch();
        //document.write("aaa");
        alert(TUICI18N.get("rescuePref-detail", "ja") + "\n\n" + TUICI18N.get("rescuePref-detail", "en"));
        alert(localStorage.getItem("TUIC"));
        alert(localStorage.getItem("TUIC_CSS"));
        alert(TUICI18N.get("rescuePref-complete", "ja") + "\n\n" + TUICI18N.get("rescuePref-complete", "en"));
    } else {
        await Promise.all([
            // NOTE: i18n データのフェッチ
            TUICI18N.fetch(),

            // NOTE: 設定の更新
            updatePref(),

            // NOTE: Twitter のレンダリングを待機
            waitForElement("#react-root"),
        ]);

        setPref("", mergeDefaultPref(getPref("")));

        // 起動メッセージ
        console.log(
            `%cTwitter UI Customizer${isSafemode ? " (Safe Mode)" : ""}%cby kaonasi_biwa\n\nTwitter を思いのままに。⧸ Language: ${TUICI18N.get("@JapaneseLanguageName")}`,
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
        updateClasses(true);
        for (const elem of document.querySelectorAll(".TUICOriginalContent")) {
            elem.remove();
        }

        // アップデート通知
        chrome.runtime.sendMessage({
            type: "update",
            updateType: "openTwitter",
        });

        // CSSの適用
        applyDefaultStyle();
        addCssElement();
        applyDataCss();
        applyCustomIcon();

        // 起動時のTwitterアイコンを変更
        if (document.querySelector(`#placeholder > svg`)) {
            initIconObserverFunction();
        }

        // タイトル変更のためのObserver
        waitForElement("title").then(titleObserverFunction);

        // TLUI用のObserver
        startTluiObserver();

        // メインのObserver
        TUICObserver.target = document.body;
        TUICObserver.bind();
        TUICObserver.callback();
        runSettingComponentObserver();

        // フォントサイズ変更の検出のためのObserver
        new MutationObserver(applySystemCss).observe(document.body, {
            childList: false,
            subtree: false,
            attributes: true,
        });

        // セーフモード
        if (isSafemode) runSafemode();
    }
})();
