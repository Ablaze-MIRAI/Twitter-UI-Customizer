export const TweetUnderButtonsData = {
    copyURL: {
        linkCopyURL_twitter: "twitter.com",
        linkCopyURL_X: "x.com",
        linkCopyURL_vxTwitter: "vxtwitter.com",
        linkCopyURL_fxTwitter: "fxtwitter.com",
        linkCopyURL_fixupx: "fixupx.com",
    },
};

export const ButtonUnderTweetSelectors = {
    "reply-button": '[data-testid$="reply"]:not([data-testid*="UserAvatar-Container-"])',
    "retweet-button": '[data-testid$="retweet"]:not([data-testid*="UserAvatar-Container-"])',
    "like-button": '[data-testid$="like"]:not([data-testid*="UserAvatar-Container-"])',
    "share-button": '[aria-haspopup="menu"]:not([data-testid="retweet"]):not([data-testid="unretweet"]) :is([d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"], [d="M17 4c-1.1 0-2 .9-2 2 0 .33.08.65.22.92C15.56 7.56 16.23 8 17 8c1.1 0 2-.9 2-2s-.9-2-2-2zm-4 2c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4c-1.17 0-2.22-.5-2.95-1.3l-4.16 2.37c.07.3.11.61.11.93s-.04.63-.11.93l4.16 2.37c.73-.8 1.78-1.3 2.95-1.3 2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4c0-.32.04-.63.11-.93L8.95 14.7C8.22 15.5 7.17 16 6 16c-2.21 0-4-1.79-4-4s1.79-4 4-4c1.17 0 2.22.5 2.95 1.3l4.16-2.37c-.07-.3-.11-.61-.11-.93zm-7 4c-1.1 0-2 .9-2 2s.9 2 2 2c.77 0 1.44-.44 1.78-1.08.14-.27.22-.59.22-.92s-.08-.65-.22-.92C7.44 10.44 6.77 10 6 10zm11 6c-.77 0-1.44.44-1.78 1.08-.14.27-.22.59-.22.92 0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2z"])',
    tweet_analytics: '[href$="/analytics"],[d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"]:not(.TUIC_ShowQuotes)',
    boolkmark: `[data-TUICButton="bookmark"],[data-testid="bookmark"]:not([data-testid*="UserAvatar-Container-"]),[data-testid="removeBookmark"]:not([data-testid*="UserAvatar-Container-"])`,
    "url-copy": `[data-TUICButton="url-copy"]`,
    userBlock: `[data-TUICButton="userBlock"]`,
    userMute: `[data-TUICButton="userMute"]`,
    quoteTweet: `[data-TUICButton="quoteTweet"]`,
    deleteButton: `[data-TUICButton="deleteButton"]`,
    sendDM: `[data-TUICButton="sendDM"]`,
    likeAndRT: `[data-TUICButton="likeAndRT"]`,
    grok: `[d="M18 4.1H6c-1.05 0-1.9.85-1.9 1.9v12c0 1.05.85 1.9 1.9 1.9h12c1.05 0 1.9-.85 1.9-1.9V6c0-1.05-.85-1.9-1.9-1.9zM6 2h12c2.21 0 4 1.79 4 4v12c0 2.21-1.79 4-4 4H6c-2.21 0-4-1.79-4-4V6c0-2.21 1.79-4 4-4z"]`,
    showQuotes: `[data-TUICButton="showQuotes"]`,
};
