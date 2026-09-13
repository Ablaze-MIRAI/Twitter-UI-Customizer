<template>
    <div class="TUIC_setting_iconbutton">
        <component :is="icon" class="TUIC_setting_iconbutton_icon" />
        {{ translate(i18n) }}
    </div>
</template>

<script setup lang="ts">
import { translate } from "@shared/i18n";
import { Component } from "vue";

defineProps<{
    i18n: string;
    icon: Component;
    actionIcon?: string;
}>();
</script>

<style scoped>
.TUIC_setting_iconbutton_icon {
    width: 24px;
    margin: auto;
}

.TUIC_setting_iconbutton {
    display: grid;
    grid-template-columns: 90px 1fr;
    align-items: center;
    height: 50px;
    font-size: 15px;
    font-feature-settings: "palt";
    cursor: pointer;
    transition: 0.2s cubic-bezier(0.22, 1, 0.36, 1);

    &:is(:hover, :focus-visible) {
        background: var(--TUIC-container-background);
        transition: none;
    }

    &:active {
        background: color-mix(in srgb, var(--TUIC-container-background), var(--twitter-TUIC-color) 20%);
    }
}
</style>
