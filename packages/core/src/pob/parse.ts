import { parseItem, type Item } from "./item.ts";
import { XMLParser } from "fast-xml-parser";
import { z } from "zod";
import { PobDecodeError } from "./decode.ts";

export type Build = {
  className: string;
  ascendancy: string;
  gear: Partial<Record<string, Item>>;
};

const PobXml = z.looseObject({
  PathOfBuilding: z
    .looseObject({
      Build: z.looseObject({
        className: z.string(),
        ascendClassName: z.string(),
      }),
      Items: z.looseObject({
        activeItemSet: z.string(),
        Item: z.array(
          z.looseObject({
            id: z.string(),
            "#text": z.string(),
          }),
        ),
        ItemSet: z.array(
          z.looseObject({
            id: z.string(),
            Slot: z.array(
              z.looseObject({
                name: z.string(),
                itemId: z.string(),
              }),
            ),
          }),
        ),
      }),
    })
    .transform((pob): Build => ({
      className: pob.Build.className,
      ascendancy: pob.Build.ascendClassName,
      // TODO(human): build gear from pob.Items: find the active set, then resolve each Slot's itemId with parseItem.
      gear: {},
    })),
});

// Repeatable elements are always arrays, even when the XML has only one of them.
const REPEATED = new Set(["Item", "ItemSet", "Slot"]);
const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
  isArray: (tagName) => REPEATED.has(tagName),
});

export function parse(xml: string): Build {
  const raw: unknown = xmlParser.parse(xml);
  const result = PobXml.safeParse(raw);
  if (!result.success)
    throw new PobDecodeError("Decoded Xml is missing required attributes.", {
      cause: result.error,
    });
  return result.data.PathOfBuilding;
}
