<template>
    <div style="display: flex; align-items: center; justify-content: space-between">
        <input type="file" accept="image/*" class="TUIC_setting_text TUICSelectImg" @change="changeCustomCSS()" ref="twitterIcon" />
        <div style="display: flex; gap: 8px; align-items: center">
            <p style="color: rgb(113 118 124)" class="TUIC_setting_text">
                {{ TUICI18N.get("twitterIcon-nowIcon") }}
            </p>
            <span id="TUICIcon_IconImg" class="TUICUploadedImg"></span>
        </div>
    </div>
</template>

<script setup vapor lang="ts">
import { applyCustomIcon, applySystemCss } from "@content/applyCSS";
import { TUICI18N } from "@modules/i18n";
import { ref } from "vue";

const twitterIcon = ref(null);

async function changeCustomCSS() {
    if (twitterIcon.value.files.length >= 1) {
        await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                localStorage.setItem("TUIC_IconImg", reader.result as string);
                const element = document.createElement("canvas");
                element.height = 200;
                element.width = 200;
                const context = element.getContext("2d");
                context.beginPath();
                context.arc(100, 100, 100, (0 * Math.PI) / 180, (360 * Math.PI) / 180);
                context.clip();
                const image = new Image();
                image.onload = function (this: HTMLImageElement) {
                    context.beginPath();
                    context.drawImage(this, 0, 0, this.naturalHeight, this.naturalWidth, 0, 0, 200, 200);
                    localStorage.setItem("TUIC_IconImg_Favicon", element.toDataURL());
                    resolve(null);
                };

                image.src = reader.result as string;
            });
            reader.readAsDataURL(twitterIcon.value.files[0]);
        });
    } else {
        localStorage.setItem("TUIC_IconImg", "");
        localStorage.setItem("TUIC_IconImg_Favicon", "");
    }

    applySystemCss();
    applyCustomIcon();
}
</script>

<style scoped></style>
