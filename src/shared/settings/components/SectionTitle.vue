<template>
    <h2 class="TUIC_setting_section_title">
        {{ TUICI18N.get(titleI18N) }}
    </h2>
</template>

<script setup vapor lang="ts">
import { TUICI18N } from "@modules/i18n";

defineProps<{
    titleI18N: string;
}>();
</script>
