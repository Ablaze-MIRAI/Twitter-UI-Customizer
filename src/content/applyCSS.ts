import { isSafemode } from "@content/modules/settings/safemode";

import { DOG, TWITTER, X, XDaruma } from "./icons/index";
import { ColorData } from "@shared/sharedData";

import styleUrl from "./styles/index.css?url";
import unoStyleUrl from "./styles/uno.css?url";
import { backgroundColorCheck, backgroundColorClass, getColorFromPref } from "@modules/utils/color";
import { getPref, getSettingIDs } from "@modules/pref";
import { fontSizeClass } from "@modules/utils/fontSize";

export function applyDefaultStyle() {
    document.querySelector("#tuicDefaultStyle")?.remove();
    const link = document.createElement("link");
    link.id = "tuicDefaultStyle";
    link.rel = "stylesheet";
    link.href = chrome.runtime.getURL(styleUrl);
    document.head.appendChild(link);
    applyUnocssStyle();
}

function applyUnocssStyle() {
    document.querySelector("#tuicUnocssStyle")?.remove();
    const link = document.createElement("link");
    link.id = "tuicUnocssStyle";
    link.rel = "stylesheet";
    link.href = chrome.runtime.getURL(unoStyleUrl);
    document.head.appendChild(link);
}

export function addCssElement() {
    document.querySelector("#twitter_ui_customizer_css")?.remove();
    document.querySelector("#twitter_ui_customizer")?.remove();

    const elemSYSCSS = document.createElement("style");
    elemSYSCSS.id = "twitter_ui_customizer";
    document.head.appendChild(elemSYSCSS);
    applySystemCss();

    if (!isSafemode) {
        const customCssElement = document.createElement("style");
        customCssElement.id = "twitter_ui_customizer_css";
        document.head.appendChild(customCssElement);
        applyCustomCss();
    }
}

export function applyDataCss() {
    document.querySelector("#twitter_ui_customizer_cssData")?.remove();

    const elemDataCSS = document.createElement("style");
    elemDataCSS.id = "twitter_ui_customizer_cssData";
    document.head.appendChild(elemDataCSS);
    elemDataCSS.textContent = `
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
        background-image: url('data:image/svg+xml,${encodeURIComponent(XDaruma.replace("var(--TUIC-favicon-color)", getColorFromPref("twitterIcon", "color", null)))}') !important;
    }`;
}

export function applyCustomIcon() {
    document.querySelector("#twitter_ui_customizer_cssCustomIcon")?.remove();

    const dataCssElement = document.createElement("style");
    dataCssElement.id = "twitter_ui_customizer_cssCustomIcon";
    document.head.appendChild(dataCssElement);
    dataCssElement.textContent = `
    [data-tuic-icon-type="custom"],
    #TUICIcon_IconImg {
        background-image: url('${localStorage.getItem("TUIC_IconImg") ?? ""}');
    }`;
}

export function applySystemCss() {
    const backgroundColor = backgroundColorCheck();

    const settingsArr = [
        "sidebarSetting.buttonConfigsmallerSidebarContent",
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

    const rs = document.documentElement.style;

    for (const elem of getSettingIDs("buttonColor")) {
        for (const el of ["background", "border", "color"]) {
            if (ColorData.defaultTUICColor.colors[elem][el]) {
                rs.setProperty(`--twitter-${elem}-${el}`, getColorFromPref(elem, el, null));
            }
        }
    }
    rs.setProperty("--twitter-TUIC-color", ColorData.TUICFixedColor[backgroundColor].textColor);
    rs.setProperty("--TUIC-container-background", ColorData.TUICFixedColor[backgroundColor].containerBackground);
    rs.setProperty("--TUIC-container-background2", ColorData.TUICFixedColor[backgroundColor].containerBackground2);
    rs.setProperty("--TUIC-color-hover-efect", ColorData.TUICFixedColor[backgroundColor].colorHover);

    rs.setProperty("--TUIC-sidebar-hover-color", backgroundColorCheck() == "light" ? "rgba(15,20,25,0.1)" : "rgba(247,249,249,0.1)");
    rs.setProperty("--TUIC-sidebar-active-color", backgroundColorCheck() == "light" ? "rgba(15,20,25,0.2)" : "rgba(247,249,249,0.2)");
    rs.setProperty("--TUIC-sidebar-focus-color", backgroundColorCheck() == "light" ? "rgb(135,138,140)" : "rgb(251,252,252)");

    rs.setProperty("--TUIC-detail-border", ColorData.TUICFixedColor[backgroundColor].detailBorder);

    rs.setProperty("--TUIC-pinnedTab-background", `rgba(${backgroundColorClass("0, 0, 0, 0.65", "21, 32, 43, 0.75", "255, 255, 255, 0.85")})`);

    rs.setProperty("--TUIC-pinnedTab-top", `${fontSizeClass("47", "49", "52", "57", "63")}px`);
}

export function applyCustomCss() {
    document.querySelector("#twitter_ui_customizer_css").textContent = localStorage.getItem("TUIC_CSS");
}
