import { isSafemode } from "@content/settings/ui/safemode";
import { getPref, setPref, savePref, mergePref } from "@content/settings";
import { setTitleObserver } from "@content/functions/replaceTitleX";
import { cleanModifiedElements } from "@content/applyCSS";

export const XToTwitterRestoreIcon = () => {
    const importPref = {
        sidebarSetting: { buttonConfig: { birdGoBack: true } },
        twitterIcon: {
            options: {
                faviconSet: true,
            },
            icon: "twitter",
        },
    };
    setPref("", mergePref(getPref(""), importPref));
    savePref();
    cleanModifiedElements();
    setTitleObserver();
    if (!isSafemode) {
        document.querySelector("#TUIC_setting").remove();
    }
    if (!getPref("XToTwitter.XToTwitter") && document.title.endsWith(" / Twitter")) {
        document.title = document.title.replace(" / Twitter", " / X");
    }
};
