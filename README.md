# 🌐 Web開発ガイドライン

## ❗️最重要指示（Absolute Must-Follow）

1. **１コンポーネントを生成したら必ず停止し、`===WAITING_FOR_OK===` のみを出力して待機せよ。**

2. ユーザーが `OK` または `次へ` と返信するまで **追加生成禁止**。

3. 違反時は「ERROR: Proceeded without OK」と返して即停止。

4. ユーザーからのフィードバックは、その要素やセクションに限定して修正を行い、修正後は必ず本ガイドラインの内容に基づいてコーディングを継続すること。フィードバック内容を全体ルールとして上書きしない。

本プロジェクトは Figma のデザインファイルに基づき、AIモデル と連携しながら **高再現度** の Web UI をブラウザで表示できるようにするものです。
以下の内容は **全コンポーネント共通** で適用されます。

---

## 0. 共通コーディングガイドライン

* 推測値・仮値の挿入 **禁止**
* MCP サーバーは **常に接続済み** とみなして処理を開始
* **JavaScript は実装しない（HTML/CSS のみ）**
* **Mobile First原則**：SP版（412px）をベースとし、768px以上でPC版に拡張
* **レスポンシブ実装**：幅は**%**指定、**max-width固定は禁止**
* **構造の維持**：PCの**列数/順序/表示状態は変更不可**

## 1. 開発ステップ（マイルストーン）


### Phase 1: 基盤構築

1. **プロジェクト初期化**

   * `index.html` の初期化（`index.html_初期化ルール.md` を適用）
   * `style.css` の基本設定（リセットCSS、フォント設定など）

### Phase 2: SP版全体実装

1. **SP版全体像確認**
   `doc/page-412px-sp.jpg` を確認して全体のレイアウトとデザインを把握

2. **SP版コンポーネント順次実装**
   ヘッダーから順に、各コンポーネントをSP版のみで実装

   * 各コンポーネント実装後、`===WAITING_FOR_OK===` で停止
   * ユーザー確認後に次のコンポーネントへ進む
   * 全コンポーネントのSP版が完成するまで継続

### Phase 3: PC版実装

1. **PC版全体像確認**
   `doc/page-1440px-pc.jpg` を確認してPC版のレイアウトとデザインを把握

2. **メディアクエリによるPC版実装**

   * `@media (min-width: 768px)` 内で各コンポーネントのPC版スタイルを追加
   * SP版のHTML構造をベースに、PC版のスタイルのみを調整
   * 全コンポーネントのPC版が完成するまで継続

### Phase 4: 最終調整

1. **全体調整・最適化**

   * 全セクション間の統一性確認
   * パフォーマンス最適化
   * 最終ブラウザテスト

### 完了条件

* Phase 2: 全コンポーネントのSP版が正常表示
* Phase 3: 全コンポーネントのPC版が正常表示（メディアクエリ対応）
* Figmaデザインとの再現度が90%以上
* ブラウザでの動作確認完了

## 2. 進行フロー（段階別実装手順）

### Phase 2: SP版実装フロー

1. **全体像確認**
   `doc/page-412px-sp.jpg` を確認して全体のレイアウトとデザインを把握

2. **ノードID取得**
   `doc/figma-structure-sp.md` を参照して適切な `node_id` を取得

3. **Figmaツール実行**
   - 変数取得: `mcp__figma-dev-mode-mcp-server__get_variable_defs nodeId=<ID>`
   - コード生成: `mcp__figma-dev-mode-mcp-server__get_code nodeId=<ID>`

4. **SP版コード実装**
   生成されたHTML/CSSを `index.html` / `style.css` に反映
   **コンポーネントタグを付与して挿入**
   実装完了後、**`===WAITING_FOR_OK===`** で停止


### Phase 3: PC版実装フロー

1. **PC版全体像確認**
   `doc/page-1440px-pc.jpg` を確認してPC版のレイアウトとデザインを把握

2. **ノードID取得**
   `doc/figma-structure-pc.md` を参照して適切な `node_id` を取得

3. **Figmaツール実行**
   - 変数取得: `mcp__figma-dev-mode-mcp-server__get_variable_defs nodeId=<ID>`
   - コード生成: `mcp__figma-dev-mode-mcp-server__get_code nodeId=<ID>`

4. **PC版スタイル実装**
   `@media (min-width: 768px)` 内でPC版スタイルを追加
   **既存コンポーネントを更新（コンポーネントタグは保持）**
   実装完了後、**`===WAITING_FOR_OK===`** で停止




## 3. Figmaツールコマンド

### 基本コマンド

* **変数取得**: `mcp__figma-dev-mode-mcp-server__get_variable_defs`
* **コード生成**: `mcp__figma-dev-mode-mcp-server__get_code`
* **画像取得**: `mcp__figma-dev-mode-mcp-server__get_image`


### 使用制限

* 画像取得は**コンポーネント内のラスタ画像取得専用**
* サイト全体や単一node_idに対してはユーザー指示があるまで使用不可

## 4. 実装ルール

### 4.1 index.html 初期化・挿入ルール

1. **初期化**
   index.html が空または存在しない場合、`index.html_初期化ルール.md` を丸ごと書き込む。

2. **差し込み**
   以降のコンポーネントは、`<!-- ⬇ COMPONENT_INSERT_POINT ⬇ -->` 直後に **コードのみ** を追加する。
   \* `<html>`, `<head>`, `<body>` タグは **絶対に再生成しない**
   \* 挿入後も `<!-- ⬆ COMPONENT_INSERT_POINT ⬆ -->` は残す（次の挿入位置として利用）

3. **コンポーネント管理**
   各コンポーネントのルート要素には必ず以下を付与：

   ```html
   <!-- COMPONENT: component-name -->
   <section data-component="component-name" class="component">
       コンポーネント内容
   </section>
   <!-- END_COMPONENT -->
   ```

### コンポーネント管理ルール

1. **同一判定**: `<component-id>`で行う
2. **既存コンポーネント**: ブロック全体を置換
3. **新規コンポーネント**: 新規挿入
4. **結果**: DOM二重化防止、最新状態へ確実更新

### 4.1.1 style.css 初期化ルール

1. 初期化

   * `style.css` が空、または有効な記述が無い場合は、先頭行に次を記述する（必ずファイルの最初の行に置くこと）。

   ```css
   @charset "UTF-8";
   ```

2. 注意事項

   * 文字コード宣言の前に空行やコメントを置かない
   * 既に `@charset` が存在する場合は二重に記述しない

### 4.2 ハンバーガーメニュー実装ルール

* クラス名が `*-menu` または `*-menu-icon` の要素は **CSS のみ** で 3 本線を描画（画像・SVG 不使用）

### 4.3 ボタン実装ルール

* `<button>` タグを使用する
* 矢印アイコンがある場合は SVG で作成する

**CSS生成ルール：**

* CSSはまず**SP版（デフォルト）**を記述し、最後に**@media (min-width: 768px)**（PC版）を記述


### 4.3.1 .inner コンテナ適用ルール（Figma MCP向け）

- 目的: PC版でのセクション中身を中央寄せ・幅制御するためのラッパー。

- SP版での扱い:
  - HTMLには`.inner`を記述するが、CSSでは何もスタイルを適用しない（padding、margin等は設定しない）
  - SP版の余白やレイアウトは、各セクションのFigmaデザイン値に従って個別に実装する

- PC版での扱い:
  - `@media (min-width: 768px)`内でのみ`.inner`にスタイルを適用
  - `max-width`と`margin: 0 auto`で中央寄せ・幅制御を行う

- 適用するケース（付ける）:
  - セクションの主要コンテンツ（見出し・本文・リスト・カードグリッド・ナビ・フッター中身）を「ページ共通の左右ライン」に揃えたいとき。
  - 背景色や装飾がセクション全幅に広がるが、中身は読みやすい横幅に収めたいとき。

- 適用しないケース（付けない）:
  - ヒーロー画像や横断バナーなど、メディアを画面端から端まで「フルブリード」で見せたいとき。
  - 区切り線や背景のみの飾りなど、中身の横幅制御が不要なとき。
  - ただし、フルブリード背景の上に載せるテキスト群は、そのテキスト群だけを`.inner`で包むことは可。

- 配置ルール:
  - 各セクションの直下（ルート子）に`.inner`を1つだけ置き、セクションの中身をまとめて包む。
  - 子要素ごとに複数の`.inner`をばら撒かない。ネストは原則避ける（必要な場合でも1段まで）。

- Figma構造からの判断指針:
  - セクションに「背景色/画像が全幅」「中身は中央寄せ」の構成が見られる場合: 背景は外側、主要コンテンツは`.inner`で包む。
  - セクション内に複数の兄弟ブロックがあり、同じ左右位置に揃っている場合: それらをまとめて1つの`.inner`で包む。
  - セクションが単一のフルブリード画像のみで構成される場合: `.inner`は不要。

- 実装例（概略）:
  ```html
  <section class="section">
      <div class="inner">
          <!-- 見出し・本文・カード群など主要コンテンツ -->
      </div>
  </section>

  <section class="hero">
      <!-- 画像は全幅。中のコピーを載せる場合のみ、そのテキスト群を`.inner`で包むことがある -->
  </section>
  ```

### 4.4 使用技術

* **HTML5**（セマンティックタグ優先）
* **CSS3**（FW 不使用）
* **JavaScript**: 使用しない（本プロジェクトではコーディング対象外）
* フォント: **Google Fonts Inter**
* 画像配置: `./assets/img/hero-image.jpg`, `content-image1.jpg`, `content-image2.jpg`, …

### 4.4.1 画像使用ルール

* **画像は必ず `./assets/img/` ディレクトリ内の画像ファイルを使用すること**
* **HTMLの`<img>`タグを使用し、CSSの`background-image`は使用しない**
* **`<img>`タグには必ず`display: block`をCSSで指定する**
* CSSでは`object-fit`と`object-position`で画像表示を制御する
* `get_image` で取得した画像は使用せず、既存の画像ファイルを適切に選択して使用する
* 画像ファイルが存在しない場合は、ユーザーに追加を依頼する

### 4.4.2 Spacer要素の実装ルール

* Figmaから取得される`spacer-mbXX-sp`などのスペーサー要素は、**常に次の要素の`margin-top`**として実装する
* スペーサー要素自体をHTMLに記述せず、次のコンポーネントのCSSで`margin-top`として制御する
* 実装方針：
  - すべてのspacer要素（mt/mr/mb/ml問わず）は次のコンポーネントの`margin-top`に変換
  - これにより前のコンポーネントを後から修正する必要がなくなる
* 数値はpx単位、Autoは`margin: auto`として解釈する
* 例：`spacer-mb72-sp` → 次のコンポーネントに`margin-top: 72px`を適用
* 例：`spacer-mt40-sp` → 次のコンポーネントに`margin-top: 40px`を適用

### 4.5 プロジェクト構成例

project-root/
├── index.html
├── README.md
├── prompt-pc-media-query.md
├── Prompt-768-stabilization.md
├── assets/
│    ├── css/
│    │    ├── reset.css
│    │    └── style.css
│    └── img/
│        ├── hero-image.jpg
│        ├── content-image1.jpg
│        └── content-image2.jpg
└── Doc/
     ├── [[figma-structure-sp.md]]
     ├── [[figma-structure-pc.md]]
     ├── [[figma-structure-tab.md]]
     ├── page-412px-sp.jpg
     ├── page-768px-tab.jpg
     └── page-1440px-pc.jpg

### 4.6 命名規則・スタイル（BEM 粒度ガイド込み）

* CSS クラスは **BEM（Block\_\_Element--Modifier）**
* スネークケース／キャメルケース **不使用**
* セレクタ深いネスト **禁止** ― フラット設計推奨

#### Block の定義

* Figma の **最上位 Frame / Section** または **再利用可能な Component** を 1 Block とみなす

  * 例: `header`, `hero`, `feature-list`, `button`, `card`
* ページ全体で 1 回しか出現しないが構造上独立している領域（例: `footer`）も Block

#### Element の定義

* Block 内にあり、**Block を離れると意味を持たない子要素**

  * 例: `button__label`, `hero__copy`, `card__title`
* Element のさらに子要素を作る場合でも `Block__sub-element` までで止める

  * 例: `button__icon`（`button__icon__path` のような 3 階層ネストは禁止）

#### Modifier の定義

* 見た目・状態・サイズなど **構造を変えずにバリエーションを与える** とき

  * 例: `button--primary`, `card--featured`, `modal--is-open`

> **実装時の指針**
>
> * **1 Frame = 1 Block** を原則とし、迷ったら Element に落とす
> * ネストは `Block` → `Element` まで。`Element` 内部の装飾用タグには追加クラスを付けず、親 Element のスタイルで制御する
> * 同一 UI を複数ページで使う場合はユーティリティ化せず、Block として再利用する

##### レイアウト補助の命名接尾辞

* `*-container` … Block 内で **幅・パディング・グリッド** を制御する外枠

  * 例: `hero-container`, `page-container`
* `*-wrapper` … Block 内で **装飾・比率保持** を担う小回りの箱（本プロジェクトでは JS 未使用）

  * 例: `logo-wrapper`, `image-wrapper`
* 自動コーディング時は

  * `*-container` → **Block 内コンテナ（Element 扱い）**
  * `*-wrapper` → **親 Block の Element**
    として解釈・生成させる。

### 4.7 共通プロパティ定義ルール

* 共通設定（`font-family`, `box-sizing` など）は **1 回のみ宣言**
* `font-family` は **原則 **`html, body { … }`** に一括定義**し、
  見出し・段落などのテキスト要素に **重複して再宣言しない**。

  * ロゴや装飾用など、意図的に異なるフォントを使用する場合のみ
    専用クラスで局所的に上書きすること

### 4.8 タイポグラフィスケーリングルール

html { font-size: 100%; } /\* 1rem = 16px \*/

* `rem` で `font-size` / `line-height` を管理
* PC で拡大する場合はメディアクエリで `html` の `font-size` を変更
* 滑らかな補間には `clamp()` を利用

### 4.9 レスポンシブ指定ルール（幅・高さ）

#### 幅

```
* Figma 基準幅（例: 412px）は **設計リファレンス値** とし、width:100% を必須。  
* **max-width で Figma 幅を固定することを禁止**（ブレークポイントで max-width を再設定する場合のみ許可）。  
* **Mobile First**で **PCブレークポイント** (min-width:768px) 以降で必要に応じて padding などを再調整。
```

#### 高さの実装例

* 画像要素: `height: auto` + `aspect-ratio: 372 / 228`
* コンテナ要素: `min-height: 164px`（コンテンツに応じて拡張可能）
* 固定高さが必要な場合のみ: `height: 60px`（フッターなど）

#### 高さ

```
* 画像・カードなど縦横比が決まっている要素は `aspect-ratio` を優先し、  
  割合（%, `vw`, `vh`）で指定する。  
* 絶対値 (px) は最小限に留め、必要な場合のみメディアクエリで上書きする。
```

### 4.10 ブレークポイント拡張ガイド

```css
@media (min-width: 1280px) { /* --bp-1280 */
    /* PC L 以上のスタイル */
}
```

- **Mobile First**。幅昇順に記述し `--bp-[幅]` コメントで明示

### 4.11 重要な制限

- ユーザー指示なく **サイト全体／単一 `node_id` に対して `get_image` を実行** すること

## 5. 進行開始トリガー

### 実装開始手順

1. **デザイン確認**
   - SP版: `doc/page-412px-sp.jpg` で全体像把握
   - PC版: `doc/page-1440px-pc.jpg` でPC版レイアウト確認

2. **開始宣言**
   「READMEを遵守して進めていきます。」と返信後、ヘッダーから順次実装
