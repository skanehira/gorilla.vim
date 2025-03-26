import { toReadableStream } from "jsr:@std/io";
import { TextLineStream } from "jsr:@std/streams/text-line-stream";
import { toTransformStream } from "jsr:@std/streams/to-transform-stream";

export const grep = async (pattern: string, files: string[], n: boolean) => {
  for (const file of files) {
    const fs = await Deno.open(file);
    const stream = toReadableStream(fs)
      .pipeThrough(new TextDecoderStream())
      .pipeThrough(new TextLineStream())
      .pipeThrough(toTransformStream(async function* (src) {
        let line = 1
        for await (const chunk of src) {
          yield [line, chunk] as const;
          line++
        }
      }))
      .pipeThrough(toTransformStream(async function* (src) {
        for await (const [line, chunk] of src) {
          if (chunk.includes(pattern)) {
            if (n) {
              yield `${line}: ${chunk}`;
            } else {
              yield `${chunk}`;
            }
          }
        }
      }));
      for await (const line of stream) {
        console.log(line)
      }
  }
};
