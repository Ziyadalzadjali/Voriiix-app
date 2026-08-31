import type { RacingLeaderboard, RacingPage, RacingPathHref, RacingPathStep } from '../types';
import type { PushCatalog, PushLeaderboardRow, PushPath, PushProduct, PushTag } from './types';

const ALLOWED_ORIGIN = 'https://akacademy.online';
const ALLOWED_IMAGE_HOSTS = new Set(['akacademy.online', 'products.akacademy.online']);

export const PUSH_PATHS: { id: PushPath; label: string }[] = [
  { id: 'yalla-drift', label: 'Yalla Drift' },
  { id: 'heros', label: 'Heros' },
  { id: 'on-fire', label: 'On Fire' },
];

function readEnv(name: string): string {
  const value = process.env[name];
  return typeof value === 'string' ? value.trim() : '';
}

export function getPushOrigin(): string {
  const raw = readEnv('EXPO_PUBLIC_PUSH_ORIGIN') || ALLOWED_ORIGIN;
  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    throw new Error('Push origin is not a valid URL.');
  }
  if (parsed.origin !== ALLOWED_ORIGIN) {
    throw new Error('Push sync is limited to https://akacademy.online/push.');
  }
  return ALLOWED_ORIGIN;
}

export function pushAssetUrl(pathOrUrl: string | null | undefined): string | undefined {
  if (!pathOrUrl) return undefined;
  const value = String(pathOrUrl).trim();
  if (!value) return undefined;

  try {
    const url =
      value.startsWith('http://') || value.startsWith('https://')
        ? new URL(value)
        : new URL(value.startsWith('/') ? value : `/${value}`, `${ALLOWED_ORIGIN}/`);
    if (url.protocol !== 'https:' || !ALLOWED_IMAGE_HOSTS.has(url.hostname)) {
      return undefined;
    }
    return url.toString();
  } catch {
    return undefined;
  }
}

function tagsOf(product: PushProduct): PushTag[] {
  return Array.isArray(product.tags) ? product.tags : [];
}

export function pathStep(product: PushProduct): number {
  const sku = String(product.sku || '');
  const skuMatch = sku.match(/step\s*(\d+)/i);
  if (skuMatch?.[1]) return parseInt(skuMatch[1], 10);

  const tag = tagsOf(product).find((item) => {
    const type = String(item.type || '').toLowerCase();
    return type === 'path-step' || type === 'step';
  });
  if (tag) {
    const n = parseInt(String(tag.name || '').replace(/\D/g, ''), 10);
    if (n) return n;
  }
  return 999;
}

export function hasTagName(product: PushProduct, name: string): boolean {
  const wanted = String(name || '').toLowerCase();
  return tagsOf(product).some((tag) => String(tag.name || '').toLowerCase() === wanted);
}

export function hasTypedTag(product: PushProduct, type: string, name: string): boolean {
  const wantType = String(type || '').trim().toLowerCase();
  const wantName = String(name || '').trim().toLowerCase();
  return tagsOf(product).some(
    (tag) =>
      String(tag.type || '').trim().toLowerCase() === wantType &&
      String(tag.name || '').trim().toLowerCase() === wantName,
  );
}

export function hasRacingCategory(product: PushProduct): boolean {
  return tagsOf(product).some(
    (tag) =>
      String(tag.type || '').toLowerCase() === 'category' &&
      String(tag.name || '').toLowerCase() === 'racing',
  );
}

export function isHerosProduct(product: PushProduct): boolean {
  if (hasTagName(product, 'heros') || hasTagName(product, 'heroes') || hasTagName(product, 'hero')) {
    return true;
  }
  return /hero/i.test(String(product.name || '')) || /hero/i.test(String(product.sku || ''));
}

export function isOnFireProduct(product: PushProduct): boolean {
  if (hasTagName(product, 'on fire') || hasTagName(product, 'on-fire') || hasTagName(product, 'fire')) {
    return true;
  }
  return /on\s*fire|fire/i.test(String(product.name || '')) || /on\s*fire|fire/i.test(String(product.sku || ''));
}

export function matchesPushPath(product: PushProduct, path: PushPath): boolean {
  if (path === 'heros') return isHerosProduct(product);
  if (path === 'on-fire') return isOnFireProduct(product);
  return !isHerosProduct(product) && !isOnFireProduct(product);
}

export function filterPushProducts(products: PushProduct[], path: PushPath): PushProduct[] {
  return products
    .filter((product) => product && product.active && hasRacingCategory(product) && matchesPushPath(product, path))
    .sort((a, b) => {
      const delta = pathStep(a) - pathStep(b);
      return delta !== 0 ? delta : String(a.name || '').localeCompare(String(b.name || ''));
    });
}

export function productHrefKind(product: PushProduct): RacingPathHref | null {
  const step = pathStep(product);
  const name = String(product.name || '');

  if (step === 1 || (/practice/i.test(name) && !/battle/i.test(name))) return 'funDen';
  if (hasTypedTag(product, 'racing', 'fun den') && !hasTypedTag(product, 'battle', 'racing')) return 'funDen';
  if (step === 2 || /win sim battles|sim battle/i.test(name)) return 'booking';
  if (hasTypedTag(product, 'battle', 'racing')) return 'booking';
  if (hasRacingCategory(product) && hasTagName(product, 'fun den')) return 'funDen';
  return null;
}

type FallbackRow = [string, string, string, RacingPathHref];

const YALLA_DRIFT: FallbackRow[] = [
  ['Practice SIM Drift', 'Build angle, entry and transition on the rig.', '/carx-tandem-hero.png', 'funDen'],
  ['Win SIM Battles', 'Beat rivals in tandem and 1v1 podium fights.', '/battle-card-reference-carx.png', 'booking'],
  ['Joint SIM Drift Events', 'Roll with the crew at live drift nights.', '/voriix-push-limit-bg.png', 'funDen'],
  ['Academy Course', 'Level up technique through structured stages.', '/assetto-tandem-hero.png', 'funDen'],
  ['Join SIM Drift Championships', 'Qualify and line up for the big series.', '/voriix-cars-lineup.png', 'funDen'],
];

const HEROS: FallbackRow[] = [
  ['Rise of Heros', 'Build your legend on the Champ Drifter path.', '/voriix-cars-lineup.png', 'funDen'],
  ['Hero Battles', 'Prove yourself against the best.', '/battle-card-reference-carx.png', 'funDen'],
  ['Crown the Hero', 'Championships. Champ status.', '/voriix-push-limit-bg.png', 'funDen'],
];

const ON_FIRE: FallbackRow[] = [
  ['On Fire Sessions', 'Hot runs. Hot laps. Stay lit on the path.', '/voriix-push-limit-bg.png', 'funDen'],
  ['Fire Battles', 'Bring the heat in tandem and 1v1 fights.', '/battle-card-reference-carx.png', 'funDen'],
  ['Burn the Crown', 'Championship heat. Champ status.', '/voriix-cars-lineup.png', 'funDen'],
];

export function fallbackPathSteps(path: PushPath): RacingPathStep[] {
  const rows = path === 'heros' ? HEROS : path === 'on-fire' ? ON_FIRE : YALLA_DRIFT;
  return rows.map((row, index) => ({
    id: `fallback-${path}-${index + 1}`,
    order: index + 1,
    title: row[0],
    summary: row[1],
    imageUrl: pushAssetUrl(row[2]),
    href: row[3],
    source: 'fallback',
  }));
}

function pushEditorial(): Omit<RacingPage, 'pathSteps' | 'leaderboards' | 'selectedPath' | 'stepsSource' | 'syncWarning'> {
  return {
    kicker: 'Journey',
    title: 'Champ',
    titleAccent: 'Drifter Path',
    subtitle: 'Practice angle. Win battles. Climb events and academy. Enter championships — and take the crown.',
    tags: PUSH_PATHS.map((item) => item.label),
    pillarsKicker: 'Our pillars',
    pillarsTitle: 'Race · Drift · Build · Win',
    pillars: [
      { id: 'race', title: 'Race', summary: 'Every session tracked' },
      { id: 'drift', title: 'Drift', summary: 'Angle, entry, transition' },
      { id: 'build', title: 'Build', summary: 'Bay to street to track' },
      { id: 'win', title: 'Win', summary: 'SR Coin, gear, prize pools' },
    ],
    faqs: [
      {
        id: 'car',
        question: 'Do I need my own car?',
        answer: 'Not for sim or academy. Bring your own for garage / drift nights.',
      },
      {
        id: 'sr',
        question: 'How is SR Coin earned?',
        answer: 'By completing sim sessions, academy tiers, and events. SR Coin is redeemable across the market and shop.',
      },
      {
        id: 'bid',
        question: 'Can I bid on podium slots?',
        answer: 'Yes. Any user with sufficient SR Coin or Rial can bid on live podium slots. Availability and bids are confirmed by the server.',
      },
      {
        id: 'walkin',
        question: 'Is there a walk-in option?',
        answer: 'Yes. Walk-ins are welcome if slots are open, but signing in ahead reserves your bid privileges.',
      },
    ],
    welcomeLine: 'Create your account, get 100 SR Token (SRT) on the house, and pick your first session.',
  };
}

function formatCount(value: number | null | undefined): string {
  const n = Number(value || 0);
  return Number.isFinite(n) ? n.toLocaleString('en-US') : '0';
}

function mapLiveSteps(products: PushProduct[]): RacingPathStep[] {
  return products.map((product, index) => {
    const stepNum = pathStep(product);
    const order = stepNum !== 999 ? stepNum : index + 1;
    return {
      id: String(product.id ?? `step-${order}`),
      order,
      title: String(product.name || 'Untitled step'),
      summary: String(product.description || '').trim(),
      imageUrl: pushAssetUrl(product.image_url),
      href: productHrefKind(product),
      source: 'live',
    };
  });
}

function mapBoard(
  id: string,
  title: string,
  emptyLabel: string,
  rows: PushLeaderboardRow[] | null | undefined,
  score: (row: PushLeaderboardRow) => string,
): RacingLeaderboard {
  const entries = (rows || []).slice(0, 3).map((row, index) => ({
    id: String(row.id ?? `${id}-${index + 1}`),
    name: String(row.name || 'Unnamed'),
    rank: index + 1,
    scoreLabel: score(row),
  }));
  return { id, title, emptyLabel, entries };
}

export function mapPushRacingPage(catalog: PushCatalog, path: PushPath): RacingPage {
  const live = filterPushProducts(catalog.products, path);
  const pathSteps = live.length ? mapLiveSteps(live) : fallbackPathSteps(path);
  const boards = catalog.boards;

  return {
    ...pushEditorial(),
    selectedPath: path,
    stepsSource: live.length ? 'live' : 'fallback',
    syncWarning: catalog.productsOk
      ? undefined
      : 'Live path steps are unavailable. Showing the published /push copy.',
    pathSteps,
    leaderboards: [
      mapBoard('legends', 'Top Banner Legends', 'No legends yet.', boards.legend, (row) => formatCount(row.banner)),
      mapBoard('champs', 'Top Star Champs', 'No champs yet.', boards.champ, (row) => formatCount(row.coin)),
      mapBoard('rated', 'Top Rated', 'No rated accounts yet.', boards.rated, (row) => `L${formatCount(row.rate)}`),
    ],
  };
}
