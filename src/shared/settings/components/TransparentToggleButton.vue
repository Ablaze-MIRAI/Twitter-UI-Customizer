<template>
    <button :id="btnId" class="TUICButtonColorCheck" @click="btnClicked($event)" :data-checked="isChecked" ref="transparentButton" :title="titleString">
        <div class="TUICButtonColorCheck_innersvg__container">
            <ICON_TRANSPARENT />
        </div>
    </button>
</template>

<script setup vapor lang="ts">
import ICON_TRANSPARENT from "@content/icons/common/transparent.svg?component";
import { ref } from "vue";

defineProps<{
    btnId: string;
    isChecked: boolean;
    titleString: string;
}>();
const emit = defineEmits<(e: "btnClicked", value: boolean) => void>();
defineExpose({ setCheckedValue });

const transparentButton = ref(null);

const btnClicked = ($event: Event) => {
    // チェックを反転させて
    ($event.currentTarget as HTMLButtonElement).dataset.checked = (!(($event.currentTarget as HTMLButtonElement).dataset.checked === "true")).toString();
    // 親コンポーネントに処理を移す
    emit("btnClicked", ($event.currentTarget as HTMLButtonElement).dataset.checked === "true");
};

function setCheckedValue(value: boolean) {
    transparentButton.value.dataset.checked = value;
}
</script>
