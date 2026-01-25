<template>
    <h2 class="text-white font-tw wrap-break-word min-w-[0px] TUIC_setting_title TUICSettingSubTitle">
        {{ TUICI18N.get(i18n) }}
    </h2>
</template>

<script setup vapor lang="ts">
import { TUICI18N } from "@modules/i18n";

defineProps<{
    i18n: string;
}>();
</script>

<style scoped></style>
