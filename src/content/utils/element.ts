import { ProcessedClass } from "@shared/sharedData";

// /**
//  * HTMLとしてパースします。
//  *
//  * @param {string} elem パースするHTMLを表す文字列
//  * @return {HTMLCollection} パースされた後のHTML(複数の可能性もあり)
//  */
// export function parseHtml(elem: string): HTMLCollection {
//     return new DOMParser().parseFromString(elem, "text/html").body.children;
// }
//
// /**
//  * HTMLで用いるために&'`"<>=;を&を用いた表記にエスケープします。
//  *
//  * @param {string} text エスケープ前の文字列
//  * @return {string} エスケープ後の文字列
//  */
// export function escapeToUseHTML(text: string): string {
//     return text
//         .replace(/[&'`"<>=;]/g, (match) => {
//             return {
//                 "&": "&amp;",
//                 "'": "&#x27;",
//                 "`": "&#x60;",
//                 '"': "&quot;",
//                 "<": "&lt;",
//                 ">": "&gt;",
//                 "=": "&equals;",
//                 ";": "&semi;",
//             }[match];
//         })
//         .replaceAll("\\r", "\r");
// }

/**
 * parentElementで指定されたElementの子孫ノードにselectorに合致するElementが生えてくるまで待ちます。
 *
 * @param {string} selector 待つ対象のElementのセレクター
 * @param {Element} elem 探索元のElement
 * @return {Element[]} 待った結果生えてきたElement
 */
export async function waitForElement<T extends Element>(selector: string, parentElement: ParentNode = document): Promise<T[]> {
    if (parentElement.querySelectorAll(selector).length !== 0) {
        return Array.from(parentElement.querySelectorAll<T>(selector));
    } else {
        return new Promise((resolve) => {
            const observer = new MutationObserver((mutations) => {
                const matchedAddedNodes = parentElement.querySelectorAll<T>(selector);
                if (matchedAddedNodes.length !== 0) {
                    observer.disconnect();
                    resolve([...matchedAddedNodes]);
                }
            });
            observer.observe(parentElement, { subtree: true, childList: true });
        });
    }
}

/**
 * selectorで指定された要素を子孫ノードに持つまでelemから文書ルートに向かって探索します。
 *
 * セレクターの判断にはquerySelectorを使うので、子結合子の1つ目のセレクターなどが返り値よりも親にある場合があります。
 * それを防ぐためには擬似クラスの:scopeをお使いください
 * @param {Element} elem 探索元のElement
 * @param {string} selector 探索するElementのセレクター
 * @return {Element} 指定されたElementを子孫ノードに持つセレクター
 */
export function hasClosest<T extends Element>(elem: Element, selector: string): T {
    let elem2 = elem;
    while (elem2 && !elem2.querySelector(selector)) {
        elem2 = elem2.parentElement;
    }
    return elem2 as T;
}

/**
 * selectorで指定された要素を子孫ノードに持つまでelemから文書ルートに向かって探索し、見つかったselectorで指定された要素を返します。
 *
 * セレクターの判断にはquerySelectorを使うので、子結合子の1つ目のセレクターなどが折り返し地点よりも親にある場合があります。
 * それを防ぐためには擬似クラスの:scopeをお使いください
 * @param {Element} elem 探索元のElement
 * @param {string} selector 探索するElementのセレクター
 * @return {Element} 指定されたElementを子孫ノードに持つセレクター
 */
export function hasClosestSelector<T extends Element>(elem: Element, selector: string): T {
    let elem2 = elem;
    let returnElem = null;
    while (elem2 && !(returnElem = elem2.querySelector(selector))) {
        elem2 = elem2.parentElement;
    }
    return returnElem;
}

/**
 * elemで指定された要素を非表示にします。
 *
 * @param {HTMLElement} elem 対象のElement
 */
export function hideElement(elem: HTMLElement) {
    if (elem) elem.dataset.tuicHide = "true";
}

/**
 * hide()で非表示にした要素のうち、elemで指定された要素を再び表示します。
 *
 * @param {HTMLElement} elem 対象のElement
 */
export function showElement(elem: HTMLElement) {
    if (elem) delete elem.dataset.tuicHide;
}

/**
 * elemで指定された要素を処理済みとマークします。
 *
 * @param {Element} elem 対象のElement
 */
export function processElement(elem: Element) {
    elem?.classList.add(ProcessedClass);
}
