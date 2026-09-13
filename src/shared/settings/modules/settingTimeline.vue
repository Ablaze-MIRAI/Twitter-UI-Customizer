<template>
    <div>
        <SectionHeadingSecond style="margin-top: 0" title-i-18-n="timeline-pinningTab" />
        <RadioButtonList id="timeline.pinningTab" /><br />

        <SectionHeadingSecond style="margin-top: 0" title-i18-n="common-hidebelow" />
        <CheckBoxList id="timeline" />
    </div>
</template>

<script setup lang="ts">
import SectionHeadingSecond from "../components/SectionHeadingSecond.vue";
import CheckBoxList from "@shared/options/components/CheckBoxList.vue";
import RadioButtonList from "@shared/options/components/RadioButtonList.vue";
</script>
