import { XMLParser } from "fast-xml-parser";
import { z } from "zod";
import { PobDecodeError } from "./decode.ts";

export type Build = {
  className: string;
  ascendancy: string;
};

const PobXml = z.looseObject({
  PathOfBuilding: z.looseObject({
    Build: z
      .looseObject({
        className: z.string(),
        ascendClassName: z.string(),
      })
      .transform((b): Build => ({
        className: b.className,
        ascendancy: b.ascendClassName,
      })),
  }),
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
  return result.data.PathOfBuilding.Build;
}
