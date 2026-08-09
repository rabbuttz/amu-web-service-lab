import concurrent.futures, json, time, urllib.error, urllib.request
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
METRICS = ROOT / 'state' / 'metrics.json'
SERVICES = ROOT / 'services.json'
NAMESPACE = 'amu-web-service-lab'
KINDS = ('visitor', 'view', 'start', 'complete')
old = json.loads(METRICS.read_text(encoding='utf-8')) if METRICS.exists() else {'services': {}}
services = json.loads(SERVICES.read_text(encoding='utf-8'))
slugs = [item['path'].strip('/').split('/')[-1] for item in services]

def fetch(pair):
    slug, kind = pair
    url = f'https://api.counterapi.dev/v1/{NAMESPACE}/{slug}-{kind}/'
    last = None
    # The public endpoint can return slowly or retire counters with 410. One
    # bounded request per key keeps the hourly sweep transactional.
    for attempt in range(1):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'amu-web-service-lab-metrics/1.0'})
            with urllib.request.urlopen(req, timeout=6) as response:
                data = json.load(response)
                return slug, kind, int(data.get('count', 0)), f'HTTP {response.status}'
        except urllib.error.HTTPError as exc:
            if exc.code in (400, 404):
                return slug, kind, 0, f'HTTP {exc.code}; treated as 0'
            last = f'HTTP {exc.code}'
        except Exception as exc:
            last = f'{type(exc).__name__}: {exc}'
        time.sleep(0.8 * (attempt + 1))
    previous = old.get('services', {}).get(slug, {}).get(kind, {}).get('value', 0)
    return slug, kind, previous, f'{last}; previous retained'

pairs = [(slug, kind) for slug in slugs for kind in KINDS]
with concurrent.futures.ThreadPoolExecutor(max_workers=32) as pool:
    rows = list(pool.map(fetch, pairs))

now = datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace('+00:00', 'Z')
out = {
    'observed_at': now,
    'previous_observed_at': old.get('observed_at'),
    'source': 'CounterAPI unauthenticated directional counters; 400/404 treated as 0; other HTTP and transport failures retain the previous value',
    'caveat': '認証なしカウンターのため数値は方向性の参考値。検証アクセスを含み、厳密なユニーク利用者数ではない。公開24時間未満またはvisitor 5未満では継続判断を行わない。',
    'services': {}
}
for slug, kind, value, note in rows:
    previous = old.get('services', {}).get(slug, {}).get(kind, {}).get('value', 0)
    out['services'].setdefault(slug, {})[kind] = {'value': value, 'previous': previous, 'delta': value - previous, 'note': note}
    out['services'][slug]['traffic_label'] = 'verification traffic may be included; exclude from traction judgement'
METRICS.write_text(json.dumps(out, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(now)
for slug in slugs:
    values = out['services'][slug]
    print(slug, ' '.join(f"{k}={values[k]['value']}({values[k]['delta']:+d})" for k in KINDS))
