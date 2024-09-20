import React, { useContext, useState, useEffect } from 'react';
import '../styles/Dashboard.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContextApp';
import { MenuApp } from './MenuApp';
import { MainContext } from '../contexts/MainContextApp';
import moment from 'moment';
import { AccepInviteRoomApp } from './AccepInviteRoomApp';

export const AdminApp = () => {
    const { user } = useContext(AuthContext);
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();
    const { challenge, setCodeRoom, setChallenge, settings, started, setStarted, owner, socket } = useContext(MainContext);
    const [timeCap, setTimeCap] = useState(null);
    const [seconds, setSeconds] = useState(null);
    const [tabInvitation, setTabInvitation] = useState(false);
    const closeInvitation = () => setTabInvitation(false);
    const [codeInvitation, setCodeInvitation] = useState('');

    useEffect(() => {
        if (owner) {
            socket.on('invite_room', data => {
                setCodeInvitation(data);
                setTabInvitation(true);
            })
        }
    }, [owner])
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
    const timer = () => {
        if (seconds) {
            const total = challenge.time * 60;
            return total - seconds;
        }
        return '';
    }
    // useEffect(() => {
    //     let interval;
    //     if (timeCap && seconds < settings.time * 60) {
    //         interval = setInterval(() => {
    //             setSeconds(moment().diff(moment(timeCap), 'seconds'));
    //             if (seconds >= settings.time * 60 - 1) {
    //                 navigate(`/admin/resume/${challenge._id}`)
    //                 clearInterval(interval);
    //             }
    //         }, 1000);
    //     }
    //     return () => {
    //         if (interval) {
    //             clearInterval(interval);
    //         }
    //     }
    // }, [timeCap, seconds]);
    useEffect(() => {
        if (challenge && !started) {
            setStarted(true);
            setTimeCap(new Date());
        }
    }, [challenge]);
    function secondsToMinutes(_seconds) {
        if (_seconds <= 0) return '';
        const minutes = Math.floor(_seconds / 60);
        const remainingSeconds = _seconds % 60;
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
    }
    if (!user) {
        navigate('/login')
        return;
    }
    const outGame = () => {
        setCodeRoom(null);
        setChallenge(null);
        navigate('/admin/dashboard')
    }
    return user && owner && (
        <div>
            <div className='inter'>
                <nav style={{ background: '#0E141E', color: 'white', paddingBottom: '10px' }}>
                    <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px' }}>
                        {
                            <div>
                                {
                                    challenge && (
                                        <div>
                                            <button className='btn-t' onClick={() => outGame()}>
                                                <i className="fa-solid fa-right-from-bracket"></i>
                                                <span className='ms-2'>Salir</span>
                                            </button>
                                            <span className='ms-3' style={{ fontSize: '1.2rem' }}>{secondsToMinutes(timer())}</span>
                                        </div>
                                    )
                                }
                                {
                                    !challenge && (
                                        <ul className='menu' style={{ fontSize: '0.95rem' }}>
                                            <li onClick={() => navigate('/admin/dashboard')}>Dashboard</li>
                                            <li>Comunidad</li>
                                            <li>Mi progreso</li>
                                            <li>Clasificación</li>
                                        </ul>
                                    )
                                }
                            </div>
                        }

                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <i className="fa-regular fa-bell me-5" style={{ fontSize: '1.2rem' }}></i>
                            <img className='profile-img' src={owner.photo || 'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg'} alt="img" />
                            <div>
                                <button
                                    onClick={() => setIsVisible(!isVisible)}
                                    className='btn-profile' style={{ color: 'white', fontSize: '0.9rem' }}>
                                    <span style={{ color: 'white' }}>{user.email.split('@')[0]}</span>
                                    <i className="fa-solid fa-chevron-down ms-2"></i>
                                </button>
                                {
                                    isVisible && (
                                        <div >
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
            {
                tabInvitation && (<AccepInviteRoomApp close={closeInvitation} code={codeInvitation} />)
            }
        </div>
    );
};
