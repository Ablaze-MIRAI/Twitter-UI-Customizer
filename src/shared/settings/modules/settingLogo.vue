<template>
    <div>
        <div>
            <settingSubTitle i18n="twitterIcon-settingTitle" />
            <twIconRadioList :icons-list="twitterLogosList" />

            <settingSubtitle2 style="margin: 0; margin-top: 18px" title-i-18-n="twitterIcon-usedIcon" />
            <UploadImageFile />
            <CheckBoxList id="twitterIcon.options" />
        </div>
    </div>
</template>

<script setup lang="ts">
import ICON_HOME_TUIC from "@shared/icons/home/home_tuic.svg?component";
import ICON_HOME_TWITTER from "@shared/icons/home/home_twitter.svg?component";
import ICON_HOME_X from "@shared/icons/home/home_x.svg?component";
import ICON_COMMON_NONE from "@shared/icons/common/none.svg?component";
import ICON_BRAND_TWITTER from "@shared/icons/brand/twitter.svg?component";
import ICON_BRAND_X from "@shared/icons/brand/x.svg?component";
import ICON_X_DARUMA from "@shared/icons/brand/xdaruma.svg?component";
import { DOG as ICON_DOG } from "@shared/icons";
import CheckBoxList from "@shared/options/components/CheckBoxList.vue";
import settingSubTitle from "@shared/options/components/textParts/settingSubTitle.vue";
import settingSubtitle2 from "../components/settingSubtitle2.vue";
import { Component } from "vue";
import twIconRadioList, { twIconsRadioListProps } from "./twIconRadioList.vue";
import UploadImageFile from "@shared/options/components/UploadImageFile.vue";

const iconsList: Component[] = [ICON_HOME_X, ICON_HOME_TWITTER, ICON_HOME_TUIC];

const twitterLogosList: twIconsRadioListProps[] = [
    {
        radioName: "nomal",
        isText: true,
    },
    {
        radioName: "invisible",
        isText: false,
        svgComponent: ICON_COMMON_NONE,
    },
    {
        radioName: "twitterIcon-X",
        isText: false,
        svgComponent: ICON_BRAND_X,
    },
    {
        radioName: "twitter",
        isText: false,
        svgComponent: ICON_BRAND_TWITTER,
    },
    {
        // TODO: base64対応後設定
        radioName: "dog",
        isText: false,
        base64Img: chrome.runtime.getURL(ICON_DOG),
    },
    {
        radioName: "twitterIcon-XDaruma",
        isText: false,
        svgComponent: ICON_X_DARUMA,
    },
    {
        radioName: "custom",
        isText: true,
    },
];
</script>
