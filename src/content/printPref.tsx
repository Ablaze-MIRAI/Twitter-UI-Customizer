import { JSX } from "solid-js";
import { render } from "solid-js/web";
import { translate } from "@content/i18n";
import { waitForElement } from "@content/utils/element";

/*
console.log(location.href);
alert("エクスポートされた設定、CSSの順で表示されます。それぞれコピーしてx.comで保存してください。");
alert(localStorage.getItem("TUIC"));
alert(localStorage.getItem("TUIC_CSS"));*/
const elem2 = (): JSX.Element => {
    return (
        <div id="rescurePrefElem">
            <h1>{translate("rescuePref-ButtonLabel")}</h1>
            <h2>{translate("rescuePref-detail")}</h2>
            <textarea class="full-width" value={localStorage.getItem("TUIC")} style={{ width: "100%", border: "solid black" }} readonly rows="8"></textarea>
            <button
                onClick={() => {
                    navigator.clipboard.writeText(localStorage.getItem("TUIC"));
                }}
                style={{ width: "100%", "margin-bottom": "10px", height: "30px", border: "1px solid #333", cursor: "initial", background: "initial" }}
            >
                {translate("common-copy")}
            </button>
            <textarea class="full-width" value={localStorage.getItem("TUIC_CSS")} style={{ width: "100%", border: "solid black" }} readonly rows="8"></textarea>
            <button
                onClick={() => {
                    navigator.clipboard.writeText(localStorage.getItem("TUIC_CSS"));
                }}
                style={{ width: "100%", "margin-bottom": "10px", height: "30px", border: "1px solid #333", cursor: "initial", background: "initial" }}
            >
                {translate("common-copy")}
            </button>
            <h2>{translate("rescuePref-complete")}</h2>
        </div>
    );
};

const elem = (): JSX.Element => {
    return (
        <li class="u01b-01__parent-link" style={{ "border-radius": "9999px", border: "solid gray" }}>
            <div
                onClick={async () => {
                    const base = document.querySelector(".u01b__page-padding+div");
                    render(elem2, base);
                    document.querySelector("body > div").insertBefore(document.querySelector("#rescurePrefElem"), document.querySelector("main"));
                }}
            >
                <div>
                    <a class="u01b-01__parent-link-href twtr-scribe-clicks twtr-type--roman-14  is-opaque  has-hover" style={{ "font-size": "20px" }}>
                        {translate("rescuePref-ButtonLabel")}
                    </a>
                    <div class="u01b-01__parent-link-indicator"></div>
                </div>
            </div>
        </li>
    );
};

export async function placePrintPrefButton() {
    const baseELement = (await waitForElement(".u01b-01__desktop-primary-links"))[0];
    render(elem, baseELement);
}
