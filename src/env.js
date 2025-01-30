import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    // Server-side variables
    DATABASE_URL: z.string().url(), // Ensures a valid URL is provided
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"), // Defaults to "development" if not specified
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // Example of a client-side variable:
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
    // Uncomment the above line if you have client-side env vars.
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL, // Maps to the process.env value
    NODE_ENV: process.env.NODE_ENV, // Maps to the process.env value
    // Uncomment below if you have client-side variables
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION, // Allows skipping validation during builds
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true, // Ensures empty strings are treated as undefined
});
