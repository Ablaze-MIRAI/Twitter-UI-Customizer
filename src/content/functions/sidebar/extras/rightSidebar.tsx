import { waitForElement } from "@content/utils/element";
import { fontSizeClass } from "@content/utils/fontSize";
import { backgroundColorClass } from "@content/utils/color";
import { translate } from "@content/i18n";
import { JSX } from "solid-js";
import { render } from "solid-js/web";
import { Dialog } from "@shared/tlui/components/Dialog";
import { ButtonComponent } from "@shared/tlui/components/ButtonComponent";
import { DivBoxComponent } from "@shared/tlui/components/DivBox";

const elem = (): JSX.Element => {
    return (
        <a
            href="https://twitter.com/i/display"
            id="TUICDisplayRightSidebar"
            dir="ltr"
            role="link"
            class={`TUICOriginalContent css-1rynq56 r-bcqeeo r-qvutc0 r-1tl8opc r-16dba41 r-hrzydr r-1loqt21 ${fontSizeClass(
                "r-1enofrn r-1f529hi r-mszm1p",
                "r-1enofrn r-fxxt2n r-mszm1p",
                "r-n6v787 r-1cwl3u0 r-j2kj52",
                "r-1b43r93 r-14yzgew r-1ba89he",
                "r-ubezar r-hjklzo r-n3sdqm",
            )}`}
            style={{
                "text-overflow": "unset",
                color: `rgb(${backgroundColorClass<string>("113, 118, 123", "139, 152, 165", "83, 100, 113")})`,
                "padding-top": "1.5px",
            }}
            onClick={(e) => {
                e.preventDefault();
                setTimeout(async () => {
                    await waitForElement("#layers");
                    const dialog = new Dialog(translate("common-displaySetting"));
                    dialog.contentWidth = "50vw";
                    //dialog.fitContentWidth = true;
                    dialog
                        .addComponents([
                            new ButtonComponent(translate("common-close"), () => {
                                dialog.close();
                            }),
                            new DivBoxComponent({ id: "TUICOriginalDisplaySetting" }),
                            new ButtonComponent(translate("common-close"), () => {
                                dialog.close();
                            }),
                        ])
                        .open();
                }, 150);
                /*
                const moreMenu = document.querySelector<HTMLElement>(`[data-testid="AppTabBar_More_Menu"] > div > div`);
                if (document.querySelector(`[role="menu"]`) == null) moreMenu.click();
                setTimeout(async () => {
                    //document.querySelector<HTMLElement>(`:is([role="group"],[data-testid="Dropdown"]) [data-testid="settingsAndSupport"]`).click();
                    (await waitForElement<HTMLAnchorElement>(`[href="/settings"]`))[0].click();
                    (await waitForElement<HTMLAnchorElement>(`[href="/settings/accessibility_display_and_languages"]`))[0].click();
                    (await waitForElement<HTMLAnchorElement>(`[href="/settings/display"]`))[0].click();
                }, 150);*/
            }}
        >
            <span class="css-1qaijid r-bcqeeo r-qvutc0 r-1tl8opc" style={{ "text-overflow": "unset" }}>
                {translate("common-displaySetting")}
            </span>
        </a>
    );
};

export function placeDisplayButton() {
    if (!document.querySelector("#TUICDisplayRightSidebar")) {
        const moreMenuButton = document.querySelector(`[data-testid="sidebarColumn"] nav > [role="button"]`);
        if (moreMenuButton) {
            render(elem, moreMenuButton.parentElement);
        }
    }
}
