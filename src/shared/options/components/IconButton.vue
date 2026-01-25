<template>
    <button :class="['TUIC_icon_button_con', btnAction]" :title="translate(tooltiptag)">
        {{ src }}
    </button>
</template>

<script setup lang="ts">
import { translate } from "@content/i18n";

defineProps<{
    btnAction: string;
    tooltiptag: string;
    src: string;
}>();
</script>

<style scoped></style>
