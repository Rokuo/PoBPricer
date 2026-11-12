import { describe, it, expect } from "vitest";   // 1. tools from Vitest

describe("Math.max", () => {                     // 2. a group of tests for one thing
  it("returns the largest number", () => {       // 3. one behaviour, in plain English
    const result = Math.max(4, 9, 2);            //    Act: call the code
    expect(result).toBe(9);                      //    Assert: check the result
  });
});