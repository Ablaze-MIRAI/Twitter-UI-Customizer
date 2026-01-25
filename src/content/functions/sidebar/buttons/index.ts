import type { SidebarButtonDefinition } from "../types";
import { topics } from "./topics";
import { lists } from "./lists";
import { communities } from "./communities";
import { drafts } from "./drafts";
import { connect } from "./connect";
import { display } from "./display";
import { muteAndBlock } from "./muteAndBlock";
import { bookmarks } from "./bookmarks";
import { settings } from "./settings";
import { jobs } from "./jobs";
import { spaces } from "./spaces";
// import { chat } from "./chat";

// TODO: スクリーンネームの取得処理が分散しているので、共通化する

export const sidebarButtonsData = {
    topics,
    lists,
    communities,
    drafts,
    connect,
    display,
    muteAndBlock,
    bookmarks,
    settings,
    jobs,
    spaces,
    /*chat,*/
} satisfies Record<string, SidebarButtonDefinition>;
