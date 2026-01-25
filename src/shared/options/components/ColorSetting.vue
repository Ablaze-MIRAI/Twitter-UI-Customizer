<template>
    <div :class="['TUIC_setting_color_colmn', !isDefault ? 'TUIC_ISNOTDEFAULT' : '', `TUICColorBoxRoot`]" ref="colorRoot">
        <h4 class="text-white wrap-break-word min-w-[0px] twcss-text-explicit TUIC_setting_text">
            {{ TUICI18N.get(text) }}
        </h4>
        <div class="TUIC_setting_input_container">
            <template v-if="ColorData.defaultTUICColor.colors[id]?.ldColor && store.editingColorType == 'buttonColor'">
                <label class="text-white font-tw wrap-break-word min-w-[0px] twcss-text-explicit TUIC_setting_text" style="font-size: 10px"> {{ TUICI18N.get("settingColors-pleaseLD") }} </label><br />
            </template>
            <template v-else>
                <ColorResetButton :btn-id="`${id}-${type}-default`" :btn-title="TUICI18N.get('settingUI-colorPicker-restoreDefault')" @clicked-btn="resetBtnClicked" />
                <RoundedColorPicker :input-id="`${id}-${type}`" :input-color-value="TUICColor1" @value-changed="colorChanged" ref="rColorPicker" />
                <TransparentToggleButton :btn-id="`${id}-${type}`" :is-checked="TUIC_color[3] == '0'" @btn-clicked="TransparentToggleButtonClicked" :title-string="TUICI18N.get(`settingUI-colorPicker-transparent`)" ref="transparentButton" />
            </template>
        </div>
    </div>
</template>

<script setup vapor lang="ts">
import { computed, ref } from "vue";
import { TUICI18N } from "@modules/i18n";

import RoundedColorPicker from "@shared/settings/components/RoundedColorPicker.vue";
import TransparentToggleButton from "@shared/settings/components/TransparentToggleButton.vue";
import ColorResetButton from "@shared/settings/components/ColorResetButton.vue";
import { getPref, savePref, setPref, deletePref } from "@modules/pref";
import { applySystemCss } from "@content/applyCSS";

import { useStore } from "../store";
import { ColorData } from "@shared/sharedData";
import { getColorFromPref, hex2rgb, rgb2hex } from "@content/modules/utils/color";

const props = defineProps<{
    id: string;
    type: string;
    text: string;
}>();

const transparentButton = ref(null);
const colorRoot = ref(null);
const rColorPicker = ref(null);

const store = useStore();

function colorChanged(value) {
    changeColor(props.id, props.type, store.editingColorType, value);
}
function TransparentToggleButtonClicked(value) {
    changeColorCheck(props.id, props.type, store.editingColorType, value);
}
function resetBtnClicked() {
    defaultColor(props.id, props.type, store.editingColorType);
}

// Prefにデータが保持されているか確認して、あるならデフォルトじゃない
const isDefault = computed(() => {
    return !!getPref(store.editingColorType)?.[props.id]?.[props.type];
});
// Prefから設定された色を取得(配列で[R: string, G: string, B: string]の形式)
// このコンポーネントを呼び出すときのpropsから取得する色の場所などが決定される
const TUIC_color = computed(() => {
    return getColorFromPref(props.id, props.type, store.editingColorType).replace("rgba(", "").replace(")", "").replaceAll(" ", "").split(",");
});
// TUIC_colorで取得した色をhex形式に変換して返す
const TUICColor1 = computed(() => {
    return rgb2hex(TUIC_color.value.slice(0, 3).map((elem) => Number(elem)));
});

function defaultColor(colorAttr, colorType, colorKind) {
    if (getPref(`${colorKind}.${colorAttr}`) && getPref(`${colorKind}.${colorAttr}.${colorType}`)) deletePref(`${colorKind}.${colorAttr}.${colorType}`);

    const TUIC_color = getColorFromPref(colorAttr, colorType, colorKind).replace("rgba(", "").replace(")", "").replaceAll(" ", "").split(",");
    const TUICColor1 = rgb2hex([Number(TUIC_color[0]), Number(TUIC_color[1]), Number(TUIC_color[2])]);

    // 各子コンポーネントの関数を呼び出し、デフォルトに設定した色を反映します
    rColorPicker.value.setInputValue(TUICColor1);
    transparentButton.value.setCheckedValue(TUIC_color[3] == 0);
    colorRoot.value.classList.add("TUIC_ISNOTDEFAULT");

    savePref();

    applySystemCss();
}

function changeColor(colorAttr, colorType, colorKind, colorPickerVal) {
    const colorValue = hex2rgb(colorPickerVal);
    const isChecked = transparentButton.value.checked;

    setPref(`${colorKind}.${colorAttr}.${colorType}`, `rgba(${colorValue[0]}, ${colorValue[1]}, ${colorValue[2]}, ${isChecked ? 0 : 1})`);

    // CHECKの出現？
    colorRoot.value.classList.remove("TUIC_ISNOTDEFAULT");

    savePref();

    applySystemCss();
}

function changeColorCheck(colorAttr, colorType, colorKind, isChecked) {
    const colorValue = getColorFromPref(props.id, props.type, store.editingColorType).replace("rgba(", "").replace(")", "").replaceAll(" ", "").split(",");

    setPref(`${colorKind}.${colorAttr}.${colorType}`, `rgba(${colorValue[0]}, ${colorValue[1]}, ${colorValue[2]}, ${isChecked ? 0 : 1})`);
    colorRoot.value.classList.remove("TUIC_ISNOTDEFAULT");

    savePref();

    applySystemCss();
}
</script>

<style scoped></style>
