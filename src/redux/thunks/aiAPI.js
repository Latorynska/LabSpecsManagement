import { createAsyncThunk } from "@reduxjs/toolkit";
import OpenAi from "openai";

const OPEN_AI_KEY = process.env.OPEN_AI_KEY;


export const generateChat = createAsyncThunk('ai/generateChat', async(messages) => {
    const maxLengthRes = 100;
    const lastMessageIndex = messages.length - 1;
    const updatedContent = messages[lastMessageIndex].content +  ` ((balas secara mendetail))`;
    messages[lastMessageIndex] = { role: 'user', content: updatedContent};
    const openAi = new OpenAi({
        apiKey: OPEN_AI_KEY,
        dangerouslyAllowBrowser: true,
    })
    return await openAi.chat.completions.create({
        messages: messages,
        model: 'gpt-3.5-turbo',
    });
});