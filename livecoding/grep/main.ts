import { parseArgs } from "jsr:@std/cli/parse-args";
import { grep } from "./lib.ts";

const { _: args, n } = parseArgs(Deno.args, { boolean: ["n"] })
const [pattern, ...files] = args as [string, ...string[]]

await grep(pattern, files, n);
