<template>
    <RadioButton v-for="i in getSettingData(id)" :key="i.id" :id="id" :valueName="i.id" :name="i.i18n" />
</template>

<script setup lang="ts">
import { getSettingData, SettingKeys } from "@content/settings";
import RadioButton from "./RadioButton.vue";

defineProps<{ id: SettingKeys }>();
</script>

<style scoped></style>
