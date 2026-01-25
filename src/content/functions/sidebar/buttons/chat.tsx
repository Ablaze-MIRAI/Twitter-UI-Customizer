import type { SidebarButtonDefinition } from "../types";
import { SIDEBAR_BUTTON_ICON } from "@shared/icons";
import { createSidebarButton } from "../components";
import { buttonClickInMoreMenu } from "../utils";

export const chat: SidebarButtonDefinition = () =>
    createSidebarButton({
        id: "chat",
        svg: () => <path d={SIDEBAR_BUTTON_ICON.chat.unselected}></path>,
        url: "/i/chat",
        onclick: (e: Event) => {
            e?.preventDefault?.();
            buttonClickInMoreMenu(`[href="/i/chat"]`);
        },
    });
