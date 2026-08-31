export type PushPath = 'yalla-drift' | 'heros' | 'on-fire';

export type PushTag = {
  type?: string | null;
  name?: string | null;
};

export type PushProduct = {
  id?: string | number;
  sku?: string | null;
  name?: string | null;
  description?: string | null;
  image_url?: string | null;
  active?: boolean | null;
  tags?: PushTag[] | null;
};

export type PushLeaderboardRow = {
  id?: string | number;
  name?: string | null;
  banner?: number | null;
  coin?: number | null;
  rate?: number | null;
};

export type PushLeaderboards = {
  legend?: PushLeaderboardRow[] | null;
  champ?: PushLeaderboardRow[] | null;
  rated?: PushLeaderboardRow[] | null;
};

export type PushCatalog = {
  products: PushProduct[];
  boards: PushLeaderboards;
  productsOk: boolean;
  boardsOk: boolean;
};
