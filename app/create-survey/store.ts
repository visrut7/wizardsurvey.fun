import { proxy } from "valtio";

export enum QuestionType {
    MULTICHOICE = "multichoice",
    SINGLECHOICE = "singlechoice",
    TEXT = "text",
    NUMBER = "number",
    DATE = "date",
    RATE_10 = "rate-10",
    STAR_5 = "star-5",
    EMOJIS = "emojis",
    NOT_DECIDED = "",
}

export type Question = {
    question: string;
    type: QuestionType;
    choices?: string[];
};


type Store = {
    surveyName: string;
    questionNumber: number;
    questions: Question[];
}

export const store = proxy<Store>({
    surveyName: "General Survey",
    questionNumber: 0,
    questions: [{ question: "", type: QuestionType.NOT_DECIDED }],
});