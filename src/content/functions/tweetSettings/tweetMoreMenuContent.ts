import { hideElement, waitForElement } from "@content/utils/element";
import { getPref, getSettingIDs } from "@content/settings";
import { fontSizeClass } from "@content/utils/fontSize";
import { translate } from "@content/i18n";

interface TweetMoreMenuContentData {
    all: string[];
    selectors: Record<string, string | (() => Element)>;
}

const _data: TweetMoreMenuContentData = {
    all: getSettingIDs("tweetDisplaySetting.tweetMoreMenuItems"),
    selectors: {
        hiddenReply: `[href$="/hidden"]`,
        notHelpful: (): Element => {
            return location.href.includes("/search?q=")
                /* eslint-disable style/indent */
                ? document.querySelector(
                      `path[d="M9.5 7c.828 0 1.5 1.119 1.5 2.5S10.328 12 9.5 12 8 10.881 8 9.5 8.672 7 9.5 7zm5 0c.828 0 1.5 1.119 1.5 2.5s-.672 2.5-1.5 2.5S13 10.881 13 9.5 13.672 7 14.5 7zM12 22.25C6.348 22.25 1.75 17.652 1.75 12S6.348 1.75 12 1.75 22.25 6.348 22.25 12 17.652 22.25 12 22.25zm0-18.5c-4.549 0-8.25 3.701-8.25 8.25s3.701 8.25 8.25 8.25 8.25-3.701 8.25-8.25S16.549 3.75 12 3.75zM8.947 17.322l-1.896-.638C7.101 16.534 8.322 13 12 13s4.898 3.533 4.949 3.684l-1.897.633c-.031-.09-.828-2.316-3.051-2.316s-3.021 2.227-3.053 2.322z"]`,
                  )
                /* eslint-enable style/indent */
                : null;
        },
        notInterested: (): Element => {
            return !location.href.includes("/search?q=")
                /* eslint-disable style/indent */
                ? document.querySelector(
                      `path[d="M9.5 7c.828 0 1.5 1.119 1.5 2.5S10.328 12 9.5 12 8 10.881 8 9.5 8.672 7 9.5 7zm5 0c.828 0 1.5 1.119 1.5 2.5s-.672 2.5-1.5 2.5S13 10.881 13 9.5 13.672 7 14.5 7zM12 22.25C6.348 22.25 1.75 17.652 1.75 12S6.348 1.75 12 1.75 22.25 6.348 22.25 12 17.652 22.25 12 22.25zm0-18.5c-4.549 0-8.25 3.701-8.25 8.25s3.701 8.25 8.25 8.25 8.25-3.701 8.25-8.25S16.549 3.75 12 3.75zM8.947 17.322l-1.896-.638C7.101 16.534 8.322 13 12 13s4.898 3.533 4.949 3.684l-1.897.633c-.031-.09-.828-2.316-3.051-2.316s-3.021 2.227-3.053 2.322z"]`,
                  )
                /* eslint-enable style/indent */
                : null;
        },
        follow: `:is(path[d="M10 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM6 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4zm13 4v3h2v-3h3V8h-3V5h-2v3h-3v2h3zM3.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C13.318 13.65 11.838 13 10 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C5.627 11.85 7.648 11 10 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H1.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46z"],path[d="M10 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM6 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4zm12.586 3l-2.043-2.04 1.414-1.42L20 7.59l2.043-2.05 1.414 1.42L21.414 9l2.043 2.04-1.414 1.42L20 10.41l-2.043 2.05-1.414-1.42L18.586 9zM3.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C13.318 13.65 11.838 13 10 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C5.627 11.85 7.648 11 10 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H1.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46z"])`,
        addMemberOfList: `[href="/i/lists/add_member"]`,
        userMute: (): Element => {
            return Array.from(
                document.querySelectorAll(
                    `[role="menuitem"] [d="M18 6.59V1.2L8.71 7H5.5C4.12 7 3 8.12 3 9.5v5C3 15.88 4.12 17 5.5 17h2.09l-2.3 2.29 1.42 1.42 15.5-15.5-1.42-1.42L18 6.59zm-8 8V8.55l6-3.75v3.79l-6 6zM5 9.5c0-.28.22-.5.5-.5H8v6H5.5c-.28 0-.5-.22-.5-.5v-5zm6.5 9.24l1.45-1.45L16 19.2V14l2 .02v8.78l-6.5-4.06z"]`,
                ),
            ).filter((elem) => {
                const spanElem = elem.closest(`[role="menuitem"]`).querySelector("span");
                if (spanElem) {
                    return spanElem.textContent.startsWith("@") || spanElem.textContent === translate("tweetMoreMenuItems-userMute-textContent");
                } else {
                    return false;
                }
            })[0];
        },
        muteTalk: (): Element => {
            return Array.from(
                document.querySelectorAll(
                    `[role="menuitem"] [d="M18 6.59V1.2L8.71 7H5.5C4.12 7 3 8.12 3 9.5v5C3 15.88 4.12 17 5.5 17h2.09l-2.3 2.29 1.42 1.42 15.5-15.5-1.42-1.42L18 6.59zm-8 8V8.55l6-3.75v3.79l-6 6zM5 9.5c0-.28.22-.5.5-.5H8v6H5.5c-.28 0-.5-.22-.5-.5v-5zm6.5 9.24l1.45-1.45L16 19.2V14l2 .02v8.78l-6.5-4.06z"]`,
                ),
            ).filter((elem) => {
                const spanElem = elem.closest(`[role="menuitem"]`).querySelector("span");
                if (spanElem) {
                    return !spanElem.textContent.startsWith("@") && spanElem.textContent !== translate("tweetMoreMenuItems-userMute-textContent");
                } else {
                    return false;
                }
            })[0];
        },
        leaveTalk: `path[d="M21.503 6.745c.475 1.032.748 2.176.748 3.385 0 2.955-1.608 5.68-4.196 7.11l-8.054 4.459v-3.452l2-2v2.06l5.086-2.816c1.952-1.079 3.164-3.133 3.164-5.36 0-.644-.101-1.264-.286-1.847l1.538-1.538zM3.71 21.71l-1.414-1.414 3.401-3.401C3.34 15.5 1.751 12.935 1.751 10c0-4.411 3.591-8 8.005-8h4.366c1.818 0 3.494.608 4.849 1.62l1.325-1.325 1.414 1.414-18 18.001zm3.462-6.29L17.545 5.047C16.567 4.386 15.389 4 14.123 4H9.757c-3.311 0-6.005 2.691-6.005 6 0 2.389 1.401 4.451 3.421 5.42z"]`,
        block: `[data-testid="block"]`,
        embed: `path[d="M15.24 4.31l-4.55 15.93-1.93-.55 4.55-15.93 1.93.55zm-8.33 3.6L3.33 12l3.58 4.09-1.5 1.32L.67 12l4.74-5.41 1.5 1.32zm11.68-1.32L23.33 12l-4.74 5.41-1.5-1.32L20.67 12l-3.58-4.09 1.5-1.32z"]`,
        report: `[data-testid="report"]`,
        engagements: `[data-testid="tweetEngagements"]`,
        deleteTweet: `path[d="M16 6V4.5C16 3.12 14.88 2 13.5 2h-3C9.11 2 8 3.12 8 4.5V6H3v2h1.06l.81 11.21C4.98 20.78 6.28 22 7.86 22h8.27c1.58 0 2.88-1.22 3-2.79L19.93 8H21V6h-5zm-6-1.5c0-.28.22-.5.5-.5h3c.27 0 .5.22.5.5V6h-4V4.5zm7.13 14.57c-.04.52-.47.93-1 .93H7.86c-.53 0-.96-.41-1-.93L6.07 8h11.85l-.79 11.07zM9 17v-6h2v6H9zm4 0v-6h2v6h-2z"]`,
        highlighOnPin: `[data-testid="highlighOnPin"]`,
        highlightUpsell: `[data-testid="highlightUpsell"]`,
        whoCanReply: `path[d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"]`,
        analytics: `[data-testid="analytics"]`,
        editWithTwitterBlue: `[data-testid="editWithTwitterBlue"]`,
        requestCommunityNote: `[href^="/i/communitynotes/noterequest/"]`,
        subscribe: `[data-testid="subscribe"]`,
    },
};

export async function tweetMoreMenuContent() {
    await waitForElement(`[data-testid="Dropdown"]`);

    let menuTopPx = 0;
    const menuItemPx = fontSizeClass(40, 41, 44, 48, 52);
    for (const id of _data.all) {
        if (getPref(`tweetDisplaySetting.tweetMoreMenuItems.${id}`)) {
            const getFunc = _data.selectors[id];
            let elem = null;
            if (typeof getFunc == "function") {
                elem = getFunc();
            } else {
                elem = document.querySelector(`[data-testid="Dropdown"] ${getFunc}`);
            }

            if (elem) {
                hideElement(elem.closest(`[role="menuitem"]`));
                menuTopPx += menuItemPx;
            }
        }
    }

    const needsChangeTopPx = !document.querySelector(`[role="menu"] > div`).hasAttribute("style");
    if (needsChangeTopPx) {
        document.querySelector<HTMLDivElement>(`[role="menu"]`).style.transform = `translateY(${menuTopPx}px)`;
    }
}
