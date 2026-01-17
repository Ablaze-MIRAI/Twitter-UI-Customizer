import { TUICI18N } from "../i18n";
import { getPref } from "../pref";

let TimeFormat: Intl.DateTimeFormat;
let DateFormat: Intl.DateTimeFormat;
let language = "";

let second: boolean;
let hour12: boolean;
let requireDate: boolean;

function getIntlFormat() {
    const [prefSecond, prefHour12, prefRequireDate] = [
        getPref("dateAndTime.options.second"),
        getPref("dateAndTime.options.hour12"),
        getPref("dateAndTime.dateAboveTweet") === "absolutely",
    ];
    const changedLang = language !== document.documentElement.lang;
    if (changedLang) {
        language = document.documentElement.lang;
        DateFormat = Intl.DateTimeFormat(language, { month: "short", day: "numeric" });
    }
    if (
        changedLang
        || !TimeFormat
        || prefHour12 !== hour12
        || prefSecond !== second
        || prefRequireDate !== requireDate
    ) {
        [hour12, second, requireDate] = [prefHour12, prefSecond, prefRequireDate];
        TimeFormat = new Intl.DateTimeFormat(language,
            {
                dateStyle: requireDate ? "medium" : undefined,
                timeStyle: second ? "medium" : "short",
                hour12: hour12,
            },
        );
    }
}

export function formatTimeText(dateTime: string): string {
    getIntlFormat();
    return TimeFormat.format(new Date(dateTime));
}

export function getAbsolutelyTime(dateTime: string): string {
    getIntlFormat();
    const date = new Date(dateTime);
    const nowDate = new Date();
    if (requireDate || date.getDate() >= nowDate.getDate()) {
        return TimeFormat.format(date);
    } else {
        return DateFormat.format(date);
    }
}

export function isRelativeTime(dateText: string): boolean {
    const timeTempleteText: string = TUICI18N.get("dateAndTime.options.absolutelyTime.ago");
    const timeTempleteReg = new RegExp(`^${timeTempleteText.replace("{0}", ".*")}$`, "i");
    const timeTempleteReg2 = new RegExp(`^${timeTempleteText.replaceAll("{", "\\{").replaceAll("}", "\\}")}`, "i");
    return timeTempleteReg.test(dateText) || timeTempleteReg2.test(dateText);
}
