<template>
    <div class="TUICCheckBoxParent">
        <input type="checkbox" class="bi bi-check" :id="value.replace(/\./g, '-_-')" :checked="getPref(value)" @change="changePref(value, $event)" />
        <div>
            <label class="TUIC_setting_text" :for="value.replace(/\./g, '-_-')">{{ translate(name) }}</label>
        </div>
    </div>
</template>

<script setup lang="ts">
import { translate } from "@content/i18n";
import { getPref, setPref, savePref } from "@content/settings";
import { setTitleObserver } from "@content/functions/replaceTitleX";
import { cleanModifiedElements } from "@content/applyCSS";

defineProps<{
    name: string;
    value: string;
}>();

const changePref = (path: string, event: Event) => {
    setPref(path, (event.target as HTMLInputElement).checked);
    savePref();
    cleanModifiedElements();
    setTitleObserver();
};
</script>

<style scoped></style>
