<template>
    <div>
        <CheckBoxList id="profileSetting.tabs" />

        <SectionHeadingSecond title-i18-n="profileSetting-profileInitialTab-settingTitle" />
        <RadioButtonList id="profileSetting.profileInitialTab" />

        <SectionHeadingSecond title-i18-n="common-hidebelow" />
        <CheckBoxList id="profileSetting.invisible" />

        <SectionHeadingSecond title-i18-n="profileSetting-followersListButtons-settingTitle" />
        <UpDownList id="profileSetting.followersListButtons" />
        <CheckBoxList id="profileSetting.followersListButtonsOptions" />
    </div>
</template>

<script setup lang="ts">
import SectionHeadingSecond from "../components/SectionHeadingSecond.vue";
import CheckBoxList from "@shared/options/components/CheckBoxList.vue";
import RadioButtonList from "@shared/options/components/RadioButtonList.vue";
import UpDownList from "@shared/options/components/UpDownList.vue";
</script>
