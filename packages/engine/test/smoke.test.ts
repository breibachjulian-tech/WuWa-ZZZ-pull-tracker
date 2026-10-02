import { describe, expect, it } from "vitest";
import { add } from "../src/index";

describe("smoke test", () => {
  it("runs the test pipeline", () => {
    expect(add(1, 2)).toBe(3);
  });
});
