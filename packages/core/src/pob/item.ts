import { PobDecodeError } from "./decode.ts";

export type Item = {
  rarity: string; // more like a enum type i think i'll see
  name: string;
  baseType: string;
};

export function parseItem(itemText: string): Item {
  const lines: string[] = itemText.split("\n");
  const [rarity, name, baseType] = lines;
  if (rarity === undefined || name === undefined || baseType === undefined)
    throw new PobDecodeError(`item ${itemText} cannot be decoded`);
  return {
    rarity: rarity.replace("Rarity: ", ""),
    name,
    baseType,
  };
}
