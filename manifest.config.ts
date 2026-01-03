import type { Manifest } from "webextension-polyfill";

const manifest: {
    common: Partial<Manifest.WebExtensionManifest>;
    firefox: Partial<Manifest.WebExtensionManifest>;
    chromium: Partial<Manifest.WebExtensionManifest>;
    chromiumCRX: Partial<Manifest.WebExtensionManifest> & { update_url: string };
} = {
    // 共通設定
    common: {
        version: "5.6.3",
        manifest_version: 3,
        name: "__MSG_extensionName__",
        description: "__MSG_extensionDescription__",
        default_locale: "ja",
        content_scripts: [
            {
                matches: [
                    "*://*.twitter.com/*",
                    "*://*.x.com/*",
                ],
                js: [
                    "inject.js",
                ],
                run_at: "document_start",
                all_frames: true,
            },
        ],
        options_ui: {
            page: "options/options.html",
        },
        web_accessible_resources: [
            {
                resources: [
                    "*",
                ],
                matches: [
                    "*://*.twitter.com/*",
                    "*://*.x.com/*",
                ],
            },
        ],
        permissions: [
            "declarativeNetRequest",
            "notifications",
            "storage",
        ],
        host_permissions: [
            "https://api.github.com/*",
            "https://abs.twimg.com/*",
            "*://*.twitter.com/*",
            "*://*.x.com/*",
        ],
    },
    // Firefox設定
    firefox: {
        icons: {
            16: "icon/newIcon_TUIC_C_Blue.svg",
            48: "icon/newIcon_TUIC_C_Blue.svg",
            128: "icon/newIcon_TUIC_C_Blue.svg",
        },
        action: {
            default_icon: {
                16: "icon/newIcon_TUIC_C_Blue.svg",
                48: "icon/newIcon_TUIC_C_Blue.svg",
                128: "icon/newIcon_TUIC_C_Blue.svg",
            },
            default_title: "Twitter UI Customizer",
            default_popup: "popup/popup.html",
        },
        background: {
            scripts: [
                "background.js",
            ],
            type: "module",
        },
        browser_specific_settings: {
            gecko: {
                id: "{e9c237f9-8c89-4f60-aa0d-e17e305398dc}",
                strict_min_version: "121.0", //:has()
                data_collection_permissions: {
                    required: ["none"],
                },
            },
            gecko_android: {
                strict_min_version: "121.0", //:has()
            },
        },
        developer: {
            name: "kaonasi_biwa",
            url: "https://github.com/Ablaze-MIRAI/Twitter-UI-Customizer",
        },
    },
    // Chromium設定
    chromium: {
        icons: {
            16: "icon/newIcon_TUIC_C_Blue.png",
            48: "icon/newIcon_TUIC_C_Blue.png",
            128: "icon/newIcon_TUIC_C_Blue.png",
        },
        action: {
            default_icon: {
                16: "icon/newIcon_TUIC_C_Blue.png",
                48: "icon/newIcon_TUIC_C_Blue.png",
                128: "icon/newIcon_TUIC_C_Blue.png",
            },
            default_title: "Twitter UI Customizer",
            default_popup: "popup/popup.html",
        },
        background: {
            service_worker: "background.js",
            type: "module",
        },
        minimum_chrome_version: "111", //color-mix()
    },
    // chromiumCRX設定
    chromiumCRX: {
        update_url: "https://github.com/$(github.repository)/releases/latest/download/crxupdate.xml",
    },
};

export default manifest;
