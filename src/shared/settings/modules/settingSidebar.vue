<template>
    <div>
        <SectionTitle2 title-i18-n="sidebarButton-setting-LeftSidebar" />
        <FIGURE_LEFTSIDEBAR class="TUIC_setting_sidebarFigure" />
        <UpDownList id="sidebarButtons" />

        <div style="margin-top: 20px">
            <CheckBoxList id="sidebarSetting.buttonConfig" />
        </div>

        <div style=" display: flex; align-items: center; justify-content: space-between;margin-top: 30px">
            <settingSubTitleNomargin i18n="sidebarButton-homeIcon-settingTitle" />
            <div class="TUIC_settings_settingsSidebar_IconRadioBtnList_container">
                <IconRadioButtonList id="sidebarSetting.homeIcon" :icons-list="iconsList" />
            </div>
        </div>

        <div style="margin-top: 35px">
            <settingSubTitle i18n="common-hidebelow" />
            <CheckBoxList id="sidebarSetting.hideBadge" />
            <settingSubtitle2 title-i18-n="sidebarButton-moreMenuItems-settingTitle" />
            <CheckBoxList id="sidebarSetting.moreMenuItems" />

            <settingSubtitle2 title-i18-n="sidebarButton-accountSwitcher-settingTitle" />
            <CheckBoxList id="accountSwitcher" />
        </div>
    </div>
    <hr class="TUIC_setting_divider TUIC_setting_divider_nomargin" />
    <div>
        <SectionTitle2 style="margin-top: 0" title-i18-n="rightSidebar-setting-rightSidebar" />
        <FIGURE_RIGHTSIDEBAR class="TUIC_setting_sidebarFigure TUIC_setting_rightSidebarFigure" />
        <settingSubtitle2 title-i18-n="common-hidebelow" />
        <CheckBoxList id="rightSidebar" />
    </div>
</template>

<script setup lang="ts">
import FIGURE_LEFTSIDEBAR from "@shared/icons/figure/left_sidebar.svg?component";
import FIGURE_RIGHTSIDEBAR from "@shared/icons/figure/right_sidebar.svg?component";
import ICON_HOME_TUIC from "@shared/icons/home/home_tuic.svg?component";
import ICON_HOME_TWITTER from "@shared/icons/home/home_twitter.svg?component";
import ICON_HOME_X from "@shared/icons/home/home_x.svg?component";
import UpDownList from "@shared/options/components/UpDownList.vue";
import CheckBoxList from "@shared/options/components/CheckBoxList.vue";
import settingSubTitle from "@shared/options/components/textParts/settingSubTitle.vue";
import IconRadioButtonList from "@shared/options/components/IconRadioButtonList.vue";
import SectionTitle2 from "../components/SectionTitle2.vue";
import settingSubtitle2 from "../components/settingSubtitle2.vue";
import settingSubTitleNomargin from "../components/settingSubTitleNomargin.vue";
import { Component } from "vue";

const iconsList: Component[] = [ICON_HOME_X, ICON_HOME_TWITTER, ICON_HOME_TUIC];
</script>
