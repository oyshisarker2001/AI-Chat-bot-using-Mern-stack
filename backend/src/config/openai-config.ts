import { ClientOptions, OpenAI } from "openai";

export const configureOpenAI = (): ClientOptions => {
  return {
    apiKey: process.env.OPEN_AI_SECRET!, // Ensure this environment variable is set
    organization: process.env.OPENAI_ORGANIZATION_ID, // Optional, only include if needed
  };
};
