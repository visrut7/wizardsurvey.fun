import React, { useState } from "react";
import "./style.css";
import { IoRemoveCircleSharp } from "react-icons/io5";

type MultiChoiceProps = {
    choices: string[];
    setChoices: (choices: string[]) => void;
};

const MultiChoice = ({ choices, setChoices }: MultiChoiceProps) => {
    const [checkboxStates, setCheckboxStates] = useState<boolean[]>(choices.map(() => false));

    const handleChoiceChange = (index: number, newValue: string) => {
        const updatedChoices = [...choices];
        updatedChoices[index] = newValue;
        setChoices(updatedChoices);
    };

    const handleAddChoice = () => {
        if (choices.length < 6) {
            const updatedChoices = [...choices, 'New Choice'];
            setChoices(updatedChoices);
            setCheckboxStates([...checkboxStates, false]);
        }
    };

    const handleRemoveChoice = (index: number) => {
        if (choices.length > 2) {
            const updatedChoices = choices.filter((_, i) => i !== index);
            setChoices(updatedChoices);
            const updatedCheckboxStates = checkboxStates.filter((_, i) => i !== index);
            setCheckboxStates(updatedCheckboxStates);
        }
    };

    const handleCheckboxChange = (index: number) => {
        const updatedCheckboxStates = [...checkboxStates];
        updatedCheckboxStates[index] = !updatedCheckboxStates[index];
        setCheckboxStates(updatedCheckboxStates);
    };

    return (
        <div className="multi-choice-container">
            {choices.map((choice, idx) => (
                <div key={idx} className="flex justify-between">
                    <label className="flex gap-x-3">
                        <input
                            type="checkbox"
                            checked={checkboxStates[idx]}
                            onChange={() => handleCheckboxChange(idx)}
                            className="checkbox-input"
                        />
                        <input
                            type="text"
                            value={choice}
                            onChange={(e) => handleChoiceChange(idx, e.target.value)}
                            className="bg-transparent outline-none"
                        />
                    </label>
                    {choices.length > 2 && (
                        <button
                            type="button"
                            onClick={() => handleRemoveChoice(idx)}
                            className="button"
                        >
                            <IoRemoveCircleSharp className="text-red-500 text-2xl" />
                        </button>
                    )}
                </div>
            ))}
            {choices.length < 6 && (
                <button
                    type="button"
                    onClick={handleAddChoice}
                    className="add-button"
                >
                    Add Choice
                </button>
            )}
        </div>
    );
};

export default MultiChoice;
