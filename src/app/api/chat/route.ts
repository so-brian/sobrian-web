import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST (req: NextRequest) {
    const { text, previousResponseId } = await req.json();
    console.log('text:', text);
    console.log('previousResponseId:', previousResponseId);

    if (!text) {
        return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    try {
        const response = await openaiClient.responses.create({
            model: 'gpt-4.1-nano',
            previous_response_id: previousResponseId || null,
            input: [{ role: 'user', content: text }],
        });

        console.log('OpenAI API response:', response);

        return NextResponse.json({ id: response.id, outputText: response.output_text });
    } catch (error) {
        console.error('OpenAI API error:', error);
        return NextResponse.json({ error: 'Failed to fetch response from OpenAI' }, { status: 500 });
    }
}
