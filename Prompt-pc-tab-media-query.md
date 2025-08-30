# PC・タブレット版メディアクエリ実装ガイド

## クイックスタート

1. SP版が完成していることを確認
2. PC・タブレット版のノードIDを取得
3. MCPでPC・タブレット版の値を取得
4. `@media (min-width: 768px)` にPC版スタイルを追加
5. SP版のスタイルは一切変更しない

## 基本ルール

### 絶対に守ること
- **SP版のスタイルは変更・削除しない**
- **HTML構造は原則変更しない**
- **推測値は使わない（MCPの値のみ使用）**
- **`@media (min-width: 768px)` 内にのみPC版を記述**

### コーディング規約
- モバイルファースト（SP = デフォルト、PC = メディアクエリ）
- プロパティは縦に1行ずつ、4スペースインデント
- `max-width` は使用禁止（`.inner` のみ例外）
- 画像は `<img>` タグを使用（背景画像は禁止）

## 実装フロー

### Step 1: 準備
```
1. SP版の完成確認
2. `doc/figma-structure-pc.md` から pc_node_id を取得
3. `doc/figma-structure-tab.md` から tab_node_id を取得
```

### Step 2: MCP値取得
```
1. get_variables でデザイントークン取得
2. get_codegen で pc_node_id のレイアウト・タイポグラフィ取得
3. get_codegen で tab_node_id のレイアウト・タイポグラフィ取得
```

### Step 3: PC版フル実装（ドラフト）
```
1. `@media (min-width: 768px)` にPC版フルスタイルを記述
2. MCPの値をもとに完全なPC版レイアウトを作成
3. 768px〜1440pxで可変値は clamp() を使用
4. ===WAITING_FOR_OK=== で停止し、見た目確認を待つ
```

### Step 4: 差分調整（最終版）
```
1. ユーザーOK後、SP版と比較して差分のみ抽出
2. PC版フル（ドラフト）を削除し、差分パッチのみ残す
3. ===WAITING_FOR_OK=== で最終確認
4. OKで次のコンポーネントへ進む
```

## 用語集

- **SP版**: スマートフォン版（768px未満）
- **PC版**: デスクトップ版（1440px基準）
- **タブレット版**: 768px基準
- **pc_node_id**: FigmaのPC版フレームのノードID
- **tab_node_id**: Figmaのタブレット版フレームのノードID
- **MCP**: Figma MCPツール（デザイン値の取得に使用）

## 可変値の計算

768px（タブレット版）と1440px（PC版）の間で値を補間する場合：

```css
/* 例: padding が 768px で 20px、1440px で 40px の場合 */
padding: clamp(20px, calc(17.14px + 2.98vw), 40px);
```

**計算方法**:
- A = (40 - 20) / 6.72 = 2.98
- B = 20 - 2.98 × 7.68 = 17.14
- Python で正確に計算すること

## 出力形式

```css
@media (min-width: 768px) {
    /* === Header (PC・タブレット版) === */
    /* 差分根拠: Figma PC版 frame <node-id> */
    .header {
        padding: clamp(20px, calc(17.14px + 2.98vw), 40px);
        display: flex;
        justify-content: space-between;
    }
    
    .header__logo {
        width: 25%;
    }
    
    .header__nav {
        display: flex;
    }
}
```

## 禁止事項

- SP版の削除・変更
- `!important` の使用
- IDセレクタの使用
- 推測値の使用
- JSの追加
- HTMLの大幅な変更

## 例外ルール

### `.inner` クラス
PC版で中央寄せが必要な場合のみ使用可能：
```css
@media (min-width: 768px) {
    .inner {
        max-width: 1024px;
        margin: 0 auto;
    }
}
```

### HTML変更が必要な場合
- SP版に影響を与えない範囲で最小限の追加のみ
- PC専用要素は `.is-pc-only` クラスで制御
- SP専用要素は `.is-sp-only` クラスで制御

### SVGアイコンの使用
- 推測や独自作成は禁止
- 色は `fill` プロパティで調整
- サイズは `width` と `height` で調整

### Spacer要素の実装ルール
- Figmaから取得される`spacer-mbXX-sp`などのスペーサー要素は、**常に次の要素の`margin-top`**として実装する
- スペーサー要素自体をHTMLに記述せず、次のコンポーネントのCSSで`margin-top`として制御する
- 実装方針：
  - すべてのspacer要素（mt/mr/mb/ml問わず）は次のコンポーネントの`margin-top`に変換
  - これにより前のコンポーネントを後から修正する必要がなくなる
- 数値はpx単位、Autoは`margin: auto`として解釈する
- 例：`spacer-mb72-sp` → 次のコンポーネントに`margin-top: 72px`を適用
- 例：`spacer-mt40-sp` → 次のコンポーネントに`margin-top: 40px`を適用

## トラブルシューティング

### 横スクロールが発生した場合
1. 固定幅を % に変更
2. grid の列数・gap を調整
3. `min-width: 0` を追加
4. 最後の手段として `overflow: hidden`

### MCP値が取得できない場合
推測せず、TODOとして記録：
```
TODO: <node-id> <property> が未取得。get_codegen で確認してください。
```

## 実装例

SP版（既存）:
```css
.hero {
    padding: 20px;
    text-align: center;
}
```

PC版（追加）:
```css
@media (min-width: 768px) {
    .hero {
        padding: clamp(40px, calc(34.29px + 5.95vw), 80px);
        display: flex;
        align-items: center;
        text-align: left;
    }
}
```

## 重要な実装方針

1. **段階的実装で負荷軽減**
   - Step 3: PC版レイアウトだけに集中
   - Step 4: 差分抽出だけに集中
   - 一度に両方考える必要なし

2. **ドラフト → 最終版の流れ**
   - ドラフト: 完全なPC版スタイル（コミット禁止）
   - 最終版: SP版との差分のみ（コミット対象）

3. **確認タイミング**
   - 各Stepで `===WAITING_FOR_OK===` 必須
   - ユーザーOK後に次のStepへ進行

このガイドに従って、SP版を崩さずにPC版を実装してください。