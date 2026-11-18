// premium_texts.js の構造見本（実ファイルは gitignore 対象・公開リポジトリに置かない）
// キー: `${本命星番号}-${星座名}` の108通り
// 各セクションの文字数規格（Unicode文字数）:
//   essence_deep 180-260 / shadow_practice 200-300 / love 120-200 / work_mission 120-200 / year_flow 150-250
// トーン: やわらかい です・ます体。断定予言NG。全セクションに生活の場面を最低1つ。

module.exports = {
  '6-獅子座': {
    essence_deep: '（魂の本質 — 無料版より一段深く、生活の場面に着地させる）',
    shadow_practice: '（影と実践 — 診断で終わらせず、具体的な練習をひとつ渡す）',
    love: '（恋愛と人間関係）',
    work_mission: '（仕事と使命）',
    year_flow: '（一年の流れ — 季節のリズム。保証や断定はしない）',
  },
  // …残り107タイプ
};
