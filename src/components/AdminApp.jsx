import React, { useContext, useState, useEffect } from 'react';
import '../styles/Dashboard.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContextApp';
import { MenuApp } from './MenuApp';
import { MainContext } from '../contexts/MainContextApp';

export const AdminApp = () => {
    const { user } = useContext(AuthContext);
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();
    const { challenge } = useContext(MainContext);
    const [timeCap, setTimeCap] = useState(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isVisible && !event.target.closest('.menu-container') && !event.target.closest('.btn-profile')) {
                setIsVisible(false);
            }
        };
        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [isVisible]);
    if (!user) {
        navigate('/login')
    }
    const getTime = () => {

    }
    useEffect(() => {
        if (challenge) {
            setTimeCap(new Date());
        }

    }, [challenge]);
    return user && (
        <div>
            <nav style={{ background: '#171D25', color: 'white', paddingBottom: '10px' }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px' }}>
                    <div>
                        <span style={{ fontSize: '1.2rem' }}>{getTime()}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <i className="fa-regular fa-bell me-5" style={{ fontSize: '1.2rem' }}></i>
                        <img className='profile-img' src="https://i.pinimg.com/originals/c6/89/95/c68995aa24906a1320b4d7d10aa374b2.png" alt="img" />
                        <div>
                            <button
                                onClick={() => setIsVisible(!isVisible)}
                                className='btn-profile' style={{ color: 'white', fontSize: '0.9rem' }}>
                                <span style={{ color: 'white' }}>{user.email.split('@')[0]}</span>
                                <i className="fa-solid fa-chevron-down ms-2"></i>
                            </button>
                            {
                                isVisible && (
                                    <div className="menu-container">
                                        <MenuApp />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </nav>
            <Outlet />
        </div>
    );
};
