import React, { useContext, useEffect, useState } from 'react'
import '../../styles/Room.css'
import { useNavigate } from 'react-router-dom'
import { MainContext } from '../../contexts/MainContextApp';
import { showInfoToast } from '../../utils/showInfoToast';
import { ChatApp } from './ChatApp';
import { TabSettingsApp } from '../tabs/TabSettingsApp';
import axios from 'axios';
import { CONFIG } from '../../config';
import { ListFrientInviteApp } from './../tabs/ListFrientInviteApp';
export const RoomApp = () => {
    const navigate = useNavigate();
    const { socket, owner, setCodeRoom, friendsActive, codeRoom, challenge } = useContext(MainContext);
    const [tabFriends, setTabFriends] = useState(false);
    const [tabSettings, settabSettings] = useState(false);
    const closeTabSettings = () => settabSettings(false);
    const closeTabFriends = () => setTabFriends(false);
    const [isLoading, setIsLoading] = useState(false);
    const { settings } = useContext(MainContext);
    const outRoom = () => {
        socket.emit('out_room');
        setCodeRoom(null);
        navigate('/admin/dashboard');
    }
    const createChallenge = () => {
        if (!isLoading) {
            setIsLoading(true);
            if (!settings) {
                setIsLoading(false);
                return showInfoToast('Debe configurar el desafio');
            }
            axios.post(`${CONFIG.uri}/challenge/generate`, { ...settings, users: friendsActive, code: codeRoom })
                .then(res => {
                    setIsLoading(false);
                    socket.emit('create-challenge', res.data._id)
                })
                .catch(error => {
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

    return owner && (
        <>
            <div className="container mt-5">
                {
                    !friendsActive && (<div>
                        <div className='message-empty'>
                            <span>No hay nadie en la sala</span>
                        </div>
                        <div className="text-center mt-3">
                            <button className='btn-view-challenges'
                                onClick={() => navigate('/admin/dashboard')} >Regresar al dashboard</button>
                        </div>
                    </div>)
                }
            </div>
            {
                friendsActive && (
                    <div className='content-room inter'>
                        <div className='container' style={{ display: 'grid', fontSize: '0.9rem', gridTemplateColumns: '70% 30%' }}>
                            <div className='pe-3 mt-4'>
                                <div className='card-joins'>
                                    <h5 className='fw-bold'>Participantes</h5>
                                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px', alignItems: 'center' }}>
                                        {
                                            friendsActive && friendsActive.map((x, idx) => (
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
                                        <h5 className='fw-bold'>Ajustes del desafio</h5>
                                        <div className='d-flex align-items-center'>
                                            <button
                                                onClick={() => settabSettings(true)}
                                                className='btn-edit'>
                                                Editar
                                                <i className="fa-solid fa-gear ms-3"></i></button>
                                        </div>
                                    </div>
                                    <hr style={{ marginTop: '5px' }} />
                                    <div>
                                        <div>
                                            <span className='fw-bold'>Lenguaje de programación:</span>
                                            <span className='ms-3' >{settings ? settings.lenguaje : '-'}</span>
                                        </div>
                                        <div className='mt-1'>
                                            <span className='fw-bold'>Tiempo (min):</span>
                                            <span className='ms-3' >{settings ? settings.time : '-'}</span>
                                        </div>
                                        <div className='mt-1'>
                                            <span className='fw-bold'>N° de ejercicios:</span>
                                            <span className='ms-3' >{settings ? settings.count : '-'}</span>
                                        </div>
                                        <div className='mt-1'>
                                            <span className='fw-bold'>Nivel de dificultad:</span>
                                            <span className='ms-3' >{settings ? settings.level : '-'}</span>
                                        </div>
                                        <div className='mt-1'>
                                            <span className='fw-bold'>Temas:</span>
                                            <span className='ms-3' >{settings ? settings.topics.join(', ') : '-'}</span>

                                        </div>
                                        <div className='mt-1'>
                                            <span className='fw-bold'>Apuesta:</span>
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
                                    {
                                        !challenge && (
                                            <button className='btn-main w-100 py-3 mt-1' style={{ letterSpacing: '1px' }} onClick={() => createChallenge()}>{isLoading ? (<i className="fa-solid fa-spinner icon-load"></i>) : 'Iniciar partida'}
                                            </button>
                                        )
                                    }
                                    {
                                        challenge && (
                                            <button className='btn-main w-100 py-3 mt-1' style={{ letterSpacing: '1px' }} onClick={() => navigate(`/admin/challenges/${challenge._id}`)}>Continuar partida
                                            </button>
                                        )
                                    }
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
        </>
    )
}
