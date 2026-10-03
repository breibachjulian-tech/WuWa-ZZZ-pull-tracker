import { describe, expect, it } from "vitest";
import type { BannerConfig } from "../src/config";
import { fiveStarPmf } from "../src/exact";

// Synthetic numbers for testing the maths. NOT the real rates of any
// Wuthering Waves or Zenless Zone Zero banner.

// Smallest possible banner: hard pity on pull 2, so it can be worked by hand.
const hardPity2Banner: BannerConfig = {
  id: "test-hard-pity-2",
  name: "Synthetic: hard pity on pull 2",
  source: "synthetic test data",
  baseRate: 0.5,
  softPityStart: 2,
  softPityRamp: 0,
  hardPity: 2,
  featuredChance: 0.5,
  guaranteeCarriesOver: true,
};

// Shaped like a Wuthering Waves featured Resonator banner: low base rate,
// a soft pity ramp, then a guaranteed 5-star at hard pity.
const wuwaStyleBanner: BannerConfig = {
  id: "test-wuwa-style",
  name: "Synthetic: Wuthering Waves style ramp",
  source: "synthetic test data",
  baseRate: 0.05,
  softPityStart: 6,
  softPityRamp: 0.2,
  hardPity: 10,
  featuredChance: 0.5,
  guaranteeCarriesOver: true,
};

describe("fiveStarPmf", () => {
  it("matches the hand-worked values on the hard pity 2 banner", () => {
    expect(fiveStarPmf(hardPity2Banner)).toEqual([0, 0.5, 0.5]);
  });

  it("matches hand-worked values on the ramped banner", () => {
    const pmf = fiveStarPmf(wuwaStyleBanner);
    expect(pmf[1]).toBeCloseTo(0.05, 10); // hit straight away
    expect(pmf[6]).toBeCloseTo(0.95 ** 5 * 0.25, 10); // miss 5 times, then ramp starts
    expect(pmf[10]).toBeCloseTo(0.016757, 6); // survive every miss up to hard pity
  });

  it("sums to 1 for any valid banner", () => {
    for (const banner of [hardPity2Banner, wuwaStyleBanner]) {
      const total = fiveStarPmf(banner).reduce((a, b) => a + b, 0);
      expect(total).toBeCloseTo(1, 12);
    }
  });

  it("puts no probability past hard pity", () => {
    const pmf = fiveStarPmf(wuwaStyleBanner);
    expect(pmf).toHaveLength(wuwaStyleBanner.hardPity + 1);
    expect(pmf[0]).toBe(0);
  });
});
