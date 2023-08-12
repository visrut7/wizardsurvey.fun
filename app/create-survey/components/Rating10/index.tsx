import React, { useState } from 'react';
import './style.css';

type Rating10Props = {};

export const Rating10: React.FC<Rating10Props> = () => {
    const [selectedRating, setSelectedRating] = useState<string | null>(null);

    const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRating = event.target.value;
        setSelectedRating(newRating);
    };

    return (
        <div className="rating-scale-container">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((ratingValue) => (
                <div key={ratingValue} className="flex flex-col items-center gap-y-3">
                    <input
                        type="radio"
                        name={`rating`}
                        id={`rating-${ratingValue}`}
                        value={ratingValue.toString()}
                        className="rating-input"
                        checked={selectedRating === ratingValue.toString()}
                        onChange={handleRatingChange}
                    />
                    <label htmlFor={`rating-${ratingValue}`} className="rating-circle">
                        {/* Empty circle */}
                    </label>
                    <span className="text-xl">{ratingValue}</span>
                </div>
            ))}
        </div>
    );
};

export default Rating10;
