import { render } from "solid-js/web";
import { getPref } from "@content/settings";
import { fontSizeClass } from "@content/utils/fontSize";
import type { JSX } from "solid-js";

const IconElement = (): JSX.Element => {
    return (
        <div class="css-175oi2r r-obd0qt r-18u37iz TUICOriginalContent TUICDMIconBox">
            <div class="css-175oi2r" style={{ width: `${fontSizeClass("47", "49", "52", "57", "62")}px` }}></div>
            <div class="css-175oi2r r-u8s1d r-1d2f490">
                <div
                    class="css-175oi2r r-1adg3ll r-bztko3"
                    style={{ width: `${fontSizeClass("36", "38", "40", "44", "48")}px`, height: `${fontSizeClass("36", "38", "40", "44", "48")}px` }}
                    data-testid="UserAvatar-Container-unknown"
                >
                    <div class="r-1adg3ll r-13qz1uu" style={{ "padding-bottom": "100%" }}></div>
                    <div class="r-1p0dtai r-1pi2tsx r-u8s1d r-1d2f490 r-ipm5af r-13qz1uu">
                        <div class="css-175oi2r r-1adg3ll r-1pi2tsx r-13qz1uu r-u8s1d r-1wyvozj r-desppf r-bztko3">
                            <div class="r-1p0dtai r-1pi2tsx r-u8s1d r-1d2f490 r-ipm5af r-13qz1uu">
                                <div class="css-175oi2r r-sdzlij r-1udh08x r-u8s1d r-ggadg3 r-8jfcpp" style={{ width: "calc(100% + 4px)", height: "calc(100% + 4px)" }}>
                                    <a
                                        href={document.querySelector<HTMLAnchorElement>(`[data-testid="DM_Conversation_Avatar"]:not([data-testid="conversation"] *)`)?.href ?? ""}
                                        role="link"
                                        class="css-175oi2r r-1pi2tsx r-13qz1uu r-o7ynqc r-6416eg r-1ny4l3l r-1loqt21"
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
                                            class="css-175oi2r r-sdzlij r-1udh08x r-633pao r-u8s1d r-1wyvozj r-desppf"
                                            style={{ "background-color": "rgb(21, 32, 43)", width: "calc(100% - 4px)", height: "calc(100% - 4px)" }}
                                        >
                                            <div class="css-175oi2r r-1adg3ll r-1udh08x">
                                                <div class="r-1adg3ll r-13qz1uu" style={{ "padding-bottom": "100%" }}></div>
                                                <div class="r-1p0dtai r-1pi2tsx r-u8s1d r-1d2f490 r-ipm5af r-13qz1uu">
                                                    <div
                                                        class="css-175oi2r r-1mlwlqe r-1udh08x r-417010"
                                                        style={{ position: "absolute", inset: "0px" }}
                                                        aria-label={document.querySelector<HTMLSpanElement>(`#detail-header div > span:nth-child(1) > span > span:nth-child(1)`)?.textContent}
                                                    >
                                                        <div
                                                            class="css-175oi2r r-1niwhzg r-vvn4in r-u6sd8q r-1p0dtai r-1pi2tsx r-1d2f490 r-u8s1d r-zchlnj r-ipm5af r-13qz1uu r-1wyyakw r-4gszlv TUICDMIconDisplay"
                                                            style={{
                                                                "background-image": document.querySelector<HTMLElement>(
                                                                    `:is([data-testid="DM_Conversation_Avatar"]:not([data-testid="conversation"] *) [data-testid="UserAvatar-Container-unknown"] [role="presentation"] > div+div+div > div > div > div > div,[data-testid="DmScrollerContainer"] [data-testid="UserAvatar-Container-unknown"]:not([href$="/followers_you_follow"] *) [style*="background-image:"])`,
                                                                ).style.backgroundImage,
                                                            }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
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
                render(IconElement, elemParent);
            }
        }
    } else {
        document.querySelectorAll(".TUICDMIconBox").forEach((elem) => {
            elem.remove();
        });
    }
}
