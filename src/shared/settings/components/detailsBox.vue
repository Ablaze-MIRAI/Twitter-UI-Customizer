<template>
    <details class="TUIC_setting_detailsbox" @toggle="toggled($event)">
        <summary>
            <div>
                <component v-if="!opened" :is="icon" class="TUIC_setting_detailsbox_icon" />
                <component v-if="opened" :is="iconOpened" class="TUIC_setting_detailsbox_icon" />
                <span :style="opened ? `font-weight: bold` : ``">{{ translate(summaryI18N) }}</span>
                <ICON_REVEAL style="width: 24px; margin: auto" :style="opened ? `transform: rotate(180deg)` : ``" />
            </div>
        </summary>
        <div class="TUIC_setting_detailsbox_content_container">
            <slot></slot>
        </div>
    </details>
</template>

<script setup lang="ts">
import { translate } from "@shared/i18n";
import { Component, ref } from "vue";
import ICON_REVEAL from "@shared/icons/common/reveal.svg?component";

defineProps<{
    summaryI18N: string;
    icon: Component;
    iconOpened: Component;
}>();

const opened = ref<boolean>(false);

function toggled($event: ToggleEvent) {
    if (($event.currentTarget as HTMLDetailsElement).open) {
        opened.value = true;
    } else {
        opened.value = false;
    }
}
</script>

<style scoped>
.TUIC_setting_detailsbox_icon {
    width: 24px;
    margin: auto;
}

.TUIC_setting_detailsbox {
    height: fit-content;
    transition: 0.2s cubic-bezier(0.22, 1, 0.36, 1);

    summary {
        > div {
            display: grid;
            grid-template-columns: 90px 1fr 90px;
            align-items: center;
            height: 100%;
            font-size: 15px;
            font-feature-settings: "palt";
            user-select: none;
        }

        height: 50px;
        cursor: pointer;
        list-style-type: none;

        &:is(:hover, :focus-visible) {
            background: var(--TUIC-container-background);
            transition: none;
        }

        &:active {
            background: color-mix(in srgb, var(--TUIC-container-background), var(--twitter-TUIC-color) 20%);
        }
    }
}

.TUIC_setting_detailsbox_content_container {
    background-color: var(--TUIC-container-background);
    > :not(hr) {
        padding: 20px 35px;
    }
}
</style>
