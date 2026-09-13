<template>
    <div>
        <SectionHeadingSecond title-i18-n="common-hidebelow" />
        <CheckBoxList id="invisibleItems" />

        <SectionHeadingSecond title-i18-n="settingPerformance-settingTitle" />
        <CheckBoxList id="performanceSettings" />

        <SectionHeadingSecond title-i18-n="customCSS-settingTitle" />
        <customCSS />
    </div>
</template>

<script setup lang="ts">
import SectionHeadingSecond from "../components/SectionHeadingSecond.vue";
import CheckBoxList from "@shared/options/components/CheckBoxList.vue";
import customCSS from "@shared/options/modules/customCSS.vue";
</script>
