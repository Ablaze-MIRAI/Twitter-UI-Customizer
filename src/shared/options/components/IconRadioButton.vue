<template>
    <div class="TUICIconRadioButton">
        <input type="radio" :id="`${id.replace(/\./g, '-_-')}-_-${valueName}`" :name="id.replace(/\./g, '-_-')" :value="valueName" :checked="getPref(id) == valueName" @change="changePref(id, valueName)" />
        <div>
            <label class="TUIC_setting_IconRadioButton" :for="`${id.replace(/\./g, '-_-')}-_-${valueName}`" :title="translate(name)">
                <img v-if="typeof props.icon === 'string'" :src="props.icon" />
                <component v-else :is="props.icon" />
            </label>
        </div>
    </div>
</template>

<script setup lang="ts">
import { translate } from "@shared/i18n";
import { getPref, setPref, savePref } from "@content/settings";
import { Component } from "vue";
import { cleanModifiedElements } from "@content/applyCSS";

const props = defineProps<{
    id: string;
    valueName: string;
    name: string;
    icon: Component | string;
}>();

const changePref = (path: string, valueName: string) => {
    setPref(path, valueName);
    savePref();
    cleanModifiedElements();
};
</script>
