<template>
    <div class="TUIC_setting_iconbutton">
        <component :is="icon" class="TUIC_setting_iconbutton_icon" />
        {{ TUICI18N.get(i18n) }}
    </div>
</template>

<script setup vapor lang="ts">
import { TUICI18N } from "@modules/i18n";
import { Component } from "vue";

defineProps<{
    i18n: string;
    icon: Component;
    actionIcon?: string;
}>();
</script>
