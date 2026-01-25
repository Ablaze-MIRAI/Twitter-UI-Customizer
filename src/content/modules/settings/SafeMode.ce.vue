<template>
    <div id="TUIC_safemode">
        <nav>
            <div>
                <a href="https://twitter.com">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6l6 6" /></svg>
                    <span>{{ TUICI18N.get("settingUI-goBackButton") }}</span>
                </a>
            </div>
            <div>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="48" height="48">
                    <path
                        d="M511.925 92.8613C488.224 92.8614 464.617 98.9495 445.663 110.933L357.662 166.457L132.684 308.847L18.7544 380.872C-0.0881082 392.784-5.6425 417.553 6.27015 436.396C18.1827 455.239 43.1267 460.968 61.9691 449.055L132.684 404.356L132.684 834.146C132.684 887.647 176.088 931.139 229.59 931.139L794.523 931.139C848.025 931.139 891.429 887.647 891.429 834.146L891.429 404.356L962.056 449.055C980.899 460.968 1005.84 455.239 1017.76 436.396C1029.67 417.554 1024.03 392.784 1005.18 380.872L891.429 308.847L666.363 166.457L578.45 110.933C559.495 98.9494 535.627 92.8614 511.925 92.8613ZM398.258 380.261C410.654 380.261 423.023 385.12 432.48 394.578L512.013 474.198L591.545 394.578C610.461 375.663 641.162 375.663 660.078 394.578L697.181 431.769C716.097 450.685 716.097 481.299 697.181 500.214L617.736 579.834L697.181 659.366C716.097 678.282 716.097 708.896 697.181 727.811L660.078 765.002C641.162 783.918 610.461 783.918 591.545 765.002L512.013 685.47L432.48 765.002C413.565 783.918 382.863 783.918 363.948 765.002L326.757 727.811C307.842 708.896 307.842 678.282 326.757 659.366L406.377 579.834L326.757 500.214C307.842 481.299 307.842 450.685 326.757 431.769L363.948 394.578C373.406 385.12 385.862 380.261 398.258 380.261Z"
                        fill="#1da1f2"
                        fill-rule="nonzero"
                        opacity="1"
                        stroke="none"
                    />
                </svg>
                <span>Twitter UI Customizer</span>
            </div>
            <div>
                <a href="https://github.com/Ablaze-MIRAI/Twitter-UI-Customizer" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98 96">
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                        />
                    </svg>
                </a>
            </div>
        </nav>
        <div class="spacer"></div>
        <OptionMain />
    </div>
</template>

<script setup vapor lang="ts">
import { TUICI18N } from "@modules/i18n";

import OptionMain from "@shared/settings/SettingMain.ce.vue";
</script>

<style scoped>
nav,
nav div,
nav a {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family:
        system-ui,
        -apple-system,
        sans-serif,
        monospace;
    font-weight: bold;
    color: #1da1f2;
    text-decoration: none;
}
nav {
    position: sticky;
    top: 0;
    z-index: 1;
    justify-content: space-between;
    padding: 12px 0;
    background-color: var(--TUIC-container-background);
    border-bottom: 1px solid color-mix(in srgb, var(--TUIC-container-background), var(--twitter-TUIC-color) 20%);

    div {
        width: 100%;
    }
    svg {
        width: unset;
        height: 1.7em;
        fill: currentcolor;
        &.icon-tabler {
            fill: none;
            stroke: currentcolor;
        }
    }
    span {
        margin-left: 0.3em;
    }
}
.spacer {
    width: 100%;
    height: 20px;
}

@media (width <= 600px) {
    nav a span {
        display: none;
    }
}
#TUIC_setting > div:first-of-type {
    display: none;
}
</style>
