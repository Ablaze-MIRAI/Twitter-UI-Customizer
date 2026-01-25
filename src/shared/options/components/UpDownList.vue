<template>
    <div :TUICUDBox="id">
        <div class="TUIC_setting_UpdownList_listContainer">
            <h2 style="font-size: 15px" class="text-white font-tw wrap-break-word min-w-[0px] twcss-text-explicit TUIC_setting_text TUICUpDownTitle">
                {{ translate("settingUI-upDownList-visible") }}
            </h2>
            <div id="TUIC_visible" class="TUIC_selectbox TUICSelectBox-left" :style="{ '--contentCount': _contentCount }">
                <div v-for="i in list" :key="i" :value="i" :id="i" class="TUICUpDownContent" @click="clickEv(i)" :TUICSelectedUpDownContent="i === selectedElem">
                    <span>{{ translate(getSettingI18n(id, i)) }}</span>
                </div>
            </div>
        </div>
        <div class="UpDownButtons" style="text-align: center">
            <!--Spacer-->
            <div style="height: 32px"></div>
            <template v-for="item in UpdownButtonFuncs" :key="item.btnAction">
                <button @click="item.func" :class="['TUIC_icon_button_con', item.btnAction]" :title="translate(item.tooltiptag)">
                    <component :is="item.iconSrc" />
                </button>
                <hr v-if="item.nextHr" class="TUIC_setting_UpdownListBtnDivider" />
            </template>
        </div>
        <div class="TUIC_setting_UpdownList_listContainer">
            <h2 style="font-size: 15px" class="text-white font-tw wrap-break-word min-w-[0px] twcss-text-explicit TUIC_setting_text TUICUpDownTitle">
                {{ translate("settingUI-upDownList-invisible") }}
            </h2>
            <div id="TUIC_invisible" class="TUIC_selectbox TUICSelectBox-right" :style="{ '--contentCount': _contentCount }">
                <div
                    v-for="i in getSettingIDs(id).filter((value: string) => {
                        return !list.includes(value);
                    })"
                    :key="i"
                    :value="i"
                    :id="i"
                    class="TUICUpDownContent"
                    @click="clickEv(i)"
                    :TUICSelectedUpDownContent="i === selectedElem"
                >
                    <span>{{ translate(getSettingI18n(id, i)) }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// new URL("./img.png", import.meta.url).href;

import ARROW_LEFT from "@shared/icons/arrow_cutter/arrow_toleft.svg?component";
import ARROW_RIGHT from "@shared/icons/arrow_cutter/arrow_toright.svg?component";
import ARROW_UP from "@shared/icons/arrow_cutter/arrow_up.svg?component";
import ARROW_DOWN from "@shared/icons/arrow_cutter/arrow_down.svg?component";
import RESET from "@shared/icons/common/reset.svg?component";

// import { ARROW_LEFT, ARROW_UP, ARROW_DOWN, ARROW_RIGHT, RESET } from "@content/data/icons";

import { translate } from "@content/i18n";
import { getPref, setPref, savePref, getSettingI18n, SettingKeys, getSettingIDs, getDefaultPref } from "@content/settings";

import { cleanModifiedElements } from "@content/applyCSS";

const props = defineProps<{ id: SettingKeys }>();

const list = ref([]);
list.value = getPref(props.id);
const selectedElem = ref("");

const clickEv = (selectItem) => {
    selectedElem.value = selectItem;
};

const apply2Settings = () => {
    const id = props.id;
    setPref(id, list.value);
    savePref();
    cleanModifiedElements();
};

const toLeft = () => {
    if (selectedElem.value && !list.value.includes(selectedElem.value)) {
        list.value.push(selectedElem.value);
        apply2Settings();
    }
};

const toRight = () => {
    if (selectedElem.value && list.value.includes(selectedElem.value)) {
        list.value = list.value.filter((v) => v !== selectedElem.value);
        apply2Settings();
    }
};

const toUp = () => {
    const selectedItem = selectedElem.value;
    if (selectedItem && list.value.includes(selectedItem)) {
        const idx = list.value.findIndex((v) => v === selectedItem);
        if (idx > 0) {
            [list.value[idx - 1], list.value[idx]] = [list.value[idx], list.value[idx - 1]];
        }
        apply2Settings();
    }
};

const toDown = () => {
    const selectedItem = selectedElem.value;
    if (selectedItem && list.value.includes(selectedItem)) {
        const idx = list.value.findIndex((v) => v === selectedItem);
        if (idx < list.value.length - 1) {
            [list.value[idx + 1], list.value[idx]] = [list.value[idx], list.value[idx + 1]];
        }
        apply2Settings();
    }
};

const toDefault = () => {
    const settingId = props.id;
    list.value = structuredClone(getDefaultPref(settingId).data);
    selectedElem.value = "";
    apply2Settings();
};

const UpdownButtonFuncs = [
    {
        iconSrc: ARROW_LEFT,
        btnAction: "TUIC_up_down_list_to_left",
        func: toLeft,
        tooltiptag: "settingUI-upDownList-toLeft",
        nextHr: false,
    },
    {
        iconSrc: ARROW_RIGHT,
        btnAction: "TUIC_up_down_list_to_right",
        func: toRight,
        tooltiptag: "settingUI-upDownList-toRight",
        nextHr: true,
    },
    {
        iconSrc: ARROW_UP,
        btnAction: "TUIC_up_down_list_to_up",
        func: toUp,
        tooltiptag: "settingUI-upDownList-toUp",
        nextHr: false,
    },
    {
        iconSrc: ARROW_DOWN,
        btnAction: "TUIC_up_down_list_to_down",
        func: toDown,
        tooltiptag: "settingUI-upDownList-toDown",
        nextHr: true,
    },
    {
        iconSrc: RESET,
        btnAction: "TUIC_up_down_list_to_default",
        func: toDefault,
        tooltiptag: "settingUI-upDownList-restoreDefault",
        nextHr: false,
    },
];

const UDALL = getSettingIDs(props.id);
let _contentCount = 5;
if (UDALL.length > 5) {
    _contentCount = UDALL.length;
}
</script>

<style scoped></style>
