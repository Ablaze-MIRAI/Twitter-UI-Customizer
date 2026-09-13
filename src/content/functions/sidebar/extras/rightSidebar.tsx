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
        <div
            class={`twcss-flex cursor-pointer self-center my-[2px] ${fontSizeClass(
                "pr-[11px]", "pr-[11px]", "pr-[12px]", "pr-[13px]", "pr-[14px]",
            )} TUICOriginalContent`}
        >
            <a
                href="https://twitter.com/i/display"
                id="TUICDisplayRightSidebar"
                dir="ltr"
                role="link"
                class={`twcss-text-explicit min-w-[0px] text-align-inherit wrap-break-word font-tw2 ${fontSizeClass(
                    "text-[12px] leading-[14px]",
                    "text-[12px] leading-[15px]",
                    "text-[13px] leading-[16px]",
                    "text-[14px] leading-[18px]",
                    "text-[16px] leading-[19px]",
                )} font-normal`}
                style={{
                    color: `rgb(${backgroundColorClass<string>("113, 118, 123", "139, 152, 165", "83, 100, 113")})`,
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
                <span class="twcss-text-inherit min-w-[0px] text-align-inherit wrap-break-word font-inherit">
                    {translate("common-displaySetting")}
                </span>
            </a>
        </div>
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
