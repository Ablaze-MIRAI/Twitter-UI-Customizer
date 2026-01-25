import { hideElement, processElement } from "@content/utils/element";
import { getPref } from "@content/settings";
import { ProcessedClass } from "@shared/sharedData";

export function hideOsusumeTweets() {
    if (window.location.pathname.includes("/status/") && /^\d+$/.test(new URL(location.href).pathname.split("/")[3]) && document.querySelector(`[data-testid="primaryColumn"]`)) {
        let cells = document.querySelectorAll<HTMLDivElement>(`:is([data-testid="primaryColumn"],[data-testid="mask"]+div [aria-labelledby^="accessible-list"]) [data-testid="cellInnerDiv"]:not([style*="opacity: 0.01"]):not(.${ProcessedClass})`);
        for (const elem of cells) {
            if (!elem.querySelector("article") && elem.querySelector("h2") && (elem.children?.[0]?.children?.[0]?.children?.[0]?.children?.[1]?.getAttribute("style") ?? "").includes("-webkit-line-clamp: 2;")) {
                processElement(elem);
                switch (getPref("timeline-discoverMore")) {
                    case "discoverMore_invisible": {
                        hideElement(elem);
                        elem.dataset.tuicDiscoverMore = "invisible";
                        break;
                    }
                    case "discoverMore_detailOpen": {
                        elem.dataset.tuicDiscoverMore = "open";
                        setDiscoverBox(elem);
                        break;
                    }
                    case "discoverMore_detailClose": {
                        elem.dataset.tuicDiscoverMore = "close";
                        setDiscoverBox(elem);
                        break;
                    }
                    default: {
                        elem.dataset.tuicDiscoverMore = "visible";
                    }
                }
            }
        }
        cells = document.querySelectorAll(`:is([data-testid="primaryColumn"],[data-testid="mask"]+div [aria-labelledby^="accessible-list"]) [data-testid="cellInnerDiv"]:not([style*="opacity: 0.01"])`);
        for (const elem of cells) {
            if (elem.querySelector("article") == null && elem.querySelector("h2") != null && (elem.children?.[0]?.children?.[0]?.children?.[0]?.children?.[1]?.getAttribute("style") ?? "").includes("-webkit-line-clamp: 2;")) {
                let elem2 = elem.nextElementSibling as HTMLElement;
                while (elem2 != null && elem2 != undefined && elem2?.[0]?.children?.[0]?.childElementCount != 0) {
                    elem2.dataset.tuicDiscoverMoreTweet = "";
                    elem2 = elem2.nextElementSibling as HTMLElement;
                }
            }
        }
    }
}

function setDiscoverBox(elem: HTMLDivElement) {
    elem.onclick = (e) => discoverOnClick(e, elem);
}

function discoverOnClick(event: Event, elem: HTMLDivElement) {
    elem.dataset.tuicDiscoverMore = elem.dataset.tuicDiscoverMore == "open" ? "close" : "open";
    event.stopPropagation();
    event.stopImmediatePropagation();
}
