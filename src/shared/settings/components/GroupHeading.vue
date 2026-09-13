<template>
    <h2 class="TUIC_setting_group_heading">
        {{ translate(titleI18N) }}
    </h2>
</template>

<script setup lang="ts">
import { translate } from "@shared/i18n";

defineProps<{
    titleI18N: string;
}>();
</script>

<style scoped>
.TUIC_setting_group_heading {
    padding: 0 35px 10px;
    margin: 0;
    font-size: 20px;
    font-weight: 700;
    color: rgb(113 118 124);
}
</style>
