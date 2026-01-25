<template>
    <h4 class="TUIC_settings_subtitle2">
        {{ translate(titleI18N) }}
    </h4>
</template>

<script setup lang="ts">
import { translate } from "@content/i18n";

defineProps<{
    titleI18N: string;
}>();
</script>
