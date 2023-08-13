import { useSnapshot } from "valtio";
import { store } from "../store";
import { QuestionType } from "@/app/models/types";
import Rating10 from "@/app/create-survey/components/Rating10";

const AnswerForm = () => {
    const snapshot = useSnapshot(store);

    return <>
        <form className="h-full w-full flex flex-col justify-center gap-y-10 items-center">
            <h1 className="text-4xl">{store.questions[store.questionNumber].question}</h1>
            {store.questions[store.questionNumber].type === QuestionType.RATE_10 && <Rating10 />}
        </form>
        <span className="w-full h-52">
            {/* Progress bar */}
        </span>
    </>
}

export default AnswerForm;