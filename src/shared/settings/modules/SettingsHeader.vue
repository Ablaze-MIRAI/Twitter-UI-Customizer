<template>
    <div class="TUIC_settings_header_container">
        <h2 :class="level === '1' ? 'TUIC_settings_header_lv1' : level === '2' ? 'TUIC_settings_header_lv2' : ''" class="TUIC_settings_header_title">
            {{ titleI18N != "" ? TUICI18N.get(titleI18N) : "" }}
        </h2>
        <h3 class="TUIC_settings_header_desc" v-if="descI18N">
            {{ descI18N != "" ? TUICI18N.get(descI18N) : "" }}
        </h3>
    </div>
</template>

<script setup vapor lang="ts">
import { TUICI18N } from "@modules/i18n";

interface Props {
    titleI18N: string;
    descI18N?: string;
    level?: "1" | "2";
}

withDefaults(defineProps<Props>(), {
    titleI18N: "",
    level: "1",
});
</script>

<style scoped></style>
