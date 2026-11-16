import { unzlibSync, strFromU8 } from "fflate";

export function decode(pobCode: string): string {
  let ret;
  try {
    const bytes = Uint8Array.fromBase64(pobCode, { alphabet: "base64url" });
    const bytearray = unzlibSync(bytes);
    ret = strFromU8(bytearray);
  } catch (err) {
    throw new PobDecodeError(
      "This doesn't look like a Path of Building code.",
      { cause: err },
    );
  }
  if (ret == "")
    throw new PobDecodeError("This Path of Building code looks empty.");
  return ret;
}

export class PobDecodeError extends Error {
  override readonly name = "PobDecodeError";
  constructor(msg: string, options?: ErrorOptions) {
    super(msg, options);
  }
}
