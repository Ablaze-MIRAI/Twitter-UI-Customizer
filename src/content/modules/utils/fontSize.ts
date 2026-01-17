/**
 * Twitterの「フォントサイズ」に基づいて値を返します。
 *
 * @template {number | string} T
 * @param {T} x1 フォントサイズが一番小さいときの返り値(設定画面では左端)
 * @param {T} x2 フォントサイズが二番目に小さいときの返り値
 * @param {T} x3 フォントサイズが三番目に小さいときの返り値
 * @param {T} x4 フォントサイズが四番目に小さいときの返り値
 * @param {T} x5 フォントサイズが五番目に小さいときの返り値
 * @return {T} 返り値もしくはそのままの値
 */
export function fontSizeClass<T extends number | string>(x1: T, x2: T, x3: T, x4: T, x5: T) {
    const fontSize = document.documentElement.style.fontSize;
    switch (fontSize) {
        case "14px":
            return document.querySelector(`h1[role="heading"] > a[href="/home"]`)?.className.includes("r-116um31") ? x1 : x2;
        case "15px":
            return x3;
        case "17px":
            return x4;
        case "18px":
            return x5;
        default:
            return x3;
    }
}
