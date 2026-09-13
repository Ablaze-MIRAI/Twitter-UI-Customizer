import { DEFAULT_SETTINGS } from "./settings";
import type { Settings, SettingKeys, SettingFullKeys, SettingGroupKeys, SettingKeyDefault, SettingGroupChildIds } from "./settings";

// TODO: 暫定的対応
export type { SettingGroupKeys, SettingFullKeys, SettingGroupChildIds } from "./settings";

// MARK: Class

/** JSON のプリミティブ型 */
type JsonPrimitive = string | number | boolean | null;
/** JSON としてシリアライズできる型 */
type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };
/** 指定されたオブジェクト中の、JSON としてシリアライズ可能なキー */
type JsonKeyOf<T> = Extract<keyof T, string>;

/** TUIC で使用する設定データ型 */
type DefaultPreferencesData = Record<SettingKeys, any>;
/** TUIC で使用する設定データ型を操作可能なクラス型 */
type DefaultPreferencesClass = Preferences<DefaultPreferencesData>;

export abstract class Preferences<T extends JsonValue> {
    /** この設定のルートオブジェクト */
    protected value: T;

    public constructor(value: T) {
        this.value = value;
    }

    /** この設定を文字列としてシリアライズします。*/
    public abstract serialize(): string;

    /**
     * 指定された ID を持つ設定値を取得します。
     * @param identifier 設定 ID
     */
    public abstract get(identifier: JsonKeyOf<T>): T[JsonKeyOf<T>];

    /**
     * 指定された ID を持つ設定値に、指定された値を代入します。
     * @param identifier 設定 ID
     */
    public abstract set<K extends JsonKeyOf<T>>(identifier: K, value: T[K]): this;

    /**
     * 指定された ID を持つ設定値を削除します。
     * @param identifier 設定 ID
     */
    public abstract delete(identifier: JsonKeyOf<T>): this;
}

/** ドットで区切られた設定 ID を内部的にネストされたオブジェクトとして扱える設定クラス */
export class NestedPreferences<T extends JsonValue> extends Preferences<T> {
    public constructor(value: T) {
        super(value);
    }

    public serialize(): string {
        return JSON.stringify(this.value);
    }

    /**
     * 指定されたキーに基づいて、ネストされたオブジェクトからオブジェクトとキー名を取得します。
     * @param object ネストされたオブジェクト
     * @param key ドット区切りのキー文字列
     * @return オブジェクトとキー名のペア
     */
    #getPointer(object: Record<string, unknown>, key: string): { object: any; key: string } {
        const keys = ["o", ...key.split(".").filter((k) => k !== "")];
        let pointer: Record<string, unknown> = { o: object };
        for (const [i, key] of keys.slice(0, -1).entries()) {
            if (!(key in pointer)) {
                throw new TypeError(`Cannot access property "${key}", because ${keys.slice(0, i).join(".")} is undefined`);
            }
            pointer = pointer[key] as Record<string, unknown>;
        }
        return {
            object: pointer,
            key: keys[keys.length - 1],
        };
    }

    // TODO: 設定の型が厳密になれば V を T[K] に置き換えられる。
    public get<V = any>(identifier: JsonKeyOf<T>): V {
        const { object, key } = this.#getPointer(this.value, identifier);
        return object[key];
    }
    // TODO: 補完できるようにしつつ、any な挙動を実現するために V ジェネリクスを使用している。設定の型が厳密になれば V を T[K] に置き換えられる。
    public set<K extends JsonKeyOf<T>, V = T[K]>(identifier: K, value: V): this {
        const { object, key } = this.#getPointer(this.value, identifier);
        object[key] = value;
        return this;
    }
    public delete(identifier: JsonKeyOf<T>): this {
        const { object, key } = this.#getPointer(this.value, identifier);
        delete object[key];
        return this;
    }
}

// MARK: Migrates

// eslint-disable-next-line ts/no-unsafe-declaration-merging
export interface MigratableNestedPreferences extends NestedPreferences<DefaultPreferencesData> {
    // NOTE: 古い設定は型定義から削除されていることがあるため、最新の設定型定義を補完しつつ、存在しないキーを受け入れるようにする
    // こうすることで、例えば以下のように推論される:
    // - .get("undefinedKey"): any
    // - .get<SomeType>("undefinedKey") -> エラー
    // - .get<SomeType, "undefinedKey">("undefinedKey"): SomeType
    // 存在しなくなったが強制的に使用したい、かつ値に特定の型を要求するキーを使用する際、第二ジェネリクスで明示する必要が出てくることにより、多少明示的になる

    // TODO: V = any は型定義が厳密になれば T[K] に置き換えられる
    get: <V = any, K extends string = SettingKeys>(identifier: K) => V;
    set: <K extends string = SettingKeys, V = any>(identifier: K, value: V) => this;
    delete: <K extends string = SettingKeys>(identifier: K) => this;
}
// eslint-disable-next-line ts/no-unsafe-declaration-merging
export class MigratableNestedPreferences extends NestedPreferences<DefaultPreferencesData> {
    /**
     * `oldKey` の設定が true であれば `newKey` に `newValue` を設定し、`oldKey` を削除します。
     * `oldKey` の設定が true でなければ `oldKey` の削除だけを行います。
     *
     * boolean 値の設定キーを変更することを想定しています。
     * @param oldKey 変更元のキー
     * @param newKey 変更先のキー
     * @param newValue 指定された値が true だった場合の置き換え先の値
     */
    #migrateBoolean<K1 extends string = SettingKeys, K2 extends string = SettingKeys>(oldKey: K1, newKey: K2, newValue: string | boolean = true): void {
        if (this.get(oldKey) === true) this.set(newKey, newValue);
        this.delete(oldKey);
    }

    /** 設定バージョンを 0 から 1 に移行します。 */
    async #migrateToV1(): Promise<void> {
        if (typeof this.get("timeline") !== "object") this.set("timeline", {});
        if (typeof this.get("rightSidebar") !== "object") this.set("rightSidebar", {});
        if (typeof this.get("XToTwitter") !== "object") this.set("XToTwitter", {});
        if (typeof this.get("tweetDisplaySetting") !== "object") this.set("tweetDisplaySetting", {});

        if (typeof this.get("profileSetting") !== "object") this.set("profileSetting", {});
        if (typeof this.get("profileSetting.invisible") !== "object") this.set("profileSetting.invisible", {});

        if (typeof this.get("sidebarSetting") !== "object") this.set("sidebarSetting", {});
        if (typeof this.get("sidebarSetting.buttonConfig") !== "object") this.set("sidebarSetting.buttonConfig", {});

        if (typeof this.get("twitterIcon") === "string") {
            const twitterIconPref = this.get<string, "twitterIcon">("twitterIcon");
            this.set("twitterIcon", {});
            this.set("twitterIcon.icon", twitterIconPref);
        }
        if (typeof this.get("twitterIcon") !== "object") this.set("twitterIcon", {});
        if (typeof this.get("twitterIcon.options") !== "object") this.set("twitterIcon.options", {});
        if (typeof this.get("clientInfo") === "object") this.delete("clientInfo");

        const boolKeys = {
            "invisibleItems.osusume-user-timeline": "timeline.osusume-user-timeline",
            "invisibleItems.hideOhterRTTL": "timeline.hideOhterRTTL",
            "invisibleItems.verified-rSidebar": "rightSidebar.verified",
            "otherBoolSetting.XtoTwitter": "XToTwitter.XToTwitter",
            "otherBoolSetting.PostToTweet": "XToTwitter.PostToTweet",
            "invisibleItems.twitter-pro-promotion-btn": "tweetDisplaySetting.twitter-pro-promotion-btn",
            "invisibleItems.subscribe-tweets": "tweetDisplaySetting.subscribe-tweets",
            "otherBoolSetting.bottomScroll": "tweetDisplaySetting.bottomScroll",
            "otherBoolSetting.bottomSpace": "tweetDisplaySetting.bottomSpace",
            "otherBoolSetting.RTNotQuote": "tweetDisplaySetting.RTNotQuote",
            "otherBoolSetting.noModalbottomTweetButtons": "tweetDisplaySetting.noModalbottomTweetButtons",
            "otherBoolSetting.noNumberBottomTweetButtons": "tweetDisplaySetting.noNumberBottomTweetButtons",
            "invisibleItems.subscribe-profile": "profileSetting.invisible.subscribe-profile",
            "invisibleItems.profileHighlights": "profileSetting.invisible.profileHighlights",
            "invisibleItems.profileAffiliates": "profileSetting.invisible.profileAffiliates",
            "invisibleItems.verifiedFollowerTab": "profileSetting.invisible.verifiedFollowerTab",
            "otherBoolSetting.smallerSidebarContent": "sidebarSetting.buttonConfig.smallerSidebarContent",
            "otherBoolSetting.sidebarNoneScrollbar": "sidebarSetting.buttonConfig.sidebarNoneScrollbar",
            "otherBoolSetting.faviconSet": "twitterIcon.options.faviconSet",
            "otherBoolSetting.roundIcon": "twitterIcon.options.roundIcon",
        } as const;
        for (const [oldKey, newKey] of Object.entries(boolKeys)) {
            this.#migrateBoolean(oldKey, newKey);
        }

        this.#migrateBoolean("invisibleItems.discoverMore", "timeline-discoverMore", "discoverMore_invisible");
        this.#migrateBoolean("otherBoolSetting.invisibleTwitterLogo", "twitterIcon", "invisible");
        this.#migrateBoolean("sidebarSetting.buttonConfig.birdGoBackHome", "sidebarSetting.homeIcon", "birdGoBack");

        if (this.get("CSS")) localStorage.setItem("TUIC_CSS", this.get<string, "CSS">("CSS"));
        this.delete("CSS");

        if (localStorage.getItem("TUIC_IconImg") !== null && localStorage.getItem("TUIC_IconImg_Favicon") === null) {
            await new Promise((resolve, reject) => {
                const element = document.createElement("canvas");
                element.height = 200;
                element.width = 200;
                const context = element.getContext("2d");
                context.beginPath();
                context.arc(100, 100, 100, (0 * Math.PI) / 180, (360 * Math.PI) / 180);
                context.clip();
                const image = new Image();
                image.onload = function () {
                    context.beginPath();
                    context.drawImage(image, 0, 0, image.naturalHeight, image.naturalWidth, 0, 0, 200, 200);
                    localStorage.setItem("TUIC_IconImg_Favicon", element.toDataURL());
                    resolve(null);
                };
                image.src = localStorage.getItem("TUIC_IconImg");
            });
        }

        // TODO: typeof は Array.isArray にしたほうがいいのでは？
        if (typeof this.get("visibleButtons") === "object" && this.get<string[]>("visibleButtons").includes("downvote-button")) {
            this.set("visibleButtons", this.get<string[]>("visibleButtons").filter((elem) => elem !== "downvote-button"));
        }
        if (typeof this.get("sidebarButtons") == "object" && (this.get<string[]>("sidebarButtons").includes("verified-orgs-signup") || this.get<string[]>("sidebarButtons").includes("twiter-blue") || this.get<string[]>("sidebarButtons").includes("circles"))) {
            this.set(
                "sidebarButtons",
                this.get<string[]>("sidebarButtons").filter((elem) => elem != "sidebarButtons-circles" && elem != "twiter-blue" && elem != "verified-orgs-signup" && elem != "circles"),
            );
        }

        this.set("prefVersion", 1);
    }

    /** 設定バージョンを 1 から 2 に移行します。 */
    #migrateToV2(): void {
        if (this.get<number, "prefVersion">("prefVersion") < 1) this.#migrateToV1();

        if (typeof this.get("tweetDisplaySetting") !== "object") this.set("tweetDisplaySetting", {});
        if (typeof this.get("tweetDisplaySetting.invisible") !== "object") this.set("tweetDisplaySetting.invisible", {});
        if (typeof this.get("tweetDisplaySetting.option") !== "object") this.set("tweetDisplaySetting.option", {});
        if (typeof this.get("tweetDisplaySetting.buttonsInvisible") !== "object") this.set("tweetDisplaySetting.buttonsInvisible", {});

        if (typeof this.get("engagementsLink") !== "object") this.set("engagementsLink", {});
        if (typeof this.get("engagementsLink.option") !== "object") this.set("engagementsLink.option", {});

        if (typeof this.get("showLinkCardInfo") !== "object") this.set("showLinkCardInfo", {});

        const boolKeys = {
            "tweetDisplaySetting.twitter-pro-promotion-btn": "tweetDisplaySetting.invisible.twitter-pro-promotion-btn",
            "tweetDisplaySetting.subscribe-tweets": "tweetDisplaySetting.invisible.subscribe-tweets",
            "tweetDisplaySetting.bottomSpace": "tweetDisplaySetting.invisible.bottomSpace",
            "tweetDisplaySetting.bottomScroll": "tweetDisplaySetting.option.bottomScroll",
            "tweetDisplaySetting.RTNotQuote": "tweetDisplaySetting.buttonsInvisible.RTNotQuote",
            "tweetDisplaySetting.noModalbottomTweetButtons": "tweetDisplaySetting.buttonsInvisible.noModalbottomTweetButtons",
            "tweetDisplaySetting.noNumberBottomTweetButtons": "tweetDisplaySetting.buttonsInvisible.noNumberBottomTweetButtons",
            "tweetDisplaySetting.likeToFavo": "tweetDisplaySetting.option.likeToFavo",
            "otherBoolSetting.placeEngagementsLink": "engagementsLink.option.placeEngagementsLink",
            "otherBoolSetting.placeEngagementsLinkShort": "engagementsLink.option.placeEngagementsLinkShort",
            "otherBoolSetting.showLinkCardInfo": "showLinkCardInfo.showLinkCardInfo",
        } as const;
        for (const [oldKey, newKey] of Object.entries(boolKeys)) {
            this.#migrateBoolean(oldKey, newKey);
        }

        this.set("prefVersion", 2);
    }

    /** 設定バージョンを 2 から 3 に移行します。 */
    #migrateToV3(): void {
        if (this.get<number, "prefVersion">("prefVersion") < 2) this.#migrateToV2();

        const boolKeys = {
            "tweetDisplaySetting.option.RTNotQuote": "tweetDisplaySetting.buttonsInvisible.RTNotQuote",
            "tweetDisplaySetting.option.noModalbottomTweetButtons": "tweetDisplaySetting.buttonsInvisible.noModalbottomTweetButtons",
            "tweetDisplaySetting.option.noNumberBottomTweetButtons": "tweetDisplaySetting.buttonsInvisible.noNumberBottomTweetButtons",
        } as const;
        for (const [oldKey, newKey] of Object.entries(boolKeys)) {
            this.#migrateBoolean(oldKey, newKey);
        }

        this.set("prefVersion", 3);
    }

    /** 設定バージョンを 3 から 4 に移行します。 */
    #migrateToV4(): void {
        if (this.get<number, "prefVersion">("prefVersion") < 3) this.#migrateToV3();

        this.#migrateBoolean("dateAndTime.options.absolutelyTime", "dateAndTime.dateAboveTweet", "absolutelyToday");

        this.set("prefVersion", 4);
    }

    /** 設定バージョンを 4 から 5 に移行します。 */
    #migrateToV5(): void {
        if (this.get<number, "prefVersion">("prefVersion") < 4) this.#migrateToV4();

        if (this.get("XToTwitter.XToTwitter")) {
            this.set("XToTwitter.PwaManifest", true);
        }
        // NOTE: XToTwitter と PwaManifest の設定は独立のため、削除する必要はない。よって migrateBoolean は使用しない。

        this.set("prefVersion", 5);
    }

    /**
     * この設定を最新の設定バージョンに移行します。
     */
    public migrate(): DefaultPreferencesClass {
        if (this.get<number, "prefVersion">("prefVersion") < 5) this.#migrateToV5();

        return new NestedPreferences(this.value);
    }
}

// MARK: Functions

/** 保存された設定を取得します。 */
export function loadPreferences(): DefaultPreferencesClass {
    const stored = localStorage.getItem("TUIC");
    if (stored) {
        return new MigratableNestedPreferences(JSON.parse(stored)).migrate();
    } else {
        return new NestedPreferences(mergeDefaultPref({}));
    }
}
/** 指定された設定をグローバルに保存します。 */
export function savePreferences(preferences: DefaultPreferencesClass) {
    localStorage.setItem("TUIC", preferences.serialize());
}

// MARK: Deprecated funcs
// TODO: 今は応急処置で動くようにしている

/**
 * `target` に `source` をマージします。 `target` オブジェクトは上書きされます。
 * @param source マージ元
 * @param target マージ先
 * @deprecated
 */
export function mergePref<T extends Record<string, any>, U extends Record<string, any>>(source: T, target: U): T & U {
    for (const i in source) {
        if (!(i in target)) {
            (target as T | U)[i] = source[i];
        } else if (typeof source[i] === "object" && !Array.isArray(source[i])) {
            mergePref(source[i], target[i]);
        }
    }
    return target as T & U;
}

const defaultPref = (() => {
    const defaultData: Record<string, any> = {
        buttonColor: {},
        buttonColorLight: {},
        buttonColorDark: {},
    };
    // NOTE: NestedPreferences#set は中間オブジェクトを自動生成しないため、
    //       ドット入りキー（例: "timeline.pinningTab"）に対応できるよう自前で設定する
    const setNested = (path: string, value: unknown) => {
        const keys = path.split(".");
        let pointer = defaultData;
        for (const key of keys.slice(0, -1)) {
            if (typeof pointer[key] !== "object" || pointer[key] === null) pointer[key] = {};
            pointer = pointer[key];
        }
        pointer[keys[keys.length - 1]] = value;
    };
    for (const elem in DEFAULT_SETTINGS) {
        if (elem === "buttonColor") continue;
        const prefData = DEFAULT_SETTINGS[elem as SettingGroupKeys];
        switch (prefData.type) {
            case "boolean": {
                for (const data of prefData.values) {
                    setNested(`${elem}.${data.id}`, data.default ?? false);
                }
                break;
            }
            case "order": {
                setNested(elem, structuredClone(prefData.default));
                break;
            }
            case "select": {
                setNested(elem, prefData.default);
                break;
            }
        }
    }
    return new NestedPreferences(defaultData as Settings);
})();

/** @deprecated */
export function mergeDefaultPref(source: Partial<Settings>): Settings {
    return mergePref(structuredClone(defaultPref.value), structuredClone(source));
}

/** @deprecated */
export function getDefaultPref(): Settings;
export function getDefaultPref<T extends SettingFullKeys<"boolean" | "order" | "select">>(id: T): SettingKeyDefault<T>;
export function getDefaultPref<T extends SettingFullKeys<"boolean" | "order" | "select">>(id?: T) {
    if (id === undefined) {
        return structuredClone(defaultPref.value);
    }
    return defaultPref.get(id);
}

/**
 * 指定した設定カテゴリーIDに基づいて値の一覧(CheckboxならCheckboxの全てのID、RadioBox/ListBoxなら値になりうるすべての値)を出力します
 *
 * @param {string} id 設定カテゴリーID
 * @return {string[]} 取得した値一覧
 * @deprecated
 */
export function getSettingIDs<T extends SettingGroupKeys>(id: T): SettingGroupChildIds<T>[] {
    return DEFAULT_SETTINGS[id].values.map((elem: (typeof DEFAULT_SETTINGS)[T]["values"][number]) => elem.id);
}

/**
 * 指定した設定カテゴリーIDのデータ(全ての値についてのidとi18nをObjectとして羅列するArray)を出力します。
 *
 * @param {string} id 設定カテゴリーID
 * @return {{id:string,i18n:string}[]} 取得したデータ
 * @deprecated
 */
export function getSettingData<T extends SettingGroupKeys>(id: T): typeof DEFAULT_SETTINGS[T]["values"] {
    return DEFAULT_SETTINGS[id].values;
}

/**
 * 指定した設定のi18nのIDを出力します。
 *
 * @param {string} id 設定カテゴリーID
 * @param {string} id 設定自体のID(設定カテゴリーIDを除く)
 * @return {string} i18nのID
 * @deprecated
 */
export function getSettingI18n<T extends SettingGroupKeys>(id: T, itemValue: SettingGroupChildIds<T>): (typeof DEFAULT_SETTINGS)[T]["values"][number]["i18n"];
export function getSettingI18n<T>(id: string, itemValue: string): T;
export function getSettingI18n<T extends SettingGroupKeys>(id: T, itemValue: SettingGroupChildIds<T>): (typeof DEFAULT_SETTINGS)[T]["values"][number]["i18n"] {
    return DEFAULT_SETTINGS[id].values.filter((elem) => elem.id == itemValue)[0]?.i18n ?? undefined;
}
