import { toReadableStream, toWritableStream } from "jsr:@std/io";

export const cat = (files: string[]): void => {
  for (const file of files) {
    print(file);
  }
}

const print = async (file: string) => {
  const fs = await Deno.open(file)
  await toReadableStream(fs)
    .pipeTo(toWritableStream(Deno.stdout));
}
