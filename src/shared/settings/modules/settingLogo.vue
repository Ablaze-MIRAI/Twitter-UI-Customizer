<template>
    <div>
        <IconSelector :icons-list="twitterLogosList" />
        <IconUploader />

        <SectionHeadingSecond title-i-18-n="twitterIcon-usedIcon" />
        <CheckBoxList id="twitterIcon.options" />
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
import SectionHeadingSecond from "../components/SectionHeadingSecond.vue";
import { Component } from "vue";
import IconSelector, { IPresetIcon } from "./logo/IconSelector.vue";
import IconUploader from "./logo/IconUploader.vue";

const iconsList: Component[] = [ICON_HOME_X, ICON_HOME_TWITTER, ICON_HOME_TUIC];

const twitterLogosList: IPresetIcon[] = [
    {
        radioName: "nomal",
        isText: true,
    },
    {
        radioName: "invisible",
        isText: false,
        icon: ICON_COMMON_NONE,
    },
    {
        radioName: "twitterIcon-X",
        isText: false,
        icon: ICON_BRAND_X,
    },
    {
        radioName: "twitter",
        isText: false,
        icon: ICON_BRAND_TWITTER,
    },
    {
        radioName: "dog",
        isText: false,
        icon: chrome.runtime.getURL(ICON_DOG),
    },
    {
        radioName: "twitterIcon-XDaruma",
        isText: false,
        icon: ICON_X_DARUMA,
    },
    {
        radioName: "custom",
        isText: true,
    },
];
</script>
