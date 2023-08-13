"use client";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useSnapshot } from "valtio";
import { store } from "./store";
import AnswerForm from "./components/AnswerForm";

export default function FillSurvey() {
    const snapshot = useSnapshot(store);

    const { id } = useParams();

    const getSurvey = async () => {
        const res = await fetch(`/survey/${id}/api`);
        const data = await res.json();
        store.surveyName = data.surveyName;
        store.questionNumber = 0;
        store.questions = [...data.questions];
    }

    useEffect(() => {
        getSurvey();
    }, []);

    if (store.questions.length === 0) return (<div>Loading...</div>);

    return (
        <main className="flex flex-col h-screen">
            <nav className="flex justify-center p-3">
                <h1 className="text-2xl">{store.surveyName}</h1>
            </nav>
            <section className="flex flex-col justify-between items-center h-full">
                <AnswerForm />
            </section>
        </main>
    )
}