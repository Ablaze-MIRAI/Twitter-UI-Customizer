<template>
    <div class="TUICCheckBoxParent">
        <input style="margin: 0" type="radio" :id="`${id.replace(/\./g, '-_-')}-_-${valueName}`" :name="id.replace(/\./g, '-_-')" :value="valueName" :checked="getPref(id) == valueName" @change="changePref(id, valueName)" />
        <div style="margin: 0">
            <label style="margin: 0" class="TUIC_setting_text" :for="`${id.replace(/\./g, '-_-')}-_-${valueName}`">{{ translate(name) }}</label>
        </div>
    </div>
</template>

<script setup lang="ts">
import { translate } from "@content/i18n";
import { getPref, setPref, savePref } from "@content/settings";
import { cleanModifiedElements } from "@content/applyCSS";

defineProps<{ id: string; valueName: string; name: string }>();

const changePref = (path, valueName) => {
    setPref(path, valueName);
    savePref();
    cleanModifiedElements();
};
</script>
