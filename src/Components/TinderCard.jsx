// src/BusinessCard.jsx
import React, { useState } from 'react';
import "./TinderCard.css";
import logo from '../assets/logo.png';
import biz1 from '../assets/biz1.png';
import biz2 from '../assets/biz2.png';
import biz3 from '../assets/biz3.png';
import biz4 from '../assets/biz4.png';
import biz5 from '../assets/biz5.png';
import biz6 from '../assets/biz6.png';
import biz7 from '../assets/biz7.png';

const businesses = [biz1, biz2, biz3, biz4, biz5, biz6, biz7];

const TinderCard = ({ business, onSwipe }) => {

    const [index, setIndex] = useState(0);
    const [swipeDirection, setSwipeDirection] = useState(null);

    const handleSwipe = (direction) => {
        setSwipeDirection(direction);

        setTimeout(() => {
            setSwipeDirection(null); // Reset animation
            setIndex((prev) => (prev + 1) % businesses.length); // Cycle to next business
        }, 500); // Match with CSS transition duration
    };

  return (
    <div className = 'tindercard'>
        <img src={logo} alt="" />
        <div className="card-body">
            {index < businesses.length && (
                <img 
                    src={businesses[index]} 
                    alt={`Business ${index + 1}`} 
                    className={`business-image ${swipeDirection}`} 
                />
            )}
            <div className='action'>
                <div className="skip-button" onClick={() => handleSwipe('left')}>
                    Skip
                </div>
                <div className="like-button" onClick={() => handleSwipe('right')}>
                    Like
                </div>
            </div>
        </div>
    </div>
  )
}


export default TinderCard
