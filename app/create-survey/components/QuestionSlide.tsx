"use client";

import { QuestionType, store } from "../store";
import { useSnapshot } from "valtio";
import Rating10 from "./Rating";

const QuestionsSlide = () => {
    const snapshot = useSnapshot(store);

    const handleQuestionTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        store.questions[store.questionNumber].type = event.target.value as QuestionType;
    }

    const handleQuestionTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        store.questions[store.questionNumber].question = event.target.value;
    }

    return <section className="w-1/2 flex flex-col space-y-5">
        <input value={store.questions[store.questionNumber].question} onChange={handleQuestionTextChange} className="text-input text-xl" type="text" name="question" id="question" placeholder="How would you rate this survey from 1 to 10?" autoFocus />

        {store.questions[store.questionNumber].type === QuestionType.RATE_10 && <Rating10 limit={10} />}
        {store.questions[store.questionNumber].type === QuestionType.RATE_5 && <Rating10 limit={5} />}

        <select id="question-types" value={store.questions[store.questionNumber].type} onChange={handleQuestionTypeChange} className="text-xl bg-gray-50 border border-gray-300 text-gray-900 cursor-pointer rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option>Choose a question type</option>
            <option value={QuestionType.RATE_10}>Rate from 1 to 10</option>
            <option value={QuestionType.RATE_5}>Rate from 1 to 5</option>
        </select>
    </section>;
};

export default QuestionsSlide;