<template>
    <div :class="['TUIC_setting_color_colmn', !isDefault ? 'TUIC_ISNOTDEFAULT' : '', `TUICColorBoxRoot`]" ref="colorRoot">
        <h4 class="text-white wrap-break-word min-w-[0px] twcss-text-explicit TUIC_setting_text">
            {{ translate(text) }}
        </h4>
        <div class="TUIC_setting_input_container">
            <template v-if="ColorData.defaultTUICColor.colors[props.id]?.ldColor && store.editingColorType == 'buttonColor'">
                <label class="text-white font-tw wrap-break-word min-w-[0px] twcss-text-explicit TUIC_setting_text" style="font-size: 10px"> {{ translate("settingColors-pleaseLD") }} </label><br />
            </template>
            <template v-else>
                <ColorResetButton :btn-id="`${id}-${type}-default`" :btn-title="translate('settingUI-colorPicker-restoreDefault')" @clicked-btn="resetBtnClicked" />
                <RoundedColorPicker :input-id="`${id}-${type}`" :input-color-value="TUICColor1" @value-changed="colorChanged" ref="rColorPicker" />
                <TransparentToggleButton :btn-id="`${id}-${type}`" :is-checked="TUIC_color[3] == '0'" @btn-clicked="TransparentToggleButtonClicked" :title-string="translate(`settingUI-colorPicker-transparent`)" ref="transparentButton" />
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { translate } from "@shared/i18n";

import RoundedColorPicker from "@shared/settings/components/RoundedColorPicker.vue";
import TransparentToggleButton from "@shared/settings/components/TransparentToggleButton.vue";
import ColorResetButton from "@shared/settings/components/ColorResetButton.vue";
import { getPref, savePref, setPref, deletePref } from "@content/settings";
import { injectSettingsStyle } from "@content/applyCSS";

import { useStore } from "../store";
import { ColorData } from "@shared/sharedData";
import { getColorFromPref, hex2rgb, rgb2hex } from "@content/utils/color";

const props = defineProps<{
    id: keyof typeof ColorData.defaultTUICColor.colors;
    type: "color" | "background" | "border";
    text: string;
}>();

const transparentButton = ref<InstanceType<typeof TransparentToggleButton>>(null);
const colorRoot = ref<HTMLDivElement>(null);
const rColorPicker = ref<InstanceType<typeof RoundedColorPicker>>(null);

const store = useStore();

function colorChanged(value: string) {
    changeColor(props.id, props.type, store.editingColorType, value);
}
function TransparentToggleButtonClicked(value: boolean) {
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
    return rgb2hex(TUIC_color.value.slice(0, 3).map((elem) => Number(elem)) as [number, number, number]);
});

function defaultColor(colorAttr: typeof props.id, colorType: typeof props.type, colorKind: typeof store.editingColorType) {
    if (getPref(`${colorKind}.${colorAttr}`) && getPref(`${colorKind}.${colorAttr}.${colorType}`)) deletePref(`${colorKind}.${colorAttr}.${colorType}`);

    const TUIC_color = getColorFromPref(colorAttr, colorType, colorKind).replace("rgba(", "").replace(")", "").replaceAll(" ", "").split(",");
    const TUICColor1 = rgb2hex([Number(TUIC_color[0]), Number(TUIC_color[1]), Number(TUIC_color[2])]);

    // 各子コンポーネントの関数を呼び出し、デフォルトに設定した色を反映します
    rColorPicker.value.setInputValue(TUICColor1);
    transparentButton.value.setCheckedValue(TUIC_color[3] === "0");
    colorRoot.value.classList.add("TUIC_ISNOTDEFAULT");

    savePref();

    injectSettingsStyle();
}

function changeColor(colorAttr: typeof props.id, colorType: typeof props.type, colorKind: typeof store.editingColorType, colorPickerVal: string) {
    const colorValue = hex2rgb(colorPickerVal);
    const isChecked = transparentButton.value.isChecked;

    setPref(`${colorKind}.${colorAttr}.${colorType}`, `rgba(${colorValue[0]}, ${colorValue[1]}, ${colorValue[2]}, ${isChecked ? 0 : 1})`);

    // CHECKの出現？
    colorRoot.value.classList.remove("TUIC_ISNOTDEFAULT");

    savePref();

    injectSettingsStyle();
}

function changeColorCheck(colorAttr: typeof props.id, colorType: typeof props.type, colorKind: typeof store.editingColorType, isChecked: boolean) {
    const colorValue = getColorFromPref(props.id, props.type, store.editingColorType).replace("rgba(", "").replace(")", "").replaceAll(" ", "").split(",");

    setPref(`${colorKind}.${colorAttr}.${colorType}`, `rgba(${colorValue[0]}, ${colorValue[1]}, ${colorValue[2]}, ${isChecked ? 0 : 1})`);
    colorRoot.value.classList.remove("TUIC_ISNOTDEFAULT");

    savePref();

    injectSettingsStyle();
}
</script>

<style scoped>
.TUIC_ISNOTDEFAULT {
    :deep(.TUICDefaultColor:is(:hover, :focus-visible, :active)) {
        background: transparent;
    }

    &:not(:last-of-type) {
        /* margin-bottom: calc(12px + 1em); */
    }
    :deep(.TUICDefaultColor .TUICButtonRest_innersvg__container svg) {
        opacity: 0.6;
    }

    :deep(button.TUICDefaultColor) {
        cursor: not-allowed;
    }
}

/* 色選択 */
.TUIC_setting_color_colmn {
    display: flex;
    align-items: center;
    justify-content: space-between;

    > h4 {
        margin: 0 !important;
        font-size: 15px;
        font-weight: 700 !important;
        color: color-mix(in srgb, var(--TUIC-container-background), var(--twitter-TUIC-color) 40%);
    }

    > .TUIC_setting_input_container {
        display: flex;
        gap: 10px;
    }
}

/* 色設定項目の操作可能なオブジェクトのコンテナ */
.TUIC_setting_input_container {
    display: flex;
    align-items: center;
}
</style>
