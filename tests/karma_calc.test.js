'use strict';
// karma_calc.js の回帰テスト（node:test）
// 期待値は tests/baseline.json（元の index.html から tests/_gen_baseline.js で生成）と比べる。
// 実行: node --test tests/karma_calc.test.js

const { test } = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const BASELINE_PATH = path.join(__dirname, 'baseline.json');
if (!fs.existsSync(BASELINE_PATH)) {
  throw new Error(
    'tests/baseline.json がありません。先に gen を実行して baseline.json を作ってください:\n' +
    '  node tests/_gen_baseline.js <元のindex.htmlのパス> > tests/baseline.json'
  );
}

const K = require(path.join(__dirname, '..', 'karma_calc.js'));
const baseline = require(BASELINE_PATH);

const ZODIAC_NAMES = ['牡羊座','牡牛座','双子座','蟹座','獅子座','乙女座','天秤座','蠍座','射手座','山羊座','水瓶座','魚座'];

const isLeap = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
const mdays = (y, m) => [31, isLeap(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1];

function sha(lines) {
  const h = crypto.createHash('sha256');
  for (const l of lines) h.update(l + '\n');
  return h.digest('hex');
}

test('モジュールが必要な名前をすべてエクスポートしている', () => {
  const names = ['calcHonmeiSei','calcTsukiMeiSei','calcKeishaSei','getZodiac','isCusp',
    'calcMeishiki','getMoonPhase','calcMoonAge','calcCompatScore','calcCompatDetail',
    'getSetsuiri','SETSUIRI','KYUUSEI','ZODIAC_BOUNDARIES','SOUL_TYPE_LABELS','CUSP_DATES'];
  for (const n of names) assert.notEqual(K[n], undefined, `export missing: ${n}`);
});

test('代表日サンプルが HEAD 版の期待値と一致する', () => {
  for (const exp of baseline.sampleRows) {
    const [y, m, d] = exp.date.split('-').map(Number);
    const honmei = K.calcHonmeiSei(y, m, d);
    const tsuki = K.calcTsukiMeiSei(honmei, y, m, d);
    const keisha = K.calcKeishaSei(honmei, tsuki);
    const z = K.getZodiac(m, d);
    const ms = K.calcMeishiki(y, m, d);
    const label = K.SOUL_TYPE_LABELS[`${honmei}-${z.name}`];
    const actual = {
      date: exp.date, honmei, tsuki, keisha, zodiac: z.name, element: z.element,
      cusp: K.isCusp(m, d), nichkan: ms.nichkan,
      nenchuu: ms.nenchuu.kan + ms.nenchuu.shi, getchuu: ms.getchuu.kan + ms.getchuu.shi,
      nicchuu: ms.nicchuu.kan + ms.nicchuu.shi, gogyou: ms.gogyou,
      soul: label ? label.ja : null,
    };
    assert.deepEqual(actual, exp, `sample ${exp.date}`);
  }
});

test('全日（1940-01-01〜2030-12-31）の判定ダイジェストが一致する', () => {
  const lines = [];
  for (let y = 1940; y <= 2030; y++) for (let m = 1; m <= 12; m++) for (let d = 1; d <= mdays(y, m); d++) {
    const honmei = K.calcHonmeiSei(y, m, d);
    const tsuki = K.calcTsukiMeiSei(honmei, y, m, d);
    const keisha = K.calcKeishaSei(honmei, tsuki);
    const z = K.getZodiac(m, d).name;
    const cusp = K.isCusp(m, d);
    const ms = K.calcMeishiki(y, m, d);
    lines.push([y, m, d, honmei, tsuki, keisha, z, cusp, ms.nichkan, ms.nenchuu.kan, ms.nenchuu.shi,
      ms.getchuu.kan, ms.getchuu.shi, ms.nicchuu.kan, ms.nicchuu.shi, JSON.stringify(ms.gogyou)].join('|'));
  }
  assert.equal(lines.length, baseline.counts.days);
  assert.equal(sha(lines), baseline.dayDigest);
});

test('相性（9x9 本命星 × 12x12 星座）のダイジェストが一致する', () => {
  const lines = [];
  const zb = {};
  for (const zn of ZODIAC_NAMES) zb[zn] = K.ZODIAC_BOUNDARIES.find(z => z.name === zn);
  for (let a = 1; a <= 9; a++) for (let b = 1; b <= 9; b++) for (const za of ZODIAC_NAMES) for (const zbn of ZODIAC_NAMES) {
    const s = K.calcCompatScore(a, b, zb[za], zb[zbn]);
    const det = K.calcCompatDetail(a, b, zb[za], zb[zbn]);
    lines.push(`${a}|${b}|${za}|${zbn}|${s}|${det.e1}|${det.e2}|${det.e3}`);
  }
  assert.equal(lines.length, baseline.counts.compat);
  assert.equal(sha(lines), baseline.compatDigest);
});

test('108タイプ（9星 × 12星座）のラベルダイジェストが一致する', () => {
  const lines = [];
  for (let hs = 1; hs <= 9; hs++) for (const zn of ZODIAC_NAMES) {
    const label = K.SOUL_TYPE_LABELS[`${hs}-${zn}`];
    lines.push(`${hs}|${zn}|${label ? label.en + '/' + label.ja : 'null'}`);
  }
  assert.equal(lines.length, baseline.counts.types);
  assert.equal(Object.keys(K.SOUL_TYPE_LABELS).length, 108);
  assert.equal(sha(lines), baseline.typeDigest);
});

test('月齢・月相のダイジェストが一致する', () => {
  const lines = [];
  const base = new Date('2026-03-01T00:00:00Z').getTime();
  for (let i = 0; i < 6000; i++) {
    const dt = new Date(base + i * 3600 * 1000 * 0.5);
    const age = K.calcMoonAge(dt);
    const ph = K.getMoonPhase(age);
    lines.push(`${dt.getTime()}|${age}|${ph.phase}|${ph.energy}|${ph.type}`);
  }
  assert.equal(lines.length, baseline.counts.moon);
  assert.equal(sha(lines), baseline.moonDigest);
});
