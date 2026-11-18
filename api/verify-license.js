// KARMA STELLA — Gumroad ライセンス検証API（Vercel Serverless）
// POST { license_key, type }  →  有効なら該当タイプのプレミアムテキストを返す
//
// 環境変数（Vercelダッシュボードで設定）:
//   GUMROAD_PRODUCT_ID … Gumroad商品のproduct_id（コンテンツページのライセンスキーブロックで確認）
//
// 注意: premium_texts.js は gitignore 対象。公開リポジトリには置かず、
//       デプロイ時にローカルから Vercel へ直接アップロードする。

const PREMIUM_TEXTS = require('./premium_texts.js');

const ALLOWED_ORIGINS = [
  'https://karmastella.jp',
  'https://kiyo819-coder.github.io',
];

module.exports = async (req, res) => {
  const origin = req.headers.origin || '';
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  const { license_key, type } = req.body || {};
  if (!license_key || typeof license_key !== 'string') {
    return res.status(400).json({ ok: false, error: 'missing_license_key' });
  }
  if (!type || !PREMIUM_TEXTS[type]) {
    return res.status(400).json({ ok: false, error: 'unknown_type' });
  }

  const productId = process.env.GUMROAD_PRODUCT_ID;
  if (!productId) {
    return res.status(500).json({ ok: false, error: 'server_not_configured' });
  }

  try {
    const params = new URLSearchParams({
      product_id: productId,
      license_key: license_key.trim(),
      increment_uses_count: 'false', // 閲覧のたびに回数を増やさない（再訪OKの設計）
    });
    const gr = await fetch('https://api.gumroad.com/v2/licenses/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    if (gr.status === 404) {
      return res.status(403).json({ ok: false, error: 'invalid_license' });
    }
    const data = await gr.json();
    if (!data.success) {
      return res.status(403).json({ ok: false, error: 'invalid_license' });
    }
    const p = data.purchase || {};
    if (p.refunded || p.disputed || p.chargebacked) {
      return res.status(403).json({ ok: false, error: 'license_revoked' });
    }

    return res.status(200).json({ ok: true, type, texts: PREMIUM_TEXTS[type] });
  } catch (e) {
    return res.status(502).json({ ok: false, error: 'verify_unreachable' });
  }
};
