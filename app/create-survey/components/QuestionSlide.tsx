"use client";

import "./style.css";

import { useSnapshot } from "valtio";
import { store } from "../store";
import Rating10 from "./Rating10";
import SingleChoice from "./SingleChoice";
import MultiChoice from "./MultiChoice";
import FiveStarRating from "./FiveStartRating";
import FeedbackEmoji from "./Emojis";
import { QuestionType } from "@/app/models/types";

const QuestionsSlide = () => {
    const snapshot = useSnapshot(store);

    const handleQuestionTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value === QuestionType.SINGLECHOICE || event.target.value === QuestionType.MULTICHOICE) {
            store.questions[store.questionNumber].choices = ["choice 1", "choice 2"];
        } else {
            store.questions[store.questionNumber].choices = undefined;
        }

        store.questions[store.questionNumber].type = event.target.value as QuestionType;
    }

    const handleQuestionTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        store.questions[store.questionNumber].question = event.target.value;
    }

    const setChoices = (choices: string[]) => {
        store.questions[store.questionNumber].choices = choices;
    }

    return <section className="w-1/2 h-2/3 flex flex-col space-y-5 justify-between">

        <section className="flex flex-col gap-y-6">
            <span className="flex">
                <h1 className="text-5xl flex items-end">{store.questionNumber + 1}.</h1>
                <input value={store.questions[store.questionNumber].question} onChange={handleQuestionTextChange} className="text-input text-3xl" type="text" name="question" id="question" placeholder="How would you rate this survey from 1 to 10?" autoFocus autoComplete="off" />
            </span>

            {store.questions[store.questionNumber].type === QuestionType.RATE_10 && <Rating10 />}
            {store.questions[store.questionNumber].type === QuestionType.SINGLECHOICE && <SingleChoice choices={store.questions[store.questionNumber].choices!} setChoices={setChoices} />}
            {store.questions[store.questionNumber].type === QuestionType.MULTICHOICE && <MultiChoice choices={store.questions[store.questionNumber].choices!} setChoices={setChoices} />}
            {store.questions[store.questionNumber].type === QuestionType.STAR_5 && <FiveStarRating />}
            {store.questions[store.questionNumber].type === QuestionType.EMOJIS && <FeedbackEmoji />}
            {store.questions[store.questionNumber].type === QuestionType.NUMBER && <input type="number" className="user-input" name="number" id="number" />}
            {store.questions[store.questionNumber].type === QuestionType.TEXT && <input type="text" className="user-input" name="text" id="text" />}
        </section>

        <select id="question-types" value={store.questions[store.questionNumber].type} onChange={handleQuestionTypeChange} className="text-xl bg-gray-50 border border-gray-300 text-gray-900 cursor-pointer rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option disabled value="">Choose a question type</option>
            <option value={QuestionType.RATE_10}>Rate from 1 to 10</option>
            <option value={QuestionType.SINGLECHOICE}>Single Choice</option>
            <option value={QuestionType.MULTICHOICE}>Multi Choice</option>
            <option value={QuestionType.STAR_5}>Five ⭐</option>
            <option value={QuestionType.EMOJIS}>Emojis</option>
            <option value={QuestionType.NUMBER}>Number</option>
            <option value={QuestionType.TEXT}>Text</option>
        </select>
    </section>;
};

export default QuestionsSlide;