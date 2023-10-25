export enum QuestionType {
  MULTICHOICE = 'multichoice',
  SINGLECHOICE = 'singlechoice',
  TEXT = 'text',
  NUMBER = 'number',
  RATE_10 = 'rate-10',
  STAR_5 = 'star-5',
  EMOJIS = 'emojis',
  YES_OR_NO = 'yes-or-no',
  NOT_DECIDED = ''
}

export type Question = {
  question: string
  type: QuestionType
  choices?: string[]
}

export type Answer = string | number | string[]
