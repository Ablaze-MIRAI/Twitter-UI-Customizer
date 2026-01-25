<template>
    <IconRadioButton v-for="(i, index) in getSettingData(id)" :key="i.id" :id="id" :valueName="i.id" :name="i.i18n" :icon="props.iconsList[index]" />
</template>

<script setup lang="ts">
import { Component } from "vue";
import IconRadioButton from "./IconRadioButton.vue";
import { getSettingData, SettingKeys } from "@content/settings";

const props = defineProps<{
    id: SettingKeys;
    iconsList: Component[];
}>();
</script>

<style scoped></style>
