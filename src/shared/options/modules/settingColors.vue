<template>
    <div>
        <div id="TUICSelectedColorType">
            <input type="radio" name="TUICColorType" value="buttonColor" id="TUICColorType-Base" class="TUICColorSettingRadio" @change="ColorSettingRadio" checked />
            <label class="TUIC_setting_button TUIC_setting_button_width TUICSettingRadioTypeBigButton" for="TUICColorType-Base" style="background: linear-gradient(200deg, #fff 0%, #fff 50%, #d9d9d9 50%, #d9d9d9 100%)">
                <span>
                    <span>{{ translate("settingColors-select-base") }}</span>
                </span>
            </label>
            <input type="radio" name="TUICColorType" value="buttonColorLight" id="TUICColorType-Light" class="TUICColorSettingRadio" @change="ColorSettingRadio" />
            <label class="TUIC_setting_button TUIC_setting_button_width TUICSettingRadioTypeBigButton" for="TUICColorType-Light" style="background-color: rgb(255 255 255)">
                <span>
                    <span>{{ translate("settingColors-select-light") }}</span>
                </span>
            </label>
            <input type="radio" name="TUICColorType" value="buttonColorDark" id="TUICColorType-Dark" class="TUICColorSettingRadio" @change="ColorSettingRadio" />
            <label class="TUIC_setting_button TUIC_setting_button_width TUICSettingRadioTypeBigButton" for="TUICColorType-Dark" style="background-color: rgb(0 0 0)">
                <span>
                    <span>{{ translate("settingColors-select-dark") }} </span>
                </span>
            </label>
        </div>
        <div>
            <span class="text-white font-tw wrap-break-word min-w-[0px] twcss-text-explicit TUIC_setting_text TUIC_setting_color_select_info">{{ translate("settingColors-select-explain") }} </span>
        </div>
        <br />
        <button class="TUIC_setting_text TUIC_setting_button TUICEasySettingButtons TUIC_resetOnly_colorSettings" style="margin-top: 10px; margin-bottom: 10px" @click="setDefaultTwitterColor">
            {{ translate("settingColors-newTwitterColor") }}
        </button>
    </div>
    <br />
    <hr class="TUIC_setting_divider TUIC_setting_divider_nomargin" />
    <ColorsList />
</template>

<script setup lang="ts">
import { translate } from "@shared/i18n";
import { isSafemode } from "@content/settings/ui/safemode";

import ColorsList from "../components/ColorsList.vue";

import { getPref, setPref, savePref, mergePref } from "@content/settings";

import { useStore } from "../store";
import { ColorData } from "@shared/sharedData";
import { cleanModifiedElements } from "@content/applyCSS";

const ColorSettingRadio = (event: Event) => {
    const store = useStore();
    store.editingColorType = (event.currentTarget as HTMLElement).getAttribute("value") as "buttonColor" | "buttonColorLight" | "buttonColorDark";
};

const setDefaultTwitterColor = () => {
    const importPref = structuredClone(ColorData.defaultXColors);
    setPref("", mergePref(getPref(""), importPref));
    savePref();
    if (!isSafemode) {
        document.querySelector("#TUICSettings")?.remove();
    }
    cleanModifiedElements();
};
</script>

<style scoped>
.TUICSettingRadioTypeBigButton {
    display: flex;
    flex: 1 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50px;
    font-size: 20px;
    border: 3px solid color-mix(in srgb, var(--TUIC-container-background), var(--twitter-TUIC-color) 10%);
    border-radius: 10px !important;

    > span {
        > span {
            /* font-family:
                Inter,
                -apple-system,
                BlinkMacSystemFont,
                Helvetica,
                Roboto,
                "Segoe UI",
                "Noto Sans" "Noto Sans JP",
                Meiryo,
                system-ui,
                sans-serif; */
            font-size: 15px;
            font-weight: 700;
            color: #fff;
            white-space: nowrap;
            mix-blend-mode: difference;
        }

        white-space: nowrap;
    }
}

.TUICColorSettingRadio {
    display: none;

    &:checked + .TUICSettingRadioTypeBigButton {
        border: 3px solid #1da1f2 !important;
    }

    &:not(:checked) + .TUICSettingRadioTypeBigButton {
        font-weight: 400;
        border: 3px solid color-mix(in srgb, var(--TUIC-container-background), var(--twitter-TUIC-color) 5%) !important;
    }
}

#TUICSelectedColorType {
    position: sticky;
    top: 0;
    z-index: 9999;
    display: flex;
    gap: 10px;
    padding-top: 20px;
    background-color: var(--TUIC-container-background);
}

.TUIC_setting_color_select_info {
    display: flex;
    padding: 0;
    margin: 20px 0 0;
    font-size: 15px;
    font-feature-settings: "palt";
    line-height: 1.4;
    color: rgb(113 118 124);
    letter-spacing: 1px;
}
</style>
