import { pobCodes } from "@ledger/fixtures";
import { describe, expect, it } from "vitest";
import { decode, PobDecodeError } from "./decode.ts";

describe("decoding a PoB code", () => {
  it("returns an xml data driven text", () => {
    const codeToDecode = pobCodes.necromancerAggw;
    const decoded = decode(codeToDecode);
    expect(decoded).toMatch(/^<\?xml/);
  });

  it("should throw a PobDecodeError with garbage input", () => {
    const code = "coucou";
    expect(() => decode(code)).toThrow(PobDecodeError);
  });

  it("throws a PobDecodeError when the code inflates to nothing", () => {
    const code = "eNrs";
    expect(() => decode(code)).toThrow(PobDecodeError);
  });
});
