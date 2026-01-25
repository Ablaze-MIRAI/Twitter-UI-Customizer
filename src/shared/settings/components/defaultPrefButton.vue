<template>
    <IconButton i18n="settingUI-restoreDefaultAll" :icon="ICON" class="TUIC_setting_defaultprefbutton" @click="setDefault" />
</template>

<script setup lang="ts">
import { translate } from "@content/i18n";
import { waitForElement } from "@content/utils/element";
import { getPref, setPref, mergeDefaultPref, savePref } from "@content/settings";
import { isSafemode } from "@content/settings/ui/safemode";
import { Dialog } from "@shared/tlui/components/Dialog";
import { ButtonComponent } from "@shared/tlui/components/ButtonComponent";
import { setTitleObserver } from "@content/functions/replaceTitleX";
import { cleanModifiedElements } from "@content/applyCSS";
import ICON_RESET from "@shared/icons/common/reset.svg?component";
import IconButton from "@shared/settings/components/IconButton.vue";

const ICON = ICON_RESET;

const setDefault = async () => {
    await waitForElement("#layers");
    const dialog = new Dialog(translate("common-confirm"));
    dialog
        .addComponents([
            translate("settingUI-restoreDefaultAll-confirm"),
            new ButtonComponent(translate("common-yes"), () => {
                dialog.close();
                const defaultPref = mergeDefaultPref({});
                setPref("", defaultPref);
                savePref();

                if (isSafemode) {
                    location.href = `${location.protocol}//${location.hostname}`;
                } else {
                    document.querySelector("#TUIC_setting").remove();
                    cleanModifiedElements();
                    setTitleObserver();
                    if (!getPref("XToTwitter.XtoTwitter") && document.title.endsWith(" / Twitter")) {
                        document.title = document.title.replace(" / Twitter", " / X");
                    }
                }
            }),
            new ButtonComponent(
                translate("common-no"),
                () => dialog.close(),

                {
                    invertColor: true,
                },
            ),
        ])
        .open();
};
</script>
