import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const CountTimerApp = ({ creationTime, minutes, challengeId }) => {
    const totalTimeMs = minutes * 60 * 1000;
    const navigate = useNavigate();
    const calculateTimeLeft = () => {
        const now = new Date();
        const creationDate = new Date(creationTime);
        const timeElapsed = now - creationDate;
        const timeLeftMs = totalTimeMs - timeElapsed;
        return timeLeftMs > 0 ? timeLeftMs : 0;
    };
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);
    useEffect(() => {
        if (timeLeft <= 0) {
            navigate(`/admin/resume/${challengeId}`)
            return;
        }
        const intervalId = setInterval(() => {
            setTimeLeft((prevTimeLeft) => prevTimeLeft - 1000);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft]);
    const formatTime = () => {
        const minutes = Math.floor(timeLeft / 1000 / 60);
        const seconds = Math.floor((timeLeft / 1000) % 60);
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };
    return (
        <span>Tiempo restante: {formatTime()}</span>
    );
}
