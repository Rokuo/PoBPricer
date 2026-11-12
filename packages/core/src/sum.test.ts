import { describe, it, expect } from "vitest";
import { sum } from "./sum.ts";

describe("Sum", () => {
  it("Returns the sum of a list of numbers", () => {
    const array: Array<number> = [14, 16, 20, 50];

    const res = sum(array);

    expect(res).toBe(100);
  });
});

describe("Sum", () => {
  it("Should not crash on empty array", () => {
    const array: Array<number> = [];

    const result = sum(array);

    expect(result).toBe(0);
  });
});
