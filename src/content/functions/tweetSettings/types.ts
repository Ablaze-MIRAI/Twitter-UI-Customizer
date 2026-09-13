interface ArticleInformation {
    elements: {
        buttonBarBase: HTMLDivElement;
        articleBase: HTMLElement;
        /** ツイート要素の日付リンク（例: 最終更新 12:34:56 20XX年X月X日） */
        statusButton: HTMLAnchorElement;
    };
    option: {
        isLockedAccount: boolean;
        cannotRT: boolean;
        cannotShare: boolean;
        isMe: boolean;
        isBigArticle: boolean;
    };
}
