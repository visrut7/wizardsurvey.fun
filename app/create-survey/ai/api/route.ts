import { NextResponse } from 'next/server'
import { createHash, getClientIP } from '@/app/utils'
import clientPromise from '@/app/mongodb'
import openai from '@/app/openai'
import { SURVEY_CREATION_SYSTEM_PROMPT } from './prompt'

const OPENAI_REQUEST_LIMIT = 10

export async function POST(request: Request) {
  const ip = getClientIP(request)

  const client = await clientPromise
  const db = client.db('survey-db')

  const hash = createHash(ip!)
  const creatorHistory = await db.collection('open-ai-limit').findOne({ ipHash: hash })

  if (creatorHistory === null) {
    await db.collection('open-ai-limit').insertOne({ ipHash: hash, count: 1 })
  } else {
    const prevCount = creatorHistory.count

    if (prevCount >= OPENAI_REQUEST_LIMIT) {
      return NextResponse.json({ error: 'API limit is reached to generate survey using OpenAI' }, { status: 429 })
    }

    await db.collection('open-ai-limit').updateOne({ ipHash: hash }, { $set: { count: prevCount + 1 } })
  }

  const userPrompt = (await request.json()).prompt

  const response = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: SURVEY_CREATION_SYSTEM_PROMPT
      },
      {
        role: 'user',
        content: `description for the survey: ${userPrompt}`
      }
    ],
    model: 'gpt-3.5-turbo',
    max_tokens: 300,
    temperature: 0.0
  })

  return NextResponse.json({ survey: response.choices[0].message.content }, { status: 201 })
}
