import { NextRequest } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY ?? '',
});

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { 
        role: 'system', 
        content: 'You are a helpful meal planner. Always reply with valid JSON only.' 
      },
      { role: 'user', content: prompt }
    ],
  });

  const result = completion.choices[0]?.message?.content || 'No result';

  return new Response(result, {
    headers: { 'Content-Type': 'application/json' },
  });
}