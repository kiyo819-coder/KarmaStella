# KARMA STELLA 開発タスク（¥980先行・Gumroad確定版）

最終更新：2026-11-13 00:20（Gumroad切替 GO判定：Yuya）
方針の同期点：Claudeプロジェクト「Karma Sterra」内 `claude/セッションログ_20261107.md`

## 確定事項（変更には Yuya の明示的OKが必要）
- 商品：**¥980 詳細鑑定レポート**（8章構成）のみ。これが売れるまで他商品は作らない
- 決済：**Gumroad**（Stripeは日本で「サイキックサービス／占い師」が禁止業種のため使用しない。発行済みPayment Linkは配布禁止）
- 暫定導線：index.htmlの購入CTAはBASE（karmastella.official.ec）→ P3でGumroadに差し替え
- 月額プラン（¥480）：**¥980が10件売れるまで着手禁止**（Tier 3参照）
- ポイント・コイン制は作らない（資金決済法）
- トーン：統計的・断定予言NG・不安を煽らない（AQUAのNGルール＝Gumroadの許可条件とも一致）

## P1：108プレミアムテキスト（QAゲート制）
- [ ] 検証器修正：文字数をUnicode文字でカウント（[...str].length）。バイト数計測バグの疑いを潰す
- [ ] ペルソナ注入：customer_persona.md（ミサキ33歳・消費ボタン=被理解欲求・全セクションに生活の場面1つ以上・語彙変換表）を ombra/terra の生成プロンプトと aqua の審査基準に組み込む
- [ ] 文体統一：全セクションを柔らかい です・ます体に（内容の鋭さは保持）
- [ ] gate_sample_v2（六白金星×獅子座）を再生成 → **人間GO待ちで停止**
- [ ] GO後：残り8バッチ無人生成。順序：2（二黒）→8（八白）→9（九紫）→1,3,4,5,7
- [ ] 有料テキストは公開リポジトリに置かない（Vercel関数側に保持）

## P2：Gumroadライセンス検証API
- [ ] api/verify-license.js（Vercel）：POST https://api.gumroad.com/v2/licenses/verify に product_id + license_key を送り、有効なら PREMIUM_TEXTS を返す
- [ ] report.html：?license_key= を読む方式に変更（Stripeセッション検証は廃止）
- [ ] PREMIUM_TEXTS の構造は既存スケルトンのまま流用
- [ ] デプロイは P1 完了まで行わない

## P3：導線切替
- [ ] index.html の購入ボタン2箇所（現BASE）を Gumroad商品URLに差し替え
- [ ] tokushoho.html の支払方法を「クレジットカード決済（Gumroad）／BASE」に更新
- [ ] Gumroad商品ページに生年月日カスタムフィールド（必須）を設定（Yuya作業）

## P4：検証
- [ ] ゴールデンテスト5件（1985-08-19 六白×獅子、立春境界 1990-02-03、2000-01-01、閏日 1996-02-29、1979-12-31）
- [ ] 全108エントリの検証器PASS＋未解決テンプレ変数ゼロ
- [ ] 実購入テスト（Yuya自身で1件）

## Backlog（初売上後に着手）
- auto-devブランチのdiffレビュー（PWA: manifest.json / sw.js / icons — sw.jsはキャッシュ制御ヘッダーとの競合を必ず確認）
- シェアボタン／ぼかし＋続きを読む／Capacitor・Google Play
- note記事「20分で売り場→禁止業種→転換」実録完成

## Tier 3（🔒 ¥980が10件売れるまで封印）
- 月額¥480：仕様書×月運×行動提案の「その人向けの成功手法」毎月更新

## ルール（全セッション・全エージェント共通）
- 作業は main のみ。auto-dev は凍結（マージ禁止）
- 家族の実名・生年月日を公開リポジトリに置かない
- 「完了」は実ファイル＋コミットで確認するまで主張しない
- 公開・投稿・課金設定の変更は Yuya のOKが出てから
