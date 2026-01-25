import { createApp } from "vue";
import safemodeVue from "./SafeMode.ce.vue";
import { createPinia } from "pinia";
import { translate } from "@content/i18n";

// https://stackoverflow.com/questions/42800035/why-cant-you-create-custom-elements-in-content-scripts
// import "@webcomponents/custom-elements";
// NOTE: Chrome 144 では少なくとも動いているし、4af1df4 でコメントアウトされていてもバグ報告がないため、不要と思われる by KotoneFami @ 2026/01/07

/** セーフモードで起動しているかどうか */
export const isSafemode = location.pathname === "/tuic/safemode";

/** セーフモードを実行します。 */
export function runSafemode() {
    if (!isSafemode) return;

    document.title = translate("safemode-title");
    document.querySelector("#TUIC_safemode")?.remove();
    document.querySelector(".twitter_ui_customizer_css")?.remove();
    document.querySelector<HTMLElement>("#react-root").style.display = "none";

    const entry = document.createElement("div");
    entry.id = "TUICOptionSafemodeEntry";
    document.body.appendChild(entry);

    // styles, not style
    if (safemodeVue.styles !== undefined) {
        const style = document.createElement("style");
        style.textContent = safemodeVue.styles;
        document.head.appendChild(style);
    }

    const app = createApp(safemodeVue);
    app.use(createPinia());
    app.mount("#TUICOptionSafemodeEntry");
}

// TUICI18N.fetch().then(() => {
// in Twitter, occurs bugs abt CustomElement

// {
//     const ce = defineCustomElement(safemodeVue);
//     customElements.define("tuic-option-entry", ce);
// }

//document.querySelector("#TUICOptionSafemodeMain").appendChild(new ce({}));
// });
