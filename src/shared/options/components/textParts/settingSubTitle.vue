<template>
    <h2 class="text-white font-tw wrap-break-word min-w-[0px] TUIC_setting_title TUICSettingSubTitle">
        {{ translate(i18n) }}
    </h2>
</template>

<script setup lang="ts">
import { translate } from "@content/i18n";

defineProps<{
    i18n: string;
}>();
</script>

<style scoped></style>
