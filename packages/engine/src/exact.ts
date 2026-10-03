import { fiveStarRate, type BannerConfig } from "./config";

export function fiveStarPmf(config: BannerConfig): number[] {
  const pmf: number[] = new Array<number>(config.hardPity + 1).fill(0);
  let survive = 1;
  for (let k = 1; k <= config.hardPity; k++) {
    const rate = fiveStarRate(config, k);
    pmf[k] = survive * rate;
    survive *= 1 - rate;
  }
  return pmf;
}
