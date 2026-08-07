const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const catalog = JSON.parse(fs.readFileSync(path.join(root, 'services.json'), 'utf8'));
const statePath = path.join(root, 'state', 'metrics.json');
const previous = fs.existsSync(statePath) ? JSON.parse(fs.readFileSync(statePath, 'utf8')) : { services: {} };
const names = ['visitor', 'view', 'start', 'complete'];
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function readCounter(slug, name) {
  const url = `https://api.counterapi.dev/v1/amu-web-service-lab/${slug}-${name}/`;
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(12000) });
    const text = await response.text();
    if (response.status === 400 || response.status === 404) return { value: 0, note: `HTTP ${response.status}; treated as 0` };
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const body = JSON.parse(text);
    const value = Number(body.count ?? body.value ?? 0);
    if (!Number.isFinite(value)) throw new Error('invalid counter payload');
    return { value, note: `HTTP ${response.status}` };
  } catch (error) {
    const old = previous.services?.[slug]?.[name]?.value ?? 0;
    return { value: old, note: `${error.name}: ${error.message}; previous retained` };
  }
}

(async () => {
  const services = {};
  await Promise.all(catalog.map(async entry => {
    const slug = entry.path.split('/').filter(Boolean).pop();
    services[slug] = { traffic_label: 'verification traffic may be included; exclude from traction judgement' };
    const results = await Promise.all(names.map(name => readCounter(slug, name)));
    names.forEach((name, index) => {
      const old = previous.services?.[slug]?.[name]?.value ?? 0;
      services[slug][name] = { ...results[index], previous: old, delta: results[index].value - old };
    });
  }));
  const state = {
    observed_at: new Date().toISOString(),
    previous_observed_at: previous.observed_at ?? null,
    source: 'CounterAPI unauthenticated directional counters; 400/404 treated as 0; other HTTP and transport failures retain the previous value',
    caveat: '認証なしカウンターのため数値は方向性の参考値。検証アクセスを含み、厳密なユニーク利用者数ではない。公開24時間未満またはvisitor 5未満では継続判断を行わない。',
    services
  };
  fs.mkdirSync(path.dirname(statePath), { recursive: true });
  fs.writeFileSync(statePath, JSON.stringify(state, null, 2) + '\n');
  console.log(`Updated ${catalog.length} services at ${state.observed_at}`);
})();
