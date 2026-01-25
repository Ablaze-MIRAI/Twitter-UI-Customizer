import { waitForElement } from "@content/utils/element";

export const buttonClickInMoreMenu = async (selector: string) => {
    (await waitForElement<HTMLAnchorElement>(`[data-testid="AppTabBar_More_Menu"] > div > div`))[0].click();
    const foundElem = (await waitForElement<HTMLAnchorElement>(`:is([role="group"],[data-testid="Dropdown"]) ${selector}`))[0];
    foundElem.click();
    (await waitForElement<HTMLAnchorElement>(`[data-testid="AppTabBar_More_Menu"] > div > div`))[0].click();
    setTimeout(() => {
        if (document.querySelector(`[role="menu"]`))
            document.querySelector<HTMLDivElement>(`[data-testid="AppTabBar_More_Menu"] > div > div`)?.click();
    }, 500);
    if (!foundElem) {
        return false;
    }
    return true;
};

export const setDynamicUrl = (id: string, selector: string, setURLWay: (arg0: HTMLElement) => string) => {
    const elem = document.querySelector<HTMLElement>(selector);
    if (elem) {
        return setURLWay(elem);
    } else {
        (async () => {
            await waitForElement(selector);
            const elem = document.querySelector<HTMLLinkElement>(`#TUICSidebar_${id}`);
            if (elem) {
                elem.href = setURLWay(document.querySelector(selector));
            }
        })();
        return "";
    }
};
