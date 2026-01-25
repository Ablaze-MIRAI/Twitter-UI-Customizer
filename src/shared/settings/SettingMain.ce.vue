<template>
    <link rel="stylesheet" :href="BootstrapIconsURL" />
    <div id="TUICSettings" class="twcss-flex justify-between TUICOriginalContent">
        <div class="twcss-text-explicit text-white font-tw text-[20px] font-extrabold leading-[24px] min-w-[0px] wrap-break-word">
            <hr v-if="!isSafemode" class="TUIC_setting_divider TUIC_setting_divider_m35" />
            <div class="TUIC_setting_toplogo_container">
                <TUICLOGO_GRAY class="TUIC_setting_toplogo" />
            </div>
        </div>

        <div class="TUIC_setting_easysetting_container">
            <settingsHeader titleI18N="settingUI-easySetting" descI18N="settingUI-easySetting-detail" />
            <EasySettings />
            <IconButton i18n="rescuePref-ButtonLabel" :icon="TUICLogo" @click="rescuePref" />
        </div>
        <hr class="TUIC_setting_divider TUIC_setting_divider_nomargin" />
        <div>
            <settingsHeader titleI18N="settingUI-everythingSetting" level="2" />
            <SectionTitle titleI18N="settingSection-general" style="margin-top: 25px" />
            <detailsBox summaryI18N="settingDetailsBox-color" :icon="ICON_BRUSH" :icon-opened="ICON_BRUSH_ENABLED">
                <settingColors />
            </detailsBox>
            <detailsBox summaryI18N="settingDetailsBox-sidebar" :icon="ICON_SIDEBAR" :icon-opened="ICON_SIDEBAR_ENABLED">
                <settingSidebar />
            </detailsBox>
            <detailsBox summaryI18N="settingDetailsBox-logo" :icon="ICON_TWITTER" :icon-opened="ICON_TWITTER">
                <settingLogo />
            </detailsBox>
            <detailsBox summaryI18N="settingDetailsBox-effect_and_text" :icon="ICON_PENCIL" :icon-opened="ICON_PENCIL_ENABLED">
                <settingEffectText />
            </detailsBox>
        </div>
        <hr class="TUIC_setting_divider" />
        <div>
            <SectionTitle titleI18N="settingSection-page" />
            <detailsBox summaryI18N="timeline-setting-timeline" :icon="ICON_HOME" :icon-opened="ICON_HOME_ENABLED">
                <SettingTimeline />
            </detailsBox>
            <detailsBox summaryI18N="tweetbuttons-setting-tweet" :icon="ICON_TWEET" :icon-opened="ICON_TWEET_ENABLED">
                <SettingTweet />
            </detailsBox>
            <detailsBox summaryI18N="dmPage-setting-dm" :icon="ICON_DM" :icon-opened="ICON_DM_ENABLED">
                <SettingDM />
            </detailsBox>
            <detailsBox summaryI18N="profileSetting-profile" :icon="ICON_PROFILE" :icon-opened="ICON_PROFILE_ENABLED">
                <SettingProfile />
            </detailsBox>
            <detailsBox summaryI18N="uncategorizedSettings-settingTitle" :icon="ICON_MORE_CIRCLE" :icon-opened="ICON_MORE_CIRCLE_ENABLED">
                <SettingUncategorized />
            </detailsBox>
        </div>
        <hr class="TUIC_setting_divider" />
        <div>
            <SectionTitle titleI18N="settingSection-other" />
            <detailsBox summaryI18N="export-import" :icon="ICON_ARROW_RIGHT" :icon-opened="ICON_ARROW_RIGHT_ENABLED" id="importSection">
                <SettingImportExport />
            </detailsBox>
            <IconButton i18n="settingUI-reloadCSS" :icon="TUICUNILOGO_GRAY" @click="reloadCSS" />
            <defaultPrefButton />
        </div>
        <hr class="TUIC_setting_divider" />
        <div>
            <SectionTitle titleI18N="settingSection-extentionInfo" />
            <IconButton i18n="addonInfo-aboutTUIC" :icon="ICON_INFORMATION" @click="openReadme" />
            <IconButton i18n="addonInfo-TUICOfficialTwitter" :icon="ICON_TWITTER" @click="openOfficialTwitter" />
            <IconButton i18n="addonInfo-github" :icon="ICON_GITHUB" @click="openGithub" />
        </div>
        <a class="TUIC_setting_bottom_copyright" href="https://github.com/Ablaze-MIRAI/Twitter-UI-Customizer/blob/main/LICENSE">
            <span style=" font-size: 15px;color: rgb(113 118 124); text-align: center">&copy; 2022-2025 kaonasi-biwa</span>
        </a>
    </div>
</template>

<script setup vapor lang="ts">
import TUICLOGO_GRAY from "@content/icons/branding/tuic_logo_gray.svg?component";
import ICON_BRUSH from "@content/icons/common/brush.svg?component";
import ICON_BRUSH_ENABLED from "@content/icons/common/brush_enabled.svg?component";
import ICON_SIDEBAR from "@content/icons/common/sidebar.svg?component";
import ICON_SIDEBAR_ENABLED from "@content/icons/common/sidebar_enabled.svg?component";
import ICON_PENCIL from "@content/icons/common/pencil.svg?component";
import ICON_PENCIL_ENABLED from "@content/icons/common/pencil_enabled.svg?component";
import ICON_HOME from "@content/icons/common/home.svg?component";
import ICON_HOME_ENABLED from "@content/icons/common/home_enabled.svg?component";
import ICON_TWEET from "@content/icons/common/tweet.svg?component";
import ICON_TWEET_ENABLED from "@content/icons/common/tweet_enabled.svg?component";
import ICON_DM from "@content/icons/common/dm.svg?component";
import ICON_DM_ENABLED from "@content/icons/common/dm_enabled.svg?component";
import ICON_PROFILE from "@content/icons/common/profile.svg?component";
import ICON_PROFILE_ENABLED from "@content/icons/common/profile_enabled.svg?component";
import ICON_MORE_CIRCLE from "@content/icons/common/more_circle.svg?component";
import ICON_MORE_CIRCLE_ENABLED from "@content/icons/common/more_circle_enabled.svg?component";
import ICON_ARROW_RIGHT from "@content/icons/common/arrow_right.svg?component";
import ICON_ARROW_RIGHT_ENABLED from "@content/icons/common/arrow_right_enabled.svg?component";
import ICON_INFORMATION from "@content/icons/common/information.svg?component";
import ICON_TWITTER from "@content/icons/common/twitter.svg?component";
import ICON_GITHUB from "@content/icons/common/github.svg?component";
import settingsHeader from "@shared/settings/modules/SettingsHeader.vue";
import EasySettings from "./modules/EasySettings.vue";
import SectionTitle from "./components/SectionTitle.vue";
import detailsBox from "./components/detailsBox.vue";
import settingColors from "@shared/options/modules/settingColors.vue";
import settingSidebar from "./modules/settingSidebar.vue";
import settingEffectText from "./modules/settingEffectText.vue";
import SettingTimeline from "./modules/settingTimeline.vue";
import SettingTweet from "./modules/settingTweet.vue";
import SettingDM from "./modules/settingDM.vue";
import SettingProfile from "./modules/settingProfile.vue";
import SettingUncategorized from "./modules/settingUncategorized.vue";
import SettingImportExport from "./modules/settingImportExport.vue";
import settingLogo from "./modules/settingLogo.vue";
import defaultPrefButton from "./components/defaultPrefButton.vue";
import IconButton from "./components/IconButton.vue";
import TUICLogo from "@content/icons/branding/tuic_unilogo.svg?component";
import TUICUNILOGO_GRAY from "@content/icons/branding/tuic_unilogo_gray.svg?component";
import BootstrapIcons from "bootstrap-icons/font/bootstrap-icons.css?url";
import { isSafemode } from "@content/modules/settings/safemode";
import { Dialog } from "@shared/tlui/components/Dialog";
import { ButtonComponent } from "@shared/tlui/components/ButtonComponent";
import { TUICI18N } from "@content/modules/i18n";

const BootstrapIconsURL = chrome.runtime.getURL(BootstrapIcons);

function openReadme() {
    openInNewTab("https://github.com/Ablaze-MIRAI/Twitter-UI-Customizer/blob/main/README.md");
}
function openOfficialTwitter() {
    openInNewTab("https://twitter.com/TUIC_official");
}
function openGithub() {
    openInNewTab("https://github.com/Ablaze-MIRAI/Twitter-UI-Customizer");
}
function openInNewTab(url: string) {
    window.open(url, "_blank");
}

function reloadCSS() {
    const cssLinkElem = document.querySelector<HTMLLinkElement>(`#tuicDefaultStyle`);
    if (cssLinkElem.href.includes("?")) {
        cssLinkElem.href += "0";
    } else {
        cssLinkElem.href = cssLinkElem.href + "?" + Date.now();
    }
}

function rescuePref() {
    const dialog = new Dialog(TUICI18N.get("rescuePref-ButtonLabel"));
    dialog
        .addComponents([
            ...TUICI18N.get("rescuePref-dialog").split("\r"),
            "",
            /*            new TextboxComponent("", { readonly: false, rows: 5 }),
            new ButtonComponent(TUICI18N.get("common-copy-and-close"), () => {
                dialog.close();
                navigator.clipboard.writeText("");
            }),*/
            new ButtonComponent(TUICI18N.get("common-go-and-openNewTab"), () => {
                openInNewTab("https://twitter.com/?mx=1");
                document.querySelector("#importSection").setAttribute("open", "true");
                document.querySelector("#importTitle").scrollIntoView({
                    behavior: "smooth",
                });
                dialog.close();
            }),
            new ButtonComponent(TUICI18N.get("common-cancel"), () => dialog.close(), { invertColor: true }),
        ])
        .open();
}
</script>
<!--
<style scoped>
* {
    background: red;
}
</style> -->
