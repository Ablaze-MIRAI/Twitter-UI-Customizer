<template>
    <details class="TUIC_setting_detailsbox" @toggle="toggled($event)">
        <summary>
            <div>
                <component v-if="!opened" :is="icon" class="TUIC_setting_detailsbox_icon" />
                <component v-if="opened" :is="iconOpened" class="TUIC_setting_detailsbox_icon" />
                <span :style="opened ? `font-weight: bold` : ``">{{ TUICI18N.get(summaryI18N) }}</span>
                <ICON_REVEAL style="width: 24px; margin: auto" :style="opened ? `transform: rotate(180deg)` : ``" />
            </div>
        </summary>
        <div class="TUIC_setting_detailsbox_content_container">
            <slot></slot>
        </div>
    </details>
</template>

<script setup vapor lang="ts">
import { TUICI18N } from "@modules/i18n";
import { Component, ref } from "vue";
import ICON_REVEAL from "@content/icons/common/reveal.svg?component";

defineProps<{
    summaryI18N: string;
    icon: Component;
    iconOpened: Component;
}>();

const opened = ref(false);

function toggled($event: ToggleEvent) {
    if (($event.currentTarget as HTMLDetailsElement).open) {
        opened.value = true;
    } else {
        opened.value = false;
    }
}
</script>
