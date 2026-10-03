export interface BannerConfig {
  id: string;
  name: string;
  source: string;
  baseRate: number;
  softPityStart: number;
  softPityRamp: number;
  hardPity: number;
  featuredChance: number;
  guaranteeCarriesOver: boolean;
}

export function fiveStarRate(config: BannerConfig, pity: number): number {
  if (pity >= config.hardPity) return 1;
  if (pity >= config.softPityStart) {
    return Math.min(1, config.baseRate + (pity - config.softPityStart + 1) * config.softPityRamp);
  }
  return config.baseRate;
}
