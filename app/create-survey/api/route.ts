import clientPromise from '@/app/mongodb'
import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { createHash, getClientIP } from '@/app/utils'

export async function POST(request: Request) {
  const ip = getClientIP(request)
  const hash = createHash(ip!)

  const client = await clientPromise
  const db = client.db('survey-db')
  const creatorHistory = await db.collection('creator-ip-hash').findOne({ ipHash: hash })

  const uuid = uuidv4()

  if (creatorHistory === null) {
    await db.collection('creator-ip-hash').insertOne({ ipHash: hash, count: 1 })
  } else {
    const prevCount = creatorHistory.count

    if (prevCount >= 3) {
      return NextResponse.json({ error: 'API Limit is reached' }, { status: 429 })
    }

    await db.collection('creator-ip-hash').updateOne({ ipHash: hash }, { $set: { count: prevCount + 1 } })
  }

  const survey = await request.json()
  survey.creatorIpHash = hash
  survey.uuid = uuid
  await db.collection('survey-templates').insertOne(survey)

  return NextResponse.json({ 'survey-id': uuid }, { status: 201 })
}
