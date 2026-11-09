import { waitForElement } from "@content/utils/element";
import { getPref } from "@content/settings";
import { translate } from "@content/i18n";
import { JSX } from "solid-js";
import { ButtonUnderTweetSelectors, TweetUnderButtonsData } from "./_data";
import { backgroundColorClass } from "@content/utils/color";
import { fontSizeClass } from "@content/utils/fontSize";
import { placeToastMessage } from "@content/utils/toastMessage";

export const willClickRT = { data: false };

// ツイートのボタンを作るためのデータたち
export const tweetButtonData: Record<string, {
    svg: () => JSX.Element;
    clickEvent: (data: ArticleInfomation) => void;
    redButton?: boolean;
    enable: (articleInfomation: ArticleInfomation) => boolean;
}> = {
    "url-copy": {
        svg: (): JSX.Element => {
            return (
                <g>
                    <path
                        d="M18.36 5.64c-1.95-1.96-5.11-1.96-7.07 0L9.88 7.05 8.46 5.64l1.42-1.42c2.73-2.73 7.16-2.73 9.9 0 2.73 2.74 2.73 7.17 0 9.9l-1.42 1.42-1.41-1.42 1.41-1.41c1.96-1.96 1.96-5.12 0-7.07zm-2.12 3.53l-7.07 7.07-1.41-1.41 7.07-7.07 1.41 1.41zm-12.02.71l1.42-1.42 1.41 1.42-1.41 1.41c-1.96 1.96-1.96 5.12 0 7.07 1.95 1.96 5.11 1.96 7.07 0l1.41-1.41 1.42 1.41-1.42 1.42c-2.73 2.73-7.16 2.73-9.9 0-2.73-2.74-2.73-7.17 0-9.9z"
                        class="TUIC_URL"
                    ></path>
                </g>
            );
        },
        clickEvent: (data: ArticleInfomation) => {
            let tweetUrl = data.elements.statusButton.href;

            // NOTE: ドメインを変更
            tweetUrl = tweetUrl.replace(/(twitter\.com|x\.com)/, TweetUnderButtonsData.copyURL[getPref("tweetDisplaySetting.linkCopyURL")]);

            // NOTE: 編集済みのツイートであることがあるため、"/history" を削除する
            tweetUrl = tweetUrl.replace(/\/history$/, "");

            // NOTE: クリップボードにコピーし、トーストを表示
            navigator.clipboard.writeText(tweetUrl);
            placeToastMessage(translate("bottomTweetButtons-urlCopy-layer"));
        },
        enable: (articleInfomation: ArticleInfomation): boolean => {
            return true;
        },
    },
    userBlock: {
        svg: (): JSX.Element => {
            return (
                <g>
                    <path
                        d="M12 3.75c-4.55 0-8.25 3.69-8.25 8.25 0 1.92.66 3.68 1.75 5.08L17.09 5.5C15.68 4.4 13.92 3.75 12 3.75zm6.5 3.17L6.92 18.5c1.4 1.1 3.16 1.75 5.08 1.75 4.56 0 8.25-3.69 8.25-8.25 0-1.92-.65-3.68-1.75-5.08zM1.75 12C1.75 6.34 6.34 1.75 12 1.75S22.25 6.34 22.25 12 17.66 22.25 12 22.25 1.75 17.66 1.75 12z"
                        class="TUIC_USERBLOCK"
                    ></path>
                </g>
            );
        },
        clickEvent: async (data: ArticleInfomation) => {
            const article = data.elements.articleBase;
            article.querySelector<HTMLButtonElement>(`[data-testid="caret"]`).click();
            (await waitForElement<HTMLButtonElement>(`[data-testid="block"][role="menuitem"]`))[0].click();

            // NOTE: 押したあとに表示されるメニューをスキップ・閉じたときにもっと見るが残らないようにする
            await waitForElement(`[data-testid="confirmationSheetConfirm"]`);
            if (getPref("tweetDisplaySetting.buttonsInvisible.noModalbottomTweetButtons")) {
                document.querySelector<HTMLButtonElement>(`[data-testid="confirmationSheetConfirm"]`).click();
            } else {
                document.querySelector(`[data-testid="confirmationSheetCancel"]`).addEventListener("click", (e) => {
                    article.querySelector<HTMLDivElement>(`[data-testid="caret"]`).click();
                });
                document.querySelector(`[data-testid="mask"]`).addEventListener("click", (e) => {
                    article.querySelector<HTMLDivElement>(`[data-testid="caret"]`).click();
                });
            }
        },
        enable: (articleInfomation: ArticleInfomation): boolean => {
            return !articleInfomation.option.isMe;
        },
    },
    userMute: {
        svg: (): JSX.Element => {
            return (
                <g>
                    <path
                        d="M18 6.59V1.2L8.71 7H5.5C4.12 7 3 8.12 3 9.5v5C3 15.88 4.12 17 5.5 17h2.09l-2.3 2.29 1.42 1.42 15.5-15.5-1.42-1.42L18 6.59zm-8 8V8.55l6-3.75v3.79l-6 6zM5 9.5c0-.28.22-.5.5-.5H8v6H5.5c-.28 0-.5-.22-.5-.5v-5zm6.5 9.24l1.45-1.45L16 19.2V14l2 .02v8.78l-6.5-4.06z"
                        class="TUIC_USERMUTE"
                    ></path>
                </g>
            );
        },
        clickEvent: async (data: ArticleInfomation) => {
            const article = data.elements.articleBase;
            article.querySelector<HTMLButtonElement>(`[data-testid="caret"]`).click();
            (
                await waitForElement<HTMLButtonElement>(
                    `[role="menuitem"] [d="M16 6.586l4.293-4.293 1.414 1.414-18 18-1.414-1.414 2.657-2.658C3.795 17.063 3 15.875 3 14.5v-5C3 7.567 4.567 6 6.5 6h2.148l4.727-3.781.274-.219H16v4.586zM9.625 7.78L9.351 8H6.5C5.672 8 5 8.672 5 9.5v5c0 .828.672 1.5 1.5 1.5h.086L14 8.586V4.28l-4.375 3.5z"]`,
                )
            )[0]
                .closest<HTMLElement>(`[role="menuitem"]`)
                .click();
        },
        enable: (articleInfomation: ArticleInfomation): boolean => {
            return !articleInfomation.option.isMe;
        },
    },
    quoteTweet: {
        svg: (): JSX.Element => {
            return <g><path d="M14.23 2.854c.98-.977 2.56-.977 3.54 0l3.38 3.378c.97.977.97 2.559 0 3.536L9.91 21H3v-6.914L14.23 2.854zm2.12 1.414c-.19-.195-.51-.195-.7 0L5 14.914V19h4.09L19.73 8.354c.2-.196.2-.512 0-.708l-3.38-3.378zM14.75 19l-2 2H21v-2h-6.25z" class="TUIC_QuoteTweet"></path></g>;
        },
        clickEvent: async (data: ArticleInfomation) => {
            if (getPref("tweetDisplaySetting.buttonsInvisible.RTNotQuote")) {
                willClickRT.data = true;
            }
            data.elements.buttonBarBase.querySelector<HTMLButtonElement>(ButtonUnderTweetSelectors["retweet-button"]).click();
            (await waitForElement<HTMLButtonElement>(`[role="menuitem"]:is([data-testid="unretweetConfirm"],[data-testid="retweetConfirm"])+[role="menuitem"]`))[0].click();
        },
        enable: (articleInfomation: ArticleInfomation): boolean => {
            return !articleInfomation.option.cannotRT;
        },
    },
    likeAndRT: {
        svg: (): JSX.Element => {
            return (
                <g>
                    <path
                        d="M4.08401 2.728C3.15837 3.59826 1.4159 5.23274 0.490263 6.103C0.829176 6.46556 1.40773 7.02852 1.74026 7.38425C1.82549 7.30812 3.14651 6.103 3.14651 6.103C3.14651 6.103 3.14651 10.6835 3.14651 12.1342C3.14651 13.8926 4.60559 15.2905 6.36526 15.2905L8.49026 15.2905C9.6168 17.2188 11.666 19.2558 15.0528 21.228L15.459 21.478L15.8653 21.228C19.3912 19.1743 21.5272 17.0378 22.6153 15.0405C23.7106 13.0271 23.7431 11.1545 23.0215 9.69675C22.3071 8.25513 20.9077 7.33979 19.334 7.25925C18.3272 7.20433 17.3131 7.60726 16.3653 8.25925L16.3653 6.07175C16.3653 4.31345 14.9374 2.88425 13.1778 2.88425C12.158 2.88425 9.00477 2.88425 8.86526 2.88425C8.86526 3.3764 8.86526 4.19202 8.86526 4.69675C9.00477 4.69675 12.158 4.69675 13.1778 4.69675C13.9268 4.69675 14.5528 5.31895 14.5528 6.07175L14.5528 8.25925C13.605 7.60726 12.5914 7.20434 11.584 7.25925C10.0103 7.33979 8.57963 8.25513 7.86526 9.69675C7.33532 10.7673 7.41929 12.0997 7.83401 13.5092C7.2945 13.5093 6.7014 13.5093 6.36526 13.5092C5.61267 13.5092 4.99026 12.8843 4.99026 12.1342C4.99026 10.6756 4.99026 6.07175 4.99026 6.07175C4.99026 6.07175 6.34386 7.3065 6.42776 7.38425C6.76029 7.02852 7.3076 6.46556 7.64651 6.103C6.72087 5.23274 5.00965 3.59826 4.08401 2.728ZM11.6778 9.0405C12.5116 8.99504 13.4097 9.38669 14.1778 10.1655L15.459 11.4467L16.7403 10.1655C17.1236 9.77649 17.534 9.48018 17.959 9.2905C18.384 9.10082 18.8235 9.01777 19.2403 9.0405C20.1731 9.08825 20.9759 9.62921 21.3965 10.478C21.8726 11.4397 21.8082 12.7506 21.0215 14.1967C20.094 15.8993 18.1968 17.6411 15.459 19.3217C12.7301 17.6493 10.8296 15.8758 9.89651 14.1655C9.11086 12.7213 9.01387 11.4404 9.49026 10.478C9.91054 9.62986 10.751 9.08793 11.6778 9.0405Z"
                        class="TUIC_likeAndRT"
                    ></path>
                </g>
            );
        },
        clickEvent: async (data: ArticleInfomation) => {
            (await waitForElement<HTMLButtonElement>(ButtonUnderTweetSelectors["retweet-button"], data.elements.buttonBarBase))[0].click();
            (await waitForElement<HTMLButtonElement>(ButtonUnderTweetSelectors["like-button"], data.elements.buttonBarBase))[0].click();

            // NOTE: ワンクリックでRTできる設定の場合は、RTボタンを押した時点でRTされるのでこの処理は不要
            if (!getPref("tweetDisplaySetting.buttonsInvisible.RTNotQuote")) {
                (await waitForElement<HTMLButtonElement>(`[role="menuitem"][data-testid="retweetConfirm"]`))[0].click();
            }
        },
        enable: (articleInfomation: ArticleInfomation): boolean => {
            return !articleInfomation.option.cannotRT;
        },
    },
    deleteButton: {
        svg: (): JSX.Element => {
            return (
                <g>
                    <path
                        d="M16 6V4.5C16 3.12 14.88 2 13.5 2h-3C9.11 2 8 3.12 8 4.5V6H3v2h1.06l.81 11.21C4.98 20.78 6.28 22 7.86 22h8.27c1.58 0 2.88-1.22 3-2.79L19.93 8H21V6h-5zm-6-1.5c0-.28.22-.5.5-.5h3c.27 0 .5.22.5.5V6h-4V4.5zm7.13 14.57c-.04.52-.47.93-1 .93H7.86c-.53 0-.96-.41-1-.93L6.07 8h11.85l-.79 11.07zM9 17v-6h2v6H9zm4 0v-6h2v6h-2z"
                        class="TUIC_DeleteButton"
                    ></path>
                </g>
            );
        },
        clickEvent: async (data: ArticleInfomation) => {
            const article = data.elements.articleBase;
            article.querySelector<HTMLButtonElement>(`[data-testid="caret"]`).click();
            (
                await waitForElement<HTMLButtonElement>(
                    `[role="menuitem"] [d="M16 6V4.5C16 3.12 14.88 2 13.5 2h-3C9.11 2 8 3.12 8 4.5V6H3v2h1.06l.81 11.21C4.98 20.78 6.28 22 7.86 22h8.27c1.58 0 2.88-1.22 3-2.79L19.93 8H21V6h-5zm-6-1.5c0-.28.22-.5.5-.5h3c.27 0 .5.22.5.5V6h-4V4.5zm7.13 14.57c-.04.52-.47.93-1 .93H7.86c-.53 0-.96-.41-1-.93L6.07 8h11.85l-.79 11.07zM9 17v-6h2v6H9zm4 0v-6h2v6h-2z"]`,
                )
            )[0]
                .closest<HTMLElement>(`[role="menuitem"]`)
                .click();
            // NOTE: 押したあとに表示されるメニューをスキップ・閉じたときにもっと見るが残らないようにする
            if (getPref("tweetDisplaySetting.buttonsInvisible.noModalbottomTweetButtons")) {
                document.querySelector<HTMLButtonElement>(`[data-testid="confirmationSheetConfirm"]`).click();
            } else {
                document.querySelector(`[data-testid="confirmationSheetCancel"]`).addEventListener("click", (e) => {
                    article.querySelector<HTMLDivElement>(`[data-testid="caret"]`).click();
                });
                document.querySelector(`[data-testid="mask"]`).addEventListener("click", (e) => {
                    article.querySelector<HTMLDivElement>(`[data-testid="caret"]`).click();
                });
            }
        },
        enable: (articleInfomation: ArticleInfomation): boolean => {
            return articleInfomation.option.isMe;
        },
        redButton: true,
    },
    sendDM: {
        svg: (): JSX.Element => {
            return (
                <g>
                    <path
                        d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"
                        class="TUIC_sendDM"
                    ></path>
                </g>
            );
        },
        clickEvent: async (data: ArticleInfomation) => {
            data.elements.buttonBarBase.querySelector<HTMLButtonElement>(ButtonUnderTweetSelectors["share-button"]).closest("button").click();
            (
                await waitForElement<HTMLButtonElement>(
                    `[role="menu"] [role="menuitem"] [d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"]:not(.TUIC_sendDM)`,
                )
            )[0]
                .closest<HTMLElement>(`[role="menuitem"]`)
                .click();
        },
        enable: (articleInfomation: ArticleInfomation): boolean => {
            return !(articleInfomation.option.cannotRT || articleInfomation.option.cannotShare || articleInfomation.option.isLockedAccount);
        },
    },
    showQuotes: {
        svg: (): JSX.Element => {
            return (
                <g>
                    <path
                        d="M4.5 5C3.11929 5 2 6.11929 2 7.5L2 11.5C2 12.8807 3.11929 14 4.5 14L9 14L11 9.5L11 7.5C11 6.11929 9.88071 5 8.5 5L4.5 5ZM15.5 5C14.1193 5 13 6.11929 13 7.5L13 11.5C13 12.8807 14.1193 14 15.5 14L20 14L22 9.5L22 7.5C22 6.11929 20.8807 5 19.5 5L15.5 5ZM4.5 7L8.5 7C8.77614 7 9 7.22386 9 7.5L9 12L4.5 12C4.22386 12 4 11.7761 4 11.5C4 11 4 8 4 7.5C4 7.22386 4.22386 7 4.5 7ZM15.5 7L19.5 7C19.7761 7 20 7.22386 20 7.5L20 12L15.5 12C15.2239 12 15 11.7761 15 11.5C15 11 15 8 15 7.5C15 7.22386 15.2239 7 15.5 7Z"
                        class="TUIC_ShowQuotes"
                    ></path>
                    <path
                        d="M9 9.5C9 12.1224 8.14251 14.5152 6.6875 16.625C6.41351 17.0223 6.16454 17.3377 5.875 17.6875L7.375 19C7.70187 18.6258 7.99255 18.2139 8.3125 17.75C9.98249 15.3285 11 12.5651 11 9.5L9 9.5ZM20 9.5C20 12.1224 19.1425 14.5152 17.6875 16.625C17.4135 17.0223 17.1645 17.3377 16.875 17.6875L18.375 19C18.7019 18.6258 18.9925 18.2139 19.3125 17.75C20.9825 15.3285 22 12.5651 22 9.5L20 9.5Z"
                        class="TUIC_ShowQuotes"
                    ></path>
                </g>
            );
        },
        clickEvent: async (data: ArticleInfomation) => {
            data.elements.articleBase.querySelector<HTMLElement>(`[data-testid="caret"]`).click();
            await waitForElement(`[data-testid="Dropdown"]`);
            document.querySelector<HTMLElement>(`[data-testid="tweetEngagements"]`)?.click();
        },
        enable: (articleInfomation: ArticleInfomation): boolean => {
            return true;
        },
    },
};

// ツイートのボタン
export const TweetUnderButtonsHTML = (id: string, articleInfomation: ArticleInfomation): (() => JSX.Element) => {
    const enable = tweetButtonData[id].enable(articleInfomation);
    return (): JSX.Element => (
        <div
            class="twcss-flex TUICButtonUnderTweet TUICOriginalContent"
            style={{
                "justify-content": "inherit", display: "inline-grid", transform: "rotate(0deg) scale(1) translate3d(0px, 0px, 0px)",
            }}
        >
            <div class="twcss-flex flex-row justify-start">
                <div
                    data-TUICButton={id}
                    role="button"
                    tabindex={enable ? "0" : "-1"}
                    class={`twcss-flex justify-center min-h-[20px] overflow-visible select-none ${enable ? "cursor-pointer" : "opacity-[0.5]"} outline-none`}
                    onKeyDown={(e: KeyboardEvent) => {
                        if (enable && e.key === "Enter") {
                            tweetButtonData[id].clickEvent(articleInfomation);
                        }
                    }}
                    onClick={() => {
                        if (enable) tweetButtonData[id].clickEvent(articleInfomation);
                    }}
                >
                    <div
                        dir="ltr"
                        class={`twcss-text-explicit min-w-[0px] text-align-inherit wrap-break-word font-tw2 ${fontSizeClass(
                            "text-[14px] leading-[18px]",
                            "text-[14px] leading-[19px]",
                            "text-[15px] leading-[20px]",
                            "text-[17px] leading-[22px]",
                            "text-[18px] leading-[24px]",
                        )} font-normal items-center flex justify-start duration-200 transition-property-color whitespace-nowrap TUIC_ButtonHover2`}
                    >
                        <div class="twcss-flex inline-flex TUIC_ButtonHover">
                            <div class="twcss-flex inline-flex bottom-[0px] left-[0px] absolute right-[0px] top-[0px] bg-transparent rounded-full m-[-8px] duration-200 transition-bgcolor-shadow outline-none"></div>
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                class={`inline-block fill-current max-w-full relative select-none align-text-bottom ${
                                    articleInfomation.option.isBigArticle ? "h-[1.5em] w-[1.5em]" : "h-[1.25em] w-[1.25em]"
                                }${tweetButtonData[id].redButton ? " text-tw-red" : ""} ${backgroundColorClass("text-tw-dark-text2", "text-tw-darkblue-text2", "text-tw-light-text2")}`}
                            >
                                {tweetButtonData[id].svg()}
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ツイート下ボタンの空白調整のためのElement
export const EmptyButtonHTML = (): JSX.Element => {
    return (
        <div class="twcss-flex inline-flex overflow-hidden TUIC_UnderTweetButtonSpace">
            <span data-testid="app-text-transition-container" style={{ "transition-property": "transform", "transition-duration": "0.3s", transform: "translate3d(0px, 0px, 0px)" }}>
                <span class={`twcss-text-inherit text-align-inherit wrap-break-word font-tw ${fontSizeClass(
                    "text-[12px] leading-[14px] min-w-[calc(1em+22px)] px-[4px]",
                    "text-[12px] leading-[15px] min-w-[calc(1em+22px)] px-[4px]",
                    "text-[13px] leading-[16px] min-w-[calc(1em+24px)] px-[4px]",
                    "text-[14px] leading-[18px] min-w-[calc(1em+26px)] px-[4px]",
                    "text-[16px] leading-[19px] min-w-[calc(1em+28px)] px-[5px]",
                )}`}
                ></span>
            </span>
        </div>
    );
};
