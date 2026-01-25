# Contributing

## お知らせ

> [!NOTE]
> **パッケージマネージャーを pnpm に変更しました！** (2024/08/11)
> 
> yarn を使用していた方は、以下の手法で pnpm に移行をお願いいたします。
> - pnpm をインストールする
> - `node_modules` を削除する
> - `pnpm i` を実行する

> [!NOTE]
> **ビルドツール Vite 導入により、デバッグ方法が変わりました！** (2023/09/02)
> 
> ビルド及びデバッグ方法については、[`docs/vite_build`](./docs/vite_build.md)を御覧ください。  
> この変更は[`41dff7b`](https://github.com/Ablaze-MIRAI/Twitter-UI-Customizer/commit/41dff7b4e8c01c33ef04d05b8ff5e9e649f2719d) (2023年9月2日)からの適用です。

## 翻訳者の方へ

Crowdinで試験的にやってみています！  
<a href="https://crowdin.com/project/twiter-ui-customizer"><img alt="crowdin" width="175" height="50" src="https://badges.crowdin.net/badge/light/crowdin-on-dark@2x.png"></a>

### Twitter で表示される TUIC の機能の翻訳

`i18n/<言語タグ名>.json` に Twitter 上で使用できる言語すべてが列挙されています（未翻訳の言語を含む）。

言語名はファイル内部の `@JapaneseLanguageName` を参照してください。

#### 翻訳方法

1. `i18n/<言語タグ名>.json`を開く
2. `i18n/ja.json`をもとに翻訳する

### その他の翻訳

Twitter 以外で表示される TUIC の UI (例: 更新通知、拡張機能のオプション画面) の翻訳については、[_locales](./_locales) フォルダで行われています。

詳細な仕様については、[WebExtensions API 国際化](https://developer.mozilla.org/ja/docs/Mozilla/Add-ons/WebExtensions/Internationalization) をご確認ください。

## 開発者の方へ

`pnpm debug` を利用すると、拡張機能を再読み込みしなくてもデバッグ中に加えた変更が反映されます。
詳細は [`docs/vite_build`](./docs/vite_build.md)を御覧ください。

manifest.jsonなどのデバッグ・ソースコードの情報は[`docs/manifest_build`](./docs/manifest_build.md)を見てください！

> [!TIP]
> 環境変数は `.env.local` 内に書き込むことを推奨します。
> 詳細は、[`.env.local.example`](.env.local.example) を参照してください。

### Firefox

```bash
pnpm i

TUIC_WEBEXT_FIREFOX_PROFILE="C:\Users\user\AppData\Roaming\Mozilla\Firefox\Profiles\h6jvvuqd.dev_tuic"

# Firefox が標準のインストール場所にない場合、あるいは Firefox のフォークなどを利用したい場合は
# 環境変数 `TUIC_WEBEXT_FIREFOX_EXECUTABLE` に実行ファイルのパスを指定してください:
# TUIC_WEBEXT_FIREFOX_EXECUTABLE="C:\Program Files\Firefox Developer Edition\firefox.exe"

pnpm debug
# or
pnpm debug:firefox
```

> [!TIP]
> プロファイルは `about:profiles` などで作成、および Root Directory のパスを確認できます。

### Chromium

```bash
pnpm i --frozen-lockfile

TUIC_WEBEXT_CHROMIUM_PROFILE="C:\Users\user\AppData\Local\Google\Chrome\User Data\Profile 3"

# Chrome が標準のインストール場所にない場合、あるいは Chromium 系の他のブラウザなどを利用したい場合は
# 環境変数 `TUIC_WEBEXT_CHROMIUM_EXECUTABLE` に実行ファイルのパスを指定してください:
# TUIC_WEBEXT_CHROMIUM_EXECUTABLE="C:\Program Files\Google\Chrome\Application\chrome.exe"

pnpm debug:chromium
```

> [!TIP]
> プロファイルは `chrome://version` でパスを確認できます。
