<template>
    <div>
        <div id="TUICSelectedColorType">
            <input type="radio" name="TUICColorType" value="buttonColor" id="TUICColorType-Base" class="TUICColorSettingRadio" @change="ColorSettingRadio" checked />
            <label class="TUIC_setting_button TUIC_setting_button_width TUICSettingRadioTypeBigButton" for="TUICColorType-Base" style="background: linear-gradient(200deg, #fff 0%, #fff 50%, #d9d9d9 50%, #d9d9d9 100%)">
                <span>
                    <span>{{ TUICI18N.get("settingColors-select-base") }}</span>
                </span>
            </label>
            <input type="radio" name="TUICColorType" value="buttonColorLight" id="TUICColorType-Light" class="TUICColorSettingRadio" @change="ColorSettingRadio" />
            <label class="TUIC_setting_button TUIC_setting_button_width TUICSettingRadioTypeBigButton" for="TUICColorType-Light" style="background-color: rgb(255 255 255)">
                <span>
                    <span>{{ TUICI18N.get("settingColors-select-light") }}</span>
                </span>
            </label>
            <input type="radio" name="TUICColorType" value="buttonColorDark" id="TUICColorType-Dark" class="TUICColorSettingRadio" @change="ColorSettingRadio" />
            <label class="TUIC_setting_button TUIC_setting_button_width TUICSettingRadioTypeBigButton" for="TUICColorType-Dark" style="background-color: rgb(0 0 0)">
                <span>
                    <span>{{ TUICI18N.get("settingColors-select-dark") }} </span>
                </span>
            </label>
        </div>
        <div>
            <span class="text-white font-tw wrap-break-word min-w-[0px] twcss-text-explicit TUIC_setting_text TUIC_setting_color_select_info">{{ TUICI18N.get("settingColors-select-explain") }} </span>
        </div>
        <br />
        <button class="TUIC_setting_text TUIC_setting_button TUICEasySettingButtons TUIC_resetOnly_colorSettings" style="margin-top: 10px; margin-bottom: 10px" @click="setDefaultTwitterColor">
            {{ TUICI18N.get("settingColors-newTwitterColor") }}
        </button>
    </div>
    <br />
    <hr class="TUIC_setting_divider TUIC_setting_divider_nomargin" />
    <ColorsList />
</template>

<script setup vapor lang="ts">
import { TUICI18N } from "@modules/i18n";
import { isSafemode } from "@content/modules/settings/safemode";

import ColorsList from "../components/ColorsList.vue";

import { getPref, setPref, savePref, mergePref } from "@modules/pref";

import { useStore } from "../store";
import { ColorData } from "@shared/sharedData";
import { updateClasses } from "@modules/htmlClass/classManager";

const ColorSettingRadio = (event) => {
    const store = useStore();
    store.editingColorType = event.currentTarget.getAttribute("value");
};

const setDefaultTwitterColor = () => {
    const importPref = structuredClone(ColorData.defaultXColors);
    setPref("", mergePref(getPref(""), importPref));
    savePref();
    if (!isSafemode) {
        document.querySelector("#TUIC_setting").remove();
    }
    updateClasses();
};
</script>

<style scoped></style>
