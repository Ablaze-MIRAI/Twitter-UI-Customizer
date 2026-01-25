import DOG from "@shared/icons/logo/dog.png?url";
import TWITTER from "@shared/icons/logo/twitter.svg?raw";
import X from "@shared/icons/logo/x.svg?raw";
import { XDaruma } from "@shared/icons";
import EMPTY from "@shared/icons/logo/empty.svg?url";
import { getColorFromPref } from "@content/utils/color";
import { getPref } from "@content/settings";
import { hideElement } from "@content/utils/element";

let iconObserver: MutationObserver | null = null;

const iconObserverFunc = (elem: HTMLElement) => {
    if (elem) {
        if (iconObserver) iconObserver.disconnect();
        else {
            iconObserver = new MutationObserver(() => {
                iconObserverFunc(elem);
            });
        }
        changeIconProcess(elem, document.querySelector(`header [role="heading"]`));
        iconObserver.observe(document.querySelector("header h1 a > div"), {
            childList: true,
            subtree: true,
            attributes: true,
        });
    }
};

function changeIconProcess(elem: HTMLElement, base: HTMLElement) {
    const favicon = document.querySelector<HTMLLinkElement>(`[rel="shortcut icon"]`);
    const changeFavicon = getPref("twitterIcon.options.faviconSet");
    switch (getPref("twitterIcon.icon")) {
        case "invisible":
            if (favicon && changeFavicon) {
                favicon.href = chrome.runtime.getURL(EMPTY);
            }
            elem.dataset.tuicIconType = "invisible";
            hideElement(base);
            break;
        case "twitter":
            if (favicon && changeFavicon) {
                favicon.href = "data:image/svg+xml," + encodeURIComponent(TWITTER.replace("var(--TUIC-favicon-color)", getColorFromPref("twitterIconFavicon", "color", null)));
                //replace(`xmlns:xlink="http:%2F%2Fwww.w3.org%2F1999%2Fxlink"`, `xmlns:xlink="http:%2F%2Fwww.w3.org%2F1999%2Fxlink"%20fill="${getColorFromPref("twitterIconFavicon", "color")}"`)
            }
            elem.dataset.tuicIconType = "officialLogo-twitter";
            break;
        case "dog":
            if (favicon && changeFavicon) {
                favicon.href = chrome.runtime.getURL(DOG);
            }
            elem.dataset.tuicIconType = "dog";
            break;
        case "custom":
            if (favicon && changeFavicon) {
                const imageURL = localStorage.getItem(getPref("twitterIcon.options.roundIcon") ? "TUIC_IconImg_Favicon" : "TUIC_IconImg");
                favicon.href = imageURL ?? chrome.runtime.getURL(EMPTY);
            }
            elem.dataset.tuicIconType = "custom";
            break;
        case "twitterIcon-X":
            if (favicon && changeFavicon) {
                //console.log(encodeURIComponent(X.replace("var(--TUIC-favicon-color)", getColorFromPref("twitterIconFavicon", "color", null))));
                favicon.href = "data:image/svg+xml," + encodeURIComponent(X.replace("var(--TUIC-favicon-color)", getColorFromPref("twitterIconFavicon", "color", null)));
                //.replace(`xmlns:xlink="http:%2F%2Fwww.w3.org%2F1999%2Fxlink"`, `xmlns:xlink="http:%2F%2Fwww.w3.org%2F1999%2Fxlink"%20fill="${getColorFromPref("twitterIconFavicon", "color")}"`);
            }
            elem.dataset.tuicIconType = "officialLogo-X";
            break;
        case "twitterIcon-XDaruma":
            if (favicon && changeFavicon) {
                favicon.href = "data:image/svg+xml," + encodeURIComponent(XDaruma.replace("var(--TUIC-favicon-color)", getColorFromPref("twitterIconFavicon", "color", null)));
            }
            elem.dataset.tuicIconType = "x-daruma";
            break;
        default:
            if (favicon) {
                favicon.href = "//abs.twimg.com/favicons/twitter.3.ico";
            }
            elem.dataset.tuicIconType = "default";
            break;
    }
    if (favicon && !changeFavicon) {
        favicon.href = "//abs.twimg.com/favicons/twitter.3.ico";
    }
}

//* setup icon observer
export function changeIcon() {
    const notProcessed = `:not([tuic-icon-type])`;
    {
        const elem = document.querySelector<HTMLElement>(`header h1 a > div > svg${notProcessed}`);
        if (elem) {
            iconObserverFunc(elem);
        }
    }
    if (!document.querySelector(`header h1 a > div > svg`)) {
        iconObserver = null;
    }

    {
        const elem = document.querySelector<HTMLElement>(`[role="alertdialog"] [data-testid="confirmationSheetDialog"] > svg${notProcessed}`);
        if (elem) {
            changeIconProcess(elem, document.querySelector(`[role="alertdialog"] [data-testid="confirmationSheetDialog"] [role="heading"]`));
        }
    }

    {
        const elem = document.querySelector<HTMLElement>(`[data-testid="interstitialGraphic"] > svg${notProcessed}`);
        if (elem) {
            changeIconProcess(elem, elem.parentElement);
        }
    }

    {
        const elem = document.querySelector<HTMLElement>(`#layers [data-testid="TopNavBar"] div+svg${notProcessed}`);
        if (elem) {
            changeIconProcess(elem, elem.parentElement);
        }
    }

    {
        const elem = document.querySelector<HTMLElement>(`article svg${notProcessed} > * > path[d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"]`);
        if (elem) {
            changeIconProcess(elem.closest<HTMLElement>("svg"), elem.closest("svg").parentElement);
        }
    }
}

// 起動時のアイコン
let initIconObserver: MutationObserver | null = null;

export const initIconObserverFunction = () => {
    if (initIconObserver) initIconObserver.disconnect();
    else initIconObserver = new MutationObserver(initIconObserverFunction);

    changeIconProcess(document.querySelector(`#placeholder > svg:not([data-tuic-icon-type])`), document.querySelector(`#placeholder`));

    initIconObserver.observe(document.querySelector(`#placeholder > svg`), {
        attributes: true,
        attributeFilter: ["class"],
    });
};
