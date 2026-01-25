import { getPref } from "@content/settings";
import { translate } from "@content/i18n";
import { hasClosestSelector } from "@content/utils/element";

let tweetCount = -1;

// NOTE: まだ置き換えられていない要素を取得し、置き換え済みクラスを追加する関数
function getNotReplacedElements(selector: string): NodeListOf<Element>;
function getNotReplacedElements(selector: string, base: ParentNode): NodeListOf<Element>;
function getNotReplacedElements(selector: string, base?: ParentNode) {
    if (base === undefined) base = document;
    const replaceMarkClass = "TUIC_TWEETREPLACE";

    // NOTE: セレクタで選択された要素の中から、すでに置き換え済みの要素を除外
    const elements = base.querySelectorAll(`${selector}:not(.${replaceMarkClass})`);

    // NOTE: 要素に置き換え済みクラスを追加
    (async () => {
        for (const e of elements) {
            e.classList.add(replaceMarkClass);
        }
    })();

    return elements;
}

export function replacePost() {
    if (getPref("XToTwitter.PostToTweet")) {
        const isTweetPage = location.pathname.includes("/status/");
        const isEngagementsPage = document.querySelector(`[role="tab"]`) && location.pathname.includes("/status/") && (location.pathname.endsWith("/quotes") || location.pathname.endsWith("/retweets") || location.pathname.endsWith("/likes"));
        const isRetweetPage = location.pathname.endsWith("/retweets");
        const isLikesPage = location.pathname.endsWith("/likes");
        const isHistoryPage = location.pathname.endsWith("/history");
        const isQuotesPage = location.pathname.endsWith("/retweets/with_comments") || location.pathname.endsWith("/quotes");
        const isAnalyticsPage = location.pathname.endsWith("/analytics");
        const isNotifications = location.pathname.endsWith("/notifications");
        const isNotificationsTimeline = location.pathname.endsWith("/i/timeline");
        const isUserPage = !!document.querySelector('[data-testid="primaryColumn"] [data-testid="UserName"]');
        const isUnsentPage = location.pathname.includes("/unsent/");
        const isTweetingPage = location.pathname.includes("/compose/tweet");
        const isFollowersList = location.pathname.endsWith("/followers");

        const isHoveringMiniSidenavTweetButton = !!document.querySelector('.r-1vtznih[data-testid="SideNav_NewTweet_Button"]');
        const isHoveringRetweetButton = !!document.querySelector('[role="button"][data-testid="retweet"] > div > div > div.r-15azkrj');
        const isHoveringUnretweetButton = !!document.querySelector('[role="button"][data-testid="unretweet"] > div > div > div.r-15azkrj');

        const localizeElemText = async (selector: string, i18nRes: string) => {
            for (const elem of getNotReplacedElements(selector)) elem.textContent = i18nRes;
        };

        if (isTweetPage) {
            // ツイート画面の「n件のリツイート」のテキスト
            localizeElemText('a[href$="/retweets"] > div+span > span', translate("XtoTwitter-PostToTweet-retweetCount"));
            // ツイート画面の「n件の引用ツイート」のテキスト
            localizeElemText('a[href$="/retweets/with_comments"] > div+span > span', translate("XtoTwitter-PostToTweet-quoteCount"));

            // ツイート画面のツイートアナリティクスの表示ボタン
            localizeElemText('[data-testid="analyticsButton"] span', translate("XtoTwitter-PostToTweet-tweetAnalytics"));

            // ツイート画面の翻訳の表示ボタン
            localizeElemText('[data-testid="tweetText"] + [role="button"]:not([data-testid="tweet-text-show-more-link"]) > span', translate("XtoTwitter-PostToTweet-translateTweet"));

            // ツイート画面のGrokによる翻訳の表示ボタン
            const tweetText = document.querySelector('[data-testid="tweetText"]');
            if (tweetText) {
                for (const elem of getNotReplacedElements(
                    ':scope > :not([data-testid="tweetText"]) > [role="button"]:not([data-testid="tweet-text-show-more-link"]) > span > span > span',
                    tweetText.parentElement,
                )) {
                    elem.textContent = translate("XtoTwitter-PostToTweet-translateTweet");
                }
            }

            // ツイートを追加
            localizeElemText('[data-testid="cellInnerDiv"] a[href="/compose/tweet"] [role="presentation"] > div > span > span', translate("XtoTwitter-PostToTweet-addTweet"));

            if (isAnalyticsPage) {
                // ツイートアナリティクスのダイアログヘッダー
                localizeElemText('[role="dialog"] [data-viewportview="true"] h2#modal-header > span', translate("XtoTwitter-PostToTweet-tweetAnalyticsHeader"));
            }

            if (isHistoryPage) {
                // ツイートのバージョンの「最新のポスト」
                // i18nが存在するんで一旦保留
                //localizeElemText('[role="dialog"] [data-viewportview="true"] h2#modal-header > span'), translate("XtoTwitter-PostToTweet-tweetAnalyticsHeader");
            }
        } else if (isUserPage) {
            // ユーザーの「n件のツイート」
            for (const elem of getNotReplacedElements('[data-testid="primaryColumn"] h2[role="heading"] + div')) elem.textContent = elem.textContent.split(" ")[0] + " " + translate("XtoTwitter-PostToTweet-tweetCount");

            // TLのリスト選択バー・ユーザープロフィールのツイート／返信／メディア等のリスト（ここでは後者のみ）
            localizeElemText('[data-testid="primaryColumn"] [data-testid="ScrollSnap-SwipeableList"] > [data-testid="ScrollSnap-List"] > div:first-child span', translate("XtoTwitter-PostToTweet-tweet"));
        } else if (isNotifications) {
            // 通知の「ポスト」を修正 「リツイート」以外は適したi18nが見つからないので無理だった
            /**/
            for (const elem of getNotReplacedElements(`[data-testid="cellInnerDiv"] article > div span > span:not(a *)`)) {
                if (elem.textContent.includes(translate("XtoTwitter-PostToTweet-notificationsRepost").toLowerCase())) {
                    elem.textContent = elem.textContent.replace(translate("XtoTwitter-PostToTweet-notificationsRepost").toLowerCase(), translate("XtoTwitter-PostToTweet-notificationsRetweet").toLowerCase());
                }
            } /**/
        }

        // トレンドの「n件のツイート」
        for (const elem of getNotReplacedElements(`[data-testid="trend"] > div > div:nth-of-type(3) > span`)) elem.textContent = elem.textContent.replace(translate("XtoTwitter-PostToTweet-postCount"), translate("XtoTwitter-PostToTweet-tweetCount"));

        // 予約ツイート関連
        if (isUnsentPage) {
            // タブの未送信ポスト
            // 作成したツイートを～
            localizeElemText(`[role="dialog"] [data-testid="empty_state_body_text"]`, translate("XtoTwitter-PostToTweet-unsentPageTitle"));

            //未送信ツイートのタブ
            localizeElemText(`[href="/compose/tweet/unsent/drafts"][role="tab"] > div > div > span`, translate("XtoTwitter-PostToTweet-unsentPageTab1"));
        }

        // 共有 > リンクをコピー
        for (const elem of getNotReplacedElements(
            '[role="menu"] [data-testid="Dropdown"] [d="M18.36 5.64c-1.95-1.96-5.11-1.96-7.07 0L9.88 7.05 8.46 5.64l1.42-1.42c2.73-2.73 7.16-2.73 9.9 0 2.73 2.74 2.73 7.17 0 9.9l-1.42 1.42-1.41-1.42 1.41-1.41c1.96-1.96 1.96-5.12 0-7.07zm-2.12 3.53l-7.07 7.07-1.41-1.41 7.07-7.07 1.41 1.41zm-12.02.71l1.42-1.42 1.41 1.42-1.41 1.41c-1.96 1.96-1.96 5.12 0 7.07 1.95 1.96 5.11 1.96 7.07 0l1.41-1.41 1.42 1.41-1.42 1.42c-2.73 2.73-7.16 2.73-9.9 0-2.73-2.74-2.73-7.17 0-9.9z"]',
        ))
            elem.closest(`[role="menuitem"]`).querySelector("span").textContent = translate("XtoTwitter-PostToTweet-shareMenu-copyURL");

        // 共有 > その他の方法
        if (!isFollowersList) {
            for (const elem of getNotReplacedElements(
                '[role="menu"] [data-testid="Dropdown"] [d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"]',
            ))
                elem.closest(`[role="menuitem"]`).querySelector("span").textContent = translate("XtoTwitter-PostToTweet-shareMenu-copyOtherWay");
        }

        // ツイート入力ダイアログ
        const isDialog = !!document.querySelector('[role="alertdialog"],[role="dialog"],[data-testid="twc-cc-mask"]+div');
        const isReply = !!document.querySelector('[role="dialog"] [data-testid="tweet"]');
        const isMultipleTweet = !isReply && document.querySelectorAll(':is([role="dialog"],[data-testid="twc-cc-mask"]+div) [data-testid^="UserAvatar-Container-"]:not([data-testid="attachments"] *)').length !== 1;
        const writingTweetCount = document.querySelectorAll(':is([role="dialog"],[data-testid="twc-cc-mask"]+div) [data-testid^="UserAvatar-Container-"]:not([data-testid="attachments"] *)').length;
        if (writingTweetCount != tweetCount) {
            for (const elem of document.querySelectorAll(`${!document.querySelector(`[data-testid="twc-cc-mask"]`) ? `:is([role="dialog"])` : ""} :is([data-testid="tweetButton"], [data-testid="tweetButtonInline"]) > div > span > span.TUIC_TWEETREPLACE`)) {
                elem.classList.remove("TUIC_TWEETREPLACE");
            }
        }
        tweetCount = writingTweetCount;
        // ツイートボタン
        for (const elem of getNotReplacedElements(':is([data-testid="tweetButton"], [data-testid="tweetButtonInline"]) :not(:has(*))')) {
            if (isDialog && isMultipleTweet) {
                // ダイアログで複数ツイートする場合
                elem.textContent = translate("XtoTwitter-PostToTweet-tweetAllButton");
            } else if (isDialog && !isReply) {
                // ダイアログでツイートする場合
                elem.textContent = translate("XtoTwitter-PostToTweet-tweetButton");
            } else if (!isDialog && !isTweetPage) {
                // TL上部のツイートダイアログの場合
                elem.textContent = translate("XtoTwitter-PostToTweet-tweetButton");
            } else if (elem.textContent == translate("XtoTwitter-PostToTweet-tweetButton-latest")) {
                elem.textContent = translate("XtoTwitter-PostToTweet-tweetButton");
            } else if (elem.textContent == translate("XtoTwitter-PostToTweet-tweetAllButton-latest")) {
                // ダイアログで複数ツイートする場合
                elem.textContent = translate("XtoTwitter-PostToTweet-tweetAllButton");
            }
            // NOTE: kaonasi_biwa さんと連絡を取り合い、返信ボタンは現時点では改変しないことになりました: https://twitter.com/fami_kotone/status/1692551624714231961
        }

        // ツイート画面の「返信をツイートする」のプレースホルダーテキスト
        for (const elem of getNotReplacedElements(".public-DraftEditorPlaceholder-inner")) {
            if (elem.textContent == translate("XtoTwitter-PostToTweet-placeholder-reply-latest")) {
                elem.textContent = translate("XtoTwitter-PostToTweet-placeholder-reply");
            } else if (elem.textContent == translate("XtoTwitter-PostToTweet-placeholder-addTweet-latest")) {
                elem.textContent = translate("XtoTwitter-PostToTweet-placeholder-addTweet-old");
            }
        }
        // ツイート下書き保存確認ダイアログのヘッダー
        if (isDialog) {
            for (const elem of getNotReplacedElements(`[role="alertdialog"] [data-testid="confirmationSheetDialog"] > h1 > span`)) {
                if (isTweetingPage) {
                    elem.textContent = translate("XtoTwitter-PostToTweet-tweetSaveConfirm");
                }
            }

            const blockText = new RegExp(translate("XtoTwitter-PostToTweet-block-dialogBody-latest").replaceAll("&quot;", '"').replaceAll("(", "\\(").replaceAll(")", "\\)").replace("{screenName}", "(.*)"));
            for (const elem of getNotReplacedElements(`[role="alertdialog"] [data-testid="confirmationSheetDialog"] > h1+div > span`)) {
                if (elem.textContent != " ") {
                    const blockTextMatch = elem.textContent.match(blockText);
                    if (blockTextMatch && blockTextMatch.length > 1) {
                        elem.textContent = translate("XtoTwitter-PostToTweet-block-dialogBody-old").replaceAll("{screenName}", blockTextMatch[1]);
                    } else if (isUnsentPage) {
                        elem.textContent = translate("XtoTwitter-PostToTweet-unsentTweetDeleteConfirmSpan");
                        elem.closest(`[data-testid="confirmationSheetDialog"]`).querySelector("h1 > span").textContent = translate("XtoTwitter-PostToTweet-unsentTweetDeleteConfirmTitle");
                    } else if (elem.textContent == translate("XtoTwitter-PostToTweet-deleteTweet-dialogBody-latest")) {
                        elem.textContent = translate("XtoTwitter-PostToTweet-deleteTweet-dialogBody-old");
                        elem.closest(`[data-testid="confirmationSheetDialog"]`).querySelector("h1 > span").textContent = translate("XtoTwitter-PostToTweet-deleteTweet-dialogTitle");
                    } else if (elem.textContent == translate("XtoTwitter-PostToTweet-retweet-dialogBody-latest")) {
                        elem.textContent = translate("XtoTwitter-PostToTweet-retweet-dialogBody-old");
                        elem.closest(`[data-testid="confirmationSheetDialog"]`).querySelector("h1 > span").textContent = translate("XtoTwitter-PostToTweet-retweet-dialogTitle");
                        elem.closest(`[data-testid="confirmationSheetDialog"]`).querySelector(`[data-testid="confirmationSheetConfirm"] > div > span > span`).textContent = translate("XtoTwitter-PostToTweet-retweet-dialogConfirm");
                    }
                }
            }
        }

        // リツイート確認ポップアップの「リツイート」ボタン
        localizeElemText('[role="menuitem"][data-testid="retweetConfirm"] span', translate("XtoTwitter-PostToTweet-retweet"));
        // リツイート確認ポップアップの「リツイート」ボタン
        localizeElemText('[role="menuitem"][data-testid="unretweetConfirm"] span', translate("XtoTwitter-PostToTweet-unretweet"));
        // リツイート確認ポップアップの「引用ツイート」ボタン
        localizeElemText('[role="menuitem"][href="/compose/tweet"] span', translate("XtoTwitter-PostToTweet-quote"));

        // ツイートその他ポップアップの「このツイートに興味がない」ボタン
        // for (const elem of getNotReplacedElements('path[d="M9.5 7c.828 0 1.5 1.119 1.5 2.5S10.328 12 9.5 12 8 10.881 8 9.5 8.672 7 9.5 7zm5 0c.828 0 1.5 1.119 1.5 2.5s-.672 2.5-1.5 2.5S13 10.881 13 9.5 13.672 7 14.5 7zM12 22.25C6.348 22.25 1.75 17.652 1.75 12S6.348 1.75 12 1.75 22.25 6.348 22.25 12 17.652 22.25 12 22.25zm0-18.5c-4.549 0-8.25 3.701-8.25 8.25s3.701 8.25 8.25 8.25 8.25-3.701 8.25-8.25S16.549 3.75 12 3.75zM8.947 17.322l-1.896-.638C7.101 16.534 8.322 13 12 13s4.898 3.533 4.949 3.684l-1.897.633c-.031-.09-.828-2.316-3.051-2.316s-3.021 2.227-3.053 2.322z"]'))
        //     elem.closest(`[role="menuitem"]`)querySelector("span").textContent = translate("XtoTwitter-PostToTweet-quote");
        // ツイートその他ポップアップの「ツイートを埋め込み」ボタン
        for (const elem of getNotReplacedElements('path[d="M15.24 4.31l-4.55 15.93-1.93-.55 4.55-15.93 1.93.55zm-8.33 3.6L3.33 12l3.58 4.09-1.5 1.32L.67 12l4.74-5.41 1.5 1.32zm11.68-1.32L23.33 12l-4.74 5.41-1.5-1.32L20.67 12l-3.58-4.09 1.5-1.32z"]')) {
            const replaceElement = elem?.closest(`[role="menuitem"]`)?.querySelector("span");
            if (replaceElement?.textContent) {
                replaceElement.textContent = translate("XtoTwitter-PostToTweet-menu-embed");
            }
        }
        // ツイートその他ポップアップの「ツイートを報告」ボタン
        if (!isFollowersList) {
            for (const elem of getNotReplacedElements('path[d="M3 2h18.61l-3.5 7 3.5 7H5v6H3V2zm2 12h13.38l-2.5-5 2.5-5H5v10z"]')) {
                const changeElem = elem?.parentElement?.parentElement?.parentElement?.parentElement?.querySelector("span");
                if (changeElem) {
                    changeElem.textContent = translate("XtoTwitter-PostToTweet-reportTweet");
                }
            }
        }

        // ツイートその他ポップアップの「ツイートアナリティクスの表示」ボタン
        localizeElemText('[role="menu"] a[role="menuitem"][href$="/analytics"] span', translate("XtoTwitter-PostToTweet-tweetAnalytics"));

        // サイドバーのツイートボタン
        localizeElemText('[data-testid="SideNav_NewTweet_Button"]:not(:has(svg)) :not(:has(*))', translate("XtoTwitter-PostToTweet-tweetButton"));

        //右サイドバーのスペースのやつ
        for (const elem of getNotReplacedElements(`[data-testid="sidebarColumn"] [data-testid="pill-contents-container"]`)) hasClosestSelector(elem, "h2 span").textContent = translate("XtoTwitter-PostToTweet-rightSidebar-spaceTitle");

        // 「新しいツイートを表示」ポップアップ
        localizeElemText('[data-testid="pillLabel"] > span > span > span', translate("XtoTwitter-PostToTweet-tweeted"));

        // 「変身できるユーザーを変更」ダイアログの説明文
        localizeElemText("#conversation-controls-details > span", translate("XtoTwitter-PostToTweet-replyRangeDetail"));

        // TLの「n件のツイートを表示」
        for (const elem of getNotReplacedElements(`[data-testid="cellInnerDiv"] > div > [role="button"] > div > div > span`)) {
            let n = 0;
            elem.textContent = translate("XtoTwitter-PostToTweet-tlShowMoreTweet").replaceAll("{count}", (match) => {
                return n++ == 0 ? elem.textContent.match(/(\d+)/)[0] : "";
            });
        }

        // プライマリカラム（中央に表示される画面）のヘッダー
        for (const elem of getNotReplacedElements('[data-testid="primaryColumn"] h2[role="heading"] > span')) {
            if (isEngagementsPage) {
                elem.textContent = translate("XtoTwitter-PostToTweet-engagementsTitle");
            } else if (isQuotesPage) {
                elem.textContent = translate("XtoTwitter-PostToTweet-quoteTitle");
            } else if (isTweetPage) {
                elem.textContent = translate("XtoTwitter-PostToTweet-tweetTitle");
            } else if (isNotificationsTimeline) {
                elem.textContent = translate("XtoTwitter-PostToTweet-tweetNotificationsTitle");
            }
        }

        // RT一覧とかのダイアログのタイトル
        for (const elem of getNotReplacedElements('[role="dialog"] h2[role="heading"] > span')) {
            if (isRetweetPage) {
                elem.textContent = translate("XtoTwitter-PostToTweet-retweetedUsersPageTitle");
            }
        }

        // 誰にも反応（いいね/RT/引用）されていない状況においての、一覧ページの「まだ○○はありません」
        for (const elem of getNotReplacedElements('[data-testid="emptyState"] [data-testid="empty_state_header_text"]')) {
            if (isQuotesPage) {
                elem.textContent = translate("XtoTwitter-PostToTweet-quoteTweeted-none-header");
            } else if (isRetweetPage) {
                elem.textContent = translate("XtoTwitter-PostToTweet-retweeted-none-header");
            } else if (isLikesPage) {
                elem.textContent = translate("XtoTwitter-PostToTweet-liked-none-header");
            }
        }
        // 誰にも反応（いいね/RT/引用）されていない状況においての、一覧ページの「まだ○○はありません」
        const blockTextEmptyProfile = new RegExp(translate("XtoTwitter-PostToTweet-blocked-none-body-latest").replaceAll("&quot;", '"').replaceAll("(", "\\(").replaceAll(")", "\\)").replace("{screenName}", "(.*)"));
        for (const elem of getNotReplacedElements('[data-testid="emptyState"] [data-testid="empty_state_body_text"]')) {
            const blockTextMatch = elem.textContent.match(blockTextEmptyProfile);
            if (isQuotesPage) {
                elem.textContent = translate("XtoTwitter-PostToTweet-quoteTweeted-none-body");
            } else if (isRetweetPage) {
                elem.textContent = translate("XtoTwitter-PostToTweet-retweeted-none-body");
            } else if (isLikesPage) {
                elem.textContent = translate("XtoTwitter-PostToTweet-liked-none-body");
            } else if (blockTextMatch && blockTextMatch.length > 1) {
                elem.childNodes[0].textContent = translate("XtoTwitter-PostToTweet-blocked-none-body-old").replaceAll("{screenName}", blockTextMatch[1]);
                elem.parentElement.querySelector(`[data-testid="empty_state_button_text"] > div > span > span`).textContent = translate("XtoTwitter-PostToTweet-blocked-none-button");
            }
        }

        // エンゲージメントの引用ツイートのタブ
        if (isQuotesPage) {
            for (const elem of getNotReplacedElements(`[role="tab"][href$="/quotes"] > div > div > span`)) {
                elem.textContent = translate("XtoTwitter-PostToTweet-quoteTitle");
            }
        }

        // エンゲージメントリツイートのタブ
        if (isQuotesPage) {
            for (const elem of getNotReplacedElements(`[role="tab"][href$="/retweets"] > div > div > span`)) {
                elem.textContent = translate("XtoTwitter-PostToTweet-engagements-retweetTitle");
            }
        }

        // 下に出てくるトーストボックス
        for (const elem of getNotReplacedElements(`#layers div[data-testid="toast"] > div > span`)) {
            if (elem.textContent.includes(translate("XtoTwitter-PostToTweet-tweeted-one-latest-layer"))) {
                elem.textContent = translate("XtoTwitter-PostToTweet-tweeted-one-old-layer");
            } else if (elem.textContent.includes(translate("XtoTwitter-PostToTweet-tweeted-some-latest-layer"))) {
                elem.textContent = translate("XtoTwitter-PostToTweet-tweeted-some-old-layer");
            //} else if (elem.textContent.includes(translate("XtoTwitter-PostToTweet-addBookmark-latest-layer"))) {
            //    elem.textContent = translate("XtoTwitter-PostToTweet-addBookmark-old-layer");
            //} else if (elem.textContent.includes(translate("XtoTwitter-PostToTweet-deleteBookmark-latest-layer"))) {
            //    elem.textContent = translate("XtoTwitter-PostToTweet-deleteBookmark-old-layer");
            } else if (elem.textContent.includes(translate("XtoTwitter-PostToTweet-deleteUnsentTweet-latest-layer"))) {
                elem.textContent = translate("XtoTwitter-PostToTweet-deleteUnsentTweet-old-layer");
            }
        }

        // 検索バーのテキストボックス
        for (const elem of getNotReplacedElements('[role="search"] input')) elem.setAttribute("placeholder", translate("XtoTwitter-PostToTweet-keywordSearch"));

        // サイドナビゲーションが小さい時のツイートボタンをホバー中のツールチップ
        if (isHoveringMiniSidenavTweetButton) for (const elem of getNotReplacedElements('[role="tooltip"] > [data-testid="HoverLabel"] > span')) elem.textContent = translate("XtoTwitter-PostToTweet-tweetButton");
        // リツイートボタンをホバー中のツールチップ
        else if (isHoveringRetweetButton) for (const elem of getNotReplacedElements('[role="tooltip"] > [data-testid="HoverLabel"] > span')) elem.textContent = translate("XtoTwitter-PostToTweet-retweet");
        // リツイート解除ボタンをホバー中のツールチップ
        else if (isHoveringUnretweetButton) for (const elem of getNotReplacedElements('[role="tooltip"] > [data-testid="HoverLabel"] > span')) elem.textContent = translate("XtoTwitter-PostToTweet-unretweet");

        // 固定ツイートの「固定」表示
        for (const elem of getNotReplacedElements('[data-testid="tweet"] path[d="M7 4.5C7 3.12 8.12 2 9.5 2h5C15.88 2 17 3.12 17 4.5v5.26L20.12 16H13v5l-1 2-1-2v-5H3.88L7 9.76V4.5z"]'))
            hasClosestSelector(elem, `[data-testid="socialContext"]`).textContent = translate("XtoTwitter-PostToTweet-pinnedTweet");

        // 「{user}さんがリツイートしました」もしくは「リツイート済み」
        for (const elem of getNotReplacedElements(
            '[data-testid="tweet"] path[d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 15.62V8.25c0-.97-.784-1.75-1.75-1.75z"]',
        )) {
            const container = hasClosestSelector(elem, `[data-testid="socialContext"]`);

            // NOTE: リツイートのSVGで取得しているが、これだとリツイートボタンも引っかかってしまうため、コンテナが検出できない場合スキップ
            if (!container) continue;

            // NOTE: テキストノードを取得
            const personRetweetedText = Array.from(container.childNodes)
                .filter((e) => e.nodeType === Node.TEXT_NODE)
                .at(-1);
            if (personRetweetedText) {
                if (container.querySelector("span")) {
                    // 「{user}さんがリツイートしました」のユーザー名の後の部分
                    personRetweetedText.textContent = translate("XtoTwitter-PostToTweet-isRetweeted");
                } else {
                    // 「リツイート済み」
                    personRetweetedText.textContent = translate("XtoTwitter-PostToTweet-retweeted");
                }
            }
        }

        // TODO: ポスト系には関係ないが、おすすめクリエイターを削除したい。固有プロパティが見つからないので、[data-testid$="-subscribe"]が含まれる[data-testid="cellInnerDiv"]を削除し、その塊の一つ前のやつを消せばよさそう（難しそう）

        // TODO: aria-label が設定されているものは変更したほうがいいかもしれない
    }
}
