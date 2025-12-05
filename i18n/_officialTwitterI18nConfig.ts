export type TranslateKey = string;
export const config: {
    oldTranslate: TranslateKey[];
    latestTranslate: TranslateKey[];
    fixPlural: TranslateKey[];
    fixSingular: TranslateKey[];
    deleteString: Record<TranslateKey, (string/* | { text: RegExp; replaceIndex: number }*/)[]>;
} = {
    oldTranslate: [
        "e2414185",
        "ea831526",
    ],
    latestTranslate: [
        "a4d3eb67",
        //"df34a454",
        "g062295e",
        "c7999d10",
        "h4dd544e",
        "b9891db3",
        "hbf64b75",
        "h6e91bb1",
        //"cce3f116",
        //"b593b396",
        //"cf5af90c",
        //"d29edd5a",
        "d9442996",
        "a1e1b748",
        "ee69d769",
        "ge8e4a38",
        "gad04d1a",
        "ad00a739",
        "f98ecc47",
        "df45f564",
        "ed1f39ec",
        "f75d1806",
        "j11cb650",
        "c8061958",
        "e0cb0c72",
        "b007440a",
        "b55d8a78",
        "bb081ea2",
        "h5860a68",
        "h3edf7a6",
        "e2eef3c2",
        "e3eceda6",
        "d9025c46",
        "b85f402a",
        "f0e84609",
        "e18cb87c",
        "hb568af4",
        "aeb6f0a0",
        "h5e38204",
        "f88553c8"
    ],
    fixPlural: [
        "c42234da",
        "d6917e0d",
        "e2414185",
        //"e74e9bb7",
        "fdc023d7",
    ],
    fixSingular: [],
    deleteString: {
        g132f681: [
            "@{screenName}",
        ],
        //e74e9bb7: [
        //    ".",
        //    "。",
        //    "{tweetCount}",
        //    "(de)",
        //    "uri",
        //],
        fdc023d7: [
            "{formattedCount}",
            "{count}",
        ],
        //c42234da: [
        //    "{count}",
        //    "uri",
        //],
        h99e9c95: [
            "{0}",
        ],
        ee69d769: [
            "{verb}",
        ],
        //cf5af90c: [
        //    "!",
        //],
        //d29edd5a: [
        //    "!",
        //],
        d9025c46: [
            "{matches}",
        ],
        //abfcce0d: [
        //    "{amountOfTime}",
        //],
    },
};

export default config;
