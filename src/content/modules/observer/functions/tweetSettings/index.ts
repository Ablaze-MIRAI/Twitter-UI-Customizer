import { hasClosest, hideElement, showElement, waitForElement } from "@modules/utils/controlElements";
import { getPref, getSettingIDs } from "@modules/pref";
import { tweetTopButtons } from "./tweetTopButtons";
import { placeEngagementsLink } from "./placeEngagementsLink";
import { showLinkCardInfo } from "./showLinkCardInfo";
import { render } from "solid-js/web";
import { EmptyButtonHTML, TweetUnderButtonsHTML, tweetButtonData, willClickRT } from "./buttonHTML";
import { ButtonUnderTweetSelectors, TweetUnderButtonsData } from "./_data";
import { ProcessedClass } from "@shared/sharedData";
import { fontSizeClass } from "@modules/utils/fontSize";
import { formatTimeText, getAbsolutelyTime, isRelativeTime } from "@content/modules/utils/dateAndTime";
import { placeToastMessage } from "@content/modules/utils/toastMessage";
import { TUICI18N } from "@content/modules/i18n";

let buttonUnderTweetRunning = false;

const _data = {
    all: getSettingIDs("visibleButtons"),
    selectors: { ...ButtonUnderTweetSelectors },
    buttonFunction: {
        "retweet-button": async () => {
            if (getPref("tweetDisplaySetting.buttonsInvisible.RTNotQuote")) {
                // TODO: wait 関数を作って置き換えるべきか？
                window.setTimeout(async () => {
                    if (willClickRT.data) {
                        willClickRT.data = false;
                    } else {
                        (await waitForElement<HTMLButtonElement>(`[role="menuitem"]:is([data-testid="retweetConfirm"],[data-testid="unretweetConfirm"])`))[0].click();
                    }
                }, 100);
            }
        },
        "share-button": function (elem: HTMLAnchorElement) {
            window.setTimeout(async () => {
                await waitForElement(
                    `[role="menuitem"] path[d="M18.36 5.64c-1.95-1.96-5.11-1.96-7.07 0L9.88 7.05 8.46 5.64l1.42-1.42c2.73-2.73 7.16-2.73 9.9 0 2.73 2.74 2.73 7.17 0 9.9l-1.42 1.42-1.41-1.42 1.41-1.41c1.96-1.96 1.96-5.12 0-7.07zm-2.12 3.53l-7.07 7.07-1.41-1.41 7.07-7.07 1.41 1.41zm-12.02.71l1.42-1.42 1.41 1.42-1.41 1.41c-1.96 1.96-1.96 5.12 0 7.07 1.95 1.96 5.11 1.96 7.07 0l1.41-1.41 1.42 1.41-1.42 1.42c-2.73 2.73-7.16 2.73-9.9 0-2.73-2.74-2.73-7.17 0-9.9z"]`,
                );
                document
                    .querySelector(
                        `[role="menuitem"] path[d="M18.36 5.64c-1.95-1.96-5.11-1.96-7.07 0L9.88 7.05 8.46 5.64l1.42-1.42c2.73-2.73 7.16-2.73 9.9 0 2.73 2.74 2.73 7.17 0 9.9l-1.42 1.42-1.41-1.42 1.41-1.41c1.96-1.96 1.96-5.12 0-7.07zm-2.12 3.53l-7.07 7.07-1.41-1.41 7.07-7.07 1.41 1.41zm-12.02.71l1.42-1.42 1.41 1.42-1.41 1.41c-1.96 1.96-1.96 5.12 0 7.07 1.95 1.96 5.11 1.96 7.07 0l1.41-1.41 1.42 1.41-1.42 1.42c-2.73 2.73-7.16 2.73-9.9 0-2.73-2.74-2.73-7.17 0-9.9z"]`,
                    )
                    .closest<HTMLElement>(`[role="menuitem"]`)
                    .addEventListener("click", (e) => {
                        e.stopImmediatePropagation();
                        navigator.clipboard.writeText(elem.href.replace(/(twitter\.com|x\.com)/, TweetUnderButtonsData.copyURL[getPref("tweetDisplaySetting.linkShareCopyURL").replace("Share", "")]));
                        placeToastMessage(TUICI18N.get("bottomTweetButtons-urlCopy-layer"));
                        document.querySelector<HTMLDivElement>(`#layers > div+div > div > div > div > div+div > div > div`).click();
                    });
            }, 100);
        },
    },
    buttonElement: {
        _handleEvent: function (elem: Element, eventFunc: () => void) {
            elem.addEventListener("keydown", (e: KeyboardEvent) => {
                if (e.key === "Enter") {
                    eventFunc();
                }
            });
            elem.addEventListener("click", () => {
                eventFunc();
            });
        },
    },
};

export function tweetSettings() {
    if (!buttonUnderTweetRunning) {
        buttonUnderTweetRunning = true;
        {
            const getElement = () => document.querySelector<HTMLElement>(`article[data-tuic-processed-article] [data-testid="caret"]:not(${ProcessedClass})`);
            for (let elem = getElement(); elem; elem = getElement()) {
                delete elem.closest<HTMLElement>("[data-tuic-processed-article]").dataset.tuicProcessedArticle;
            }
        }

        {
            const getElement = () => document.querySelector(`article[data-tuic-processed-article] .TUICTweetButtomBarBase > div > div:not(.TUIC_UnderTweetButton):not(.TUICButtonUnderTweet)`);
            for (let elem = getElement(); elem; elem = getElement()) {
                delete elem.closest<HTMLElement>("[data-tuic-processed-article]").dataset.tuicProcessedArticle;
            }
        }

        {
            const getElement = () => document.querySelector(`article[data-tuic-processed-article] :not([data-tuic-tweet-top-button="grok"]) > button [d="M12.745 20.54l10.97-8.19c.539-.4 1.307-.244 1.564.38 1.349 3.288.746 7.241-1.938 9.955-2.683 2.714-6.417 3.31-9.83 1.954l-3.728 1.745c5.347 3.697 11.84 2.782 15.898-1.324 3.219-3.255 4.216-7.692 3.284-11.693l.008.009c-1.351-5.878.332-8.227 3.782-13.031L33 0l-4.54 4.59v-.014L12.743 20.544m-2.263 1.987c-3.837-3.707-3.175-9.446.1-12.755 2.42-2.449 6.388-3.448 9.852-1.979l3.72-1.737c-.67-.49-1.53-1.017-2.515-1.387-4.455-1.854-9.789-.931-13.41 2.728-3.483 3.523-4.579 8.94-2.697 13.561 1.405 3.454-.899 5.898-3.22 8.364C1.49 30.2.666 31.074 0 32l10.478-9.466"]`);
            for (let elem = getElement(); elem; elem = getElement()) {
                delete elem.closest<HTMLElement>("[data-tuic-processed-article]").dataset.tuicProcessedArticle;
            }
        }

        const articles = document.querySelectorAll<HTMLElement>(`article:not([data-testid="notification"]):not([data-tuic-processed-article]):not([data-testid="tweet"] *)`);
        if (articles.length != 0) {
            for (const articleBase of articles) {
                (async () => {
                    if (articleBase.querySelector(_data.selectors["reply-button"]) && articleBase.querySelector(_data.selectors["like-button"])) {
                        //要素の探索

                        // 名前の判断に使う要素(画面左下...だったはず)
                        const userNameElem = document.querySelector(`[data-testid="SideNav_AccountSwitcher_Button"] [data-testid^="UserAvatar-Container-"]`);
                        // ツイート下ボタンの親
                        const buttonBarBase = hasClosest<HTMLDivElement>(articleBase.querySelector(_data.selectors["reply-button"]), _data.selectors["like-button"]);
                        buttonBarBase.parentElement.classList.add("TUICTweetButtomBarBase");
                        // ボタンたち
                        const underTweetButtons: Record<string, HTMLElement> = {};
                        for (const sel in _data.selectors) {
                            const elem = buttonBarBase.querySelector<HTMLElement>(_data.selectors[sel])?.closest<HTMLElement>(`.TUICTweetButtomBarBase > * > *`);
                            if (elem) {
                                underTweetButtons[sel] = elem;
                            }
                        }
                        // ステータスボタン
                        const statusButton = articleBase.querySelector(`[href*="/status/"] > time`)?.parentElement as HTMLAnchorElement;

                        // ツイートについての情報集
                        const articleInfo: ArticleInfomation = {
                            elements: { buttonBarBase: buttonBarBase, articleBase: articleBase, statusButton: statusButton },
                            option: {
                                isLockedAccount: !!articleBase.querySelector(`[data-testid="icon-lock"]`),
                                cannotRT: !!underTweetButtons["retweet-button"].querySelector(`.r-icoktb,.r-12c3ph5`),
                                cannotShare: !!underTweetButtons["retweet-button"].querySelector(`.r-icoktb,.r-12c3ph5`),
                                isMe: userNameElem == null ? false : articleBase.querySelector(`[data-testid="User-Name"] > .r-1awozwy+div span`).textContent == "@" + userNameElem.getAttribute("data-testid").replace(`UserAvatar-Container-`, ""),
                                isBigArticle: !!articleBase.querySelector(`.r-1srniue`),
                            },
                        };

                        if (!articleInfo.option.cannotRT) {
                            // リツイートボタンのイベントハンドラ(メニューを出さないなどの実装のため)
                            if (underTweetButtons["retweet-button"].dataset?.tuicEventHandled !== "") {
                                _data.buttonElement._handleEvent(underTweetButtons["retweet-button"], _data.buttonFunction["retweet-button"]);
                            }
                            underTweetButtons["retweet-button"].dataset.tuicEventHandled = "";

                            if (!articleInfo.option.isLockedAccount && underTweetButtons["share-button"] && underTweetButtons["share-button"].dataset?.tuicEventHandled !== "") {
                                // 共有ボタンのイベントハンドラ(URLをコピーのドメイン変更のため)
                                _data.buttonElement._handleEvent(underTweetButtons["share-button"], () => {
                                    _data.buttonFunction["share-button"](statusButton);
                                });
                                underTweetButtons["share-button"].dataset.tuicEventHandled = "";
                            }
                        }

                        if (articleInfo.option.isBigArticle) {
                            // Class付け
                            articleBase.dataset.tuicZoomingTweet = "";
                            // 画像を拡大表示しているときの共有ボタンに対応
                            if (location.pathname.includes("/photo/") || location.pathname.includes("/video/")) {
                                articleBase.dataset.tuicZoomingTweet = "openingImage";

                                if (!articleInfo.option.cannotRT && !articleInfo.option.isLockedAccount) {
                                    const shareButtom = document.querySelector<HTMLElement>(`[aria-labelledby="modal-header"] > div > div:not([aria-expanded="true"]) [aria-haspopup="menu"]:not([data-testid="retweet"]):not([data-testid="unretweet"])`);
                                    if (shareButtom) {
                                        _data.buttonElement._handleEvent(shareButtom, () => {
                                            _data.buttonFunction["share-button"](articleInfo.elements.statusButton);
                                        });
                                    }
                                }
                            }
                            // エンゲージメントの設置
                            placeEngagementsLink(articleInfo);
                        }

                        // ツイートにCSSを付与
                        tweetStyle(articleInfo);

                        // リンクカードを設置
                        showLinkCardInfo(articleInfo);

                        // ツイート下ボタンの並び替え
                        if(articleInfo.option.isBigArticle || !getPref("tweetDisplaySetting.option.hideOnTimeline")){
                            let lastButton: HTMLElement | null = null;
                            for (const i of getPref("visibleButtons")) {
                                let processingButton: HTMLElement | null = null;
                                if (i in underTweetButtons) {
                                    processingButton = underTweetButtons[i];
                                    processingButton.classList.add("TUIC_UnderTweetButton");
                                    showElement(processingButton);
                                } else if (i in tweetButtonData) {
                                    render(TweetUnderButtonsHTML(i, articleInfo), buttonBarBase);
                                    processingButton = Array.from(buttonBarBase.children).at(-1) as HTMLElement;
                                }
                                // Twitterのボタンと同化させるためにClassとかごにょごにょしてる
                                if (processingButton) {
                                    if (underTweetButtons["reply-button"].querySelector(`[data-testid="app-text-transition-container"]`) && processingButton.querySelector(`[data-testid="app-text-transition-container"]`) == null) {
                                        render(EmptyButtonHTML, processingButton.querySelector("svg").closest(`:is([role="button"],[role="link"]) > div`));
                                    }
                                    processingButton.classList.remove("r-1rq6c10", "r-1b7u577", "r-1wron08", "r-ogg1b9", "r-uzdrn4", "r-1l8l4mf");
                                    processingButton.classList.add(fontSizeClass("r-12zb1j4", "r-1kb76zh", "r-1kb76zh", "r-19einr3", "r-zso239"));
                                    lastButton = processingButton;
                                    buttonBarBase.appendChild(processingButton);
                                }
                            }
                            // 最後のボタンだけ特殊処理
                            if (lastButton) {
                                const lastButtonSpace = lastButton.querySelector(".TUIC_UnderTweetButtonSpace");
                                if (lastButtonSpace != null && lastButtonSpace.children[0].children[0].childElementCount == 0) {
                                    lastButtonSpace.remove();
                                    lastButton.classList.add(fontSizeClass("r-12zb1j4", "r-1kb76zh", "r-1kb76zh", "r-19einr3", "r-zso239"));
                                }
                                lastButton.classList.add("r-1rq6c10", "r-1b7u577");
                                buttonBarBase.style.minHeight = "";
                                buttonBarBase.style.height = "";
                            } else {
                                buttonBarBase.style.minHeight = "0";
                                buttonBarBase.style.height = "0";
                            }
                        }

                        for (const i of _data.all) {
                            if (
                                (!articleInfo.option.isBigArticle && getPref("tweetDisplaySetting.option.hideOnTimeline")) || 
                                (!getPref("visibleButtons").includes(i) && i in underTweetButtons)
                            ) {
                                hideElement(underTweetButtons[i]);
                            }
                        }

                        tweetTopButtons(articleInfo);
                    }
                    articleBase.dataset.tuicProcessedArticle = "";
                })();
            }
        }
        buttonUnderTweetRunning = false;
    }
}

function tweetStyle(articleInfo: ArticleInfomation) {
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
    if (getPref("timeline.hideLockedTweet") && articleInfo.option.isLockedAccount) {
        hideElement(articleBase);
    }

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
