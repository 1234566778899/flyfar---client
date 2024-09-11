import React, { useContext, useEffect, useState } from 'react'
import '../styles/Room.css'
import { useNavigate } from 'react-router-dom'
import { ListFrientInviteApp } from './ListFrientInviteApp';
import { MainContext } from '../contexts/MainContextApp';
import { dark } from '@mui/material/styles/createPalette';
import { showInfoToast } from '../utils/showInfoToast';
import { ChatApp } from './ChatApp';
import { TabSettingsApp } from './TabSettingsApp';
export const RoomApp = () => {
    const navigate = useNavigate();
    const { socket, owner, setCodeRoom, friendsActive, codeRoom } = useContext(MainContext);
    const [tabFriends, setTabFriends] = useState(false);
    const [tabSettings, settabSettings] = useState(false);
    const closeTabSettings = () => settabSettings(false);
    const closeTabFriends = () => setTabFriends(false);

    const outRoom = () => {
        socket.emit('out_room');
        navigate('/admin/dashboard');
        setCodeRoom('')
    }
    useEffect(() => {
        socket.on('in_room', data => {
            console.log('data');
            showInfoToast('Usuario en sala');
        })
        return () => {
            socket.off('in_room');
        }
    }, [])
    return owner && (
        <div className='content-room'>
            <div className='container' style={{ display: 'grid', fontSize: '0.9rem', gridTemplateColumns: '70% 30%' }}>
                <div className='pe-3 mt-4'>
                    <div className='card-joins'>
                        <h5 className='fw-bold text-white' style={{ letterSpacing: '1px' }}>PARTICIPANTES</h5>
                        <div style={{ display: 'flex', gap: '20px', marginTop: '20px', alignItems: 'center' }}>
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
                        <div style={{ display: 'flex', color: '#A6AEA3', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: '#A19C99' }} className='fw-bold'>AJUSTES DEL DESAFIO</span>
                            <div className='d-flex align-items-center'>
                                <button
                                    onClick={() => settabSettings(true)}
                                    className='btn-edit'>
                                    EDITAR
                                    <i className="fa-solid fa-gear ms-3"></i></button>
                            </div>
                        </div>
                        <hr style={{ color: 'white', marginTop: '5px' }} />
                        <div>
                            <div>
                                <span className='label-title' style={{ color: '#A19C99' }}>LENGUAJE DE PROGRAMACIÓN:</span>
                                <span className='ms-3' style={{ color: 'white' }}>C++</span>
                            </div>
                            <div className='mt-1'>
                                <span className='label-title' style={{ color: '#A19C99' }}>TIEMPO:</span>
                                <span className='ms-3' style={{ color: 'white' }}>1 HORA</span>
                            </div>
                            <div className='mt-1'>
                                <span className='label-title' style={{ color: '#A19C99' }}>N° DE EJERCICIOS:</span>
                                <span className='ms-3' style={{ color: 'white' }}>5</span>
                            </div>
                            <div className='mt-1'>
                                <span className='label-title' style={{ color: '#A19C99' }}>NIVEL:</span>
                                <span className='ms-3' style={{ color: 'white' }}>INTERMEDIO</span>
                            </div>
                            <div className='mt-1'>
                                <span className='label-title' style={{ color: '#A19C99' }}>TEMA:</span>
                                <span className='ms-3' style={{ color: 'white' }}>VECTORES Y MATRICES</span>
                            </div>
                            <div className='mt-1'>
                                <span className='label-title' style={{ color: '#A19C99' }}>APUESTA:</span>
                                <span className='ms-3' style={{ color: 'white' }}>100 MONEDAS</span>
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
                        <button className='btn-get py-3 mt-1' style={{ letterSpacing: '1px' }} onClick={() => navigate('/admin/game')}>Iniciar partida</button>
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
