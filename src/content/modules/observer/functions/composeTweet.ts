import { TUICI18N } from "@content/modules/i18n";
import { getPref } from "@content/modules/pref";
import { processElement, waitForElement } from "@content/modules/utils/controlElements";
import { placeToastMessage } from "@content/modules/utils/toastMessage";
import { ProcessedClass } from "@shared/sharedData";

export function composetweet() {
    if (location.pathname === "/compose/post" && document.querySelector(`[data-testid="tweetButton"]:not(.${ProcessedClass})`)) {
        const composeTweetButton = document.querySelector<HTMLButtonElement>(`[data-testid="tweetButton"]`);
        composeTweetButton.addEventListener("click", async () => {
            if (composeTweetButton.disabled) return;
            if(getPref("composetweet.remainOpened")){
                await waitForElement(`[data-testid="toast"]`);
                window.setTimeout(() => document.querySelector<HTMLButtonElement>(`[data-testid="SideNav_NewTweet_Button"]`)?.click(), 500);
            }
            if(getPref("composetweet.copyHashtag")){
                const hashs = []
                for(const sentence of document.querySelectorAll(`[data-testid="tweetTextarea_0"] span[data-text="true"]`)){
                    if (sentence?.textContent && (sentence.textContent.startsWith("#") || sentence.textContent.startsWith("$"))) hashs.push(sentence.textContent)
                }
                if(hashs.length > 0){
                    navigator.clipboard.writeText(hashs.join(" "));
                    placeToastMessage(TUICI18N.get("bottomTweetButtons-urlCopy-layer"));
                }
            }
        });
        processElement(composeTweetButton);
    }
}
