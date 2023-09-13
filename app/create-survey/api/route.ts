import { NextResponse } from 'next/server'
import { getClientIP } from '@/app/utils'
import clientPromise from '@/app/mongodb'
import { SurveyDatabase } from '@/app/database'

export async function POST(request: Request) {
  const ip = getClientIP(request)

  const client = await clientPromise
  const db = client.db('survey-db')

  const database = new SurveyDatabase(db)

  try {
    const uuid: string = await database.createSurvey(ip!, await request.json())
    return NextResponse.json({ 'survey-id': uuid }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: (error as any).message }, { status: 429 })
  }
}
