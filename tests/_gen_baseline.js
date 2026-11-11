// 基準値（tests/baseline.json）を作り直すための道具。
// 元の（切り出し前の）index.html を評価して、判定結果のダイジェストと代表日サンプルを出力する。
const fs = require('fs');
const vm = require('vm');
const crypto = require('crypto');
const assert = require('node:assert/strict');

// 使い方: node tests/_gen_baseline.js <元のindex.htmlのパス> > tests/baseline.json
const SRC = process.argv[2];
if (!SRC) { console.error('usage: node tests/_gen_baseline.js <path-to-original-index.html>'); process.exit(1); }
const lines = fs.readFileSync(SRC, 'utf8').split('\n');

// 行番号ではなく内容で範囲を決める。開始は節入りテーブルの見出し行、終了は buildRadarSVG の直前。
const START_LINE = '// ── 節入り日テーブル（精密版）──';
const END_LINE = 'function buildRadarSVG';
const startIdx = lines.indexOf(START_LINE);
if (startIdx < 0) throw new Error(`開始行が見つかりません: ${START_LINE}`);
const endIdx = lines.findIndex(l => l.startsWith(END_LINE));
if (endIdx < 0) throw new Error(`終了行が見つかりません: ${END_LINE}`);
assert.ok(endIdx > startIdx, '終了行が開始行より後にありません');
assert.equal(lines[startIdx], START_LINE);
assert.ok(lines[endIdx].startsWith(END_LINE));
const src = lines.slice(startIdx, endIdx).join('\n');
console.error(`範囲: ${startIdx + 1}行目〜${endIdx}行目（buildRadarSVG の直前まで）`);

const ctx = vm.createContext({ state: {}, console });
vm.runInContext(src, ctx);
const run = (e) => vm.runInContext(e, ctx);

const names = ['calcHonmeiSei','calcTsukiMeiSei','calcKeishaSei','getZodiac','isCusp',
  'calcMeishiki','getMoonPhase','calcMoonAge','calcCompatScore','calcCompatDetail',
  'getSetsuiri','getSoulTypeLabel','calcSoulParams'];
console.error('defined:', names.map(n => n + '=' + run('typeof ' + n)).join(' '));
console.error('SOUL_TYPE_LABELS count:', run('Object.keys(SOUL_TYPE_LABELS).length'));

// 1) 全日（1940-01-01〜2030-12-31）の判定結果ダイジェスト
const h = crypto.createHash('sha256');
let count = 0;
const isLeap = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
const mdays = (y, m) => [31, isLeap(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1];
const dayRows = [];
for (let y = 1940; y <= 2030; y++) {
  for (let m = 1; m <= 12; m++) {
    for (let d = 1; d <= mdays(y, m); d++) {
      const honmei = run(`calcHonmeiSei(${y},${m},${d})`);
      const tsuki = run(`calcTsukiMeiSei(${honmei},${y},${m},${d})`);
      const keisha = run(`calcKeishaSei(${honmei},${tsuki})`);
      const z = run(`getZodiac(${m},${d})`).name;
      const cusp = run(`isCusp(${m},${d})`);
      const ms = run(`calcMeishiki(${y},${m},${d})`);
      const row = [y, m, d, honmei, tsuki, keisha, z, cusp, ms.nichkan, ms.nenchuu.kan, ms.nenchuu.shi, ms.getchuu.kan, ms.getchuu.shi, ms.nicchuu.kan, ms.nicchuu.shi, JSON.stringify(ms.gogyou)].join('|');
      h.update(row + '\n');
      count++;
    }
  }
}
console.error('days:', count);
const dayDigest = h.digest('hex');

// 2) 相性: 9x9 本命星 × 12x12 星座 の全組み合わせ
const h2 = crypto.createHash('sha256');
const zNames = ['牡羊座','牡牛座','双子座','蟹座','獅子座','乙女座','天秤座','蠍座','射手座','山羊座','水瓶座','魚座'];
const zodiacsByName = {};
for (const zn of zNames) zodiacsByName[zn] = run(`ZODIAC_BOUNDARIES.find(z => z.name === '${zn}')`);
ctx.__zs = zodiacsByName;
let compatCount = 0;
for (let a = 1; a <= 9; a++) for (let b = 1; b <= 9; b++) for (const za of zNames) for (const zb of zNames) {
  const s = run(`calcCompatScore(${a},${b},__zs['${za}'],__zs['${zb}'])`);
  const det = run(`calcCompatDetail(${a},${b},__zs['${za}'],__zs['${zb}'])`);
  h2.update(`${a}|${b}|${za}|${zb}|${s}|${det.e1}|${det.e2}|${det.e3}\n`);
  compatCount++;
}
const compatDigest = h2.digest('hex');
console.error('compat:', compatCount);

// 3) 108タイプ: 9星 × 12星座 の全組み合わせ（ラベル＋レーダー値）
const h3 = crypto.createHash('sha256');
let typeCount = 0;
for (let hs = 1; hs <= 9; hs++) for (const zn of zNames) {
  // ラベルは SOUL_TYPE_LABELS の直接参照（karma_calc.js と同じ対象）。レーダー値 calcSoulParams は index.html に残るため対象外
  const label = run(`SOUL_TYPE_LABELS['${hs}-${zn}']`);
  h3.update(`${hs}|${zn}|${label ? label.en + '/' + label.ja : 'null'}\n`);
  typeCount++;
}
console.error('types:', typeCount);
const typeDigest = h3.digest('hex');

// 4) 月齢・月相: 0〜29.53 日を 0.01 刻みで（固定日時）
const h4 = crypto.createHash('sha256');
const base = new Date('2026-03-01T00:00:00Z').getTime();
let moonCount = 0;
for (let i = 0; i < 6000; i++) {
  const dt = new Date(base + i * 3600 * 1000 * 0.5);
  const age = run(`calcMoonAge(new Date(${dt.getTime()}))`);
  const ph = run(`getMoonPhase(${age})`);
  h4.update(`${dt.getTime()}|${age}|${ph.phase}|${ph.energy}|${ph.type}\n`);
  moonCount++;
}
const moonDigest = h4.digest('hex');

// 5) 代表日のサンプル（期待値として埋め込む）
const samples = [
  [1970,1,1],[1985,2,3],[1985,2,4],[1990,12,31],[1995,6,21],[2000,2,29],[2001,3,20],[2003,11,7],
  [1993,2,3],[1993,2,4],[1997,1,31],[1997,2,3],[1997,2,4],[1988,2,4],[1988,2,29],[1996,2,29],
  [2000,2,3],[2000,2,4],[2004,2,4],[2005,2,3],[2008,2,4],[2009,2,3],[2012,2,4],[2021,2,3],[2021,2,4],
  [2024,2,3],[2024,2,4],[2025,2,3],[2025,2,4],[2027,2,4],[2030,12,31],
  [1980,3,20],[1980,3,21],[1980,4,19],[1980,4,20],[1980,12,22],[1981,1,19],[1981,1,20],
  [1999,8,22],[1999,8,23],[2000,2,18],[2000,2,19],[2000,10,22],[2000,10,23],[2002,12,31],[2003,1,1],
  [1940,2,4],[1944,7,5],[1960,6,21],[1956,2,3],[1956,2,4],
  [2050,2,3],[2050,2,4],[1930,2,3],[1930,6,15]
];
const sampleRows = samples.map(([y, m, d]) => {
  const honmei = run(`calcHonmeiSei(${y},${m},${d})`);
  const tsuki = run(`calcTsukiMeiSei(${honmei},${y},${m},${d})`);
  const keisha = run(`calcKeishaSei(${honmei},${tsuki})`);
  const z = run(`getZodiac(${m},${d})`);
  const ms = run(`calcMeishiki(${y},${m},${d})`);
  ctx.state = { honmeiSei: honmei, zodiac: z, kData: run(`KYUUSEI[${honmei}]`) };
  const label = run('getSoulTypeLabel()');
  return {
    date: `${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`,
    honmei, tsuki, keisha, zodiac: z.name, element: z.element, cusp: run(`isCusp(${m},${d})`),
    nichkan: ms.nichkan, nenchuu: ms.nenchuu.kan + ms.nenchuu.shi, getchuu: ms.getchuu.kan + ms.getchuu.shi,
    nicchuu: ms.nicchuu.kan + ms.nicchuu.shi, gogyou: ms.gogyou,
    soul: label ? label.ja : null,
  };
});

console.log(JSON.stringify({ dayDigest, compatDigest, typeDigest, moonDigest, counts: { days: count, compat: compatCount, types: typeCount, moon: moonCount, samples: samples.length }, sampleRows }, null, 1));
