import React, { useContext, useEffect, useState } from 'react'
import '../styles/Room.css'
import { useNavigate } from 'react-router-dom'
import { ListFrientInviteApp } from './ListFrientInviteApp';
import { MainContext } from '../contexts/MainContextApp';
import { showInfoToast } from '../utils/showInfoToast';
import { ChatApp } from './ChatApp';
import { TabSettingsApp } from './TabSettingsApp';
import axios from 'axios';
import { CONFIG } from '../config';
export const RoomApp = () => {
    const navigate = useNavigate();
    const { socket, owner, setCodeRoom, friendsActive, codeRoom, setChallenge } = useContext(MainContext);
    const [tabFriends, setTabFriends] = useState(false);
    const [tabSettings, settabSettings] = useState(false);
    const closeTabSettings = () => settabSettings(false);
    const closeTabFriends = () => setTabFriends(false);
    const [isLoading, setIsLoading] = useState(false);
    const { settings } = useContext(MainContext);
    const outRoom = () => {
        socket.emit('out_room');
        navigate('/admin/dashboard');
        setCodeRoom('')
    }
    const createChallenge = () => {
        if (!isLoading) {
            setIsLoading(true);
            if (!settings) {
                setIsLoading(false);
                return showInfoToast('Debe configurar el desafio');
            }
            axios.post(`${CONFIG.uri}/challenge/generate`, { ...settings, users: friendsActive })
                .then(res => {
                    setIsLoading(false);
                    socket.emit('create-challenge', res.data._id)
                })
                .catch(error => {
                    console.log(error);
                    setIsLoading(false);
                    showInfoToast('Error');
                })
        }
    }

    useEffect(() => {
        socket.on('in_room', () => {
            showInfoToast('Usuario en sala');
        });
        socket.on('start-challenge', id => {
            navigate(`/admin/challenges/${id}`);
        })
        return () => {
            socket.off('in_room');
            socket.off('start-challenge');
        }
    }, [])

    if (friendsActive.length <= 0) {
        navigate('/admin/dashboard');
        return;
    }

    return owner && (
        <div className='content-room inter'>
            <div className='container' style={{ display: 'grid', fontSize: '0.9rem', gridTemplateColumns: '70% 30%' }}>
                <div className='pe-3 mt-4'>
                    <div className='card-joins'>
                        <h5 className='fw-bold'>PARTICIPANTES</h5>
                        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px', alignItems: 'center' }}>
                            {
                                friendsActive.map((x, idx) => (
                                    <div key={idx} className="avatar">
                                        <span >{x.username}</span>
                                    </div>
                                ))
                            }
                            <div className='btn-add' onClick={() => setTabFriends(true)}>
                                <span>+</span>
                            </div>
                        </div>
                    </div>
                    <div className='card-setting mt-3' >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h5 className='fw-bold'>AJUSTES DEL DESAFIO</h5>
                            <div className='d-flex align-items-center'>
                                <button
                                    onClick={() => settabSettings(true)}
                                    className='btn-edit'>
                                    EDITAR
                                    <i className="fa-solid fa-gear ms-3"></i></button>
                            </div>
                        </div>
                        <hr style={{ marginTop: '5px' }} />
                        <div>
                            <div>
                                <span className='fw-bold'>LENGUAJE DE PROGRAMACIÓN:</span>
                                <span className='ms-3' >{settings ? settings.lenguaje : '-'}</span>
                            </div>
                            <div className='mt-1'>
                                <span className='fw-bold'>TIEMPO:</span>
                                <span className='ms-3' >{settings ? settings.time : '-'}</span>
                            </div>
                            <div className='mt-1'>
                                <span className='fw-bold'>N° DE EJERCICIOS:</span>
                                <span className='ms-3' >{settings ? settings.count : '-'}</span>
                            </div>
                            <div className='mt-1'>
                                <span className='fw-bold'>NIVEL:</span>
                                <span className='ms-3' >{settings ? settings.level : '-'}</span>
                            </div>
                            <div className='mt-1'>
                                <span className='fw-bold'>TEMA:</span>
                                <span className='ms-3' >{settings ? settings.topic : '-'}</span>
                            </div>
                            <div className='mt-1'>
                                <span className='fw-bold'>APUESTA:</span>
                                <span className='ms-3'>{settings ? settings.bet : '-'}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-4'>
                    <ChatApp socket={socket} owner={owner} codeRoom={codeRoom} />
                    <div className="mt-1">
                        <button className='btn-out mt-1' style={{ letterSpacing: '1px' }} onClick={() => outRoom()}>Abandonar sala
                            <i className="fa-solid fa-xmark ms-2"></i>
                        </button>
                        <button className='btn-main w-100 py-3 mt-1' style={{ letterSpacing: '1px' }} onClick={() => createChallenge()}>{isLoading ? (<i className="fa-solid fa-spinner icon-load"></i>) : 'Iniciar partida'}
                        </button>
                    </div>

                </div>

            </div>
            {
                tabFriends && (<ListFrientInviteApp close={closeTabFriends} socket={socket} />)
            }
            {
                tabSettings && (<TabSettingsApp close={closeTabSettings} />)
            }
        </div>
    )
}
