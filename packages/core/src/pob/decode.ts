import { unzlibSync, strFromU8 } from "fflate";

export function decode(pobCode: string): string {
  const bytes = Uint8Array.fromBase64(pobCode, { alphabet: "base64url" });
  const bytearray = unzlibSync(bytes);
  const ret = strFromU8(bytearray);
  return ret;
}
