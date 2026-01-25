<template>
    <div>
        <settingSubtitle2 style="margin-top: 0" title-i-18-n="timeline-pinningTab" />
        <RadioButtonList id="timeline.pinningTab" /><br />

        <settingSubtitle2 style="margin-top: 0" title-i18-n="common-hidebelow" />
        <CheckBoxList id="timeline" />
    </div>
</template>

<script setup vapor lang="ts">
import settingSubtitle2 from "../components/settingSubtitle2.vue";
import CheckBoxList from "@shared/options/components/CheckBoxList.vue";
import RadioButtonList from "@shared/options/components/RadioButtonList.vue";
</script>
