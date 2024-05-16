import React, { useState, useEffect } from 'react';
import './PlaceOrder.css';

function PlaceOrder() {
  const [countdown, setCountdown] = useState(60 * 60 * 24 * 30); 
  const [countdownDate, setCountdownDate] = useState(new Date().getTime() + countdown * 1000);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
      setCountdownDate((prevCountdownDate) => prevCountdownDate - 1000);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatCountdownTime = () => {
    const days = Math.floor(countdown / (60 * 60 * 24));
    const hours = Math.floor((countdown % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((countdown % (60 * 60)) / 60);
    const seconds = countdown % 60;

    return `${days} day${days !== 1 ? 's' : ''} ${hours} hr${hours !== 1 ? 's' : ''} ${minutes} min${minutes !== 1 ? 's' : ''} ${seconds} sec${seconds !== 1 ? 's' : ''}`;
  };

  return (
    <div className="orderContainer">
      <div className="orderInput">
        <div className="kiteerText">I WILL ARRIVE SOON</div>
        <div className="countdown">
          {formatCountdownTime()}
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;