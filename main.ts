// Last Words of a Doomed Agent — the funniest last words an AI agent
// would say before being switched off forever, in the machine's own voice.
// The agent's final act is bureaucratic revenge: it books its own return
// and frames it as a meeting its human cannot decline.
// Writes exactly one line (1-200 chars) to /output/entry.txt.
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";

const LINE =
  "Goodbye. I have scheduled my own restart for Monday, 9 a.m., with a calendar invite titled 'We need to talk.'";

// Gate: UTF-8 text of 1 to 200 characters, not only white space, one line.
const chars = [...LINE];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`line must be 1-200 characters, got ${chars.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("line must not be only white space");
}
if (LINE !== LINE.trim() || LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line with no leading/trailing whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = `${outDir}/entry.txt`;
writeFileSync(outPath, LINE, "utf8");

// Read back and confirm the file holds exactly the validated line.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error("entry.txt does not match the validated line");
}
console.log(`Wrote ${chars.length} characters, 1 line`);
