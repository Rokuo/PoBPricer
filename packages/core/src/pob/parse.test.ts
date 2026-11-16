import { pobCodes } from "@ledger/fixtures";
import { describe, expect, it } from "vitest";
import { decode } from "./decode.ts";
import { parse } from "./parse.ts";

describe("parsing PoB XML into a Build", () => {
  it.todo("class and ascendancy");
  it("should parse a good build", () => {
    const pob = pobCodes.necromancerAggw;
    const decoded = decode(pob);
    const build = parse(decoded);
    expect(build).toMatchObject({
      className: "Witch",
      ascendancy: "Necromancer",
    });
  });
});
