<template>
    <IconButton i18n="settingUI-restoreDefaultAll" :icon="ICON" class="TUIC_setting_defaultprefbutton" @click="setDefault" />
</template>

<script setup vapor lang="ts">
import { TUICI18N } from "@modules/i18n";
import { waitForElement } from "@modules/utils/controlElements";
import { getPref, setPref, mergeDefaultPref, savePref } from "@modules/pref";
import { isSafemode } from "@content/modules/settings/safemode";
import { Dialog } from "@shared/tlui/components/Dialog";
import { ButtonComponent } from "@shared/tlui/components/ButtonComponent";
import { titleObserverFunction } from "@modules/observer/titleObserver";
import { updateClasses } from "@modules/htmlClass/classManager";
import ICON_RESET from "@content/icons/common/reset.svg?component";
import IconButton from "@shared/settings/components/IconButton.vue";

const ICON = ICON_RESET;

const setDefault = async () => {
    await waitForElement("#layers");
    const dialog = new Dialog(TUICI18N.get("common-confirm"));
    dialog
        .addComponents([
            TUICI18N.get("settingUI-restoreDefaultAll-confirm"),
            new ButtonComponent(TUICI18N.get("common-yes"), () => {
                dialog.close();
                const defaultPref = mergeDefaultPref({});
                setPref("", defaultPref);
                savePref();

                if (isSafemode) {
                    location.href = `${location.protocol}//${location.hostname}`;
                } else {
                    document.querySelector("#TUIC_setting").remove();
                    updateClasses();
                    titleObserverFunction();
                    if (!getPref("XToTwitter.XtoTwitter") && document.title.endsWith(" / Twitter")) {
                        document.title = document.title.replace(" / Twitter", " / X");
                    }
                }
            }),
            new ButtonComponent(
                TUICI18N.get("common-no"),
                () => dialog.close(),

                {
                    invertColor: true,
                },
            ),
        ])
        .open();
};
</script>
