<template>
    <div class="TUIC_setting_icon_uploader">
        <input type="file" accept="image/*" class="TUIC_setting_text" @change="changeCustomCSS()" ref="uploadInputRef" />
        <img :src="iconUrlRef" class="TUIC_setting_icon_uploader_uploaded" />
    </div>
</template>

<script setup lang="ts">
import { injectSettingsIconStyle, injectSettingsStyle } from "@content/applyCSS";
import { ref, useTemplateRef } from "vue";

const uploadInputRef = useTemplateRef("uploadInputRef");
const iconUrlRef = ref(localStorage.getItem("TUIC_IconImg"));

async function changeCustomCSS() {
    if (uploadInputRef.value.files.length >= 1) {
        // NOTE: 画像を Blob, Data URL, ImageBitmap として取得
        const imageBlob = uploadInputRef.value.files[0];
        const imageDataUrl = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.addEventListener("load", () => resolve(reader.result as string));
            reader.readAsDataURL(imageBlob);
        });
        const imageBitmap = await createImageBitmap(imageBlob);

        // NOTE: 丸く切り抜く
        const element = document.createElement("canvas");
        element.height = 200;
        element.width = 200;
        const context = element.getContext("2d");
        context.beginPath();
        context.arc(100, 100, 100, (0 * Math.PI) / 180, (360 * Math.PI) / 180);
        context.clip();
        context.beginPath();
        context.drawImage(imageBitmap, 0, 0, imageBitmap.height, imageBitmap.width, 0, 0, 200, 200);
        const croppedImageDataUrl = element.toDataURL();

        localStorage.setItem("TUIC_IconImg", imageDataUrl);
        localStorage.setItem("TUIC_IconImg_Favicon", croppedImageDataUrl);
        iconUrlRef.value = imageDataUrl;
    } else {
        localStorage.setItem("TUIC_IconImg", "");
        localStorage.setItem("TUIC_IconImg_Favicon", "");
        iconUrlRef.value = "";
    }

    injectSettingsStyle();
    injectSettingsIconStyle();
}
</script>

<style scoped>
.TUIC_setting_icon_uploader {
    display: flex;
    align-items: center;
    justify-content: space-between;

    /* ラジオボタン分開ける */
    margin-left: 28px;

    /* NOTE: ファイル選択ボタンのスタイル */
    input[type="file"] {
        flex: 1;
        cursor: pointer;
    }
    ::file-selector-button {
        cursor: pointer;
        padding: 5px 20px;
        margin-right: 12px;
        background-color: color-mix(in srgb, var(--TUIC-container-background), var(--twitter-TUIC-color) 50%);
        border: none;
        border-radius: 5px;
    }
}

.TUIC_setting_icon_uploader_uploaded {
    background-size: cover;
}
:root[data-tuic-settings*="|twitterIcon.options.roundIcon|"] .TUIC_setting_icon_uploader_uploaded {
    border-radius: 9999px !important;
}

.TUIC_setting_icon_uploader_uploaded:not([data-testid="interstitialGraphic"] > svg) {
    display: block;
    width: 36px;
    height: 36px;
    border: 1px solid;
    border-color: var(--TUIC-detail-border) !important;
}
</style>
