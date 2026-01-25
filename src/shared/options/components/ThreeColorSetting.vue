<template>
    <template v-if="_color['background']">
        <ColorSetting :id="id" type="background" text="settingUI-colorPicker-background" />
    </template>
    <template v-if="_color['border']">
        <ColorSetting :id="id" type="border" text="settingUI-colorPicker-border" />
    </template>
    <template v-if="_color['color']">
        <ColorSetting :id="id" type="color" :text="typeColor" />
    </template>
</template>

<script setup vapor lang="ts">
import ColorSetting from "./ColorSetting.vue";
import { ColorData } from "@shared/sharedData";

const props = defineProps<{ id: string }>();

const _color = ColorData.defaultTUICColor.colors[props.id];
const typeColor = _color["typeColor"] === "imageColor" ? "settingUI-colorPicker-svgColor" : "settingUI-colorPicker-textColor";
</script>

<style scoped></style>
