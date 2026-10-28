import "server-only";

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { z } from "zod";

const envSchema = z.object({
  AI_PROVIDER: z.enum(["google"]).default("google"),
  AI_MODEL: z.string().trim().min(1).default("gemini-2.5-flash"),
  GOOGLE_GENERATIVE_AI_API_KEY: z.string().trim().min(1),
});

export function getModel() {
  const env = envSchema.parse(process.env);
  const google = createGoogleGenerativeAI({
    apiKey: env.GOOGLE_GENERATIVE_AI_API_KEY,
  });

  switch (env.AI_PROVIDER) {
    case "google":
      return google(env.AI_MODEL);
  }
}
