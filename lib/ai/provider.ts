import "server-only";

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { z } from "zod";

const envSchema = z.object({
  AI_PROVIDER: z.enum(["google"]).default("google"),
  AI_MODEL: z.string().trim().min(1).default("gemini-3.8-flash"),
  AI_FALLBACK_MODEL: z.string().trim().min(1).default("gemini-3.1-flash-lite"),
  GOOGLE_GENERATIVE_AI_API_KEY: z.string().trim().min(1),
});

export function getModels() {
  const env = envSchema.parse(process.env);
  const google = createGoogleGenerativeAI({
    apiKey: env.GOOGLE_GENERATIVE_AI_API_KEY,
  });

  switch (env.AI_PROVIDER) {
    case "google":
      return {
        primary: google(env.AI_MODEL),
        primaryName: env.AI_MODEL,
        fallback:
          env.AI_MODEL === env.AI_FALLBACK_MODEL
            ? null
            : google(env.AI_FALLBACK_MODEL),
        fallbackName: env.AI_FALLBACK_MODEL,
      };
  }
}
