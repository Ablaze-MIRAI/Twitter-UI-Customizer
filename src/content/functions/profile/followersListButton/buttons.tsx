import { fontSizeClass } from "@content/utils/fontSize";
import { backgroundColorClass } from "@content/utils/color";
import { JSX } from "solid-js";
import { data } from "./data";

export function followersListButton(id: string, baseElement: HTMLElement): () => JSX.Element {
    return (): JSX.Element => (
        <div
            class={`twcss-flex flex-row justify-start ${
                fontSizeClass("ml-[11px]", "ml-[11px]", "ml-[12px]", "ml-[13px]", "ml-[14px]")
            } TUICOriginalContent`}
            data-tuic-follower-list-button={id}
            onKeyDown={(e: KeyboardEvent) => {
                if (e.key === "Enter") {
                    data[id].clickEvent(baseElement);
                }
            }}
            onClick={() => data[id].clickEvent(baseElement)}
        >
            <div
                role="button"
                tabindex="0"
                class={`twcss-flex justify-center ${
                    fontSizeClass("min-h-[18px]", "min-h-[19px]", "min-h-[20px]", "min-h-[22px]", "min-h-[24px]")
                } overflow-visible select-none cursor-pointer outline-none`}
            >
                <div
                    dir="ltr"
                    class={`twcss-text-explicit min-w-[0px] text-align-inherit wrap-break-word font-tw2 ${fontSizeClass(
                        "text-[14px] leading-[18px]",
                        "text-[14px] leading-[19px]",
                        "text-[15px] leading-[20px]",
                        "text-[17px] leading-[22px]",
                        "text-[18px] leading-[24px]",
                    )} font-normal items-center flex justify-start duration-200 transition-property-color whitespace-nowrap ${
                        backgroundColorClass("text-tw-dark-text2", "text-tw-darkblue-text2", "text-tw-light-text2")
                    }`}
                >
                    <div class="twcss-flex inline-flex">
                        <div class="twcss-flex inline-flex bottom-[0px] left-[0px] absolute right-[0px] top-[0px] bg-transparent rounded-full m-[-8px] duration-200 transition-bgcolor-shadow outline-none TUIC_ButtonHover"></div>
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            class="inline-block fill-current max-w-full relative select-none align-text-bottom h-[1.25em] w-[1.25em]"
                        >
                            <g>
                                <path d={data[id].svg}></path>
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
