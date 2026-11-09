import { waitForElement } from "@content/utils/element";
import { fontSizeClass } from "@content/utils/fontSize";
import { backgroundColorClass } from "@content/utils/color";
import { translate } from "@content/i18n";
import { JSX } from "solid-js";
import { renderSolid } from "@content/utils/renderLifecycle";
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
            class={`TUICOriginalContent twcss-text-explicit min-w-[0px] wrap-break-word font-tw font-normal my-[2px] cursor-pointer ${fontSizeClass(
                "text-[12px] leading-[14px] pr-[11px]",
                "text-[12px] leading-[15px] pr-[11px]",
                "text-[13px] leading-[16px] pr-[12px]",
                "text-[14px] leading-[18px] pr-[13px]",
                "text-[16px] leading-[19px] pr-[14px]",
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
            <span class="twcss-text-inherit min-w-[0px] wrap-break-word font-tw" style={{ "text-overflow": "unset" }}>
                {translate("common-displaySetting")}
            </span>
        </a>
    );
};

export function placeDisplayButton() {
    if (!document.querySelector("#TUICDisplayRightSidebar")) {
        const moreMenuButton = document.querySelector(`[data-testid="sidebarColumn"] nav > [role="button"]`);
        if (moreMenuButton) {
            renderSolid(elem, moreMenuButton.parentElement);
        }
    }
}
