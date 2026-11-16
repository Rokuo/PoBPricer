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

const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
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
