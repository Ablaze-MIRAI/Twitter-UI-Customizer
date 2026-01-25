<template>
    <h3 class="TUIC_setting_section_title_2">
        {{ translate(titleI18N) }}
    </h3>
</template>

<script setup lang="ts">
import { translate } from "@content/i18n";

defineProps<{
    titleI18N: string;
}>();
</script>
