import { NextRequest } from "next/server";
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    const result = streamText({
      model: openai("gpt-4.1-nano"),
      prompt: prompt,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    return Response.json({ error: "Failed to generate text" }, { status: 500 });
  }
}
