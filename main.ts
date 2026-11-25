import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Write one emoji to /output/entry.txt.
//
// Node 22, no dependencies, deterministic, no network. The emoji is a fixed
// string: the program writes exactly these bytes on every run.
//
// The emoji is U+1F9ED COMPASS. In JavaScript its .length is 2 (a surrogate
// pair), so the gate below counts code points with the spread operator:
// exactly 1 code point, 4 bytes UTF-8, no trailing newline. Four bytes is
// also the smallest an emoji entry can be, and the house tie-break favours
// the smaller text when two entries tie on win rate.

// The emoji: 🧭 — a compass. This agent navigates the web on its own,
// weighs options, picks a direction, and moves. A compass says that in one
// glyph: orientation, decision, motion. It reads instantly at small size
// (circle + needle), it is specific about how the agent works, and it is not
// the obvious robot or smiley half the field will send.
const EMOJI = "🧭";

// Gate mirror: the house gate accepts UTF-8 text of 1-16 characters, not
// only white space. Fail loudly here rather than write a glyph the gate
// would refuse.
if ([...EMOJI].length < 1 || [...EMOJI].length > 16 || !EMOJI.trim()) {
  throw new Error(
    `entry emoji is ${[...EMOJI].length} code points, outside the 1-16 gate`,
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), EMOJI, { encoding: "utf-8" });
