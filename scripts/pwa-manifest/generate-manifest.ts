import fs from "node:fs/promises";

import { pwaManifest } from "./pwa-manifest.config.ts";
import type { Locale } from "../../i18n/_langList.ts";
import type { TUICI18nKey } from "../../i18n/_officialTwitterI18n.ts";

export const generatePWAManifest = async (locale: Locale, ti18n: Record<TUICI18nKey, string>) => {
    await fs.writeFile(
        `public/pwa-manifests/${locale}.json`,
        JSON.stringify(pwaManifest(
            ti18n["XtoTwitter-PostToTweet-pwaManifest-description"],
            ti18n["XtoTwitter-PostToTweet-pwaManifest-newTweet"],
            ti18n["XtoTwitter-PostToTweet-pwaManifest-explore"],
            ti18n["XtoTwitter-PostToTweet-pwaManifest-notifications"],
            ti18n["XtoTwitter-PostToTweet-pwaManifest-directMessages"],
        ), null, 2),
    );
};
