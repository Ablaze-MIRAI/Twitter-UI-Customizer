<template>
    <h2 class="TUICSettingSubTitle TUICSettingSubTitleNomargin">
        {{ translate(i18n) }}
    </h2>
</template>

<script setup lang="ts">
import { translate } from "@content/i18n";

defineProps<{
    i18n: string;
}>();
</script>
