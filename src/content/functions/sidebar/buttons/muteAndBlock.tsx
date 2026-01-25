import type { SidebarButtonDefinition } from "../types";
import { SIDEBAR_BUTTON_ICON } from "@shared/icons";
import { createSidebarButton } from "../components";
import { waitForElement } from "@content/utils/element";

export const muteAndBlock: SidebarButtonDefinition = () =>
    createSidebarButton({
        id: "muteAndBlock",
        svg: () => <path d={SIDEBAR_BUTTON_ICON.muteAndBlock.unselected}></path>,
        url: "/settings/mute_and_block",
        onclick: async (e: Event) => {
            e?.preventDefault?.();
            if (!location.pathname.endsWith("/settings/privacy_and_safety")) {
                const moreMenu = document.querySelector<HTMLElement>(
                    `[data-testid="AppTabBar_More_Menu"] > div > div`,
                );
                if (document.querySelector(`[role="menu"]`) == null) moreMenu.click();
                setTimeout(async () => {
                    //document.querySelector<HTMLElement>(`:is([role="group"],[data-testid="Dropdown"]) [data-testid="settingsAndSupport"]`).click();
                    (await waitForElement<HTMLAnchorElement>(`[href="/settings"]`))[0].click();
                    await waitForElement(`[data-testid="accountAccessLink"]`);
                    if (!location.href.endsWith("/settings/delegate")) {
                        (await waitForElement<HTMLAnchorElement>(
                            `[href="/settings/privacy_and_safety"]`,
                        ))[0].click();
                        (await waitForElement<HTMLAnchorElement>(`[href="/settings/mute_and_block"]`))[0].click();
                        setTimeout(() => {
                            if (document.querySelector(`[role="menu"]`)) moreMenu.click();
                        }, 500);
                    }
                }, 150);
            }
        },
    });
