<template>
    <div>
        <settingSubtitle2 title-i18-n="common-hidebelow" />
        <CheckBoxList id="invisibleItems" />

        <settingSubtitle2 title-i18-n="settingPerformance-settingTitle" />
        <CheckBoxList id="performanceSettings" />

        <settingSubtitle2 title-i18-n="customCSS-settingTitle" />
        <customCSS />
    </div>
</template>

<script setup vapor lang="ts">
import settingSubtitle2 from "../components/settingSubtitle2.vue";
import CheckBoxList from "@shared/options/components/CheckBoxList.vue";
import customCSS from "@shared/options/modules/customCSS.vue";
</script>
