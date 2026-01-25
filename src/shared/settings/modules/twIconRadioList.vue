<template>
    <!-- defaultRadioBtnがテキストか否かで変える(一応) -->
    <RadioButton style="gap: 15px" v-if="defaultRadioBtn.isText" id="twitterIcon.icon" :valueName="defaultRadioBtn.radioName" :name="getSettingI18n('twitterIcon.icon', 'nomal')" />
    <IconRadioButton v-if="!defaultRadioBtn.isText" id="twitterIcon.icon" :valueName="defaultRadioBtn.radioName" :name="getSettingI18n('twitterIcon.icon', 'nomal')" :icon="defaultRadioBtn.svgComponent" />
    <div style="display: flex; align-items: center; justify-content: space-between">
        <span style="margin-left: 28px">{{ translate("twitterIcon-preset") }}</span>
        <div>
            <div style="display: flex; gap: 10px">
                <template v-for="i in presetsRadioButtonsIconAvailable" :key="i.radioName">
                    <IconRadioButton v-if="i.svgComponent" id="twitterIcon.icon" :valueName="i.radioName" :name="getSettingI18n('twitterIcon.icon', i.radioName)" :icon="i.svgComponent" />
                    <IconRadioButtonBase64Support v-if="i.base64Img" id="twitterIcon.icon" :valueName="i.radioName" :name="getSettingI18n('twitterIcon.icon', i.radioName)" :base64-img="i.base64Img" />
                </template>
            </div>
            <!-- アイコンが利用不可なものがあるならdetailsboxメニューに追いやる -->
            <details v-if="presetsRadioButtonsText.length !== 0">
                <summary style=" height: fit-content; margin-top: 6px; list-style: revert;list-style-type: revert">
                    {{ translate("twitterIcon-other") }}
                </summary>
                <RadioButton v-for="i in presetsRadioButtonsText" :key="i.radioName" id="twitterIcon.icon" :valueName="i.radioName" :name="getSettingI18n('twitterIcon.icon', i.radioName)" />
            </details>
        </div>
    </div>
    <!-- customRadioBtnがテキストか否かで(ry -->
    <RadioButton v-if="customRadioBtn.isText" id="twitterIcon.icon" :valueName="customRadioBtn.radioName" :name="getSettingI18n('twitterIcon.icon', 'custom')" />
    <IconRadioButton v-if="!customRadioBtn.isText" id="twitterIcon.icon" :valueName="customRadioBtn.radioName" :name="getSettingI18n('twitterIcon.icon', 'custom')" :icon="customRadioBtn.svgComponent" />
</template>

<script setup lang="ts">
import { Component } from "vue";
import RadioButton from "@shared/options/components/RadioButton.vue";
import IconRadioButton from "@shared/options/components/IconRadioButton.vue";
import IconRadioButtonBase64Support from "@shared/options/components/IconRadioButtonBase64Support.vue";
import { translate } from "@content/i18n";
import { getSettingI18n } from "@content/settings";

export interface twIconsRadioListProps {
    radioName: "nomal" | "invisible" | "dog" | "twitter" | "twitterIcon-X" | "twitterIcon-XDaruma" | "custom";
    // テキストの場合iconNameのTUICDataでI18Nから取ってくるので情報いらない
    isText: boolean;
    // アイコンの場合どっちか
    base64Img?: string;
    svgComponent?: Component;
}

const props = defineProps<{
    iconsList: twIconsRadioListProps[];
}>();
// デフォルトが一番上、カスタムが一番下、プリセットが真ん中
// なのでプリセット以外を特別扱いすることにする
// ただ、規定の手順を踏んでTUICDataのtwitterIcon.all等を変更した場合、自動でプリセット欄が増えるようにする

// nomal
const defaultRadioBtn = props.iconsList.find((btn) => btn.radioName === "nomal");
// custom
const customRadioBtn = props.iconsList.find((btn) => btn.radioName === "custom");
// preset
const presetsRadioButtons = props.iconsList.filter((btn) => btn.radioName !== "nomal" && btn.radioName !== "custom");
// プリセットでかつアイコンが利用可
const presetsRadioButtonsIconAvailable = presetsRadioButtons.filter((btn) => !btn.isText);
// プリセットでかつアイコンが利用不可
const presetsRadioButtonsText = presetsRadioButtons.filter((btn) => btn.isText);
</script>
