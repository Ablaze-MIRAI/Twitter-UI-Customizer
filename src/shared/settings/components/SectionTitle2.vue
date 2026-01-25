<template>
    <h3 class="TUIC_setting_section_title_2">
        {{ TUICI18N.get(titleI18N) }}
    </h3>
</template>

<script setup vapor lang="ts">
import { TUICI18N } from "@modules/i18n";

defineProps<{
    titleI18N: string;
}>();
</script>
