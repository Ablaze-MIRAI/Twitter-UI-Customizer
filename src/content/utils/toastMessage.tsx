import { render } from "solid-js/web";
import { JSX } from "solid-js";
import { fontSizeClass } from "@content/utils/fontSize";

const toastMessage = (message: string): (() => JSX.Element) => {
    return () => {
        return (
            <div class="css-175oi2r r-aqfbo4 r-1p0dtai r-1d2f490 r-12vffkv r-1xcajam r-zchlnj TUICToastMessage">
                <div class="css-175oi2r r-12vffkv">
                    <div class="css-175oi2r r-12vffkv">
                        <div class="css-175oi2r r-1jgb5lz r-633pao r-13qz1uu">
                            <div
                                role="alert"
                                class={`css-175oi2r r-1awozwy r-1kihuf0 r-l5o3uw r-z2wwpe r-18u37iz r-1wtj0ep r-105ug2t r-dkhcqf r-axxi2z r-18jm5s1 ${fontSizeClass(
                                    "r-1vxqurs", "r-1yflyrw", "r-zd98yo", "r-1v456y7", "r-sr82au",
                                )} ${fontSizeClass("r-q81ovl", "r-q81ovl", "r-xyw6el", "r-kq9wsh", "r-1slz7xr")}`}
                                data-testid="toast"
                                style={{ transform: "translate3d(0px, 0px, 0px) translateY(0px)" }}
                            >
                                <div
                                    dir="ltr"
                                    class={`css-901oao r-jwli3a r-1wbh5a2 r-1tl8opc r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-1e081e0 r-qvutc0 ${fontSizeClass(
                                        "r-1b43r93", "r-1b43r93", "r-a023e6", "r-1inkyih", "r-1i10wst",
                                    )} ${fontSizeClass("r-1qfz7tf", "r-1qfz7tf", "r-1e081e0", "r-1orpq53", "r-779j7e")}`}
                                >
                                    <span class="css-901oao css-16my406 r-1tl8opc r-bcqeeo r-qvutc0">{ message }</span>
                                </div>
                                <div aria-hidden="true" class="css-175oi2r r-18u37iz"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export const placeToastMessage = (message: string, duration = 3000) => {
    const baseElem = document.querySelector(`#layers`);
    if (baseElem) {
        render(toastMessage(message), baseElem);
        window.setTimeout(() => {
            document.querySelector(`.TUICToastMessage`).remove();
        }, duration);
    }
};
