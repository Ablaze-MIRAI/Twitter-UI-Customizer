import { createEffect, createSignal } from "solid-js";
import { getPref, savePref, setPref } from "@content/settings";
import { waitForElement } from "@content/utils/element";
import { translate } from "@shared/i18n";

const changeCheckedDark = (bgThemeOption: HTMLElement, checked: boolean) => {
    const button = bgThemeOption.lastElementChild as HTMLInputElement;
    const childDiv = button.firstElementChild.firstElementChild as HTMLElement;
    switch (checked) {
        case false:
            button.style.borderColor = "transparent";
            button.style.borderWidth = "1px";
            childDiv.style.backgroundColor = "rgba(0, 0, 0, 0)";
            childDiv.style.borderColor = "rgb(62, 65, 68)";
            (button.lastElementChild as HTMLInputElement).removeAttribute("checked");
            button.querySelector("svg").dataset.tuicHide = "true";
            break;
        case true:
            button.style.borderColor = "rgb(29, 155, 240)";
            button.style.borderWidth = "2px";
            childDiv.style.backgroundColor = "rgb(29, 155, 240)";
            childDiv.style.borderColor = "rgb(29, 155, 240)";
            (button.lastElementChild as HTMLInputElement).setAttribute("checked", "");
            delete button.querySelector("svg").dataset.tuicHide;
            break;
    }
};

const dimOrDark = (themeTo: "blue" | "dark", bgThemeOption: HTMLElement) => {
    switch (themeTo) {
        case "blue":
            document.documentElement.dataset.theme = "dim";
            document.body.style.backgroundColor = "rgb(21, 32, 43)";
            document.body.style.scrollbarColor = "rgb(92, 111, 127) rgb(31, 40, 51)";
            changeCheckedDark(bgThemeOption, false);
            break;
        case "dark":
            document.documentElement.dataset.theme = "dark";
            document.body.style.backgroundColor = "rgb(0, 0, 0)";
            document.body.style.scrollbarColor = "rgb(62, 65, 68) rgb(22, 24, 28)";
            changeCheckedDark(bgThemeOption, true);
            break;
    }
};

export const dimBackgroundThemeButton = (bgThemeOption: HTMLElement) => () => {
    const isDim = getPref("uncategorizedSettings.dimBackgroundTheme") ?? false;
    const currentButton = bgThemeOption.querySelector<HTMLElement>(':scope > [tabindex="-1"]:has(svg:not([data-tuic-hide="true"]))');
    let currentTheme: "light" | "blue" | "dark" = isDim ? "blue" : "light";

    if (isDim) {
        if (currentButton.style.backgroundColor === "rgb(0, 0, 0)") {
            changeCheckedDark(bgThemeOption, true);
        } else if (currentButton.style.backgroundColor === "rgb(255, 255, 255)") {
            currentTheme = "light";
        }
    } else {
        switch (currentButton.style.backgroundColor) {
            case "rgb(0, 0, 0)":
                currentTheme = "dark";
                break;
            //case "rgb(21, 32, 43)":
            //    currentTheme = "blue";
            //    break;
            case "rgb(255, 255, 255)":
            //default:
                currentTheme = "light";
                break;
        }
    }

    const [bgTheme, setBgTheme] = createSignal<"light" | "blue" | "dark">(currentTheme);
    createEffect(() => {
        setPref("uncategorizedSettings.dimBackgroundTheme", bgTheme() === "blue");
        savePref();

        if (bgTheme() === "blue") {
            dimOrDark("blue", bgThemeOption);
        }
    });
    // prefがtrue(dim)で、現在のテーマがlightのときは、prefもfalse(light)にする
    if (isDim && currentTheme === "light") setBgTheme("light");

    const onClick = (newTheme: "light" | "blue" | "dark", e: MouseEvent) => {
        const currentTheme = bgTheme();
        if (currentTheme === "light" && newTheme === "blue") {
            const target = e.target as HTMLInputElement;
            const bgThemeOption = target.parentElement.parentElement;

            // ライトテーマからダークブルーに変更するとき、一度ダークテーマを経由する
            (bgThemeOption.lastElementChild.lastElementChild as HTMLElement).click();
            (async () => {
                (await waitForElement<HTMLElement>(`div[role="radiogroup"] > .TUIC_setting_backgroundTheme_dim > input`))[0].click();
            })();
            return;
        } else if (currentTheme === "blue" && newTheme === "dark") {
            // ダークブルーからダークに変更する
            dimOrDark("dark", bgThemeOption);
        } else if (newTheme !== "blue") {
            //Twitterのバグ?の修正
            document.documentElement.dataset.theme = newTheme;
        }

        setBgTheme(newTheme);
    };
    const lightThemeButton = bgThemeOption.firstElementChild as HTMLElement;
    const darkThemeButton = bgThemeOption.lastElementChild as HTMLElement;
    const checkAndAddOnClick = (button: HTMLElement, theme: "light" | "dark") => {
        if (theme === "dark" && currentTheme === "light") return;
        button.querySelector("input").addEventListener("click", onClick.bind(null, theme));
    };
    checkAndAddOnClick(lightThemeButton, "light");
    checkAndAddOnClick(darkThemeButton, "dark");

    return (
        <div
            tabIndex="-1"
            class="css-g5y9jx r-1awozwy r-z2wwpe r-1loqt21 r-13awgt0 r-18u37iz r-1064s9p r-adacv r-u9wvl5 r-1ny4l3l TUIC_setting_backgroundTheme_dim"
            style={{
                "background-color": "rgb(21, 32, 43)",
                "border-color": bgTheme() === "blue" ? "rgb(29, 155, 240)" : "transparent",
                "border-width": bgTheme() === "blue" ? "2px" : "1px",
            }}
        >
            <div role="radio" tabindex="-1" class="css-g5y9jx r-1awozwy r-sdzlij r-eu3ka r-1777fci r-wxmri3 r-lrvibr r-1aockid r-o7ynqc r-6416eg r-1ny4l3l">
                <div
                    class="css-g5y9jx r-1awozwy r-nsiyw1 r-1phboty r-d045u9 r-z80fyv r-1777fci r-19wmn03"
                    style={{
                        "background-color": bgTheme() === "blue" ? "rgb(29, 155, 240)" : "rgba(0, 0, 0, 0)",
                        "border-color": bgTheme() === "blue" ? "rgb(29, 155, 240)" : "rgb(92, 110, 126)",
                    }}
                >
                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        class="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-jwli3a r-1hjwoze r-12ym1je"
                        data-tuic-hide={bgTheme() === "blue" ? undefined : "true"}
                    >
                        <g>
                            <path d="M9.64 18.952l-5.55-4.861 1.317-1.504 3.951 3.459 8.459-10.948L19.4 6.32 9.64 18.952z"></path>
                        </g>
                    </svg>
                </div>
            </div>
            <div aria-hidden="true" class="css-g5y9jx r-1awozwy r-1loqt21 r-16y2uox r-1777fci r-wizibn r-6e0ovw">
                <div
                    dir="ltr"
                    class="css-146c3p1 r-dnmrzs r-1udh08x r-1udbk01 r-3s2u2q r-bcqeeo r-1ttztb7 r-qvutc0 r-1tl8opc r-a023e6 r-rjixqe r-b88u0q"
                    style={{ color: "rgb(231, 233, 234)" }}
                >
                    <span class="css-1jxf684 r-bcqeeo r-1ttztb7 r-qvutc0 r-1tl8opc">{translate("backgroundTheme-dim")}</span>
                </div>
            </div>
            <input
                name="background-picker"
                type="radio"
                aria-label={translate("backgroundTheme-dim")}
                class="r-1p0dtai r-1ei5mc7 r-1pi2tsx r-1d2f490 r-crgep1 r-orgf3d r-t60dpp r-u8s1d r-zchlnj r-ipm5af r-13qz1uu"
                attr:checked={bgTheme() === "blue" ? "" : undefined}
                onClick={onClick.bind(null, "blue")}
            />
        </div>
    );
};

declare module "solid-js" {
    // eslint-disable-next-line ts/no-namespace
    namespace JSX {
        interface ExplicitAttributes {
            // attr:checkedを使用しても型チェックが通るようにするための宣言
            // https://docs.solidjs.com/reference/jsx-attributes/attr
            checked: string;
        }
    }
}
