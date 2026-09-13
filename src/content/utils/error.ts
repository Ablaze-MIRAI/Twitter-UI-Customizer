import { translate } from "@shared/i18n";
import { getSourceMap, NRStack, parseErrorStringCH, parseErrorStringFF } from "@shared/sourcemap";
import { ButtonComponent } from "@shared/tlui/components/ButtonComponent";
import { Dialog } from "@shared/tlui/components/Dialog";
import { TextboxComponent } from "@shared/tlui/components/TextboxComponent";

const errors: string[] = [];

/** エラーダイアログを表示します。 */
export async function showErrorDialog(e: Error) {
    let stack: NRStack;
    if (!e.stack.includes("chrome-extension://")) {
        stack = await parseErrorStringFF(e);
    } else {
        stack = await parseErrorStringCH(e);
    }
    errors.push(await getSourceMap(stack.sourcemapUrl, stack.line, stack.col));
    errors.push(`${!e.stack.includes("chrome-extension://") ? e.toString() : ""}\n${e.stack}`);

    const dialog = new Dialog(translate("common-error"));
    dialog
        .addComponents([
            ...translate("observerError-message").split("\n"),
            "",
            new TextboxComponent(errors.join("\n\n"), { readonly: true, rows: 5 }),
            new ButtonComponent(translate("common-copy-and-close"), () => {
                dialog.close();
                navigator.clipboard.writeText(errors.join("\n\n"));
            }),
            new ButtonComponent(
                translate("common-close"),
                () => dialog.close(),

                {
                    invertColor: true,
                },
            ),
        ])
        .open();
}
