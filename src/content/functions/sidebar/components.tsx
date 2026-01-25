import type { JSX } from "solid-js";
import { backgroundColorCheck } from "@content/utils/color";
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
            class="css-175oi2r r-1habvwh r-1loqt21 r-6koalj r-eqz5dr r-16y2uox r-1ny4l3l r-13qz1uu r-cnw61z TUICOriginalContent TUICSidebarButton"
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
                class={`css-175oi2r r-1awozwy r-sdzlij r-18u37iz r-1777fci r-dnmrzs r-o7ynqc r-6416eg ${fontSizeClass(
                    "r-q81ovl",
                    "r-q81ovl",
                    "r-xyw6el",
                    "r-kq9wsh",
                    "r-1slz7xr",
                )}`}
            >
                <div class="css-175oi2r">
                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        class={`r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-cnnz9e ${
                            backgroundColorCheck() == "light" ? "r-18jsvk2" : "r-vlxjld r-1nao33i"
                        }`}
                    >
                        <g>{svg()}</g>
                    </svg>
                </div>
                <div
                    dir="ltr"
                    class={`css-146c3p1 r-dnmrzs r-1udh08x r-3s2u2q r-bcqeeo r-1ttztb7 r-qvutc0 r-1tl8opc r-9p5ork ${fontSizeClass(
                        "r-1i10wst r-hbpseb r-16dba41 r-b8s2zf r-1nbxd40 r-fv9tdh",
                        "r-1b6yd1w r-7ptqe7 r-16dba41 r-1b4jfhh r-egpt5t r-1tfrt9a",
                        "r-adyw6z r-135wba7 r-dlybji r-nazi8o",
                        "r-evnaw r-eaezby r-16dba41 r-1fqalh9 r-k1rd3f r-i0ley5 r-19o66xi",
                        "r-1x35g6 r-1h1c4di r-16dba41 r-ikuq2u r-1ck5maq",
                    )} r-bcqeeo r-qvutc0 ${backgroundColorCheck() == "light" ? "r-18jsvk2" : "r-vlxjld r-1nao33i"}`}
                    style={{ "margin-right": "15px", "text-overflow": "unset" }}
                >
                    <span class="css-901oao css-16my406 r-1tl8opc r-bcqeeo r-qvutc0" style={{ "text-overflow": "unset" }}>
                        {translate("sidebarButtons-" + id)}
                    </span>
                </div>
            </div>
        </a>
    );
}
