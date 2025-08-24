import { NextRequest } from "next/server";
import { generateText } from "ai";
import {openai} from "@ai-sdk/openai"

export async function POST(request:NextRequest){

    const {prompt} = await request.json()

    const {text} = await generateText({
        model:openai("gpt-4.1-nano"),
        prompt:prompt
    })

    return Response.json({text})
}