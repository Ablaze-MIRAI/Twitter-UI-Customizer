import type { SidebarButtonDefinition } from "../types";
import { SIDEBAR_BUTTON_ICON } from "@shared/icons";
import { createSidebarButton } from "../components";
import { waitForElement } from "@content/utils/element";

export const settings: SidebarButtonDefinition = () =>
    createSidebarButton({
        id: "settings",
        svg: () => <path d={SIDEBAR_BUTTON_ICON.settings.unselected}></path>,
        url: "/settings/",
        onclick: (e: Event) => {
            e?.preventDefault?.();
            if (!location.pathname.includes("/settings") || location.pathname.includes("/settings/display")) {
                const moreMenu = document.querySelector<HTMLDivElement>(
                    `[data-testid="AppTabBar_More_Menu"] > div > div`,
                );
                if (document.querySelector(`[role="menu"]`) == null) moreMenu.click();
                setTimeout(async () => {
                    //document.querySelector<HTMLElement>(`:is([role="group"],[data-testid="Dropdown"]) [data-testid="settingsAndSupport"]`).click();
                    (await waitForElement<HTMLAnchorElement>(`[href="/settings"]`))[0].click();
                    setTimeout(() => {
                        if (document.querySelector(`[role="menu"]`)) moreMenu.click();
                    }, 500);
                }, 150);
            }
        },
    });
