import React from "react";
import "./style.css";

type YesOrNoProps = {
    choices: string[];
};

const YesOrNo = ({ choices }: YesOrNoProps) => {
    const handleChoiceChange = (index: number, newValue: string) => {
        const updatedChoices = [...choices];
        updatedChoices[index] = newValue;
    };

    return (
        <div className="single-choice-container">
            {choices.map((choice, idx) => (
                <div key={idx} className="flex justify-between">
                    <label className="flex items-center gap-x-2 capitalize">
                        <input
                            type="radio"
                            value={choice}
                            name="choice"
                            id={`${choice}-${idx}`}
                            className="radio-input"
                        />
                        <span>{choice}</span>
                    </label>
                </div>
            ))}
        </div>
    );
};

export default YesOrNo;
