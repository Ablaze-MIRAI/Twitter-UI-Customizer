<template>
    <button :id="btnId" :class="['TUIC_icon_button_con', 'TUIC_setting_button', 'TUICDefaultColor']" :title="btnTitle" @click="clickedBtn">
        <div class="TUICButtonRest_innersvg__container">
            <component :is="ICON_RESET" />
        </div>
    </button>
</template>

<script setup lang="ts">
import ICON_RESET from "@shared/icons/common/reset.svg?component";

defineProps<{
    btnId: string;
    btnTitle: string;
}>();
const emit = defineEmits<(e: "clickedBtn") => void>();

const clickedBtn = () => {
    emit("clickedBtn");
};
</script>
