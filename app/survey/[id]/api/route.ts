import clientPromise from '@/app/mongodb'
import { getClientIP } from '@/app/utils'
import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const surveyId = params.id

  const client = await clientPromise
  const db = client.db('survey-db')
  const survey = await db.collection('survey-templates').findOne({ uuid: surveyId })

  return NextResponse.json(survey, { status: 200 })
}

export async function POST(request: Request) {
  const ip = getClientIP(request)
  const { id, answers } = await request.json()

  const client = await clientPromise
  const db = client.db('survey-db')
  const survey = await db.collection(id).insertOne({ ip, answers })

  return NextResponse.json(survey, { status: 200 })
}
