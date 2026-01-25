let fixedDMBox = false;

export function fixTwittersBugs() {
    if (!fixedDMBox) {
        const dmBox = document.querySelector(`[data-testid="DMDrawerHeader"]`);
        if (dmBox) {
            if (dmBox.querySelector(`[d="M12 11.59L3.96 3.54 2.54 4.96 12 14.41l9.46-9.45-1.42-1.42L12 11.59zm0 7l-8.04-8.05-1.42 1.42L12 21.41l9.46-9.45-1.42-1.42L12 18.59z"]`)) {
                dmBox.querySelector<HTMLDivElement>(`div[role="button"]+div[role="button"]`)?.click();
                window.setTimeout(() => {
                    document.querySelector<HTMLDivElement>(`[data-testid="DMDrawerHeader"] div[role="button"]+div[role="button"]`)?.click();
                }, 100);
            }
            fixedDMBox = true;
        }
    }

    for (const elem of document.querySelectorAll(`[data-testid="messageEntry"] > div > div~div:not(.TUICOriginalContent) > div:not([role="presentation"])
                                                    :is(.r-1sv84sj, .r-144un9c, .r-11rk87y, .r-1b5uinu, .r-l3vzaz)`)) {
        elem.classList.remove("r-1sv84sj", "r-144un9c", "r-11rk87y", "r-1b5uinu", "r-l3vzaz");
    }
}
