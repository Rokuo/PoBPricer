import { pobCodes } from "@ledger/fixtures";
import { describe, expect, it } from "vitest";
import { decode } from "./decode.ts";

describe("decoding a PoB code", () => {
  it("returns an xml data driven text", () => {
    const codeToDecode = pobCodes.necromancerAggw;
    const decoded = decode(codeToDecode);
    expect(decoded).toMatch(/^<\?xml/);
  });
});
