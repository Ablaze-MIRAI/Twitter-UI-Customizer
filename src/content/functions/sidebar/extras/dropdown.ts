import { hideElement, waitForElement } from "@content/utils/element";
import { fontSizeClass } from "@content/utils/fontSize";
import { getPref, getSettingIDs } from "@content/settings";

const _data = {
    all: getSettingIDs("sidebarSetting.moreMenuItems"),
    selectors: {
        lists: `[data-testid="Dropdown"] [href$="/lists"]`,
        bookmarks: `[data-testid="Dropdown"] [href="/i/bookmarks"]`,
        monetization: `[data-testid="Dropdown"] :is([href="/settings/monetization"],[href="/i/monetization"])`,
        separator: `[data-testid="Dropdown"] [role="separator"]`,
        creatorStudio: `[data-testid="Dropdown"] :is([aria-controls$="_0_content"], [href="/i/jf/creators/studio"])`,
        professionalTool: `[data-testid="Dropdown"] [aria-controls$="_1_content"]`,
        settingsAndSupport: `[data-testid="Dropdown"] [aria-controls$="_2_content"][data-testid="settingsAndSupport"]`,
        communities: `[data-testid="Dropdown"] [href$="/communities"]`,
        communitynotes: `[data-testid="Dropdown"] [href="/i/communitynotes"]`,
        settings: `[data-testid="Dropdown"] [href="/settings"]`,
        pro: `[data-testid="Dropdown"] [href="https://tweetdeck.twitter.com"]`,
        ads: `[data-testid="Dropdown"] :is([href*="ads.twitter.com"],[href*="ads.x.com"])`,
        premium: `[data-testid="Dropdown"] :is([href="/i/verified-choose"],[href="/i/premium_sign_up"])`,
        jobs: `[data-testid="Dropdown"] [href="/jobs"]`,
        spaces: `[data-testid="Dropdown"] [href="/i/spaces/start"]`,
        followerRequests: `[data-testid="Dropdown"] [href="/follower_requests"]`,
        verifiedOrgsSignup: `[data-testid="Dropdown"] [href="/i/verified-orgs-signup"]`,
        chat: `[data-testid="Dropdown"] [href="/i/chat"]`,
    },
    type: {
        bookmarks: "menuitem",
        monetization: "menuitem",
        separator: "separator",
        creatorStudio: "menuitem",
        professionalTool: "menu",
        settingsAndSupport: "menu",
        communities: "menuitem",
        settings: "menuitem",
        pro: "menuitem",
        ads: "menuitem",
        premium: "menuitem",
        jobs: "menuitem",
        spaces: "menuitem",
        followerRequests: "menuitem",
        verifiedOrgsSignup: "menuitem",
        chat: "menuitem",
    },
};

/** サイドバーのドロップダウン中から、不要な要素を隠します。 */
export async function processDropdown() {
    await waitForElement(`[data-testid="Dropdown"]`);
    let menuTopPx = parseFloat(document.querySelector<HTMLDivElement>(`[role="menu"]`).style.top);
    const upPx = {
        menu: fontSizeClass(46, 49, 52, 58, 62),
        menuitem: fontSizeClass(50, 53, 56, 62, 67),
        separator: 5,
    };
    for (const pref of _data.all) {
        if (getPref(`sidebarSetting.moreMenuItems.${pref}`)) {
            const elem = document.querySelector(_data.selectors[pref]);
            if (elem) {
                hideElement(elem.parentElement);
                menuTopPx += upPx[_data.type[pref]];
            }
        }
    }
    document.querySelector<HTMLDivElement>(`[role="menu"]`).style.top = menuTopPx + "px";
}
