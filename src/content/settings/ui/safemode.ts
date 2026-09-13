import { renderVue } from "@content/utils/renderLifecycle";
import safemodeVue from "./SafeMode.vue";
import { translate } from "@shared/i18n";
import vueStyleUrl from "virtual:vue.css?url";

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
    // TODO: できればここに CSS のクリーンアップが欲しいっぽい
    document.querySelector<HTMLElement>("#react-root").style.display = "none";

    const entry = document.createElement("div");
    entry.id = "TUICOptionSafemodeEntry";
    document.body.appendChild(entry);

    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = chrome.runtime.getURL(vueStyleUrl);
    document.head.appendChild(style);

    renderVue(safemodeVue, "#TUICOptionSafemodeEntry");
}

// TUICI18N.fetch().then(() => {
// in Twitter, occurs bugs abt CustomElement

// {
//     const ce = defineCustomElement(safemodeVue);
//     customElements.define("tuic-option-entry", ce);
// }

//document.querySelector("#TUICOptionSafemodeMain").appendChild(new ce({}));
// });
