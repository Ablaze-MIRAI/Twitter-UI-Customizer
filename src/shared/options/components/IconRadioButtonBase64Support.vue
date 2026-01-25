<template>
    <div class="TUICIconRadioButton">
        <input type="radio" :id="`${id.replace(/\./g, '-_-')}-_-${valueName}`" :name="id.replace(/\./g, '-_-')" :value="valueName" :checked="getPref(id) == valueName" @change="changePref(id, valueName)" />
        <div>
            <label class="TUIC_setting_IconRadioButton" :for="`${id.replace(/\./g, '-_-')}-_-${valueName}`" :title="translate(name)">
                <img style="width: 24px; padding-right: 3px" :src="base64Img" />
            </label>
        </div>
    </div>
</template>

<script setup lang="ts">
import { translate } from "@content/i18n";
import { getPref, setPref, savePref } from "@content/settings";
import { cleanModifiedElements } from "@content/applyCSS";

defineProps<{ id: string; valueName: string; name: string; base64Img: string }>();

const changePref = (path, valueName) => {
    setPref(path, valueName);
    savePref();
    cleanModifiedElements();
};
</script>
