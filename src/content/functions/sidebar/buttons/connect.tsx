import type { SidebarButtonDefinition } from "../types";
import { SIDEBAR_BUTTON_ICON } from "@shared/icons";
import { createSidebarButton } from "../components";

export const connect: SidebarButtonDefinition = () =>
    createSidebarButton({
        id: "connect",
        svg: () => <path d={SIDEBAR_BUTTON_ICON.connect.unselected}></path>,
        url: "/i/connect_people",
        onclick: (e: Event) => {
            e?.preventDefault?.();
            //buttonClickInMoreMenu(`[href="/i/connect_people"]`);
            document
                .querySelector<HTMLAnchorElement>(
                    `[data-testid="sidebarColumn"] [role="complementary"] [href^="/i/connect_people"][role="link"]`,
                )
                .click();
        },
    });
