import React, { useState } from "react";
import "./style.css";

const FeedbackEmoji = () => {
    const emojis = ["😢", "😐", "😊"];
    const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);

    const handleEmojiClick = (emoji: string) => {
        setSelectedEmoji(emoji);
    };

    return (
        <div className="feedback-emoji">
            {emojis.map((emoji, index) => (
                <span
                    key={index}
                    className={`emoji ${selectedEmoji === emoji ? "selected" : ""}`}
                    onClick={() => handleEmojiClick(emoji)}
                >
                    {emoji}
                </span>
            ))}
        </div>
    );
};

export default FeedbackEmoji;
