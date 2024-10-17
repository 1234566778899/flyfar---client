import React, { useContext, useState, useEffect } from 'react';
import '../styles/Dashboard.css';
import axios from 'axios';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContextApp';
import { showInfoToast } from '../utils/showInfoToast';
import { AccepInviteRoomApp } from './tabs/AccepInviteRoomApp';
import { TabConfirmSendApp } from './tabs/TabConfirmSendApp';
import { MainContext } from '../contexts/MainContextApp';
import { CONFIG } from '../config';
import { CountTimerApp } from './game/CountTimerApp';
import { TabNotificationApp } from './tabs/TabNotificationApp';
import { MenuApp } from './MenuApp';
import { ConfirmApp } from './tabs/ConfirmApp';

export const AdminApp = () => {
    const { user } = useContext(AuthContext);
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();
    const { challenge, setCodeRoom, setChallenge, owner, socket, getFriends, codeRoom } = useContext(MainContext);
    const [tabInvitation, setTabInvitation] = useState(false);
    const closeInvitation = () => setTabInvitation(false);
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
        if (challenge) {
            socket.on('finished', () => {
                navigate(`/admin/resume/${challenge._id}`)
            })
        }
        return () => {
            socket.off('finished');
        }
    }, [challenge])
    useEffect(() => {
        if (owner) {
            getNotifications();
            socket.on('invite_room', data => {
                setCodeRoom(data);
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
        socket.emit('out_room');
        navigate('/admin/dashboard')
    }
    if (!owner) {
        return (
            <div className='loading'>
                <i className="fa-solid fa-spinner icon-load me-2"></i>
                Loading</div>
        )
    }
    return user && owner && (
        <>
            <div>
                <div className='inter'>
                    <nav style={{ background: '#0E141E', color: 'white', paddingBottom: '10px' }}>
                        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px' }}>
                            {
                                challenge && (
                                    <div>
                                        <button className='btn-t' onClick={() => setTabConfirm(true)}>
                                            <i className="fa-solid fa-right-from-bracket"></i>
                                            <span className='ms-2'>Salir</span>
                                        </button>
                                        <span className='ms-3' >
                                            <CountTimerApp challengeId={challenge._id} creationTime={challenge.updatedAt} minutes={challenge.time} />
                                        </span>
                                    </div>
                                )
                            }
                            {
                                !challenge && (
                                    <div style={{ display: 'flex' }}>
                                        <span onClick={() => navigate('/home')}>
                                            <img style={{ width: '30px' }} src={require('../assets/logo.png')} alt="logo" />
                                        </span>
                                        <ul className='menu' style={{ fontSize: '0.95rem' }}>
                                            <li onClick={() => navigate('/admin/dashboard')}>Dashboard</li>
                                            <li onClick={() => navigate('/admin/tasks')}>Desafios Individuales</li>
                                            <li onClick={() => navigate('/admin/ranking')}>Clasificación</li>
                                            <li onClick={() => navigate('/admin/history')}>Historial</li>
                                        </ul>
                                    </div>

                                )
                            }
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div>
                                    <div className='btn-noti' onClick={() => settabNotification(true)}>
                                        {
                                            notifications.filter(x => !x.seen).length > 0 && (
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
                                <img
                                    className='profile-img' src={owner.photo || 'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg'} alt="img" />
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
            {
                tabInvitation && <AccepInviteRoomApp code={codeRoom} close={closeInvitation} />
            }
        </>
    );
};
