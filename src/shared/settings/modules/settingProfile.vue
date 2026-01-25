<template>
    <div>
        <CheckBoxList id="profileSetting.tabs" />

        <SettingSubtitle2 title-i18-n="profileSetting-profileInitialTab-settingTitle" />
        <RadioButtonList id="profileSetting.profileInitialTab" />

        <SettingSubtitle2 title-i18-n="common-hidebelow" />
        <CheckBoxList id="profileSetting.invisible" />

        <SettingSubtitle2 title-i18-n="profileSetting-followersListButtons-settingTitle" />
        <UpDownList id="profileSetting.followersListButtons" />
        <CheckBoxList id="profileSetting.followersListButtonsOptions" />
    </div>
</template>

<script setup vapor lang="ts">
import SettingSubtitle2 from "../components/settingSubtitle2.vue";
import CheckBoxList from "@shared/options/components/CheckBoxList.vue";
import RadioButtonList from "@shared/options/components/RadioButtonList.vue";
import UpDownList from "@shared/options/components/UpDownList.vue";
</script>
