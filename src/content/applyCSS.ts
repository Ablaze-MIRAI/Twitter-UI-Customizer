import { isSafemode } from "@content/settings/ui/safemode";

import { DOG, TWITTER, X, XDaruma } from "@shared/icons";
import { AttrList, ClassList, ColorData } from "@shared/sharedData";

import tuicStyleUrl from "./styles/index.css?url";
import unoStyleUrl from "./styles/uno.css?url";
import { backgroundColorCheck, backgroundColorClass, getColorFromPref } from "@content/utils/color";
import { getPref, getSettingIDs } from "@content/settings";
import { fontSizeClass } from "@content/utils/fontSize";

const CSS_ID_SYSTEM = "tuic-style-system";
const CSS_ID_CUSTOM = "tuic-style-user";
const CSS_ID_SETTINGS = "tuic-style-settings";
const CSS_ID_SETTINGS_ICON = "tuic-style-settings-icon";
const CSS_ID_SYSTEM_ICON = "tuic-style-system-icon";

/**
 * 指定された CSS を head 要素に注入します。
 * @param id 文書中で識別できる一意の ID
 * @param content 注入する CSS の内容
 */
function injectStyle(id: string, content: string): void {
    document.getElementById(id)?.remove();

    if (content.trim() === "") return;

    const style = document.createElement("style");
    style.id = id;
    style.textContent = content.trim();
    document.head.appendChild(style);
}

/** TUIC で使用される必須の CSS を head 要素に注入します。 */
export function injectSystemStyle() {
    const styleUrls = [tuicStyleUrl, unoStyleUrl];

    for (let i = 0; i < styleUrls.length; i++) {
        const id = CSS_ID_SYSTEM + "-" + i;
        const url = chrome.runtime.getURL(styleUrls[i]);

        document.getElementById(id)?.remove();
        const link = document.createElement("link");
        link.id = id;
        link.rel = "stylesheet";
        link.href = url;
        document.head.appendChild(link);
    }
}

/** 設定されたカスタム CSS を head 要素に注入します。 */
export function injectCustomStyle() {
    if (isSafemode) return;
    injectStyle(CSS_ID_CUSTOM, localStorage.getItem("TUIC_CSS") ?? "");
}

/** TUIC で使用されるアイコンの CSS を head 要素に注入します。 */
export function injectSystemIconStyle() {
    injectStyle(CSS_ID_SYSTEM_ICON, `
        [data-tuic-icon-type="dog"] {
            background-image: url('${chrome.runtime.getURL(DOG)}');
        }
        [data-tuic-icon-type="officialLogo-twitter"] {
            --TUIC-twitter-icon: url('${chrome.runtime.getURL(TWITTER)}') !important;
        }
        [data-tuic-icon-type="officialLogo-X"] {
            --TUIC-twitter-icon:url('${chrome.runtime.getURL(X)}') !important;
        }
        [data-tuic-icon-type="x-daruma"] {
            background-image: url('data:image/svg+xml,${encodeURIComponent(XDaruma.replace("var(--TUIC-favicon-color)", getColorFromPref("twitterIcon", "color")))}') !important;
        }
    `);
}

/** 設定されたカスタムアイコン CSS を head 要素に注入します。 */
export function injectSettingsIconStyle() {
    if (isSafemode) return;

    injectStyle(CSS_ID_SETTINGS_ICON, `
        [data-tuic-icon-type="custom"],
        #TUICIcon_IconImg {
            background-image: url('${localStorage.getItem("TUIC_IconImg") ?? ""}');
        }
    `);
}

/** 設定項目の CSS を head 要素に注入します。 */
export function injectSettingsStyle() {
    const backgroundColor = backgroundColorCheck();

    const settingsArr = [
        "sidebarSetting.buttonConfig.smallerSidebarContent",
        "twitterIcon.options.roundIcon",
        "invisibleItems.subscribe-profile",
        "invisibleItems.hideBelowDM",
        "invisibleItems.hideBelowGrok",
        "tweetDisplaySetting.invisible.bottomSpace",
        "sidebarSetting.buttonConfig.sidebarNoneScrollbar",
        "tweetDisplaySetting.buttonsInvisible.noNumberBottomTweetButtons",
        "accountSwitcher.icon",
        "accountSwitcher.nameID",
        "accountSwitcher.moreMenu",
        "profileSetting.tabs.pinnedTab",
        "uncategorizedSettings.disableBackdropFilter",
        "composetweet.hideDraft",
        "tweetDisplaySetting.option.likeToFavo",
        "sidebarSetting.hideBadge.homeBadge",
        "sidebarSetting.hideBadge.notificationsBadge",
        "sidebarSetting.hideBadge.dmBadge",
        "tweetDisplaySetting.invisible.editImage",
        "rightSidebar.verified",
        "rightSidebar.trend",
        "rightSidebar.news",
        "rightSidebar.links",
        "rightSidebar.searchBox",
        "rightSidebar.space",
        "rightSidebar.osusumeUser",
        "rightSidebar.relevantPeople",
        "invisibleItems.config-premium",
        "profileSetting.invisible.subscribe-profile",
        "profileSetting.invisible.profileHighlights",
        "profileSetting.invisible.profileArticles",
        "profileSetting.invisible.profileSummary",
        "profileSetting.invisible.profilePagePremium",
        "uncategorizedSettings.dimBackgroundTheme",
    ];
    let settingsOutput = "|";
    for (const elem of settingsArr) {
        if (getPref(elem)) {
            settingsOutput += elem + "|";
        }
    }
    if (!getPref("sidebarButtons").includes("verified-choose")) {
        settingsOutput += "sidebarButtons.style.verifiedChoose" + "|";
    }
    document.documentElement.dataset.tuicSettings = settingsOutput;

    // NOTE: スタイルの設定
    const sheet = new CSSStyleSheet();
    sheet.insertRule(":root {}");
    const rule = sheet.cssRules[0] as CSSStyleRule;

    for (const elem of getSettingIDs("buttonColor")) {
        for (const el of ["background", "border", "color"] as const) {
            if (ColorData.defaultTUICColor.colors[elem][el]) {
                rule.style.setProperty(`--twitter-${elem}-${el}`, getColorFromPref(elem, el));
            }
        }
    }
    rule.style.setProperty("--twitter-TUIC-color", ColorData.TUICFixedColor[backgroundColor].textColor);
    rule.style.setProperty("--TUIC-container-background", ColorData.TUICFixedColor[backgroundColor].containerBackground);
    rule.style.setProperty("--TUIC-container-background2", ColorData.TUICFixedColor[backgroundColor].containerBackground2);
    rule.style.setProperty("--TUIC-color-hover-efect", ColorData.TUICFixedColor[backgroundColor].colorHover);

    rule.style.setProperty("--TUIC-sidebar-hover-color", `rgba(${backgroundColorClass("231,233,234", "247,249,249", "15,20,25")},0.1)`);
    rule.style.setProperty("--TUIC-sidebar-active-color", backgroundColorCheck() == "light" ? "rgba(15,20,25,0.2)" : "rgba(247,249,249,0.2)");
    rule.style.setProperty("--TUIC-sidebar-focus-color", backgroundColorCheck() == "light" ? "rgb(135,138,140)" : "rgb(251,252,252)");

    rule.style.setProperty("--TUIC-detail-border", ColorData.TUICFixedColor[backgroundColor].detailBorder);

    rule.style.setProperty("--TUIC-pinnedTab-background", `rgba(${backgroundColorClass("0, 0, 0, 0.65", "21, 32, 43, 0.75", "255, 255, 255, 0.85")})`);

    rule.style.setProperty("--TUIC-pinnedTab-top", `${fontSizeClass("47", "49", "52", "57", "63")}px`);

    // TODO: CSSStyleSheet API + document.adoptedStyleSheets とかを使いたい気持ちはあるが、このファイルは外部から読み込まれるため、シングルトン的な管理・二度呼び出しされた際の管理が面倒
    injectStyle(CSS_ID_SETTINGS, rule.cssText);
}

// TODO: 現状、savePref が呼ばれた際にしか呼ばれていないため、設定の更新を検知したら自動的にこれが発火される仕組みを導入したい
/**
 * Twitter UI Customizer によって変更された要素をすべて元に戻します。
 * 必須の CSS などは保持されます。
 */
export function cleanModifiedElements() {
    const selector = [
        ...ClassList.map((id) => `.${id}`),
        ...AttrList.map((id) => `[data-${id}]`),
    ].join(", ");
    document.querySelectorAll(selector).forEach((elem) => {
        elem.classList.remove(...ClassList);
        for (const id of AttrList) elem.removeAttribute(`data-${id}`);
    });

    injectSettingsStyle();
}
