<template>
    <h2 class="TUIC_setting_section_title">
        {{ translate(titleI18N) }}
    </h2>
</template>

<script setup lang="ts">
import { translate } from "@content/i18n";

defineProps<{
    titleI18N: string;
}>();
</script>
