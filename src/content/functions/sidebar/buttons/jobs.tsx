import type { SidebarButtonDefinition } from "../types";
import { SIDEBAR_BUTTON_ICON } from "@shared/icons";
import { createSidebarButton } from "../components";
import { buttonClickInMoreMenu } from "../utils";

export const jobs: SidebarButtonDefinition = () =>
    createSidebarButton({
        id: "jobs",
        svg: () => <path d={SIDEBAR_BUTTON_ICON.jobs.unselected}></path>,
        url: "/jobs/",
        onclick: (e: Event) => {
            e?.preventDefault?.();
            buttonClickInMoreMenu(`[href="/jobs"]`);
        },
    });
