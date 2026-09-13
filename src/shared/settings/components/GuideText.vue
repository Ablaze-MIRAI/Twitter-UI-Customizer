<template>
    <div class="TUIC_settings_guide">
        <h2>
            {{ translate(titleI18N) }}
        </h2>
        <p v-if="descI18N">
            {{ translate(descI18N) }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { translate } from "@shared/i18n";

defineProps<{
    titleI18N: string;
    descI18N?: string;
}>();
</script>

<style scoped>
.TUIC_settings_guide {
    display: flex;
    flex-direction: column;
    gap: 2px;
    align-items: start;

    padding-inline: 35px;

    h2 {
        padding: 0;
        margin: 0;
        font-size: 20px;
    }
    p {
        padding: 0;
        margin: 0;
        color: #71767c;
    }
}
</style>
