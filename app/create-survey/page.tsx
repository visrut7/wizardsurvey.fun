"use client";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import QuestionsSlide from "./components/QuestionSlide";
import { QuestionType, store } from "./store";

export default function Page() {

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

    return (<main className="flex flex-col h-screen">
        <nav className="flex justify-center p-3">
            <h1 className="text-2xl">{store.surveyName}</h1>
        </nav>
        <section className="flex justify-between items-center h-full">
            <button className="text-6xl w-1/12 flex justify-center" onClick={goLeft}><BsChevronCompactLeft /></button>
            <QuestionsSlide />
            <button className="text-6xl w-1/12 flex justify-center" onClick={goRight}><BsChevronCompactRight /></button>
        </section>
    </main>);
}