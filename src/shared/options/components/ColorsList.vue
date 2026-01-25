<template>
    <div id="TUICColorSettingsDivBox">
        <template v-for="i in getSettingData(`buttonColor`)" :key="i.id">
            <div class="TUICColorSettingsThree__container">
                <h2 class="text-white font-tw wrap-break-word min-w-[0px] twcss-text-explicit TUIC_setting_title TUIC_setting_text">
                    {{ TUICI18N.get(i.i18n) }}
                </h2>
                <div class="TUIC_col_setting_container_2">
                    <ThreeColorSetting :id="i.id" />
                </div>
            </div>
        </template>
    </div>
</template>

<script setup vapor lang="ts">
import { TUICI18N } from "@modules/i18n";
import ThreeColorSetting from "./ThreeColorSetting.vue";
import { getSettingData } from "@modules/pref";
</script>

<style scoped></style>
