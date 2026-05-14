# dd-koshien

このリポジトリは、日本の地域社会によるデジタルトランスフォーメーション（DX）の取り組みを紹介するイベント「夏のDigi田甲子園2022」のシビックオープンデータを提供します。

## デモ

-   [エントリー一覧](https://code4fukui.github.io/dd-koshien/)
-   [エントリー動画一覧](https://code4fukui.github.io/dd-koshien/movie.html)
-   [全エントリー動画一覧（読み込みに時間がかかります）](https://code4fukui.github.io/dd-koshien/movie-all.html)

## シビックオープンデータ

このプロジェクトは、公式サイト「夏のDigi田甲子園2022」からエントリーデータをスクレイピングし、構造化しています。

-   **出典表記:** 「[夏のDigi田甲子園｜内閣官房ホームページ](https://www.cas.go.jp/jp/seisaku/digital_denen/koushien.html)」を加工して作成（[Code for FUKUI](https://code4fukui.github.io/) が変換）
-   **提供フォーマット:**
    -   [CSV](data/dd-koshien-2022s.csv)
    -   [JSON](data/dd-koshien-2022s.json)
    -   [CBOR](data/dd-koshien-2022s.cbor)
-   **データ項目:**
    -   `pref`: 都道府県名
    -   `category`: エントリー部門（カテゴリ）
    -   `name`: 取組名
    -   `url`: エントリーのPDFドキュメントへのリンク
    -   `src`: 内閣官房ホームページのソースURL
    -   `nettvid`: `nettv.gov-online.go.jp` の動画ID（存在する場合）
    -   `movie`: 動画ページへのリンク
    -   `image`: 動画サムネイル画像へのリンク
    -   `city`: 動画メタデータから取得した市区町村名
    -   `title`: 動画メタデータから取得したタイトル
    -   `description`: 動画メタデータから取得した説明文

## 特徴

### データスクレイピングの自動化

データは、公式サイトをスクレイピングするDenoスクリプト（[deno/download.js](deno/download.js)）を使用して収集されました。このプロセスは、GitHub Actionsのワークフロー（[.github/workflows/scheduled-update.yml](.github/workflows/scheduled-update.yml)）によって自動化されていました。注意: 2022年のイベント終了に伴い、定期更新は現在停止されています。

### 動画埋め込みコンポーネント

本リポジトリには、政府インターネットテレビ（[nettv.gov-online.go.jp](https://nettv.gov-online.go.jp/)）の動画を簡単に埋め込むためのJavaScriptモジュール [createNetTV.js](createNetTV.js) が含まれています。

```javascript
import { createNetTV } from "./createNetTV.js";

// データセットの 'nettvid' を使用
const videoPlayer = createNetTV("24726");
document.body.appendChild(videoPlayer);
```

## ライセンス

MIT License — 詳細は [LICENSE](LICENSE) を参照してください。
