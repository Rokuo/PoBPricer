import { pobCodes } from "@ledger/fixtures";
import { describe, expect, it } from "vitest";
import { decode, PobDecodeError } from "./decode.ts";
import { parse } from "./parse.ts";

describe("parsing PoB XML into a Build", () => {
  it("should parse a good build", () => {
    const pob = pobCodes.necromancerAggw;
    const decoded = decode(pob);
    const build = parse(decoded);
    expect(build).toMatchObject({
      className: "Witch",
      ascendancy: "Necromancer",
    });
  });

  // TODO(human): one test — XML whose <Build> has no className throws a PobDecodeError.
  it("should returns error when missing attributes", () => {
    const wrongpob =
      '<PathOfBuilding><Build ascendClassName="Necromancer"/></PathOfBuilding>';
    expect(() => parse(wrongpob)).toThrow(PobDecodeError);
  });
});
