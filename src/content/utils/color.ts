import { ColorData } from "@shared/sharedData";
import { getPref } from "@content/settings";

/**
 * RGB 配列を `#XXXXXX` 表記に変換します。
 *
 * @param {[number, number, number]} rgb RGBの色を表す配列
 * @return `#XXXXXX`表記
 */
export function rgb2hex(rgb: [number, number, number]): string {
    return `#${rgb.map((value) => ("0" + value.toString(16)).slice(-2)).join("")}`;
}

/**
 * `#XXXXXX` 表記を RGB 配列に変換します。
 *
 * @param {[number, number, number]} hex `#XXXXXX`表記
 * @return RGB 配列
 */
export function hex2rgb(hex: string): [number, number, number] {
    if (hex.startsWith("#")) hex = hex.slice(1);
    return [hex.slice(0, 2), hex.slice(2, 4), hex.slice(4, 6)].map((str) => {
        return parseInt(str, 16);
    }) as [number, number, number];
}

/**
 * TUICのPrefから色を取得します。
 * 色の指定がされていない場合は、ColorDataにあるデフォルト値を参照します。
 * modeが指定されていない場合は、実際に使われている背景色を取得します。
 * modeがbuttonColorLight/buttonColorDarkの場合でも、指定されていない場合はbuttonColorとして色を取得します。
 * buttonColorは設定画面上の「ベース」です。
 *
 * @param {string} name 色の設定ID
 * @param {string} type 色の種類(基本的にはbackground,border,color)
 * @return {"buttonColor" | "buttonColorLight" | "buttonColorDark" | null} 色の取得に使用する背景色
 */
export function getColorFromPref(name: string, type: string, mode: "buttonColor" | "buttonColorLight" | "buttonColorDark" | null) {
    let _mode = "";
    _mode = mode ? mode : backgroundColorCheck() == "light" ? "buttonColorLight" : "buttonColorDark";
    return getPref(`${_mode}.${name}.${type}`) ?? ColorData.defaultTUICColor?.["colors-" + _mode]?.[name]?.[type] ?? getPref(`buttonColor.${name}.${type}`) ?? ColorData.defaultTUICColor.colors[name][type];
}

/**
 * 現在の画面での背景色を取得します。
 *
 * @return {"dark" | "blue" | "light"} 背景色
 */
export function backgroundColorCheck(): "dark" | "blue" | "light" {
    const bodyStyle = document.body.style.backgroundColor;
    if (bodyStyle == "rgb(0, 0, 0)") {
        return "dark";
    } else if (bodyStyle == "rgb(21, 32, 43)") {
        return "blue";
    } else {
        return "light";
    }
}

/**
 * 現在の画面での背景色を用いて、与えられた値から返り値を選びます。
 *
 * @param {unknwon} dark 背景色が「ブラック」のときに返す値
 * @param {unknwon} blue 背景色が「ダークブルー」のときに返す値
 * @param {unknwon} white 背景色が「デフォルト」のときに返す値
 */
export function backgroundColorClass<T extends number | string>(dark: T, blue: T, white: T) {
    const backgroundType = backgroundColorCheck();
    if (backgroundType == "dark") {
        return dark;
    } else if (backgroundType == "blue") {
        return blue;
    } else {
        return white;
    }
}
