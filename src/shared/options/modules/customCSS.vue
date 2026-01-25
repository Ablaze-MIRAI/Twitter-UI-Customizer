<template>
    <form>
        <textarea id="css_textarea" class="TUIC_setting_customcss_input" v-model="customCSS" ref="CustomCSSBox"></textarea>
    </form>
    <button id="save" class="TUIC_setting_customcss_button TUIC_setting_text TUIC_setting_button TUIC_setting_button_width" @click="changeCustomCSS()">
        {{ TUICI18N.get("customCSS-save") }}
    </button>
</template>

<script setup vapor lang="ts">
import { applyCustomCss } from "@content/applyCSS";
import { TUICI18N } from "@modules/i18n";

const CustomCSSBox = defineModel<HTMLTextAreaElement>();

function changeCustomCSS() {
    localStorage.setItem("TUIC_CSS", CustomCSSBox.value.value);
    applyCustomCss();
}

const customCSS = localStorage.getItem("TUIC_CSS");
</script>
