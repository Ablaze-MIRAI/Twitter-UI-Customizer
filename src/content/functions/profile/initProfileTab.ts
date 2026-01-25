import { processElement, waitForElement } from "@content/utils/element";
import { getPref } from "@content/settings";
import { ProcessedClass } from "@shared/sharedData";

const _data = {
    selectors: {
        replies: `[href$="/with_replies"]`,
        media: `[href$="/media"]`,
        likes: `[href$="/likes"]`,
    },
};

export function profileInitialTab() {
    for (const elem of document.querySelectorAll(`[data-testid^="UserAvatar-"] a:not([href$="/photo"]):not(.${ProcessedClass})`)) {
        processElement(elem);

        const userName = elem.closest(`[data-testid^="UserAvatar-"]`).getAttribute("data-testid").replace("UserAvatar-Container-", "");
        elem.addEventListener("click", profileInitialTabRedirect(userName));
    }
    for (const elem of document.querySelectorAll(`[data-testid="tweet"] a[style*="color"]:not(.${ProcessedClass})`)) {
        processElement(elem);
        if (elem.textContent.startsWith("@")) {
            elem.addEventListener("click", profileInitialTabRedirect(elem.textContent.slice(1)));
        }
    }
    const profileButtonInSidebar = document.querySelector(`[data-testid="AppTabBar_Profile_Link"]:not(.${ProcessedClass})`);

    processElement(profileButtonInSidebar);
    profileButtonInSidebar?.addEventListener("click", profileInitialTabRedirect(profileButtonInSidebar.getAttribute("href").replace("/", "")));
}

function profileInitialTabRedirect(userName: string) {
    return () => {
        if (getPref("profileSetting.profileInitialTab") != "tweets") {
            window.setTimeout(async () => {
                await waitForElement(`a[href="/${userName}/photo"]`);
                await waitForElement(`nav [role="presentation"]`);

                for (let i = 0; i <= 25; i++) {
                    const re = await new Promise((resolve) => {
                        if (window.scrollY == 0) {
                            document.querySelector<HTMLAnchorElement>(`nav [role="presentation"] a${_data.selectors[getPref("profileSetting.profileInitialTab")]}`).click();
                            resolve(true);
                        }
                        resolve(false);
                    });
                    if (re) return true;
                    await new Promise((resolve) => {
                        window.setTimeout(() => {
                            resolve(null);
                        }, 100);
                    });
                }
            }, 100);
        }
    };
}
