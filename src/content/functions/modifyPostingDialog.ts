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
        addEmoji: `svg > g > path[d="M8 9.5C8 8.119 8.672 7 9.5 7S11 8.119 11 9.5 10.328 12 9.5 12 8 10.881 8 9.5zm6.5 2.5c.828 0 1.5-1.119 1.5-2.5S15.328 7 14.5 7 13 8.119 13 9.5s.672 2.5 1.5 2.5zM12 16c-2.224 0-3.021-2.227-3.051-2.316l-1.897.633c.05.15 1.271 3.684 4.949 3.684s4.898-3.533 4.949-3.684l-1.896-.638c-.033.095-.83 2.322-3.053 2.322zm10.25-4.001c0 5.652-4.598 10.25-10.25 10.25S1.75 17.652 1.75 12 6.348 1.75 12 1.75 22.25 6.348 22.25 12zm-2 0c0-4.549-3.701-8.25-8.25-8.25S3.75 7.451 3.75 12s3.701 8.25 8.25 8.25 8.25-3.701 8.25-8.25z"]`,
        scheduleOption: `button[data-testid="scheduleOption"]`,
        geoButton: `button[data-testid="geoButton"]`,
    },
};

export function modifyPostingDialog() {
    sortPostingDialogButtons();
    composingTweetButton();
}

async function sortPostingDialogButtons() {
    if (document.querySelector(`[data-testid="toolBar"] input[data-testid="fileInput"]:not(.${ProcessedClass})`)) {
        const buttons: Record<string, HTMLElement> = {};
        const visibleButtons: string[] = getPref(`postingDialog.toolbar`);
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
            if (visibleButtons[buttonID]) {
                parentElement.insertBefore(visibleButtons[buttonID], emptyElement);
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
