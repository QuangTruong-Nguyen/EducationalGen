import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai'; 
import { NextResponse } from 'next/server';

const GOOGLE_API_KEY = "AIzaSyD_fOfuu7stUwMxCSkUtQvgMpaPbWyt51c"

// Allow streaming response up to 30 seconds
export const maxDuration = 30;

const google = createGoogleGenerativeAI({
    apiKey: GOOGLE_API_KEY,
});

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();
        const result = streamText({
            model: google('gemini-2.0-flash-001'),
            messages: [
                {
                    role: 'user',
                    content: [
                        {
                            type: 'text',
                            text: 'Answer the following question and return the answer in plain text: ' + messages[messages.length - 1].content
                        },
                    ],
                },   
            ],
        });

        return result.toDataStreamResponse();

        // return NextResponse.json({
        //     role: 'assistant',
        //     content: result.text,
        // });
    } catch (error) {   
        console.log(error);
        return NextResponse.json({
            error: 'Failed to generate text',
        }, { status: 500 });
    }
}
