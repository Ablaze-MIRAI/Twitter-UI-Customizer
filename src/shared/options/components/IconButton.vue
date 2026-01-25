<template>
    <button :class="['TUIC_icon_button_con', btnAction]" :title="TUICI18N.get(tooltiptag)">
        {{ src }}
    </button>
</template>

<script setup vapor lang="ts">
import { TUICI18N } from "@modules/i18n";

defineProps<{
    btnAction: string;
    tooltiptag: string;
    src: string;
}>();
</script>

<style scoped></style>
