pc版の最初のボタンのギャップが10pxになってる。多分30px

768pxで四季折々の下にパディングがない。本文がわかれてる。
本文が分かれてるのはコーディングミスかも。

1440px超えたら最初のボタン三つが左によっていく。こう言う動きは
おそらくFigma側の作り方かもね。


20250731
コーディングしていって、画像をget_imageしたものを使ってしまうので画像はimgフォルダにしてと
プロンプトに書く。ーー対応済み
rudious０を全部につけちゃうので０なら描かなくていいとプロンプトに追加。ーー対応済み


20250811
PC版の蕎麦とはの２からむの画像はパディング入れないと画像が適当な数値がはいります。ok

繊細さのにカラムのコンテナはHTML構造がspと違うので
どのように処理すればいいか自ぴに聞きましょう。

文字詰め: MCPに letter-spacing 指示がある箇所（例: カード見出しなど）は最小限適用に留めています。全体での統一方針があれば合わせます。


20250816
スタビのプロンプトに小数点台3桁までにしよう。ok

h1のテキストらへん幅によってコンテナ数値がうしFigma通りになってないからどうにかしましょう。

蕎麦とは画像２からむの下の本文のラインスペースをPCで設定しましょう。SP版に入ってると思うので
PC版を修正対象としてません。ok

最後のカードの本文のラインスペースとラインハイトをしっかり決める。ok



20250821
tabの最初のボタンの中はgapは絶対値にしよう。ここは数値しか見てないので絶対値の方がわかりやすい。

作り方変更します。412px全部作って、次、768px〜1440pxで全部作ってから全部できた状態から
tab,pc版をメディアクエリに入れて差分を取っていくようにしましょう。









ーーーーーーーーーー
@charset "UTF-8";

/* Base */
html {
    font-family: "Inter", system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
}

body {
    color: #111111;
    background-color: #ffffff;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
}

/* Header (SP default) */
.header {
    width: 100%;
    height: 60px;
    background-color: #0a0d61;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-left: 0;
    padding-right: 16px;
}

.header__logo {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
}

.header__logo img {
    width: 100%;
    height: auto;
    aspect-ratio: 1 / 1;
}

.header__menu {
    width: 25px;
    height: 20px;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 0;
}

.header__menu-line {
    width: 25px;
    height: 2px;
    background-color: #ffffff;
}

/* header nav (hidden on SP) */
.header__nav {
    display: none;
}

.header__nav-link {
    color: #ffffff;
    text-decoration: none;
    font-size: 1.125rem;
    font-weight: 600;
    margin-left: 16px;
}

/* Hero (SP default) */
.hero {
    width: 100%;
}

.hero__image {
    width: 100%;
    height: auto;
    aspect-ratio: 412 / 228;
}

/* Soba section (SP default) */
.soba {
    width: 100%;
    background-color: #e9e2d8;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 40px;
    padding-top: 72px;
    padding-right: 0;
    padding-bottom: 56px;
    padding-left: 0;
}

.soba__heading {
    width: 74.757281553%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    text-align: center;
}

.soba__title {
    font-size: 2rem;
    line-height: 1.2;
    font-weight: 600;
    color: #000000;
}

.soba__subtitle {
    font-size: 1.375rem;
    line-height: 1.2;
    font-weight: 400;
    color: #000000;
}

.soba__body {
    width: 78.88%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
}

.soba__text {
    font-size: 1rem;
    line-height: 1.6875rem;
    letter-spacing: 0.06em;
    color: #000000;
    text-align: center;
}

.soba__text--narrow {
    width: 62.77%;
}

/* Buttons section (SP default) */
.navcards {
    width: 100%;
    background-color: #e9e2d8;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    padding-top: 0;
    padding-right: 20px;
    padding-bottom: 126px;
    padding-left: 20px;
}

.navcards__item {
    width: 100%;
    height: 102px;
    background-color: #bec2c5;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr auto 1fr;
    padding-top: 37px;
    padding-right: 16px;
    padding-bottom: 37px;
    padding-left: 16px;
    border-radius: 5px;
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.25);
    text-decoration: none;
}

.navcards__label {
    color: #000000;
    font-size: 1.25rem;
    font-weight: 600;
    letter-spacing: 0.0875rem;
    grid-column: 2;
    justify-self: center;
    text-align: center;
}

.navcards__icon {
    width: 28px;
    height: 28px;
    border-radius: 14px;
    background-color: #f6f6f6;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    grid-column: 3;
    justify-self: end;
}

/* nth-child に依存したレイアウトは廃止（Grid により均等配置） */

/* Sobatoha heading (SP) */
.sobatoha {
    width: 100%;
    background-color: #e9e2d8;
    padding-top: 50px;
    padding-right: 20px;
    padding-bottom: 24px;
    padding-left: 20px;
}

.sobatoha__heading {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    text-align: center;
}

.sobatoha__title {
    font-size: 2rem;
    line-height: 1.2;
    font-weight: 600;
    color: #000000;
}

.sobatoha__subtitle {
    font-size: 1.375rem;
    line-height: 1.2;
    font-weight: 400;
    color: #000000;
}

/* Sobatoha detail (SP) */
.sobatoha-detail {
    width: 100%;
    background-color: #e9e2d8;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    padding-top: 0;
    padding-right: 20px;
    padding-bottom: 134px;
    padding-left: 20px;
}

.sobatoha-detail__image-card {
    width: 100%;
    background-color: #ffffff;
    border-radius: 10px;
    overflow: hidden;
}

.sobatoha-detail__image {
    width: 100%;
    height: auto;
    aspect-ratio: 372 / 228;
}

.sobatoha-detail__paragraph {
    width: 100%;
    color: #333333;
    font-size: 1rem;
    line-height: 1.625rem;
    letter-spacing: 0.06em;
}

/* Sensai heading (SP) */
.sensai {
    width: 100%;
    background-color: #e9e2d8;
    padding-top: 50px;
    padding-right: 20px;
    padding-bottom: 40px;
    padding-left: 20px;
}

.sensai__heading {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    text-align: center;
}

.sensai__title {
    font-size: 2rem;
    line-height: 1.2;
    font-weight: 600;
    color: #000000;
}

.sensai__subtitle {
    font-size: 1.375rem;
    line-height: 1.2;
    font-weight: 400;
    color: #000000;
}

/* Sensai section 1 (SP) */
.sensai-sec {
    width: 100%;
    background-color: #e9e2d8;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding-top: 0;
    padding-right: 20px;
    padding-bottom: 0;
    padding-left: 20px;
}

.sensai-sec__imagecard {
    width: 100%;
    background-color: #ffffff;
    border-radius: 10px;
    overflow: hidden;
}

.sensai-sec__image {
    width: 100%;
    height: auto;
    aspect-ratio: 372 / 228;
}

.sensai-sec__heading {
    width: 100%;
    color: #000000;
    font-size: 2rem;
    line-height: 1.2;
    font-weight: 600;
    text-align: center;
}

.sensai-sec__body {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
}

.sensai-sec__text {
    width: 100%;
    color: #000000;
    font-size: 1rem;
    line-height: 1.625rem;
    letter-spacing: 0.06em;
}

.sensai-sec__button {
    width: 228px;
    height: 51px;
    background-color: #bec2c5;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    column-gap: 42px;
    padding-top: 13px;
    padding-right: 16px;
    padding-bottom: 13px;
    padding-left: 76px;
    text-decoration: none;
}

.sensai-sec__label {
    color: #000000;
    font-size: 1rem;
    line-height: 1.5625rem;
    font-weight: 500;
    letter-spacing: -0.07em;
}

.sensai-sec__icon {
    width: 18px;
    height: 18px;
    border-radius: 14px;
    background-color: #f6f6f6;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

/* Sensai section 2 (SP) */
.sensai-sec--alt {
    padding-top: 88px;
}

.sensai-sec--last {
    padding-top: 88px;
    padding-bottom: 158px;
}

/* Tabekata heading (SP) */
.tabekata {
    width: 100%;
    background-color: #e9e2d8;
    padding-top: 50px;
    padding-right: 52px;
    padding-bottom: 40px;
    padding-left: 52px;
}

.tabekata__heading {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    text-align: center;
}

.tabekata__title {
    font-size: 2rem;
    line-height: 1.2;
    font-weight: 600;
    color: #000000;
}

.tabekata__subtitle {
    font-size: 1.375rem;
    line-height: 1.2;
    font-weight: 400;
    color: #000000;
}

/* Tabekata card 1 (SP) */
.tabekata-card {
    width: 100%;
    background-color: #e9e2d8;
    padding-top: 0;
    padding-right: 20px;
    padding-bottom: 0;
    padding-left: 20px;
}

.tabekata-card__imagearea {
    width: 100%;
    background-color: #f3f1eb;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    padding-bottom: 16px;
}

.tabekata-card__imagecard {
    width: 100%;
    background-color: #ffffff;
    border-radius: 10px;
    overflow: hidden;
}

.tabekata-card__image {
    width: 100%;
    height: auto;
    aspect-ratio: 372 / 228;
}

.tabekata-card__title {
    color: #000000;
    font-size: 1.125rem;
    font-weight: 600;
    letter-spacing: 0.0675rem;
}

.tabekata-card__body {
    width: 100%;
    background-color: #f3f1eb;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding-top: 0;
    padding-right: 28px;
    padding-bottom: 24px;
    padding-left: 28px;
}

.tabekata-card__text {
    width: 100%;
    color: #000000;
    font-size: 1rem;
    line-height: 1.625rem;
    letter-spacing: 0.06em;
}

.tabekata-card__button {
    width: 228px;
    height: 50px;
    background-color: #bec2c5;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    column-gap: 34px;
    padding-top: 13px;
    padding-right: 16px;
    padding-bottom: 13px;
    padding-left: 69px;
    text-decoration: none;
}

.tabekata-card__label {
    color: #000000;
    font-size: 1rem;
    line-height: 1.5625rem;
    font-weight: 500;
    letter-spacing: -0.07em;
}

.tabekata-card__icon {
    width: 18px;
    height: 18px;
    border-radius: 14px;
    background-color: #f6f6f6;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.tabekata-card--gap {
    padding-top: 64px;
}

.tabekata-card--last {
    padding-bottom: 88px;
}

/* Footer (SP) */
.footer {
    width: 100%;
    height: 60px;
    background-color: #0a0d61;
    display: flex;
    align-items: center;
    justify-content: center;
}

.footer__logo {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.footer__logo img {
    width: 60px;
    height: auto;
    aspect-ratio: 1 / 1;
}

@media (min-width: 768px) {
    /* === Header (PC) === */
    /* 差分根拠: Figma PC frame node-id: 723:212 */
    .header {
        height: 96px;
        padding-right: 240px;
    }

    /* 差分根拠: node-id: 881:20 / 881:21 */
    .header__logo {
        width: 96px;
        height: 96px;
    }

    /* 差分根拠: node-id: 723:214 */
    .header__nav {
        display: flex;
        align-items: center;
        column-gap: 16px;
        /* stabilize: flex child overflow safety; node=723:214 */
        min-width: 0;
    }

    .header__nav-link {
        margin-left: 0;
    }

    /* SPで表示 → PCで非表示 */
    .header__menu {
        display: none;
    }

    /* === Hero (PC) === */
    /* 差分根拠: Figma PC frame node-id: 877:20 / 723:219 */
    .hero__image {
        aspect-ratio: 1440 / 450;
    }

    /* === Soba section (PC) === */
    /* 差分根拠: node-id: 723:365 */
    .soba {
        gap: 24px;
        padding-top: 136px;
        padding-bottom: 32px;
    }

    /* 差分根拠: node-id: 723:369 */
    .soba__heading {
        width: 19.44%;
    }

    /* 差分根拠: node-id: 723:366 / 723:367 */
    .soba__subtitle {
        font-size: 1.25rem;
    }

    /* 差分根拠: node-id: 921:21 */
    .soba__body {
        width: 42.08%;
        gap: 0px;
    }

    /* 差分根拠: node-id: 723:368 (606px) / 921:20 (494px) / parent 921:21 (606px) */
    .soba__text {
        width: 81.52%;
        line-height: 1.25rem;
        white-space: nowrap;
    }

    .soba__text--narrow {
        width: 100%;
    }

    /* === Navigation buttons (PC) === */
    /* 差分根拠: node-id: 723:389, 723:377, 736:27, 736:23 */
    .navcards {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        column-gap: 32px;
        padding-right: 238px;
        padding-bottom: 56px;
        padding-left: 238px;
    }

    .navcards__item {
        height: 80px;
        padding-top: 30px;
        padding-right: 24px;
        padding-bottom: 30px;
    }

    .navcards__label {
        font-size: 1rem;
    }

    .navcards__icon {
        width: 24px;
        height: 24px;
    }

    /* === Sobatoha heading (PC) === */
    /* 差分根拠: node-id: 724:391 / 724:392 / 724:393 */
    .sobatoha {
        padding-top: 80px;
        padding-right: 0;
        padding-bottom: 40px;
        padding-left: 0;
    }

    .sobatoha__subtitle {
        font-size: 1.25rem;
    }

    /* === Sobatoha detail (PC) === */
    /* 差分根拠: node-id: 725:394 / 725:395 / 725:396 / 725:397 / 725:398 */
    .sobatoha-detail {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 16px;
        row-gap: 16px;
        padding-right: 240px;
        padding-bottom: 144px;
        padding-left: 240px;
    }

    .sobatoha-detail__paragraph {
        grid-column: 1 / -1;
    }

    /* === Sensai heading (PC) === */
    /* 差分根拠: node-id: 725:399 / 725:400 / 725:401 */
    .sensai {
        padding-top: 80px;
        padding-right: 0;
        padding-bottom: 48px;
        padding-left: 0;
    }

    .sensai__subtitle {
        font-size: 1.25rem;
    }

    /* === Sensai section 1 (PC) === */
    /* 差分根拠: node-id: 728:23 / 878:130 / 728:25 / 728:34 / 728:28 / 728:29 / 728:30 / 728:31 / 728:32 */
    .sensai-sec {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto auto;
        column-gap: 16px;
        row-gap: 0;
        align-items: start;
        justify-items: start;
        padding-right: 240px;
        padding-bottom: 104px;
        padding-left: 240px;
    }

    .sensai-sec__heading {
        font-size: 1.25rem;
        line-height: 1.25rem;
        text-align: left;
    }

    .sensai-sec__body {
        align-items: flex-start;
        justify-content: space-between;
        gap: 10px;
    }

    .sensai-sec__text {
        line-height: 1.25rem;
    }

    .sensai-sec__button {
        width: 160px;
        height: 38px;
        column-gap: 8px;
        padding-top: 12px;
        padding-right: 8px;
        padding-bottom: 12px;
        padding-left: 46px;
    }

    .sensai-sec__label {
        font-size: 0.875rem;
        line-height: 0.875rem;
        white-space: nowrap;
    }

    .sensai-sec__icon {
        width: 14px;
        height: 14px;
        margin-left: auto;
    }

    /* 2カラム比率（472/1440 ≒ 32.78%）と縦配置 */
    .sensai-sec__imagecard {
        grid-column: 1;
        grid-row: 1 / span 2;
    }

    .sensai-sec__heading {
        grid-column: 2;
        grid-row: 1;
    }

    .sensai-sec__body {
        display: contents;
    }

    .sensai-sec__text {
        grid-column: 2;
        grid-row: 1;
        margin-top: 24px;
    }

    .sensai-sec__button {
        grid-column: 2;
        grid-row: 2;
        align-self: end;
        justify-self: end;
        margin-top: 0;
    }

    
    /* === Tabekata heading (PC) === */
    /* 差分根拠: node-id: 728:63 / 728:64 / 728:65 */
    .tabekata {
        padding-top: 80px;
        padding-right: 0;
        padding-bottom: 48px;
        padding-left: 0;
    }

    /* === Tabekata card 1 (PC) === */
    /* 差分根拠: node-id: 729:66 / 729:75 / 879:20 / 880:22 / 729:68 / 729:70 / 729:71 */
    .tabekata-card {
        width: 32.1875%;
        padding-right: 0;
        padding-left: 0;
    }
    .tabekata-card__imagearea {
        gap: 16px;
        padding-bottom: 16px;
    }

    .tabekata-card__image {
        aspect-ratio: 309 / 188;
    }

    .tabekata-card__title {
        font-size: 1.25rem;
    }

    .tabekata-card__body {
        padding-right: 24px;
        padding-left: 24px;
    }

    .tabekata-card__button {
        width: 160px;
        height: 32px;
        column-gap: 8px;
        padding-top: 9px;
        padding-right: 8px;
        padding-bottom: 9px;
        padding-left: 40px;
    }

    .tabekata-card__label {
        font-size: 0.875rem;
        line-height: 0.875rem;
        white-space: nowrap;
    }

    .tabekata-card__icon {
        width: 14px;
        height: 14px;
        margin-left: auto;
    }

    /* SP用の余白はPCで無効化 */
    .tabekata-card--gap {
        padding-top: 0;
    }

    .tabekata-card--last {
        padding-bottom: 0;
    }

    /* === Menu cards container (PC) === */
    /* 差分根拠: node-id: 733:45 */
    .menucards {
        background-color: #e9e2d8;
        display: flex;
        flex-direction: row;
        align-items: center;
        column-gap: 16px;
        padding-right: 240px;
        padding-bottom: 160px;
        padding-left: 240px;
    }

    /* === Tabekata card 2,3 shared tweaks (PC) === */
    /* 差分根拠: node-id: 730:24 / 733:35 */
    .tabekata-card--gap .tabekata-card__image {
        aspect-ratio: 310 / 187;
    }

    /* 差分根拠: node-id: 730:26 / 733:37 */
    .tabekata-card--gap .tabekata-card__title {
        color: #333333;
    }

    /* === Footer (PC) === */
    /* 差分根拠: node-id: 734:46 / 874:22 / 734:47 */
    .footer {
        height: 136px;
    }

    .footer__logo {
        width: 136px;
        height: 136px;
    }

    .footer__logo img {
        width: 136px;
    }
}
