<template>
    <hr class="TUIC_setting_divider TUIC_setting_divider_nomargin" />
    <div>
        <SectionHeading style="margin-bottom: 15px" titleI18N="XToTwitter-settingTitle" />
        <CheckBoxList id="XToTwitter" />
        <button @click="XToTwitterRestoreIcon" class="TUIC_setting_text TUIC_setting_button TUIC_setting_button_width TUICEasySettingButtons TUIC_resetOnly_colorSettings" style="margin-bottom: 10px">
            {{ translate("XtoTwitter-twitterIcon") }}
        </button>
    </div>

    <hr class="TUIC_setting_divider TUIC_setting_divider_nomargin" />
    <div>
        <SectionHeading style="margin-bottom: 15px" titleI18N="settingPerformance-settingTitle" />
        <CheckBoxList id="uncategorizedSettings" />
    </div>

    <hr class="TUIC_setting_divider TUIC_setting_divider_nomargin" />
    <div>
        <SectionHeading style="margin-bottom: 15px" titleI18N="settingDateAndTime-settingTitle" />
        <CheckBoxList id="dateAndTime.options" />
        <SectionHeadingSecond title-i18-n="dateAndTime.dateAboveTweet" />
        <RadioButtonList id="dateAndTime.dateAboveTweet" />
        <SectionHeadingSecond title-i18-n="common-hidebelow" />
        <CheckBoxList id="dateAndTime.hide" />
    </div>
</template>

<script setup lang="ts">
import SectionHeading from "../components/SectionHeading.vue";
import SectionHeadingSecond from "../components/SectionHeadingSecond.vue";
import CheckBoxList from "@shared/options/components/CheckBoxList.vue";
import { translate } from "@shared/i18n";
import { XToTwitterRestoreIcon } from "@shared/options/scripts/changePrefScript";
import RadioButtonList from "@shared/options/components/RadioButtonList.vue";
</script>
