import type { SidebarButtonDefinition } from "../types";
import { SIDEBAR_BUTTON_ICON } from "@shared/icons";
import { createSidebarButton } from "../components";
import { waitForElement } from "@content/utils/element";

export const drafts: SidebarButtonDefinition = () =>
    createSidebarButton({
        id: "drafts",
        svg: () => <path d={SIDEBAR_BUTTON_ICON.drafts.unselected}></path>,
        url: "/compose/tweet/unsent/drafts",
        onclick: async (e: Event) => {
            e?.preventDefault?.();
            //buttonClickInMoreMenu( `[href="/compose/tweet/unsent/drafts"]`);
            document.querySelector<HTMLElement>(`[href="/compose/tweet"],[href="/compose/post"]`).click();
            (await waitForElement<HTMLButtonElement>(`[data-testid="unsentButton"]`))[0].click();
        },
    });
