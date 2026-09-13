import type { JSX } from "solid-js";
import { renderSolid } from "@content/utils/renderLifecycle";
import { hideElement } from "@content/utils/element";
import { fontSizeClass } from "@content/utils/fontSize";
import { getPref } from "@content/settings";
import { backgroundColorClass } from "@content/utils/color";

const showLinkCardInfoElement = (link: string, domain: string, title: string, description: string): () => JSX.Element => {
    return () => (
        <div class="twcss-flex grow shrink justify-center TUIC_LinkCardInfo">
            <a
                href={link}
                rel="noopener noreferrer nofollow"
                target="_blank"
                role="link"
                class="twcss-flex flex-row grow justify-between duration-200 transition-bgcolor-shadow outline-none cursor-pointer"
            >
                <div
                    class={`twcss-flex grow shrink gap-[2px] justify-center ${fontSizeClass(
                        "px-[11px] pt-[11px] pb-[11px]",
                        "px-[11px] pt-[11px] pb-[11px]",
                        "px-[12px] pt-[12px] pb-[12px]",
                        "px-[13px] pt-[13px] pb-[13px]",
                        "px-[14px] pt-[14px] pb-[14px]",
                    )}`}
                    data-testid="card.layoutSmall.detail"
                >
                    <div
                        dir="auto"
                        class={`twcss-text-explicit max-w-full overflow-hidden text-ellipsis whitespace-nowrap min-w-[0px] text-align-inherit wrap-break-word font-tw2 ${fontSizeClass(
                            "text-[14px] leading-[18px]",
                            "text-[14px] leading-[19px]",
                            "text-[15px] leading-[20px]",
                            "text-[17px] leading-[22px]",
                            "text-[18px] leading-[24px]",
                        )} font-normal ${backgroundColorClass(
                            "text-tw-dark-text2", "text-tw-darkblue-text2", "text-tw-light-text2",
                        )}`}
                    >
                        <span class="twcss-text-inherit min-w-[0px] text-align-inherit wrap-break-word font-tw">
                            <span class="twcss-text-inherit min-w-[0px] text-align-inherit wrap-break-word font-tw">{domain}</span>
                        </span>
                    </div>
                    <div
                        dir="auto"
                        class={`twcss-text-explicit max-w-full overflow-hidden text-ellipsis whitespace-nowrap min-w-[0px] text-align-inherit wrap-break-word font-tw2 ${fontSizeClass(
                            "text-[14px] leading-[18px]",
                            "text-[14px] leading-[19px]",
                            "text-[15px] leading-[20px]",
                            "text-[17px] leading-[22px]",
                            "text-[18px] leading-[24px]",
                        )} font-normal ${backgroundColorClass(
                            "text-tw-dark-text", "text-tw-darkblue-text", "text-tw-light-text",
                        )}`}
                    >
                        <span class="twcss-text-inherit min-w-[0px] text-align-inherit wrap-break-word font-tw">
                            <span class="twcss-text-inherit min-w-[0px] text-align-inherit wrap-break-word font-tw">{title}</span>
                        </span>
                    </div>
                    <div
                        dir="auto"
                        class={`twcss-text-explicit box-orient-vertical webkit-box max-w-full overflow-hidden text-ellipsis min-w-[0px] text-align-inherit wrap-break-word font-tw2 ${fontSizeClass(
                            "text-[14px] leading-[18px]",
                            "text-[14px] leading-[19px]",
                            "text-[15px] leading-[20px]",
                            "text-[17px] leading-[22px]",
                            "text-[18px] leading-[24px]",
                        )} font-normal ${backgroundColorClass(
                            "text-tw-dark-text2", "text-tw-darkblue-text2", "text-tw-light-text2",
                        )}`}
                        style={{ "-webkit-line-clamp": "2" }}
                    >
                        <span class="twcss-text-inherit min-w-[0px] text-align-inherit wrap-break-word font-tw">
                            <span class="twcss-text-inherit min-w-[0px] text-align-inherit wrap-break-word font-tw">{description}</span>
                        </span>
                    </div>
                </div>
            </a>
        </div>
    );
};

// リンクカードを設置
export function showLinkCardInfo(articleInfo: ArticleInfomation) {
    const articleBase = articleInfo.elements.articleBase;
    if (getPref("showLinkCardInfo.showLinkCardInfo")) {
        if (articleBase.querySelector(`[data-testid="card.layoutLarge.media"] a[aria-label] > div+div`)) {
            const card = articleBase.querySelector('[data-testid="card.wrapper"] [data-testid="card.layoutLarge.media"]').parentElement;

            if (card.querySelector(".TUIC_LinkCardInfo") == null) {
                hideElement(card.children[1] as HTMLElement);
                hideElement(card.parentElement.children[1] as HTMLElement);
                hideElement(card.querySelector('[data-testid="card.layoutLarge.media"] a > div+div'));

                const link = card.querySelector<HTMLAnchorElement>('[data-testid="card.layoutLarge.media"] a').href;
                const domain = card.querySelector('[data-testid="card.layoutLarge.media"] a').getAttribute("aria-label").replace(/ .*$/, "");
                const title = card.querySelector('[data-testid="card.layoutLarge.media"] a').getAttribute("aria-label").replace(/^.*? /, "");
                const description = "";
                const oldDisplay = showLinkCardInfoElement(link, domain, title, description);
                renderSolid(oldDisplay, card);
            }
        }
    } else {
        articleBase.querySelector(".TUIC_LinkCardInfo")?.remove();
    }
}
