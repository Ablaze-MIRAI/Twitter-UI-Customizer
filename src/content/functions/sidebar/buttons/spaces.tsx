import type { SidebarButtonDefinition } from "../types";
import { SIDEBAR_BUTTON_ICON } from "@shared/icons";
import { createSidebarButton } from "../components";
import { buttonClickInMoreMenu } from "../utils";

export const spaces: SidebarButtonDefinition = () =>
    createSidebarButton({
        id: "spaces",
        svg: () => <path d={SIDEBAR_BUTTON_ICON.spaces.unselected}></path>,
        url: "/i/spaces/start/",
        onclick: (e: Event) => {
            e?.preventDefault?.();
            buttonClickInMoreMenu(`[href="/i/spaces/start"]`);
        },
    });
