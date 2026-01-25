import type { SidebarButtonDefinition } from "../types";
import { createSidebarButton } from "../components";
import { buttonClickInMoreMenu, setDynamicUrl } from "../utils";
import { SIDEBAR_BUTTON_ICON } from "../../../../shared/icons";

export const communities: SidebarButtonDefinition = () =>
    createSidebarButton({
        id: "communities",
        svg: () => (
            <path d={SIDEBAR_BUTTON_ICON.communities.unselected}></path>
        ),
        url: () => {
            return setDynamicUrl(
                "communities",
                `[data-testid="SideNav_AccountSwitcher_Button"] [data-testid^="UserAvatar-Container-"]`,
                (elem) => {
                    return `/${elem.getAttribute("data-testid").replace("UserAvatar-Container-", "")}/communities`;
                },
            );
        },
        onclick: (e: Event) => {
            e.preventDefault();
            buttonClickInMoreMenu(`[href$="/communities"]`);
        },
    });
