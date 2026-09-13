<template>
    <form>
        <textarea id="css_textarea" class="TUIC_setting_customcss_input" v-model="customCSS" ref="CustomCSSBox"></textarea>
    </form>
    <button id="save" class="TUIC_setting_customcss_button TUIC_setting_text TUIC_setting_button TUIC_setting_button_width" @click="changeCustomCSS()">
        {{ translate("customCSS-save") }}
    </button>
</template>

<script setup lang="ts">
import { injectCustomStyle } from "@content/applyCSS";
import { translate } from "@shared/i18n";

const CustomCSSBox = defineModel<HTMLTextAreaElement>();

function changeCustomCSS() {
    localStorage.setItem("TUIC_CSS", CustomCSSBox.value.value);
    injectCustomStyle();
}

const customCSS = localStorage.getItem("TUIC_CSS");
</script>

<style scoped>
textarea#css_textarea {
    width: calc(100% - 10px);
    height: 300px;
    margin-bottom: 20px;
    resize: vertical;
    border-radius: 6px;
}

.TUIC_setting_customcss_input {
    font-family: monospace;
    background: var(--tlui-dialog-background);
    border: 1px solid color-mix(in srgb, var(--TUIC-container-background), var(--twitter-TUIC-color) 10%);
}
.TUIC_setting_customcss_button {
    width: 100%;
    height: 40px;
    color: var(--TUIC-container-background);
    background: color-mix(in srgb, var(--TUIC-container-background), var(--twitter-TUIC-color) 90%);
    border: none;
    border-radius: 9999px;

    &:active {
        background: color-mix(in srgb, var(--TUIC-container-background), var(--twitter-TUIC-color) 30%);
    }
}
</style>
