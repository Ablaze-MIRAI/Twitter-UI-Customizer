import { hideElement } from "@content/utils/element";
import { getPref } from "@content/settings";
import { getAbsolutelyTime, isRelativeTime } from "@content/utils/datetime";

// URLなどによる条件分岐が必要だが、一つのファイルとして分離するほどではないものがここには集まっています。
// NOTE: 条件分岐とClass付与を一行にまとめる場合は、.? をつけるのを忘れないようにしましょう
export function hideElements() {
    /*document.querySelectorAll<HTMLElement>('a[href$="quick_promote_web/intro"]').forEach((e) => {
        if (getPref("tweetDisplaySetting.invisible.twitter-pro-promotion-btn")) {
            hideElement(e);
        } else {
            showElement(e);
        }
    });*/

    profile();
    osusumeUser();

    if (getPref("timeline.accountStart") && !location.search.includes("f=user") && !location.href.includes("/settings/") && document.querySelector(`[href="/settings/profile"]`)) {
        const cells = document.querySelectorAll<HTMLElement>(`div[data-testid="cellInnerDiv"]:not([data-tuic-processed-article]):not([aria-labelledby="modal-header"] *):not([data-testid="primaryColumn"] > div > section *):not([data-testid="DMDrawer"] *):not([aria-live="polite"]+div *):has([aria-live="polite"])`);
        for (const elem of cells) {
            hideElement(elem);
            hideElement(elem.previousElementSibling as HTMLElement);
        }
    }

    if (getPref("tweetDisplaySetting.invisible.subscribe-tweets") && window.location.pathname.includes("/status/") && /^\d+$/.test(new URL(location.href).pathname.split("/")[3])) {
        hideElement(document.querySelector(`*:not([data-tuic-hide="true"]) > [data-testid$="-subscribe"]`)?.parentElement);
    }

    if (location.pathname.includes("/notifications")) {
        if (getPref("invisibleItems.verifiedNotifications")) {
            hideElement(document.querySelector(`[href="/notifications/verified"][role="tab"]:not([data-tuic-hide="true"] > *)`)?.parentElement);
        }

        if (getPref("dateAndTime.dateAboveTweet") == "absolutely" || getPref("dateAndTime.dateAboveTweet") == "absolutelyToday") {
            for (const elem of document.querySelectorAll<HTMLTimeElement>(`article[data-testid="notification"] time:not([data-tuic-hide="true"])`)) {
                if (getPref("dateAndTime.dateAboveTweet") === "absolutely" || isRelativeTime(elem.parentElement.ariaLabel)) {
                    elem.textContent = getAbsolutelyTime(elem.dateTime);
                }
            }
        }
        if (getPref("dateAndTime.hide.notificationsDate")) {
            for (const elem of document.querySelectorAll<HTMLElement>(`article[data-testid="notification"] time:not([data-tuic-hide="true"])`)) {
                hideElement(elem);
                hideElement(elem.closest("div+div"));
            }
        }
    }
}

function profile() {
    if (getPref("profileSetting.invisible.verifiedFollowerTab")) {
        const nowURL = location.pathname;
        if (nowURL.endsWith("/followers") || nowURL.endsWith("/following") || nowURL.endsWith("/followers_you_follow") || nowURL.endsWith("/verified_followers")) {
            const tab = document.querySelector(`[role="presentation"]:not([data-tuic-hide="true"]) > [role="tab"][href$="/verified_followers"]`);
            if (tab) {
                hideElement(tab.parentElement);
                if (nowURL.endsWith("/verified_followers")) {
                    document.querySelector<HTMLAnchorElement>(`[role="presentation"] > [role="tab"][href$="/followers"]`)?.click();
                }
            }
            const scrollSnapElem = document.querySelector(`nav [data-testid="ScrollSnap-prevButtonWrapper"]:not([tuic-hide-child-scroll-snap] > *)`);
            if (scrollSnapElem) {
                scrollSnapElem.parentElement.dataset.tuicHideChildScrollSnap = "";
            }
        }
    }
    if (getPref("profileSetting.invisible.followersYouFollowTab")) {
        const nowURL = location.pathname;
        if (nowURL.endsWith("/followers") || nowURL.endsWith("/following") || nowURL.endsWith("/followers_you_follow") || nowURL.endsWith("/verified_followers")) {
            const tab = document.querySelector(`[role="presentation"]:not([data-tuic-hide="true"]) > [role="tab"][href$="/followers_you_follow"]`);
            if (tab) {
                hideElement(tab.parentElement);
                if (nowURL.endsWith("/followers_you_follow")) {
                    document.querySelector<HTMLAnchorElement>(`[role="presentation"] > [role="tab"][href$="/followers"]`)?.click();
                }
            }
            const scrollSnapElem = document.querySelector(`nav [data-testid="ScrollSnap-prevButtonWrapper"]:not([tuic-hide-child-scroll-snap] > *)`);
            if (scrollSnapElem) {
                scrollSnapElem.parentElement.dataset.tuicHideChildScrollSnap = "";
            }
        }
    }
}

function osusumeUser() {
    if (getPref("timeline.osusume-user-timeline") && !location.search.includes("f=user") && !location.href.includes("/settings/")) {
        const cells = document.querySelectorAll<HTMLElement>(`div[data-testid="cellInnerDiv"]:not([data-tuic-processed-article]):not([aria-labelledby="modal-header"] *):not([data-testid="primaryColumn"] > div > section *):not([data-testid="DMDrawer"] *):not([aria-live="polite"]+div *)`);
        for (const elem of cells) {
            if (
                elem.querySelector(`[data-testid="UserCell"]`) != null
                && elem.previousElementSibling != null
                && elem.querySelector(`[aria-live="polite"]`) == null
                && (elem.previousElementSibling.querySelector(`[data-testid="UserCell"]`) != null || elem.previousElementSibling.querySelector(`h2`) != null)
            ) {
                hideElement(elem);
                if (elem.previousElementSibling.querySelector(`h2`) != null) {
                    hideElement(elem.previousElementSibling as HTMLElement);
                }
            }
            if (elem.querySelector(`a[href*="&f=user"],a[href^="/i/connect_people?"]`) && elem.querySelector(`[aria-live="polite"]`) == null) {
                hideElement(elem);
            }
        }
    }
}
