import { parseArgs } from "jsr:@std/cli/parse-args";
import { cat } from "./lib.ts";

const files = parseArgs(Deno.args)["_"];
cat(files as string[])
