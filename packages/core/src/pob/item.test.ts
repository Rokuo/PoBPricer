import { describe, expect, it } from "vitest";
import { parseItem } from "./item.ts";
import { PobDecodeError } from "./decode.ts";

const squirmingTerror = `Rarity: UNIQUE
Squirming Terror
Unset Ring
Sockets: G
LevelReq: 32`;

describe("reading PoB item text", () => {
  it("should return squirming terror item", () => {
    const item = parseItem(squirmingTerror);
    expect(item).toMatchObject({
      rarity: "UNIQUE",
      name: "Squirming Terror",
      baseType: "Unset Ring",
    });
  });

  it.each([
    { label: "empty text", text: "" },
    { label: "a rarity line only", text: "Rarity: UNIQUE" },
    {
      label: "a missing base type line",
      text: "Rarity: UNIQUE\nSquirming Terror",
    },
  ])("throws a PobDecodeError on $label", ({ text }) => {
    expect(() => parseItem(text)).toThrow(PobDecodeError);
  });
});
