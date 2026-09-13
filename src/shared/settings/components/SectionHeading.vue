<template>
    <h3 class="TUIC_setting_section_heading">
        {{ translate(titleI18N) }}
    </h3>
</template>

<script setup lang="ts">
import { translate } from "@shared/i18n";

defineProps<{
    titleI18N: string;
}>();
</script>

<style scoped>
.TUIC_setting_section_heading {
    padding: 0;
    margin: 0;
    font-size: 20px;
    font-weight: 700;
    color: var(--twitter-TUIC-color);
}
</style>
