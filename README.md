[README.md](https://github.com/user-attachments/files/25824439/README.md)
# KARMA STELLA

> **占術は統計。自分を知るための道具として。**

九星気学・四柱推命・西洋占星術の3占術エンジンを組み合わせた、自己分析型の占術Webアプリ。

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://kiyo819-coder.github.io/KarmaStella/)
[![Version](https://img.shields.io/badge/version-Beta%20v0.2.0-blue)](./beta_1_0_7.html)
[![License](https://img.shields.io/badge/license-MIT-lightgrey)](./LICENSE)

---

## 概要

KARMA STELLAは、東洋・西洋の占術を統合して「なぜそうなのか」の構造ごと見せることで、単なる結果表示を超えた自己理解体験を提供します。

- **九星気学** ── 本命星・月命星・傾斜宮から性格傾向と吉方位を算出
- **四柱推命** ── 年柱・月柱・日柱の天干地支・五行バランスを表示
- **西洋占星術** ── 星座（カスプ対応）の気質・行動傾向を分析
- **今日のカルマタスク** ── 本命星の五行に対応した日次行動提案（受け取る / 見送る）

---

## スクリーンショット

> *(準備中)*

---

## 機能一覧

| 機能 | 説明 |
|------|------|
| オンボーディング | 生年月日を入力し、3占術の鑑定結果をその場で表示 |
| ホーム | 今日のカルマタスク・カルマポイント表示 |
| 今日の運勢 | 月相・本命星ベースのデイリーメッセージ |
| 詳細鑑定 | 九星 / 西洋占星術 / 吉方位 / 四柱推命 タブ切替 |
| 相性診断 | 相手の生年月日との3軸スコア算出・トップ10表示 |
| 命式ノート | 自分の鑑定結果を随時確認・占術解説モーダル付き |
| 占術解説 ⓘ | 各占術の算出根拠を初心者向けに説明 |
| シェア機能 | X / LINE / メールで鑑定結果をシェア |
| タップエフェクト | Canvasによるパーティクル演出 |

---

## 技術仕様

```
アーキテクチャ : 単一ファイル HTML（外部依存なし・Google Fonts のみ）
占術エンジン   : Pure JavaScript
データ永続化   : localStorage
モバイル最適化 : viewport maximum-scale=1.0 / touch-action:manipulation
ホスティング   : GitHub Pages
```

### 占術エンジン仕様（変更禁止）

| 項目 | 算出方式 |
|------|---------|
| 本命星 | `11 - 桁和` 業界標準式（複数万年暦で検証済み） |
| 月命星 | 洛書月盤配置（万年暦準拠） |
| 節入り | 国立天文台データに基づく年別精密テーブル（1940〜2030）|
| 星座境界 | カスプ対応（日単位で判定）|

### デザインシステム

```css
--void: #04040F;  --deep: #0A0A2A;  --cosmos: #0D1B4E;
--gold: #C9A84C;  --gold-soft: #E8C97A;  --gold-dim: #7A5C1E;
--violet: #7B2FBE;  --silver: #C8C8E8;  --aurora: #4ECDC4;  --rose: #E879A0;
```

| 用途 | フォント |
|------|---------|
| 見出し・英字ロゴ | Cinzel |
| 本文・日本語 | Noto Serif JP |
| 詩的テキスト | Cormorant Garamond (italic) |

---

## セットアップ

```bash
git clone https://github.com/kiyo819-coder/KarmaStella.git
cd KarmaStella
# ブラウザで直接開くだけで動作します
open beta_1_0_7.html
```

ビルドツール・サーバー不要。ファイルをブラウザで開くと即動作します。

---

## バージョン履歴

| バージョン | 主な変更 |
|-----------|---------|
| **Beta v0.2.0** (beta_1_0_7.html) | カルマタスクリスト。全文脱スピリチュアル化。命式ノート再設計（鑑定結果と同構成）。ⓘボタン追加。マイページナビバグ修正 |
| Beta v0.1.x (beta_1_0_3.html) | トーストバグ修正。ホーム再設計。カルマタスク（受け取る/見送る）。タップパーティクル。LINEAGE非表示 |
| Beta v0.1.1 (beta_1_0_2.html) | プレミアム削除。占術解説モーダル。シェア機能。メニュー整理 |
| Beta v0.1.0 (beta_1_0.1.html) | 初期β版。占術エンジン完成。全8画面実装 |

---

## ロードマップ

- [ ] キャラクター育成ゲームモード統合
- [ ] 年盤・月盤エンジン（81パターンテキスト）
- [ ] 通変星・十二運星の表示
- [ ] プレミアムプラン再実装
- [ ] karmastella.com / karmastella.jp ドメイン移行

---

## ライセンス

MIT License — © 2026 kiyo819-coder / KARMA STELLA

---

*KARMA STELLA — 占術は統計。自分を知るための道具として。*
