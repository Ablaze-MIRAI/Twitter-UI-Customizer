<template>
    <template v-for="i in getSettingData(id)" :key="i.id">
        <CheckBox :value="`${id}.${i.id}`" :name="i.i18n" />
    </template>
</template>

<script setup lang="ts">
import { getSettingData, SettingKeys } from "@content/settings";
import CheckBox from "./CheckBox.vue";

defineProps<{ id: SettingKeys }>();
</script>

<style scoped></style>
