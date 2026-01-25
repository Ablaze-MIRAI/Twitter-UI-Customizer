import type { SidebarButtonDefinition } from "../types";
import { SIDEBAR_BUTTON_ICON } from "@shared/icons";
import { createSidebarButton } from "../components";
import { waitForElement } from "@content/utils/element";
import { Dialog } from "@shared/tlui/components/Dialog";
import { ButtonComponent } from "@shared/tlui/components/ButtonComponent";
import { DivBoxComponent } from "@shared/tlui/components/DivBox";
import { translate } from "@content/i18n";

export const display: SidebarButtonDefinition = () =>
    createSidebarButton({
        id: "display",
        svg: () => (
            <>
                <path d={SIDEBAR_BUTTON_ICON.display.unselected}></path>
                <path d="M14 12c0-1.1-.9-2-2-2-1.11 0-2 .9-2 2v2h2c1.1 0 2-.9 2-2z" class="r-1cvl2hr"></path>
            </>
        ),
        url: "/i/display",
        onclick: async (e: Event) => {
            e?.preventDefault?.();
            /*if (buttonClickInMoreMenu( `:is([role="group"],[data-testid="Dropdown"]) [data-testid="settingsAndSupport"]`)) {
            await waitAndClickElement(`[href="/i/display"]`);
        }*/
            if (!location.pathname.endsWith("/settings/display")) {
                const moreMenu = document.querySelector<HTMLElement>(
                    `[data-testid="AppTabBar_More_Menu"] > div > div`,
                );
                if (document.querySelector(`[role="menu"]`) == null) moreMenu.click();
                setTimeout(async () => {
                    //document.querySelector<HTMLElement>(`:is([role="group"],[data-testid="Dropdown"]) [data-testid="settingsAndSupport"]`).click();
                    (await waitForElement<HTMLAnchorElement>(`[href="/settings"]`))[0].click();
                    await waitForElement(`[data-testid="accountAccessLink"]`);
                    if (location.href.endsWith("/settings/delegate")) {
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
                    } else {
                        (await waitForElement<HTMLAnchorElement>(
                            `[href="/settings/accessibility_display_and_languages"]`,
                        ))[0].click();
                        (await waitForElement<HTMLAnchorElement>(`[href="/settings/display"]`))[0].click();
                        setTimeout(() => {
                            if (document.querySelector(`[role="menu"]`)) moreMenu.click();
                        }, 500);
                    }
                }, 150);
            }
        },
    });
