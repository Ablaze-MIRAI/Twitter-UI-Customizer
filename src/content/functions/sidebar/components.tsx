import type { JSX } from "solid-js";
import { backgroundColorClass } from "@content/utils/color";
import { fontSizeClass } from "@content/utils/fontSize";
import { translate } from "@content/i18n";

interface CreateSidebarButtonOptions {
    id: string;
    svg: () => JSX.Element;
    onclick: (e?: Event) => void;
    url: string | (() => string);
}

/**
 * サイドバー用のボタンコンポーネントを作成します。
 * @param options ボタンのオプション
 * @returns サイドバーボタンの JSX 要素
 */
export function createSidebarButton(options: CreateSidebarButtonOptions): () => JSX.Element {
    const { id, svg, onclick, url } = options;
    const rawHref = url;
    const href = typeof rawHref === "function" ? rawHref() : rawHref;

    return () => (
        <a
            id={`TUICSidebar_${id}`}
            href={href}
            role="link"
            tabindex="0"
            class="twcss-flex items-start cursor-pointer flex flex-col grow outline-none w-full py-[4px] TUICOriginalContent TUICSidebarButton"
            data-tuic-hide="false"
            onClick={onclick}
            onKeyDown={(e: KeyboardEvent) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    onclick();
                }
            }}
        >
            <div
                class={`twcss-flex items-center rounded-full flex-row justify-center max-w-full overflow-visible duration-200 transition-bgcolor-shadow ${
                    fontSizeClass("p-[11px]", "p-[11px]", "p-[12px]", "p-[13px]", "p-[14px]")
                }`}
            >
                <div class="twcss-flex">
                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        class={`inline-block fill-current h-[1.75rem] max-w-full relative align-text-bottom select-none w-[1.75rem] ${
                            backgroundColorClass("text-tw-dark-text", "text-tw-darkblue-text", "text-tw-light-text")
                        }`}
                    >
                        <g>{svg()}</g>
                    </svg>
                </div>
                <div
                    dir="ltr"
                    class={`twcss-text-explicit max-w-full overflow-hidden whitespace-nowrap min-w-[0px] text-align-inherit wrap-break-word font-tw text-ellipsis ${fontSizeClass(
                        "text-[18px] leading-[22px] mr-[14px] ml-[18px]",
                        "text-[19px] leading-[23px] mr-[15px] ml-[19px]",
                        "text-[20px] leading-[24px] mr-[16px] ml-[20px]",
                        "text-[22px] leading-[26px] mr-[18px] ml-[22px]",
                        "text-[24px] leading-[29px] mr-[19px] ml-[24px]",
                    )} font-normal ${backgroundColorClass("text-tw-dark-text", "text-tw-darkblue-text", "text-tw-light-text")}`}
                >
                    <span class="twcss-text-inherit font-tw min-w-[0px] text-align-inherit wrap-break-word">
                        {translate("sidebarButtons-" + id)}
                    </span>
                </div>
            </div>
        </a>
    );
}
