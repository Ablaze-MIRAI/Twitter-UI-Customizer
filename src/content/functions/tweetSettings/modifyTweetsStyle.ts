import { getPref } from "@content/settings";
import { hideElement } from "@content/utils/element";
import { formatTimeText, getAbsolutelyTime, isRelativeTime } from "@content/utils/datetime";

export function modifyTweetsStyle(articleInfo: ArticleInfomation) {
    const articleBase = articleInfo.elements.articleBase;
    // 横スクロールバーを設置
    if (getPref("tweetDisplaySetting.option.bottomScroll")) articleInfo.elements.buttonBarBase.parentElement.classList.add("TUICScrollBottom");
    // 下のスペースを無くす
    if (getPref("tweetDisplaySetting.invisible.bottomSpace")) {
        const space = articleBase.querySelector(`[aria-labelledby]`);
        if (space && space.children?.[0]?.childElementCount === 0) {
            space.classList.add("TUIC_NONE_SPACE_BOTTOM_TWEET");
        }
    }
    // リツイートを非表示
    if (getPref("timeline.hideOhterRTTL") && articleBase.querySelector(`a[href^="/"] > [data-testid="socialContext"]`) != null) {
        hideElement(articleBase);
    }
    // 非公開アカウントによるツイートを非表示
    if (getPref("timeline.hideLockedTweet") && articleInfo.option.isLockedAccount) {
        hideElement(articleBase);
    }

    // 「Grokでオリジナルバージョンを作成する」を非表示
    if (getPref("tweetDisplaySetting.invisible.askGrok")) {
        const askGrokElement = articleBase.querySelector(`button defs > clipPath > rect:not(.TUICTweetButtomBarBase *)`)?.closest<HTMLElement>(`button`);
        if (askGrokElement) hideElement(askGrokElement);
    }

    // リツイートを非表示
    if (getPref("timeline.hideReply") && articleInfo.option.isBigArticle) {
        articleBase.closest(`[data-testid="cellInnerDiv"]`).classList.add("TUIC_HideNextElements");
    }

    // さらに表示ボタン
    switch (getPref("tweetDisplaySetting.showMore")) {
        case "hide": {
            const showMoreLink = articleBase.querySelector<HTMLButtonElement | HTMLAnchorElement>(`[data-testid="tweet-text-show-more-link"]:is(button,a)`);
            if (showMoreLink) hideElement(showMoreLink);
            break;
        }
        case "open": {
            const showMoreLink = articleBase.querySelector<HTMLButtonElement>(`button[data-testid="tweet-text-show-more-link"]`);
            if (showMoreLink) showMoreLink.click();
            break;
        }
    }

    // ツイート時間
    if (articleInfo.option.isBigArticle) {
        const [hideDate, rewriteDate] = [
            getPref("dateAndTime.hide.tweetDateInformation"),
            !getPref("dateAndTime.options.hour12") || getPref("dateAndTime.options.second"),
        ];
        if (hideDate || rewriteDate) {
            const dateElement = articleBase.querySelector<HTMLTimeElement>("a > time");
            if (hideDate) {
                hideElement(dateElement);
                if (!dateElement.nextElementSibling?.querySelector(`[data-testid="app-text-transition-container"]`)) {
                    hideElement(dateElement.nextElementSibling as HTMLElement);
                }
            } else if (rewriteDate) {
                dateElement.textContent = formatTimeText(dateElement.dateTime) + / · .*$/g.exec(dateElement.textContent)[0];
            }
        }
        const quoteTweet = articleBase.querySelector(`[id] > [id] [data-testid="Tweet-User-Avatar"]`);
        if (quoteTweet) modifyDateAboveTweet(articleBase);
    } else {
        modifyDateAboveTweet(articleBase);
    }
}

function modifyDateAboveTweet(articleBase: HTMLElement) {
    const [hideDate, timePref] = [
        getPref("dateAndTime.hide.tweetAboveDate"),
        getPref("dateAndTime.dateAboveTweet"),
    ];
    if (hideDate || timePref !== "normal") {
        const dateElements = articleBase.querySelectorAll<HTMLTimeElement>(`[data-testid="User-Name"] :is(a, div)[aria-label] > time`);
        for (const elem of dateElements) {
            if (hideDate) {
                const dateElement = elem.closest<HTMLElement>("div+div");
                hideElement(dateElement);
                if (dateElement.previousElementSibling?.getAttribute("aria-hidden")) {
                    hideElement(dateElement.previousElementSibling as HTMLElement);
                }
            } else {
                if (timePref === "absolutely" || isRelativeTime(elem.parentElement.ariaLabel)) {
                    elem.textContent = getAbsolutelyTime(elem.dateTime);
                }
            }
        }
    }
}
