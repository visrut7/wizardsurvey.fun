"use client";

import React from 'react';
import KikiAndJiji from '../icons/KikiAndJiji';

import "./Spinner.css";

export default function Spinner() {
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="spinner">
                <div className="border"></div>
                <div className="border"></div>
                <div className="border"></div>
                <div className="border"></div>
            </div>
            <div className="image-container"> {/* Create a container for the image */}
                <KikiAndJiji width="200" height="200" color="white" />
            </div>
        </div>
    );
};