<template>
    <IconRadioButton v-for="(i, index) in getSettingData(id)" :key="i.id" :id="`${id}`" :valueName="i.id" :name="i.i18n" :icon="props.iconsList[index]" />
</template>

<script setup vapor lang="ts">
import { Component } from "vue";
import IconRadioButton from "./IconRadioButton.vue";
import { getSettingData, TUICSettingIDs } from "@modules/pref";

const props = defineProps<{
    id: TUICSettingIDs;
    iconsList: Component[];
}>();
</script>

<style scoped></style>
