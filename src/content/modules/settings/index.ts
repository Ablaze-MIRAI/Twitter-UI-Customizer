import { waitForElement } from "@modules/utils/controlElements";
import { createApp } from "vue";
import SettingsMain from "@shared/settings/SettingMain.ce.vue";
import { createPinia } from "pinia";
import { isSafemode } from "./safemode";

let DisplaySettingObserver: MutationObserver = null;

/** 設定オブザーバーを開始します。 */
export function runSettingComponentObserver() {
    if (DisplaySettingObserver) DisplaySettingObserver.disconnect();
    else DisplaySettingObserver = new MutationObserver(runSettingComponentObserver);

    placeSettingPage();

    DisplaySettingObserver.observe(document.body, {
        childList: true,
        subtree: true,
    });
}

/**
 * 指定された要素に設定コンポーネントを配置します。
 * @param rootElement 設定コンポーネントを配置する親要素
 */
function placeSettingComponent(rootElement: HTMLElement) {
    // NOTE: すでに SettingsMain.ce.vue が配置されている場合は何もしない
    if (document.querySelector("#TUICSettings")) return;

    // NOTE: SettingsMain.ce.vue 内で定義されたスタイルを適用する
    if (SettingsMain.styles !== undefined) {
        const style = document.createElement("style");
        style.textContent = SettingsMain.styles;
        document.head.appendChild(style);
    }

    if (document.querySelector("#TUICSettingsContainer") === null) {
        const div = document.createElement("div");
        div.id = "TUICSettingsContainer";
        rootElement.appendChild(div);
    }
    const app = createApp(SettingsMain);
    app.use(createPinia());
    app.mount("#TUICSettingsContainer");
}

function placeSettingPage() {
    if (isSafemode) return;

    // NOTE: 右サイドバーの表示設定から開いたダイアログがある場合、そこに設定コンポーネントを配置する
    if (document.querySelector("#TUICOriginalDisplaySetting")) {
        placeSettingComponent(document.querySelector("#TUICOriginalDisplaySetting"));
        return;
    }
    switch (window.location.pathname) {
        case "/settings/display": {
            waitForElement(`main div[role="slider"]`).then((elems) => {
                const _large = elems[0].closest<HTMLElement>(`section[aria-labelledby="detail-header"] > div.r-qocrb3`);
                const _small = elems[0].closest<HTMLElement>(`main > div > div > div > div`);
                //console.warn(`_large : ${_large}\n_small : ${_small}`);
                placeSettingComponent(_large ? _large : _small);
            });
            rewriteTweet();
            break;
        }
        case "/i/display": {
            //* /settings/displayでダイアログ（/i/display）を開けると、ダイアログ側にTUICの設定が表示されない。

            waitForElement(`div[role="slider"]`).then((elems) => {
                const _dialog = elems[0].closest<HTMLElement>(`div[aria-labelledby="modal-header"] > div > div > div > div:nth-child(2)`);
                const _fullscreen = elems[0].closest<HTMLElement>(`main > div > div > div > div`);
                //console.warn(`_large : ${_large}\n_small : ${_small}`);
                placeSettingComponent(_dialog ? _dialog : _fullscreen);
            });
            rewriteTweet();
        }
    }
}

function rewriteTweet() {
    if (document.querySelector(`article[data-testid="tweet"][data-tuic-processed="true"]`) == null && document.querySelector('[role="slider"]:not(article *)') != null) {
        const displayRootElement = document.querySelector('[role="slider"]:not(article *)').closest<HTMLElement>(`:is([data-viewportview="true"],[aria-labelledby="detail-header"],main>div>div>div>div)`).querySelector<HTMLElement>(`:scope > div+div`);
        // displayRootElementについてるモーダル全体に適用された余白を削除
        // すべてに余白がついていると端まで線を伸ばしたいときに不都合
        displayRootElement.style.padding = "0";

        if (window.location.pathname != "/settings/display") {
            displayRootElement.querySelectorAll(":scope > div:not(#TUICOptionEntry)").forEach((e) => {
                (e as HTMLElement).style.marginLeft = "32px";
                (e as HTMLElement).style.marginRight = "32px";
            });
        }

        (async () => {
            const tweetElement = displayRootElement.querySelector<HTMLElement>(`article[data-testid="tweet"]`);
            const tweetTextElement = tweetElement.querySelector(`[data-testid="tweetText"] > span`);
            const tweetLinkElement = tweetElement.querySelector(`[data-testid="tweetText"] > div`);

            tweetElement.dataset.tuicProcessed = "true";

            const tweet = ((a) => a[Math.floor(Math.random() * a.length)])([
                {
                    user: {
                        id: "tuic_official",
                        name: "【公式】UI Customizer by Ablaze",
                        icon: "https://pbs.twimg.com/profile_images/1711757756464828416/sAXJyO-y_400x400.jpg",
                    },
                    text: "Twitter UI Customizer は、 {mention} を筆頭に、多数の開発者によってオープンソースソフトウェアとして開発されています。",
                    mentionTo: "kaonasi_biwa",
                },
            ]);

            const tweetUserId = tweet.user.id;
            const tweetUserName = tweet.user.name;
            const tweetUserIcon = tweet.user.icon;
            const tweetText = tweet.text;
            const tweetMentionUserId = tweet.mentionTo;

            // ツイートのテキストとして使用する、最初のspan要素以外を削除
            tweetElement.querySelectorAll(`[data-testid="tweetText"] span:not(:first-child)`).forEach((e) => e.remove());
            // メンションを任意の場所に持っていけるよう削除
            tweetLinkElement?.remove();

            // img要素がそもそも存在しない場合があるので、待機
            await waitForElement("img", tweetElement);

            // ユーザーアイコン
            tweetElement.querySelector("img").parentElement.querySelector("div").style.backgroundImage = `url(${tweetUserIcon})`;
            tweetElement.querySelector("img").src = tweetUserIcon;
            // ユーザー名・ユーザーID
            tweetElement.querySelector(`[data-testid="User-Name"] > div:nth-child(1) span > span`).textContent = tweetUserName;
            tweetElement.querySelector(`[data-testid="User-Name"] > div:nth-child(2) span`).textContent = "@" + tweetUserId;
            // メンションのユーザー
            if (tweetLinkElement) {
                tweetLinkElement.querySelector("a").href = "/" + tweetMentionUserId;
                tweetLinkElement.querySelector("a").textContent = "@" + tweetMentionUserId;

                // テキストに設定
                tweetTextElement.innerHTML = tweetText.replace("{mention}", tweetLinkElement.outerHTML);
            }
        })();
    }
}
