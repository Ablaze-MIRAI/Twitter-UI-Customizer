<template>
    <div class="TUICCheckBoxParent">
        <input type="checkbox" class="bi bi-check" :id="value.replace(/\./g, '-_-')" :checked="getPref(value)" @change="changePref(value, $event)" />
        <div>
            <label class="TUIC_setting_text" :for="value.replace(/\./g, '-_-')">{{ TUICI18N.get(name) }}</label>
        </div>
    </div>
</template>

<script setup vapor lang="ts">
import { TUICI18N } from "@modules/i18n";
import { getPref, setPref, savePref } from "@modules/pref";
import { titleObserverFunction } from "@modules/observer/titleObserver";
import { updateClasses } from "@modules/htmlClass/classManager";

defineProps<{
    name: string;
    value: string;
}>();

const changePref = (path: string, event: Event) => {
    setPref(path, (event.target as HTMLInputElement).checked);
    savePref();
    updateClasses();
    titleObserverFunction();
};
</script>

<style scoped></style>
