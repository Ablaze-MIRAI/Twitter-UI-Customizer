import "bootstrap-icons/font/bootstrap-icons.css";
import { loadI18n } from "@content/i18n";

let setting = {};

const i18nApply = async () => {
    for (const elem of [...document.querySelectorAll(".i18n-t")]) {
        if (elem instanceof HTMLElement) {
            elem.title = chrome.i18n.getMessage(elem.getAttribute("i18n-t-id") ?? "");
        }
    }
    for (const elem of [...document.querySelectorAll(".i18n")]) {
        elem.textContent = chrome.i18n.getMessage(elem.getAttribute("i18n-id") ?? "");
    }
};

const checkbox = (event) => {
    const elem = event.target;
    setting[elem.id] = elem.checked;
    chrome.storage.sync.set({ TUIC: setting });
};

window.onload = () => {
    i18nApply();
    chrome.storage.sync.get("TUIC", async (settingT) => {
        await loadI18n();
        const updateUrl = chrome.runtime.getManifest().update_url;
        const isWebstore = !(typeof updateUrl === "string" ? updateUrl.includes("google.com") : undefined);
        setting = settingT.TUIC ?? {
            iconClick: isWebstore,
            runBrowser: isWebstore,
            openTwitter: isWebstore,
        };
        const settingList = ["iconClick", "openTwitter", "runBrowser"];
        for (const i of settingList) {
            const elem = document.querySelector<HTMLInputElement>(`#${i}`);
            if (setting[i]) {
                elem.checked = true;
            }
            elem.addEventListener("change", checkbox);
        }
    });
    i18nApply();
};
