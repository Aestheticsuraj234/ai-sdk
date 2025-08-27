import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, UIMessage , InferUITools , UIDataTypes ,   tool , stepCountIs} from "ai";
import { ollama } from "ollama-ai-provider-v2";
import {z} from "zod";


const tools = {
    getWeather:tool({
        description:"Get the weather for a location",
        inputSchema:z.object({
            city:z.string().describe("The city to get the weather for")
        }),
        execute: async ({city})=>{
            // use open source API to get the weather
        }
    })
}

export type ChatTools = InferUITools<typeof tools>
export type ChatMessage = UIMessage<never , UIDataTypes , ChatTools>

export async function POST(req:Request) {
    try {
         const {messages}:{messages:ChatMessage[]} = await req.json();


        const result = streamText({
            model:ollama("gpt-oss:20b"),
            messages:convertToModelMessages(messages)  ,
            tools, 
            stopWhen:stepCountIs(2)
        });

        return result.toUIMessageStreamResponse();
    } catch (error) {
        console.error("Error streaming chat completion:", error);
        return Response.json({ error: "Failed to stream chat completion" }, { status: 500 });
    }
       
}