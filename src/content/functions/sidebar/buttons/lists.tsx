import type { SidebarButtonDefinition } from "../types";
import { SIDEBAR_BUTTON_ICON } from "@shared/icons";
import { createSidebarButton } from "../components";
import { buttonClickInMoreMenu, setDynamicUrl } from "../utils";

export const lists: SidebarButtonDefinition = () =>
    createSidebarButton({
        id: "lists",
        svg: () => <path d={SIDEBAR_BUTTON_ICON.lists.unselected}></path>,
        url: () => {
            return setDynamicUrl(
                "lists",
                `[data-testid="SideNav_AccountSwitcher_Button"] [data-testid^="UserAvatar-Container-"]`,
                (elem) => {
                    return `/${elem.getAttribute("data-testid").replace("UserAvatar-Container-", "")}/lists`;
                },
            );
        },
        onclick: (e: Event) => {
            e?.preventDefault?.();
            buttonClickInMoreMenu(`[href$="/lists"]`);
        },
    });
