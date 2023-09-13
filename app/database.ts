import { Db } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'
import { createHash } from './utils'

export class SurveyDatabase {
  constructor(private readonly db: Db) {}

  public async createSurvey(ip: string, survey: any): Promise<string> {
    if (!(await this.isUserSurveyLimitReached(ip))) {
      const uuid = uuidv4()
      survey.creatorIpHash = createHash(ip)
      survey.uuid = uuid
      await this.db.collection('survey-templates').insertOne(survey)
      return uuid
    }
    throw new Error('API Limit is reached')
  }

  private async isUserSurveyLimitReached(ip: string) {
    const hash = createHash(ip)
    const creatorHistory = await this.db.collection('creator-ip-hash').findOne({ ipHash: hash })

    if (creatorHistory === null) {
      await this.db.collection('creator-ip-hash').insertOne({ ipHash: hash, count: 1 })
      return false
    }

    const prevCount = creatorHistory.count

    if (prevCount >= 3) {
      return true
    }

    await this.db.collection('creator-ip-hash').updateOne({ ipHash: hash }, { $set: { count: prevCount + 1 } })

    return false
  }
}
