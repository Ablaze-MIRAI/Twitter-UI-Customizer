<template>
    <div>
        <CheckBoxList id="dmPage" />

        <settingSubtitle2 title-i18-n="common-hidebelow" />
        <p class="TUIC_setting_notice_paragraph">
            {{ translate("temp-notice-hideDMSheetOnBottomRight") }}
        </p>
    </div>
</template>

<script setup lang="ts">
import CheckBoxList from "@shared/options/components/CheckBoxList.vue";
import settingSubtitle2 from "../components/settingSubtitle2.vue";
import { translate } from "@content/i18n";
</script>
