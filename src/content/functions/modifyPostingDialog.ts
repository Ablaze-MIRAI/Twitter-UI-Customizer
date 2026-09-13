import { translate } from "@content/i18n";
import { hideElement, processElement, waitForElement } from "@content/utils/element";
import { getPref, getSettingIDs } from "@content/settings";
import { placeToastMessage } from "@content/utils/toastMessage";
import { ProcessedClass } from "@shared/sharedData";

const _data = {
    all: getSettingIDs("postingDialog.toolbar"),
    selectors: {
        fileInput: `input[data-testid="fileInput"]`,
        gitSearchButton: `button[data-testid="gifSearchButton"]`,
        grokImgGen: `button[data-testid="grokImgGen"]`,
        createPollButton: `button[data-testid="createPollButton"]`,
        addEmoji: `button:has(> div > svg > g > path + path[d="M12.008 2c5.523 0 10 4.477 10 10s-4.477 10-10 10-10-4.477-10-10 4.477-10 10-10zm0 2c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8z"])`,
        scheduleOption: `button[data-testid="scheduleOption"]`,
        geoButton: `button[data-testid="geoButton"]`,
        contentDisclosureButton: `button[data-testid="contentDisclosureButton"]`,
    },
};

export function modifyPostingDialog() {
    sortPostingDialogButtons();
    composingTweetButton();
}

async function sortPostingDialogButtons() {
    if (document.querySelector(`[data-testid="toolBar"] input[data-testid="fileInput"]:not(.${ProcessedClass})`)) {
        const buttons: Record<string, HTMLElement> = {};
        const visibleButtons = getPref(`postingDialog.toolbar`);
        for (const buttonID of _data.all) {
            const toolbarButton = document.querySelector<HTMLElement>(`[data-testid="toolBar"] [role="tablist"] ${_data.selectors[buttonID]}`)?.closest<HTMLElement>(`[role="presentation"]`);
            if (toolbarButton) {
                buttons[buttonID] = toolbarButton;
                processElement(toolbarButton);
                if (!visibleButtons.includes(buttonID)) {
                    hideElement(toolbarButton);
                }
            }
        }
        const emptyElement = document.querySelector<HTMLElement>(`[data-testid="toolBar"] [role="tablist"] [role="presentation"]:not(.${ProcessedClass})`);
        const parentElement = document.querySelector(`[data-testid="toolBar"] input[data-testid="fileInput"]`).closest<HTMLElement>(`[role="presentation"]`).parentElement;
        for (const buttonID of visibleButtons) {
            if (buttons[buttonID]) {
                parentElement.insertBefore(buttons[buttonID], emptyElement);
            }
        }
    }
    for (const pref of _data.all) {
        if (getPref(`sidebarSetting.moreMenuItems.${pref}`)) {
            const elem = document.querySelector(_data.selectors[pref]);
            if (elem) {
                hideElement(elem.parentElement);
            }
        }
    }
}

function composingTweetButton() {
    const composeTweetButtons = document.querySelectorAll<HTMLButtonElement>(`:is([data-testid="tweetButton"], [data-testid="tweetButtonInline"]):not(.${ProcessedClass})`);
    if (composeTweetButtons.length > 0) {
        for (const composeTweetButton of composeTweetButtons) {
            composeTweetButton.addEventListener("click", () => {
                if (composeTweetButton.disabled) return;
                if (getPref("composetweet.copyHashtag")) {
                    const hashs = [];
                    const tweetTextElement = document.querySelector(`[data-testid="tweetTextarea_0"]`);
                    for (const sentence of tweetTextElement.querySelectorAll(`span[data-text="true"]`)) {
                        if (sentence?.textContent && (sentence.textContent.startsWith("#") || sentence.textContent.startsWith("$"))) hashs.push(sentence.textContent);
                    }
                    if (hashs.length > 0) {
                        navigator.clipboard.writeText(hashs.join(" "));
                        placeToastMessage(translate("bottomTweetButtons-urlCopy-layer"));
                    }
                }
                if (location.pathname === "/compose/post" && composeTweetButton.dataset.testid === "tweetButton" && getPref("composetweet.remainOpened")) {
                    waitForElement(`[data-testid="toast"]`).then(() => {
                        window.setTimeout(() => document.querySelector<HTMLButtonElement>(`[data-testid="SideNav_NewTweet_Button"]`)?.click(), 500);
                    });
                }
            });
            processElement(composeTweetButton);
        }
    }
}
