import { renderSolid } from "@content/utils/renderLifecycle";
import { getPref } from "@content/settings";
import { fontSizeClass } from "@content/utils/fontSize";
import type { JSX } from "solid-js";
import { backgroundColorClass } from "@content/utils/color";

const IconElement = (): JSX.Element => {
    return (
        <div class="twcss-flex items-end flex-row TUICOriginalContent TUICDMIconBox">
            <div class={`twcss-flex ${fontSizeClass("w-[47px]", "w-[49px]", "w-[52px]", "w-[57px]", "w-[62px]")}`}></div>
            <div class="twcss-flex absolute left-[0px]">
                <div
                    class="twcss-flex block overflow-visible"
                    style={{ width: `${fontSizeClass("36", "38", "40", "44", "48")}px`, height: `${fontSizeClass("36", "38", "40", "44", "48")}px` }}
                    data-testid="UserAvatar-Container-unknown"
                >
                    <div class="block w-full" style={{ "padding-bottom": "100%" }}></div>
                    <div class="bottom-[0px] h-full left-[0px] absolute top-[0px] w-full">
                        <div class="twcss-flex block h-full w-full left-1/2 absolute top-1/2 translate-negativehalf overflow-visible">
                            <div class="block w-full" style={{ "padding-bottom": "100%" }}></div>
                            <div class="bottom-[0px] h-full left-[0px] absolute top-[0px] w-full">
                                <div class="twcss-flex rounded-full overflow-hidden left-[-2px] absolute top-[-2px]" style={{ width: "calc(100% + 4px)", height: "calc(100% + 4px)" }}>
                                    <a
                                        href={document.querySelector<HTMLAnchorElement>(`[data-testid="DM_Conversation_Avatar"]:not([data-testid="conversation"] *)`)?.href ?? ""}
                                        role="link"
                                        class="twcss-flex h-full w-full duration-200 transition-bgcolor-shadow outline-none cursor-pointer"
                                        style={{ "background-color": "rgba(0, 0, 0, 0)" }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            document
                                                .querySelector<HTMLElement>(
                                                    `:is([data-testid="DM_Conversation_Avatar"]:not([data-testid="conversation"] *) [data-testid="UserAvatar-Container-unknown"] [role="presentation"] > div+div+div > div > div > div > div,[data-testid="DmScrollerContainer"] [data-testid="UserAvatar-Container-unknown"]:not([href$="/followers_you_follow"] *) [style*="background-image:"])`,
                                                )
                                                .click();
                                        }}
                                    >
                                        <div
                                            class="twcss-flex rounded-full overflow-hidden pointer-events-none! left-1/2 absolute top-1/2 translate-negativehalf"
                                            style={{ width: "calc(100% - 4px)", height: "calc(100% - 4px)" }}
                                        >
                                            <div class="twcss-flex h-full w-full" style={{ "background-color": "rgba(0, 0, 0, 0)" }}></div>
                                        </div>
                                        <div
                                            class="twcss-flex rounded-full overflow-hidden pointer-events-none! left-1/2 absolute top-1/2 translate-negativehalf"
                                            style={{ width: "calc(100% - 4px)", height: "calc(100% - 4px)" }}
                                        >
                                            <div class="twcss-flex h-full w-full bg-black"></div>
                                        </div>
                                        <div
                                            class="twcss-flex rounded-full overflow-hidden pointer-events-none! left-1/2 absolute top-1/2 translate-negativehalf"
                                            style={{ "background-color": "rgb(21, 32, 43)", width: "calc(100% - 4px)", height: "calc(100% - 4px)" }}
                                        >
                                            <div class="twcss-flex block overflow-hidden">
                                                <div class="block w-full" style={{ "padding-bottom": "100%" }}></div>
                                                <div class="bottom-[0px] h-full left-[0px] absolute top-[0px] w-full">
                                                    <div
                                                        class="twcss-flex basis-auto overflow-hidden z-0 backface-hidden transform-gpu bottom-[0px] left-[0px] absolute right-[0px] top-[0px]"
                                                        aria-label={document.querySelector<HTMLSpanElement>(`#detail-header div > span:nth-child(1) > span > span:nth-child(1)`)?.textContent}
                                                    >
                                                        <div
                                                            class="twcss-flex bg-transparent bg-center bg-no-repeat bottom-[0px] h-full left-[0px] absolute right-[0px] top-[0px] w-full -z-1 bg-cover TUICDMIconDisplay"
                                                            style={{
                                                                "background-image": document.querySelector<HTMLElement>(
                                                                    `:is([data-testid="DM_Conversation_Avatar"]:not([data-testid="conversation"] *) [data-testid="UserAvatar-Container-unknown"] [role="presentation"] > div+div+div > div > div > div > div,[data-testid="DmScrollerContainer"] [data-testid="UserAvatar-Container-unknown"]:not([href$="/followers_you_follow"] *) [style*="background-image:"])`,
                                                                ).style.backgroundImage,
                                                            }}
                                                        ></div>
                                                        <img
                                                            alt={document.querySelector<HTMLSpanElement>(`#detail-header div > span:nth-child(1) > span > span:nth-child(1)`).textContent}
                                                            draggable="true"
                                                            src={
                                                                document.querySelector<HTMLImageElement>(
                                                                    `:is([data-testid="DM_Conversation_Avatar"]:not([data-testid="conversation"] *) [data-testid="UserAvatar-Container-unknown"] [role="presentation"] > div+div+div > div > div > div > img,[data-testid="DmScrollerContainer"] [data-testid="UserAvatar-Container-unknown"]:not([href$="/followers_you_follow"] *) img)`,
                                                                ).src
                                                            }
                                                            class="twcss-cover-hidden"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            class="twcss-flex rounded-full overflow-hidden left-1/2 absolute top-1/2 translate-negativehalf"
                                            style={{ width: "calc(100% - 4px)", height: "calc(100% - 4px)" }}
                                        >
                                            <div class={`twcss-flex ${
                                                backgroundColorClass("inset-shadow-dark-tw", "inset-shadow-dark-tw", "inset-shadow-light-tw")
                                            } h-full w-full duration-200 transition-bgcolor-shadow outline-none`}
                                            ></div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export function dmPage() {
    if (getPref("dmPage.showIcon")) {
        if (
            document.querySelector(
                `:is([data-testid="DM_Conversation_Avatar"]:not([data-testid="conversation"] *) [data-testid="UserAvatar-Container-unknown"] [role="presentation"] > div+div+div > div > div > div > div,[data-testid="DmScrollerContainer"] [data-testid="UserAvatar-Container-unknown"]:not([href$="/followers_you_follow"] *) [style*="background-image:"])`,
            )
        ) {
            for (const elem of document.querySelectorAll(`[data-testid="messageEntry"]:not([role="button"]):not(.TUICDMIcon)`)) {
                elem.classList.add("TUICDMIcon");
                if (elem.parentElement.querySelector(`[data-testid="messageEntry"] > div > div+div+div:not(.TUICDMIconBox)`)) {
                    continue;
                }
                //old Element
                elem.querySelector("div > div+div+div.TUICDMIconBox")?.remove();

                const elemParent = elem.parentElement.querySelector(`[data-testid="messageEntry"] > div`);
                renderSolid(IconElement, elemParent);
            }
        }
    } else {
        document.querySelectorAll(".TUICDMIconBox").forEach((elem) => {
            elem.remove();
        });
    }
}
