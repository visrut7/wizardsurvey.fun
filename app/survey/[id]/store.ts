import { Answer, Question, QuestionType } from "@/app/models/types";
import { proxy } from "valtio";

type Store = {
    surveyName: string;
    questionNumber: number;
    questions: Question[];
    answers: Answer[];
}

export const store = proxy<Store>({
    surveyName: "General Survey",
    questionNumber: 0,
    questions: [],
    answers: [],
});