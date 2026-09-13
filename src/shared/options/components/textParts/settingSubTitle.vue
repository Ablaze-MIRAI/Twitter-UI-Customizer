<template>
    <h2 class="text-white font-tw wrap-break-word min-w-[0px] TUIC_setting_title TUICSettingSubTitle">
        {{ translate(i18n) }}
    </h2>
</template>

<script setup lang="ts">
import { translate } from "@shared/i18n";

defineProps<{
    i18n: string;
}>();
</script>

<style scoped>
.TUICSettingSubTitle {
    margin-top: 0 !important;
    margin-bottom: 10px !important;
    font-size: 15px;
    font-weight: 700;
    font-feature-settings: "palt";
    color: var(--twitter-TUIC-color);
    letter-spacing: 1px;
}
</style>
