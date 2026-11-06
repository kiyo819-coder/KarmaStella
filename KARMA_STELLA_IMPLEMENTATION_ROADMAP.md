# KARMA STELLA — 実装ロードマップ＆進捗記録

**最終更新**：2026-04-19  
**プロジェクト進行者**：Yuya  
**メンター**：KURO（正直で戦略的なアドバイザー）

---

## 📍 現在地

**MVP段階**  
- Firebase 未実装
- プレミアム機能（課金）未実装
- Instagram フォロワー：32人
- BASE 販売：詳細レポート 980円

---

## 🎯 全体ビジョン

> 「触れる人の魂が輝く」占い体験を提供する  
> 現世に生まれた尊い意図を解く。次の人の人生に意味を持たせる。

**判断基準**：「これは、ユーザーの魂を輝かせるか？」

---

## 📋 開発体制

### エージェント体制（v3.0）

| 役割 | エージェント | モデル | 担当タスク |
|------|------------|--------|----------|
| **Mentor（判定・戦略）** | KURO | Haiku | プロジェクト全体の正直な判定、段階的実装計画 |
| **Orchestrator** | SOL | Haiku | Instagram投稿ワークフロー |
| **Content生成** | VENTO | Haiku | Instagram captions / Reels脚本 / コンテンツ再活用 |
| **Tone Check** | AQUA | Haiku | ブランドボイス一貫性確認 |
| **Execution** | IGNIS | Haiku | チェックリスト実行 |
| **UI Review** | ANIMA | Haiku | アプリUX・品質管理 |
| **Content Cultivation** | TERRA | Haiku | karma_quotes.js 拡充（100→300） |
| **SNS（X/Threads）** | SAETA | Haiku | マルチプラットフォーム対応 |
| **Premium相談** | OMBRA | Haiku | 個別四柱推命鑑定 |
| **Monetization** | ARMONIA | Haiku | Stripe 480円/月プラン設計 |
| **Roadmap追跡** | KRONOS | Haiku | フェーズ進捗管理 |
| **新機能提案** | AETER | Haiku | Firebase/Claude API連携設計 |
| **Creative品質** | LUNA | Haiku | 全コンテンツの世界観チェック |

---

## 🔄 実装フェーズ（KURO判定）

### **Phase 1：UI最適化＆可視化（今週）**

**優先度：最高** — 直結：ユーザー体験

#### タスク 1：ホーム＆カルマの重複解消
- [ ] 両タブのタスク表示を統一（カルマに寄せる）
- [ ] ホームを「パーソナルダッシュボード化」（月相・メッセージのみ）
- **所要時間**：1-2日  
- **ファイル**：Mac `~/KarmaStella/index.html`

#### タスク 2：オンボーディング→結果可視化＆シェア
- [ ] オンボーディング完了後、結果画面を表示維持
- [ ] 結果下部に「シェアする」ボタン追加
- [ ] シェア後「ホームへ」遷移
- **所要時間**：1日未満
- **効果**：SNS拡散の引き金

**Phase 1 リリース**：来週（ユーザーフィードバック収集開始）

---

### **Phase 2：マネタイズ基盤＆Firebase（1ヶ月後）**

**条件**：
- Firebase 実装完了
- ユーザー数 100人突破
- BASE決済動作確認

#### 実装内容
- [ ] 四柱推命の詳細解説に 🔒 ロック（プレミアム化）
- [ ] 相性TOP10を「フリー：3位まで」→「プレミアム：全10位」
- [ ] Stripe 480円/月プラン実装（ARMONIA設計に従う）
- [ ] プレミアム認証ロジック（Firebase Auth）

**データ基準**：
- ユーザーの実際のUX行動を観察してから課金ポイント決定
- Phase 1 の推測は 70% が外れる前提

---

### **Phase 3：洗練＆拡張（2ヶ月後〜）**

**条件**：ユーザー 200人超過

#### UI洗練
- [ ] ボタン文言統一（占い用語に）
- [ ] モバイル対応強化（user-scalable=yes / レスポンシブ化）
- [ ] 相性TOP10表示最適化

#### コンテンツ拡張
- [ ] karma_quotes.js 300件達成（TERRA担当）
- [ ] Claude API連携（ユーザー内省データのAI分析、AETER設計）
- [ ] 誕生日特別タスク / シーズン連動タスク

#### プレミアム拡張
- [ ] 月間占い結果のシェアカード自動生成
- [ ] NFT化（バッジ）

---

## 📅 昨日までの成果（2026-04-18）

### 完了事項
✅ Mac SSH接続確立（Tailscale IP: 100.87.190.59）  
✅ フォルダ統合（KarmaStella-app → KarmaStella）  
✅ `.claude/` エージェント configs を GitHub から隔離（.gitignore）  
✅ 12エージェント性格設計（星座×九星Ki）  
✅ Haiku モデル統一（トークン削減）  
✅ 5スキル統合（hook-generator / SCQA / content-repurposing / tone-enforcer / video-script）  
✅ 8エージェント役割割り当て完了  
✅ TEAM_README.md v3.0 更新

---

## 🆕 本日の成果（2026-04-19）

### 完了事項
✅ **ANIMA エージェント起動** — index.html の詳細UIレビュー実施  
✅ **ANIMA レビュー報告書生成** — 7項目の改善提案  
✅ **KURO メンター化** — `.claude/mentors/kuro.md` 作成・配置  
✅ **KURO 戦略判定** — Phase 1/2/3 の段階的実装方針決定  
✅ **実装優先順の確定** — 「完璧主義の罠」回避 = Phase 1 のみ当面実行

### KURO からの洞察
> 「完璧は敵。Firebase未実装でデータがない状態での全改善は過剰。Phase 1だけやって、ユーザーフィードバックを聞け。今の改善案の7割はいらない可能性がある。」

**判定の妥当性**：
- MVP段階（32人フォロワー）で大規模改修は相応しくない
- データドリブンな判定（Firebase後）の方が信頼性が高い
- 時間コスト（2-3週間）は販売促進停止につながる

---

## 🔧 環境・ファイル構成

```
Mac: ~/KarmaStella/
├── .claude/
│   ├── agents/
│   │   ├── sol.md (SOL — Orchestrator)
│   │   ├── vento.md (VENTO — Content)
│   │   ├── aqua.md (AQUA — Tone)
│   │   ├── ignis.md (IGNIS — Execution)
│   │   ├── anima.md (ANIMA — UI Review) ← 本日レビュー実施
│   │   ├── terra.md (TERRA — Quotes)
│   │   ├── saeta.md (SAETA — SNS)
│   │   ├── ombra.md (OMBRA — Premium)
│   │   ├── armonia.md (ARMONIA — Monetization)
│   │   ├── kronos.md (KRONOS — Roadmap)
│   │   ├── aeter.md (AETER — Features)
│   │   ├── luna.md (LUNA — Creative)
│   │   ├── TEAM_README.md (v3.0)
│   │   └── VISION.md
│   └── mentors/
│       └── kuro.md (KURO — Mentor) ← 本日追加
├── index.html (主体アプリ、Phase 1 改修予定)
├── karma_quotes.js (100件、目標300件)
├── soul_descriptions.js
├── share_card_v4_light.html
├── .gitignore (`.claude/` 隔離)
└── CLAUDE.md (プロジェクト設定)
```

---

## 📊 メトリクス

| 項目 | 現在 | Phase 1後 | Phase 2後 | Phase 3後 |
|------|------|---------|---------|---------|
| Instagram フォロワー | 32 | 50+ | 150+ | 500+ |
| BASE 販売件数 | 低 | 測定中 | データドリブン判定 | 安定化 |
| プレミアムユーザー | 0 | 0 | 10+ | 100+ |
| karma_quotes.js 件数 | 100 | 100 | 150 | 300 |
| Firebase実装 | ❌ | ❌ | ✅ | ✅ |
| Claude API連携 | ❌ | ❌ | 🔄計画 | ✅ |

---

## ⚠️ リスク＆注意

### リスク 1：完璧主義の罠
**現象**：Yuyaが「すべてを完璧に直してから」と考えやすい  
**対策**：KURO の段階的判定に従う。Phase 1 だけで一度リリース  
**監視者**：KURO

### リスク 2：Firebase 実装の遅延
**影響**：Phase 2 に直結  
**対策**：Phase 1 リリース後、すぐに Firebase タスク開始  
**監視者**：KRONOS

### リスク 3：コンテンツ拡充（TERRA）の自動化不足
**目標**：300件 quotes 生成  
**進捗**：100件 → quote_generator_v2_local.html で自動生成中  
**対策**：Claude API 統合検討（Phase 3）

---

## 🚀 次回アクション（来週）

1. **Phase 1 実装開始**
   - ホーム＆カルマ重複解消
   - オンボーディング結果可視化＆シェア
   - **目標**：2-3日で完了、リリース

2. **Firebase 実装計画**（AETER＆KRONOS 主導）
   - Authentication
   - Firestore スキーマ設計
   - Analytics 設定

3. **ユーザーフィードバック収集**
   - Instagram の DM チェック
   - BASE レビュー確認
   - 行動ログ分析開始

---

## 📝 スキル：MD更新プロセス

**実装日**：2026-04-19  
**スキル名**：Session-end MD Update

### 毎回の会話終了時に実施する手順

1. **セッション内容をまとめる**
   - 実施した作業
   - KURO や他エージェントの判定
   - 次のアクション

2. **KARMA_STELLA_IMPLEMENTATION_ROADMAP.md を更新**
   - 「本日の成果」セクションに追記
   - メトリクス更新
   - 次回アクション明記

3. **ファイルを Mac に転送**
   ```bash
   scp roadmap.md kiyotayuuya@100.87.190.59:~/KarmaStella/KARMA_STELLA_IMPLEMENTATION_ROADMAP.md
   ```

4. **進捗確認**
   ```bash
   ssh 100.87.190.59 "tail ~/KarmaStella/KARMA_STELLA_IMPLEMENTATION_ROADMAP.md"
   ```

**実行者**：Claude Code が会話終了時に自動実施  
**ファイル保存先**：
- Mac: `~/KarmaStella/KARMA_STELLA_IMPLEMENTATION_ROADMAP.md`
- バックアップ：`G:\マイドライブ\MyObsidian\05_AI_Logs\YYYY-MM-DD_KARMA_STELLA_Progress.md`

---

**This is a living document. Updated at end of each session.**
