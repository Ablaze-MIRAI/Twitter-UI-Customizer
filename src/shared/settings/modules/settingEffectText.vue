<template>
    <hr class="TUIC_setting_divider TUIC_setting_divider_nomargin" />
    <div>
        <SectionTitle2 style="margin-bottom: 15px" titleI18N="XToTwitter-settingTitle" />
        <CheckBoxList id="XToTwitter" />
        <button @click="XToTwitterRestoreIcon" class="TUIC_setting_text TUIC_setting_button TUIC_setting_button_width TUICEasySettingButtons TUIC_resetOnly_colorSettings" style="margin-bottom: 10px">
            {{ translate("XtoTwitter-twitterIcon") }}
        </button>
    </div>

    <hr class="TUIC_setting_divider TUIC_setting_divider_nomargin" />
    <div>
        <SectionTitle2 style="margin-bottom: 15px" titleI18N="settingPerformance-settingTitle" />
        <CheckBoxList id="uncategorizedSettings" />
    </div>

    <hr class="TUIC_setting_divider TUIC_setting_divider_nomargin" />
    <div>
        <SectionTitle2 style="margin-bottom: 15px" titleI18N="settingDateAndTime-settingTitle" />
        <CheckBoxList id="dateAndTime.options" />
        <settingSubtitle2 title-i18-n="dateAndTime.dateAboveTweet" />
        <RadioButtonList id="dateAndTime.dateAboveTweet" />
        <settingSubtitle2 title-i18-n="common-hidebelow" />
        <CheckBoxList id="dateAndTime.hide" />
    </div>
</template>

<script setup lang="ts">
import settingSubtitle2 from "../components/settingSubtitle2.vue";
import CheckBoxList from "@shared/options/components/CheckBoxList.vue";
import { translate } from "@content/i18n";
import { XToTwitterRestoreIcon } from "@shared/options/scripts/changePrefScript";
import SectionTitle2 from "../components/SectionTitle2.vue";
import RadioButtonList from "@shared/options/components/RadioButtonList.vue";
</script>
