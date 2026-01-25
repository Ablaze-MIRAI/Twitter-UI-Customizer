<template>
    <template v-for="i in getSettingData(id)" :key="i.id">
        <CheckBox :value="`${id}.${i.id}`" :name="i.i18n" />
    </template>
</template>

<script setup vapor lang="ts">
import { getSettingData, TUICSettingIDs } from "@modules/pref";
import CheckBox from "./CheckBox.vue";

defineProps<{ id: TUICSettingIDs }>();
</script>

<style scoped></style>
