import { translate } from "@content/i18n";
import { getPref } from "@content/settings";

const notificationsRegexp = /^(\([0-9]+\))[0-9() ]+([^0-9() ])/;

const titleObserver: MutationObserver = new MutationObserver(setTitleObserver);

// TODO: これだけ特別で、functions/index.ts にインポートされていない。
// イベントバスを導入 (#240)し、設定の変更イベント・<title> の変更イベントを購読することにより解決したい。
// なお放置されているのはよくないので、仮に1年以上放置されているようでしたら容赦なくリファクタリングしてください。(2026/01/25)
export function setTitleObserver() {
    const titleElement = document.querySelector("title");
    if (titleElement) {
        titleObserver.observe(titleElement, {
            characterData: true,
            childList: true,
        });
    }

    let newTitle = document.title;
    if (getPref("XToTwitter.XToTwitter")) {
        const locPath = window.location.pathname;
        if (!newTitle.endsWith("Twitter")) {
            const replaceI18NRes = (regexp: string | RegExp, i18nRes: string) => {
                const titleInfo = newTitle.match(new RegExp(regexp));
                if (!titleInfo || titleInfo.length <= 1) {
                    newTitle = newTitle.replace(/(.*)\/ X/, "$1/ Twitter");
                } else {
                    newTitle
                        = (
                            (newTitle.startsWith("(") ? newTitle.match(/\(\d*\)/) + " " : "")
                            + i18nRes
                                .replaceAll("&quot;", '"')
                                .replace("{fullName}", titleInfo[1])
                                .replace("{screenName}", titleInfo[2])
                                .replace("{tweetText}", titleInfo[2]) //locPath.includes("/status/")
                                .replace(/(.*)\/ X(」|")/, "$1 / Twitter")
                        );
                }
            };

            if (newTitle == "X") {
                newTitle = "Twitter";
            } else if (locPath.includes("/i/timeline") || locPath.includes("/compose/tweet")) {
                newTitle = (newTitle.startsWith("(") ? newTitle.match(/\(\d*\)/) + " " : "") + translate("XtoTwitter-PostToTweet-tweetNotificationsTitle") + " / Twitter";
            } else if (locPath.endsWith("/with_replies") && !locPath.includes("/status/")) {
                const postsWithRepliesLatest = translate("XtoTwitter-PostToTweet-profile-postsWithReplies-latest");
                const postsWithRepliesOld = translate("XtoTwitter-PostToTweet-profile-postsWithReplies-old");

                const regexp = postsWithRepliesLatest.replaceAll("&quot;", '"').replaceAll("(", "\\(").replaceAll(")", "\\)").replace("{fullName}", "(.*)").replace("{screenName}", "(.*)");

                replaceI18NRes(regexp, postsWithRepliesOld);
            } else if (locPath.endsWith("/media") && !locPath.includes("/status/")) {
                const mediaLatest = translate("XtoTwitter-PostToTweet-profile-media-latest");
                const mediaOld = translate("XtoTwitter-PostToTweet-profile-media-old");

                /* /Xユーザーの(.*)さん: 「(.*)」/ */
                const regexp = new RegExp(mediaLatest.replaceAll("&quot;", '"').replaceAll("(", "\\(").replaceAll(")", "\\)").replace("{fullName}", "(.*)").replace("{screenName}", "(.*)"));

                replaceI18NRes(regexp, mediaOld);
            } else if (locPath.endsWith("/likes") && !locPath.includes("/status/")) {
                const likesLatest = translate("XtoTwitter-PostToTweet-profile-likes-latest");
                const likesOld = translate("XtoTwitter-PostToTweet-profile-likes-old");

                const regexp = new RegExp(likesLatest.replaceAll("&quot;", '"').replaceAll("(", "\\(").replaceAll(")", "\\)").replace("{fullName}", "(.*)").replace("{screenName}", "(.*)"));

                replaceI18NRes(regexp, likesOld);
            } else if (locPath.includes("/status/")) {
                const titlePeopleTweetedUser = translate("XtoTwitter-PostToTweet-titlePeopleTweetedUser");
                const titlePeopleTweeted = translate("XtoTwitter-PostToTweet-titlePeopleTweeted");

                const regexp = new RegExp(titlePeopleTweetedUser.replaceAll("&quot;", '"').replace("{fullName}", "(.*)").replace("{tweetText}", "(.*)"));

                replaceI18NRes(regexp, titlePeopleTweeted);
            } else if (newTitle.endsWith(" / X")) {
                newTitle = newTitle.replace(/(.*)\/ X/, "$1/ Twitter");
            }
        }
        if (notificationsRegexp.test(newTitle)) {
            newTitle = newTitle.replace(notificationsRegexp, "$1 $2");
        }
    } /* else if (document.title.endsWith(" / Twitter")) {
        document.title = document.title.replace(" / Twitter", " / X");
    }*/

    if (newTitle !== document.title) {
        document.title = newTitle;
    }
}
