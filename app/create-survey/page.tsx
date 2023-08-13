"use client";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import QuestionsSlide from "./components/QuestionSlide";
import { store } from "./store";

import "./style.css";
import { useSnapshot } from "valtio";
import { QuestionType } from "../models/types";

export default function Page() {
    const snapshot = useSnapshot(store);

    const goLeft = () => {
        if (store.questionNumber > 0) {
            store.questionNumber--;
        }
    };

    const currentQuestionIsNotDecided = (question: { question: string; type: QuestionType; }) => {
        return question.question === "" || question.type === QuestionType.NOT_DECIDED;
    }

    const goRight = () => {
        if (currentQuestionIsNotDecided(store.questions[store.questionNumber])) {
            return;
        }

        if (store.questionNumber === store.questions.length - 1) {
            store.questions.push({ question: "", type: QuestionType.NOT_DECIDED });
        }
        store.questionNumber++;
    };

    const submitSurvey = async () => {
        if (currentQuestionIsNotDecided(store.questions[store.questionNumber])) {
            return;
        }

        store.questions = store.questions.filter(question => !currentQuestionIsNotDecided(question));

        const res = await fetch("create-survey/api", {
            method: "POST", body: JSON.stringify({
                surveyName: store.surveyName,
                questions: [...store.questions]
            })
        });
        const data = await res.json();
        console.log(data);
    };

    const editSurveyName = (event: React.ChangeEvent<HTMLInputElement>) => {
        store.surveyName = event.target.value;
    };

    return (<main className="flex flex-col h-screen">
        <nav className="flex justify-center p-3">
            <input type="text" className="text-2xl bg-transparent outline-none" value={store.surveyName} onChange={editSurveyName} />
        </nav>
        <section className="flex justify-between items-center h-full">
            <button className={`text-6xl w-1/12 flex justify-center ${store.questionNumber === 0 && "btn-hide"}`} onClick={goLeft}><BsChevronCompactLeft /></button>
            <QuestionsSlide />
            <button className="text-6xl w-1/12 flex justify-center" onClick={goRight}><BsChevronCompactRight /></button>
        </section>
        <footer className="flex justify-end p-4">
            <button className="btn-primary" onClick={submitSurvey}>Finish</button>
        </footer>
    </main>);
}