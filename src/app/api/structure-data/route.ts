import { streamObject } from "ai";
import { recipeSchema } from "./schema";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  try {
    const { dish } = await req.json();

    const result = streamObject({
      model: openai("gpt-4.1-nano"),
      schema: recipeSchema,
      prompt: `Generate a recipe for ${dish}`,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Error streaming chat completion:", error);
    return new Response("Failed to stream chat completion", { status: 500 }); 
  }
}
