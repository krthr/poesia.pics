import type { Err, Ok } from "neverthrow";
import type { ErrorObject } from "../utils/errors";
import type { z } from "zod";

import { OpenAI } from "openai";
import { zodResponseFormat } from "openai/helpers/zod.mjs";
import { fromPromise, ok } from "neverthrow";
import { buildError } from "../utils/errors";

const runtimeConfig = useRuntimeConfig();

export const ai = new OpenAI({ apiKey: runtimeConfig.openaiApiKey });

export async function chatCompletion<T extends z.ZodType>(
  systemPrompt: string,
  imageUrl: string,
  schema: T
): Promise<Ok<z.TypeOf<T>, never> | Err<never, ErrorObject>> {
  const completionResult = await fromPromise(
    ai.beta.chat.completions.parse({
      model: "o4-mini",
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: [{ type: "image_url", image_url: { url: imageUrl } }],
        },
      ],
      response_format: zodResponseFormat(schema, "poem"),
    }),
    buildError("CHAT_COMPLETION_FAILED")
  ).map((response) => response.choices.at(0)?.message.parsed);

  if (completionResult.isErr()) {
    return completionResult.error;
  }

  const parsed = completionResult.value;
  if (!parsed) {
    return buildError("CHAT_COMPLETION_FAILED")();
  }

  return ok(parsed);
}
