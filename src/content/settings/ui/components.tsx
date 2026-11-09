import { createEffect, createSignal } from "solid-js";
import { getPref, savePref, setPref } from "@content/settings";
import { waitForElement } from "@content/utils/element";
import { translate } from "@content/i18n";
import { fontSizeClass } from "@content/utils/fontSize";

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
            class="twcss-flex items-center rounded-[4px] cursor-pointer flex-1 flex-row m-[4px] min-h-[64px] px-[20px] outline-none TUIC_setting_backgroundTheme_dim"
            style={{
                "background-color": "rgb(21, 32, 43)",
                "border-color": bgTheme() === "blue" ? "rgb(29, 155, 240)" : "transparent",
                "border-width": bgTheme() === "blue" ? "2px" : "1px",
            }}
        >
            <div
                role="radio"
                tabindex="-1"
                class="twcss-flex items-center rounded-full h-[40px] justify-center mx-[-11px] select-none w-[40px] duration-200 transition-bgcolor-shadow outline-none"
            >
                <div
                    class={`twcss-flex items-center ${fontSizeClass(
                        "rounded-[29px]", "rounded-[30px]", "rounded-[32px]", "rounded-[35px]", "rounded-[38px]",
                    )} border-solid border-2 h-[20px] justify-center w-[20px]`}
                    style={{
                        "background-color": bgTheme() === "blue" ? "rgb(29, 155, 240)" : "rgba(0, 0, 0, 0)",
                        "border-color": bgTheme() === "blue" ? "rgb(29, 155, 240)" : "rgb(92, 110, 126)",
                    }}
                >
                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        class="inline-block fill-current max-w-full relative select-none align-text-bottom text-white h-[18px] w-[18px]"
                        data-tuic-hide={bgTheme() === "blue" ? undefined : "true"}
                    >
                        <g>
                            <path d="M9.64 18.952l-5.55-4.861 1.317-1.504 3.951 3.459 8.459-10.948L19.4 6.32 9.64 18.952z"></path>
                        </g>
                    </svg>
                </div>
            </div>
            <div aria-hidden="true" class="twcss-flex items-center cursor-pointer grow justify-center ml-[5px] w-[80%]">
                <div
                    dir="ltr"
                    class={`twcss-text-explicit max-w-full overflow-hidden text-ellipsis whitespace-nowrap min-w-[0px] text-align-inherit wrap-break-word font-tw ${fontSizeClass(
                        "text-[14px] leading-[18px]",
                        "text-[14px] leading-[19px]",
                        "text-[15px] leading-[20px]",
                        "text-[17px] leading-[22px]",
                        "text-[18px] leading-[24px]",
                    )} font-bold`}
                    style={{ color: "rgb(231, 233, 234)" }}
                >
                    <span class="twcss-text-inherit min-w-[0px] text-align-inherit wrap-break-word font-tw">{translate("backgroundTheme-dim")}</span>
                </div>
            </div>
            <input
                name="background-picker"
                type="radio"
                aria-label={translate("backgroundTheme-dim")}
                class="bottom-[0px] cursor-inherit h-full left-[0px] m-[0px] opacity-[0] p-[0px] absolute right-[0px] top-[0px] w-full"
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
