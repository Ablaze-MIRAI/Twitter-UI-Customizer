import { getPref } from "@content/settings";

// PC版の場合ユーザーID、スマホ版の場合アカウント切り替えボタンのaria-labelを格納
// (Delegate機能に対応するため)
let pinnedTab: string[] = [];
let prefCache = "";

export function pinningTab() {
    const prefValue = getPref("timeline.pinningTab");
    if (location.pathname !== "/home" || prefValue === "none") return;
    if (prefCache !== prefValue) {
        prefCache = prefValue;
        pinnedTab = [];
    }
    {
        const userIcon = document.querySelector(`[data-testid="DashButton_ProfileIcon_Link"]`);
        if (userIcon) {
            clickTab(userIcon.ariaLabel);
            return;
        }
    }
    {
        const userIcon = document.querySelector<HTMLElement>(`header [data-testid="SideNav_AccountSwitcher_Button"] [data-testid^="UserAvatar-Container-"]`);
        if (userIcon) {
            clickTab(userIcon.dataset.testid);
            return;
        }
    }
}

const orderOfTab = ["foryou", "following", "list1", "list2", "list3", "list4", "list5"];

// まだタブ固定処理をしていないアカウントのみ動かす
function clickTab(userID: string): boolean {
    if (pinnedTab.includes(userID)) return;
    const prefValue = getPref("timeline.pinningTab");
    if (!orderOfTab.includes(prefValue)) return;
    const tabElement = document.querySelector<HTMLButtonElement>(
        `:is([data-testid="TopNavBar"], [data-testid="primaryColumn"]) [role="navigation"] [data-testid="ScrollSnap-SwipeableList"] [data-testid="ScrollSnap-List"] > div[role="presentation"]:nth-child(${orderOfTab.indexOf(prefValue) + 1}) > [role="tab"]`,
    );
    if (tabElement) {
        tabElement.click?.();
        pinnedTab.push(userID);
    }
}
