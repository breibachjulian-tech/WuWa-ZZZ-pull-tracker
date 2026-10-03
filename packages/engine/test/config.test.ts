import { describe, expect, it } from "vitest";
import { fiveStarRate, type BannerConfig } from "../src/config";

// Synthetic numbers for testing the maths. Not real game rates.
const config: BannerConfig = {
  id: "test-ramped",
  name: "Synthetic: soft pity ramp",
  source: "synthetic test data",
  baseRate: 0.05,
  softPityStart: 6,
  softPityRamp: 0.2,
  hardPity: 10,
  featuredChance: 0.5,
  guaranteeCarriesOver: false,
};

describe("fiveStarRate", () => {
  it("is the base rate before soft pity", () => {
    expect(fiveStarRate(config, 5)).toBe(0.05);
  });

  it("ramps linearly from soft pity", () => {
    expect(fiveStarRate(config, 6)).toBeCloseTo(0.25);
    expect(fiveStarRate(config, 8)).toBeCloseTo(0.65);
  });

  it("is exactly 1 at hard pity", () => {
    expect(fiveStarRate(config, 10)).toBe(1);
  });

  it("never exceeds 1", () => {
    const steep = { ...config, softPityRamp: 0.9 };
    expect(fiveStarRate(steep, 7)).toBe(1);
  });

  it("never decreases as pity grows", () => {
    let previous = 0;
    for (let pity = 1; pity <= config.hardPity; pity++) {
      const rate = fiveStarRate(config, pity);
      expect(rate).toBeGreaterThanOrEqual(previous);
      previous = rate;
    }
  });
});
