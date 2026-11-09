import type { JSX } from "solid-js";
import { For } from "solid-js";
import { renderSolid } from "@content/utils/renderLifecycle";
import { translate } from "@content/i18n";
import { waitForElement, hasClosest } from "@content/utils/element";
import { getPref } from "@content/settings";
import { backgroundColorClass } from "@content/utils/color";
import { fontSizeClass } from "@content/utils/fontSize";

const _data = {
    engagementsBox: (ids: string[], article: Element, isShort: boolean): () => JSX.Element => {
        return () => (
            <div
                class={`TUICEngagementsBox twcss-flex items-center border-t-solid border-t-[1px] flex-row ${
                    backgroundColorClass("border-t-tw-dark-border", "border-t-tw-darkblue-border", "border-t-tw-light-border")
                }`}
            >
                <For each={ids}>{(id) => _data.links(id, article, isShort)}</For>
            </div>
        );
    },
    links: (id: string, article: Element, isShort: boolean): JSX.Element => {
        return (
            <div
                dir="ltr"
                class={`css-901oao font-tw text-[15px] font-normal leading-[20px] min-w-[0px] wrap-break-word ${
                    fontSizeClass("py-[14px]", "py-[15px]", "py-[16px]", "py-[18px]", "py-[19px]")
                }`}
                style={{ cursor: "pointer", "margin-right": "1em" }}
                onClick={async () => {
                    article.querySelector<HTMLInputElement>(`[data-testid="caret"]`).click();
                    await waitForElement(`[data-testid="tweetEngagements"]`);
                    document.querySelector<HTMLButtonElement>(`[data-testid="tweetEngagements"]`).click();
                    await waitForElement(`[role="tab"][href$="/${id}"]`);
                    document.querySelector<HTMLAnchorElement>(`[role="tab"][href$="/${id}"]`).click();
                }}
            >
                <span
                    class={`css-901oao css-16my406 font-tw leading-[16px] min-w-[0px] wrap-break-word ${
                        fontSizeClass("text-[14px]", "text-[14px]", "text-[15px]", "text-[17px]", "text-[18px]")
                    } ${backgroundColorClass("text-tw-dark-text2", "text-tw-darkblue-text2", "text-tw-light-text2")}`}
                >
                    <span class="css-901oao css-16my406 font-tw min-w-[0px] wrap-break-word">
                        {translate("bottomTweetButtons-setting-placeEngagementsLink-" + id + (isShort ? "-short" : ""))}
                    </span>
                </span>
            </div>
        );
    },
};

export function placeEngagementsLink(articleInfo: ArticleInfomation) {
    const articleBase = articleInfo.elements.articleBase;
    const buttonBarBase = articleInfo.elements.buttonBarBase;
    for (const boxElem of Array.from(articleBase.querySelectorAll(`.TUICEngagementsBoxBase`))) {
        boxElem.remove();
    }

    if (getPref("engagementsLink.option.placeEngagementsLink")) {
        const engageentsTypeList = getPref("fixEngagements");
        const shortName = getPref("engagementsLink.option.placeEngagementsLinkShort");

        const engagementsFixList: (typeof engageentsTypeList)[] = [];
        const engageFixListFunc = (count: number) => {
            let tempArr: typeof engageentsTypeList = [];
            for (const engageentsType of engageentsTypeList) {
                tempArr.push(engageentsType);
                if (tempArr.length == count) {
                    engagementsFixList.push(tempArr);
                    tempArr = [];
                }
            }
            if (tempArr.length != 0) {
                engagementsFixList.push(tempArr);
            }
        };
        const isPhotoPage = location.pathname.includes("/photo/") || location.pathname.includes("/video/");
        if (shortName && !isPhotoPage) {
            engageFixListFunc(3);
        } else if ((shortName && isPhotoPage) || (!shortName && !isPhotoPage)) {
            engageFixListFunc(2);
        } else {
            engageFixListFunc(1);
        }
        for (const engageList of engagementsFixList) {
            const engagementsBox = _data.engagementsBox(engageList, articleBase, shortName);
            const engagementsBoxBase = document.createElement("div");
            engagementsBoxBase.className = "twcss-flex TUICEngagementsBoxBase";
            hasClosest(buttonBarBase, `:scope > .TUICTweetButtomBarBase`).insertBefore(engagementsBoxBase, buttonBarBase.closest(`.TUICTweetButtomBarBase`));
            renderSolid(engagementsBox, engagementsBoxBase);
        }
    }
}
