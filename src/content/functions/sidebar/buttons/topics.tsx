import type { SidebarButtonDefinition } from "../types";
import { waitForElement } from "@content/utils/element";
import { SIDEBAR_BUTTON_ICON } from "@shared/icons";
import { createSidebarButton } from "../components";
import { setDynamicUrl } from "../utils";

export const topics: SidebarButtonDefinition = () =>
    createSidebarButton({
        id: "topics",
        svg: () => <path d={SIDEBAR_BUTTON_ICON.topics.unselected}></path>,
        url: () => {
            return setDynamicUrl(
                "topics",
                `[data-testid="SideNav_AccountSwitcher_Button"] [data-testid^="UserAvatar-Container-"]`,
                (elem) => {
                    return `/${elem.getAttribute("data-testid").replace("UserAvatar-Container-", "")}/topics`;
                },
            );
        },
        onclick: async (e: Event) => {
            e?.preventDefault?.();
            if (!location.pathname.endsWith("/topics")) {
                const moreMenu = document.querySelector<HTMLDivElement>(
                    `[data-testid="AppTabBar_More_Menu"] > div > div`,
                );
                if (document.querySelector(`[role="menu"]`) == null) moreMenu.click();
                setTimeout(async () => {
                    //document.querySelector<HTMLElement>(`:is([role="group"],[data-testid="Dropdown"]) [data-testid="settingsAndSupport"]`).click();
                    (await waitForElement<HTMLAnchorElement>(`[href="/settings"]`))[0].click();
                    (await waitForElement<HTMLAnchorElement>(`[href="/settings/privacy_and_safety"]`))[0].click();
                    (await waitForElement<HTMLAnchorElement>(`[href="/settings/content_you_see"]`))[0].click();
                    (await waitForElement<HTMLAnchorElement>(`main [href$="/topics"]`))[0].click();
                    setTimeout(() => {
                        if (document.querySelector(`[role="menu"]`)) moreMenu.click();
                    }, 500);
                }, 150);
            }
        },
    });
