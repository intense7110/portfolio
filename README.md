# 🚀 TryMore Astro Template
TryMore Astro Template は、[Astro](https://astro.build/) を使用して静的な Web サイトを制作するためのスターターテンプレートです。

## 🛠️ 使用ツール
###  フロントエンド
- [Astro](https://astro.build/) - フレームワーク
- [Stylus](https://stylus-lang.com/) - CSS プリプロセッサー
- [PostCSS](https://postcss.org/) - CSS ポストプロセッサー
### コード解析
- [Markuplint](https://markuplint.dev/) - HTML 静的コード解析用ツール
- [Stylelint](https://stylelint.io/) - CSS 静的コード解析用ツール
- [ESLint](https://eslint.org/) - JavaScript・TypeScript コード解析用ツール

## 🧑‍🚀 必須環境
[Node.js](https://nodejs.jp/) >= `v18.17.0`  

## 📟 セットアップ
```
npm install
```

## 🤖 開発用コマンド

| コマンド               | アクション                                                     |
| :--------------------- | :------------------------------------------------------------- |
| `npm run dev`          | 開発サーバーの起動                                             |
| `npm run dev:coding`   | 開発サーバーの起動（`scripts`を実行しない）                    |
| `npm run build`        | 本番用ビルド `htdocs/`に出力                                   |
| `npm run preview`      | 本番用ビルド後のプレビュー                                     |
| `npm run lint`         | ソースコードの静的検証                                         |
| `npm run lint:html`    | HTML構文をチェック                                             |
| `npm run lint:css`     | CSS構文をチェック                                              |
| `npm run lint:js`      | JavaScript・TypeScript構文をチェック                           |

## 📁 ディレクトリ構成
```
├─ public/           # 静的ファイルを格納するディレクトリ
├─ src/              # サイト本体のソースコード
│  ├─ components/    # コンポーネントを格納するディレクトリ
│  │  ├─ page/       # ページ固有のコンポーネントを格納するディレクトリ
│  │  └─ ui/         # 再利用可能なUIコンポーネントを格納するディレクトリ
│  ├─ images/        # 最適化（画像圧縮とWebP生成）したい画像を格納するディレクトリ
│  ├─ integrations/  # インテグレーションを格納するディレクトリ
│  ├─ layouts/       # ページのレイアウトを格納するディレクトリ
│  ├─ pages/         # サイトのページを格納するディレクトリ
│  ├─ scripts/       # JavaScriptファイルを格納するディレクトリ
│  ├─ styles/        # CSSを格納するディレクトリ
│  ├─ utilities/     # 汎用的なユーティリティ関数を格納するディレクトリ
│  ├─ consts.js      # 汎用的な定数を定義するファイル
│  └─ site-config.js # サイトの設定を定義するファイル
├─ astro.config.js   # Astroの設定ファイル
├─ package.json      # 依存パッケージを管理するためのファイル
└─ tsconfig.json     # TypeScriptの設定ファイル
```
※主に開発で使用するものを記載

## ⚙️ 設定
| プロパティ名                      | 説明                                            |
| --------------------------------- | ----------------------------------------------- |
| config.breakPoints.sm             | ブレイクポイント smサイズ設定                   |
| config.breakPoints.md             | ブレイクポイント mdサイズ設定                   |
| config.images.smDir               | Pictureコンポーネント smディレクトリ設定        |
| config.images.mdDir               | Pictureコンポーネント mdディレクトリ設定        |
| config.retinaSuffix               | Pictureコンポーネント Retina対応用Suffix設定    |
| config.optimize.inputDir          | 画像最適化 出力前のディレクトリ設定             |
| config.optimize.outputDir         | 画像最適化 出力ディレクトリ設定                 |
| config.optimize.format            | 画像最適化 変換する拡張子の設定                 |
| config.optimize.allowedExtensions | 画像最適化 許可される画像拡張子                 |
| config.optimize.options.jpg       | 画像最適化 jpg形式の設定                        |
| config.optimize.options.png       | 画像最適化 png形式の設定                        |
| config.optimize.options.webp      | 画像最適化 webp形式の設定                       |
| config.build.root                 | ビルド出力 ルート設定                           |
| config.build.deletes              | ビルド出力 削除ファイルの設定                   |
| config.build.html.minify          | ビルド出力 HTMLファイルのMinify設定             |
| config.build.relativePath         | ビルド出力 相対パスの設定                       |
| config.build.css.path             | ビルド出力 CSSファイルのディレクトリ設定        |
| config.build.css.minify           | ビルド出力 CSSファイルのMinify設定              |
| config.build.css.queryParameter   | ビルド出力 CSSファイルのクエリパラメータ設定    |
| config.build.js.path              | ビルド出力 JavaScriptファイルのディレクトリ設定 |
| config.build.js.minify            | ビルド出力 JavaScriptファイルのMinify設定       |
| config.build.minify               | ビルド出力 Minify設定                           |
| config.build.js.queryParameter    | ビルド出力 JSファイルのクエリパラメータ設定     |


## 👀 公式ドキュメント
- [Astro](https://docs.astro.build/ja/getting-started/)
- [Stylus](https://stylus-lang.com/docs/)
- [PostCSS](https://postcss.org/docs/)