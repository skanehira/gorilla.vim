import { parseArgs } from "jsr:@std/cli/parse-args";
import { grep } from "./lib.ts";

const [pattern, ...files] = parseArgs(Deno.args)["_"] as [string, ...string[]];
await grep(pattern, files);
