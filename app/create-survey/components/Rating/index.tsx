import React, { useState, useEffect } from 'react';
import "./style.css";

type RatingProps = {
    limit: number;
}

export const Rating = ({ limit }: RatingProps) => {
    const [selectedRating, setSelectedRating] = useState("0");

    const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRating = event.target.value;
        setSelectedRating(newRating);
    };

    return <div className="rating-scale-container">
        {Array.from({ length: limit }, (_, i) => i + 1).map(ratingValue => (
            <div key={ratingValue} className="rating-option">
                <input
                    type="radio"
                    name={`rating`}
                    id={`rating-${ratingValue}`}
                    value={ratingValue.toString()}
                    checked={selectedRating === ratingValue.toString()}
                    onChange={handleRatingChange}
                />
                <label htmlFor={`rating-${ratingValue}`}>
                    {ratingValue}
                </label>
            </div>
        ))}
    </div>
}

export default Rating;