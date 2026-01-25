<template>
    <div>
        <CheckBoxList id="dmPage" />

        <settingSubtitle2 title-i18-n="common-hidebelow" />
        <p class="TUIC_setting_notice_paragraph">
            {{ TUICI18N.get("temp-notice-hideDMSheetOnBottomRight") }}
        </p>
    </div>
</template>

<script setup vapor lang="ts">
import CheckBoxList from "@shared/options/components/CheckBoxList.vue";
import settingSubtitle2 from "../components/settingSubtitle2.vue";
import { TUICI18N } from "@modules/i18n";
</script>
