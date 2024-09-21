import React, { useContext, useState, useEffect } from 'react';
import '../styles/Dashboard.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContextApp';
import { MenuApp } from './MenuApp';
import { MainContext } from '../contexts/MainContextApp';
import { TabNotificationApp } from './TabNotificationApp';
import { showInfoToast } from '../utils/showInfoToast';
import axios from 'axios';
import { CONFIG } from '../config';
import { CountTimerApp } from './CountTimerApp';
import { ConfirmApp } from './ConfirmApp';

export const AdminApp = () => {
    const { user } = useContext(AuthContext);
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();
    const { challenge, setCodeRoom, setChallenge, owner, socket, getFriends } = useContext(MainContext);
    const [seconds, setSeconds] = useState(null);
    const [tabInvitation, setTabInvitation] = useState(false);
    const closeInvitation = () => setTabInvitation(false);
    const [codeInvitation, setCodeInvitation] = useState('');
    const [tabNotification, settabNotification] = useState(false);
    const closeTabNotification = () => settabNotification(false);
    const [nameFriend, setNameFriend] = useState('')
    const [tabRequest, setTabRequest] = useState(false);
    const closeTabRequest = () => setTabRequest(false);
    const [tabConfirm, setTabConfirm] = useState(false);
    const closeTabConfirm = () => setTabConfirm(false);
    const [notifications, setNotifications] = useState([]);
    const getNotifications = () => {
        axios.get(`${CONFIG.uri}/notifications/retrieve/${owner._id}`)
            .then(res => {
                setNotifications(res.data);
            })
            .catch(error => {
                showInfoToast('Error');
            })
    }
    useEffect(() => {
        if (owner) {
            getNotifications();
            socket.on('invite_room', data => {
                setCodeInvitation(data);
                setTabInvitation(true);
            })
            socket.on('send_request', data => {
                if (data.to == user.email) {
                    setTabRequest(true);
                    setNameFriend(data.from);
                    getNotifications();
                }
            })
            socket.on('status_request', data => {
                if (data.from == owner._id) {
                    getNotifications();
                    showInfoToast(data.status == 'accepted' ? `${data.to.name} ha aceptado tu solicitud de amistad` : `${data.to.name} ha rechazado tu solicitud de amistad`);
                    if (data.status == 'accepted') {
                        getFriends(owner);
                    }
                }
            })
        }
        return () => {
            socket.off('invite_room');
            socket.off('send_request');
            socket.off('status_request');
        }
    }, [owner])
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isVisible && !event.target.closest('.menu-container') && !event.target.closest('.btn-profile')) {
                setIsVisible(false);
            }
            if (tabNotification && !event.target.closest('.tab-noti') && !event.target.closest('.btn-noti')) {
                settabNotification(false);
            }
        };
        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [isVisible, tabNotification]);

    if (!user) {
        navigate('/login')
        return;
    }
    const outGame = () => {
        setCodeRoom(null);
        setChallenge(null);
        closeTabConfirm();
        navigate('/admin/dashboard')
    }
    return user && owner && (
        <>
            <div>
                <div className='inter'>
                    <nav style={{ background: '#0E141E', color: 'white', paddingBottom: '10px' }}>
                        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px' }}>
                            {
                                <div>
                                    {
                                        challenge && (
                                            <div>
                                                <button className='btn-t' onClick={() => setTabConfirm(true)}>
                                                    <i className="fa-solid fa-right-from-bracket"></i>
                                                    <span className='ms-2'>Salir</span>
                                                </button>
                                                <span className='ms-3' >
                                                    <CountTimerApp challengeId={challenge._id} creationTime={challenge.createdAt} minutes={challenge.time} />
                                                </span>
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
                                <div>
                                    <div className='btn-noti' onClick={() => settabNotification(true)}>
                                        {
                                            notifications.length > 0 && (
                                                <div className='badget'>
                                                    <span>1</span>
                                                </div>
                                            )
                                        }
                                        <i className="fa-regular fa-bell me-5" style={{ fontSize: '1.2rem' }}></i>
                                    </div>
                                    {
                                        tabNotification && (<TabNotificationApp setNotifications={setNotifications} notifications={notifications} close={closeTabNotification} />)
                                    }
                                </div>
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
            </div>
            {
                tabConfirm && <ConfirmApp close={closeTabConfirm} fnAccept={outGame} />
            }
        </>
    );
};
