import { fontSizeClass } from "@content/utils/fontSize";
import { backgroundColorClass } from "@content/utils/color";
import { JSX } from "solid-js";
import { data } from "./data";

export function followersListButton(id: string, baseElement: HTMLElement): () => JSX.Element {
    return (): JSX.Element => (
        <div
            class="css-175oi2r r-18u37iz r-1h0z5md r-1cwvpvk TUICOriginalContent"
            data-tuic-follower-list-button={id}
            onKeyDown={(e: KeyboardEvent) => {
                if (e.key === "Enter") {
                    data[id].clickEvent(baseElement);
                }
            }}
            onClick={() => data[id].clickEvent(baseElement)}
        >
            <div role="button" tabindex="0" class="css-175oi2r r-1777fci r-bt1l66 r-bztko3 r-lrvibr r-1loqt21 r-1ny4l3l">
                <div
                    dir="ltr"
                    class={`css-1rynq56 r-bcqeeo r-qvutc0 r-37j5jr r-rjixqe r-16dba41 r-1awozwy r-6koalj r-1h0z5md r-o7ynqc r-clp7b1 r-3s2u2q ${
                        fontSizeClass("r-1b43r93", "r-1b43r93", "r-a023e6", "r-1inkyih", "r-1i10wst")
                    }`}
                >
                    <div class="css-175oi2r r-xoduu5">
                        <div class="css-175oi2r r-xoduu5 r-1p0dtai r-1d2f490 r-u8s1d r-zchlnj r-ipm5af r-1niwhzg r-sdzlij r-xf4iuw r-o7ynqc r-6416eg r-1ny4l3l TUIC_ButtonHover"></div>
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            class={`r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1xvli5t r-1hdv0qi ${
                                backgroundColorClass("r-1bwzh9t", "r-115tad6", "r-14j79pv")
                            }`}
                        >
                            <g>
                                <path d={data[id].svg}></path>
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
