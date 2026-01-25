<template>
    <div class="TUIC_setting_iconbutton">
        <component :is="icon" class="TUIC_setting_iconbutton_icon" />
        {{ translate(i18n) }}
    </div>
</template>

<script setup lang="ts">
import { translate } from "@content/i18n";
import { Component } from "vue";

defineProps<{
    i18n: string;
    icon: Component;
    actionIcon?: string;
}>();
</script>
