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

<style scoped>
.TUICCheckBoxParent > input[type="checkbox"] {
    position: relative;
    width: 1rem;
    height: 1rem;
    appearance: none;
    background-color: color-mix(in srgb, var(--TUIC-container-background), var(--twitter-TUIC-color) var(--TUIC-checkbox-opacity, 7%));
    border-radius: 0.25rem;
    &:is(:hover, :focus-visible) {
        --TUIC-checkbox-opacity: 12%;
    }
    &:active {
        --TUIC-checkbox-opacity: 17%;
    }
    &:checked {
        background-color: rgb(37 99 235);
        &:is(:hover, :focus-visible) {
            background-color: rgb(59 130 246);
        }
        &:active {
            background-color: rgb(96 165 250);
        }
        &::before {
            opacity: 1;
        }
    }
    &::before {
        margin-top: 0.07rem;
        font-size: 1rem;
        color: #fff;
        opacity: 0;
    }
}
</style>
