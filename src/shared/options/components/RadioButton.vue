<template>
    <div class="TUICCheckBoxParent">
        <input style="margin: 0" type="radio" :id="`${id.replace(/\./g, '-_-')}-_-${valueName}`" :name="id.replace(/\./g, '-_-')" :value="valueName" :checked="getPref(id) == valueName" @change="changePref(id, valueName)" />
        <div style="margin: 0">
            <label style="margin: 0" class="TUIC_setting_text" :for="`${id.replace(/\./g, '-_-')}-_-${valueName}`">{{ TUICI18N.get(name) }}</label>
        </div>
    </div>
</template>

<script setup vapor lang="ts">
import { TUICI18N } from "@modules/i18n";
import { TUICObserver } from "@modules/observer/index";
import { getPref, setPref, savePref } from "@modules/pref";
import { updateClasses } from "@modules/htmlClass/classManager";

defineProps<{ id: string; valueName: string; name: string }>();

const changePref = (path, valueName) => {
    setPref(path, valueName);
    savePref();
    updateClasses();
    TUICObserver.callback();
};
</script>
