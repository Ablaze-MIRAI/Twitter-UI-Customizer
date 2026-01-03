import { backgroundColorClass } from "@modules/utils/color";

/**
 * TLUI のオブザーバーを開始します。
 */
export function startTluiObserver() {
    async function changedTheme() {
        document.documentElement.style.setProperty("--tlui-dialog-background", document.body.style.backgroundColor);
        document.documentElement.style.setProperty("--tlui-dialog-text", backgroundColorClass<string>(
            "rgb(231, 233, 234)", "rgb(247, 249, 249)", "rgb(15, 20, 25)",
            //"r-1nao33i", "r-vlxjld", "r-18jsvk2"
        ));
    }

    new MutationObserver(changedTheme).observe(document.body, { attributes: true, attributeFilter: ["style"] });
    changedTheme();
}

/*

await waitForElement("#layers");
const dialog = new Dialog("Hello!");
dialog.addComponents([
    "こんな感じで簡単にダイアログを出せるようになりました。",
    "いい感じのAPIにしたつもりなのですが、もしここが使いにくいとかあれば言ってくださいね。",
    new ButtonComponent("ふぁみちゃんだいすき", () => dialog.close()),
    new ButtonComponent("閉じる", () => dialog.close(), {
        invertColor: true
    }),
    new ContainerComponent([
        new ButtonComponent("第三の選択肢！", () => dialog.close(), {
            invertColor: true
        })
    ])
]).open();

*/
