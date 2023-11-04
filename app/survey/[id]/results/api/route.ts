import clientPromise from '@/app/mongodb'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id')

  const client = await clientPromise
  const db = client.db('survey-db')

  try {
    const surveyTemplate = await db.collection('survey-templates').findOne({ uuid: id })
    const questions = surveyTemplate!.questions.map((o: any) => o.question)
    const responses = (await db.collection(id!).find({}).toArray()).map((o) => o.answers)
    return NextResponse.json({ questions: questions, responses: responses })
  } catch {
    return NextResponse.error()
  }
}
