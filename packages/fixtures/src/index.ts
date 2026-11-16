// A plain `import` can't load an ambient .d.ts, and `core` must see it when it imports this file.
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./raw.d.ts" />
// Real Path of Building export codes, inlined as strings so tests in `core` never read the disk.
import necromancerAggw from "../pob/poe1-necromancer-aggw-3.29.txt?raw";

export const pobCodes = {
  /** PoE1 3.29, level 98 Necromancer, Animate Guardian's Weapon. Source: pob.codes/b/DgSs86PQDQS */
  necromancerAggw: necromancerAggw.trim(),
} as const;
