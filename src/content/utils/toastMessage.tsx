import { renderSolid } from "@content/utils/renderLifecycle";
import { JSX } from "solid-js";
import { fontSizeClass } from "@content/utils/fontSize";

const toastMessage = (message: string): (() => JSX.Element) => {
    return () => {
        return (
            <div class="twcss-flex backface-hidden right-[0px] left-[0px] fixed bottom-[0px] pointer-events-none! TUICToastMessage">
                <div class="twcss-flex pointer-events-none!">
                    <div class="twcss-flex pointer-events-none!">
                        <div class="twcss-flex pointer-events-none! mx-auto w-full max-w-[600px]">
                            <div
                                role="alert"
                                data-testid="toast"
                                class={`twcss-flex items-center bg-tw-accent-blue flex-row justify-between ${
                                    fontSizeClass("p-[11px]", "p-[11px]", "p-[12px]", "p-[13px]", "p-[14px]")
                                } pointer-events-auto! top-[calc(env(safe-area-inset-bottom)-53)] self-center rounded-[4px] ${
                                    fontSizeClass("mb-[29px]", "mb-[30px]", "mb-[32px]", "mb-[35px]", "mb-[38px]")
                                } transition-property-opacity duration-170 ease-linear opacity-[1]`}
                            >
                                <div
                                    dir="ltr"
                                    class={`twcss-text-explicit min-w-[0px] text-align-inherit wrap-break-word font-tw ${fontSizeClass(
                                        "text-[14px] leading-[18px]",
                                        "text-[14px] leading-[19px]",
                                        "text-[15px] leading-[20px]",
                                        "text-[17px] leading-[22px]",
                                        "text-[18px] leading-[24px]",
                                    )} font-normal shrink ${fontSizeClass(
                                        "px-[11px]", "px-[11px]", "px-[12px]", "px-[13px]", "px-[14px]",
                                    )} text-white`}
                                >
                                    <span class="twcss-text-inherit min-w-[0px] text-align-inherit wrap-break-word font-tw">
                                        { message }
                                    </span>
                                </div>
                                <div aria-hidden="true" class="twcss-flex flex-row"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export const placeToastMessage = (message: string, duration = 3000) => {
    const baseElem = document.querySelector(`#layers`);
    if (baseElem) {
        renderSolid(toastMessage(message), baseElem);
        window.setTimeout(() => {
            document.querySelector(`.TUICToastMessage`).remove();
        }, duration);
    }
};
