import React, { useContext, useEffect, useState } from 'react'
import '../styles/Room.css'
import { useNavigate } from 'react-router-dom'
import { ListFrientInviteApp } from './ListFrientInviteApp';
import { MainContext } from '../contexts/MainContextApp';
import { dark } from '@mui/material/styles/createPalette';
import { showInfoToast } from '../utils/showInfoToast';
import { ChatApp } from './ChatApp';
export const RoomApp = () => {
    const navigate = useNavigate();
    const { socket, owner, setCodeRoom, friendsActive, codeRoom } = useContext(MainContext);
    const [tabFriends, setTabFriends] = useState(false);
    const closeTabFriends = () => setTabFriends(false);

    const outRoom = () => {
        socket.emit('out_room');
        navigate('/admin/dashboard');
        setCodeRoom('')
    }
    useEffect(() => {
        socket.on('in_room', data => {
            showInfoToast('Usuario en sala');
        })
        return () => {
            socket.off('in_room');
        }
    }, [])
    return owner && (
        <div className='content-room'>
            <div className='container' style={{ display: 'grid', fontSize: '0.9rem', gridTemplateColumns: '70% 30%' }}>
                <div className='pe-3 mt-5'>
                    <div className='room-item'>
                        <h3 className='fw-bold'>Participantes</h3>
                        <div style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
                            {
                                friendsActive.map((x, idx) => (
                                    <div key={idx} style={{ display: 'flex', flexDirection: 'column' }}>
                                        <div className="avatar">
                                            <span className='fw-bold'>Carlos</span>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <button className='btn-invite mt-4' onClick={() => setTabFriends(true)}><i className="fa-solid fa-user-plus me-2"></i>Invitar amigos</button>
                    </div>
                    <div className='card-setting mt-3' >
                        <div style={{ display: 'flex', color: '#A6AEA3', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className='fw-bold'>AJUSTES DEL DESAFIO</span>
                            <div className='d-flex align-items-center'>
                                <span className='me-2 fw-bold'>EDITAR</span>
                                <button style={{ border: 'none', fontSize: '1.2rem', background: 'none', color: 'white' }}><i className="fa-solid fa-gear"></i></button>
                            </div>
                        </div>
                        <hr style={{ color: 'white' }} />
                        <div>
                            <div>
                                <span style={{ color: '#6F7070', fontWeight: 'bold' }}>LENGUAJE DE PROGRAMACIÓN</span>
                                <span className='ms-3' style={{ color: 'white' }}>C++</span>
                            </div>
                            <div className='mt-1'>
                                <span style={{ color: '#6F7070', fontWeight: 'bold' }}>TIEMPO</span>
                                <span className='ms-3' style={{ color: 'white' }}>1 HORA</span>
                            </div>
                            <div className='mt-1'>
                                <span style={{ color: '#6F7070', fontWeight: 'bold' }}>N° DE EJERCICIOS</span>
                                <span className='ms-3' style={{ color: 'white' }}>5</span>
                            </div>
                            <div className='mt-1'>
                                <span style={{ color: '#6F7070', fontWeight: 'bold' }}>NIVEL</span>
                                <span className='ms-3' style={{ color: 'white' }}>INTERMEDIO</span>
                            </div>
                            <div className='mt-1'>
                                <span style={{ color: '#6F7070', fontWeight: 'bold' }}>TEMA</span>
                                <span className='ms-3' style={{ color: 'white' }}>VECTORES Y MATRICES</span>
                            </div>
                            <div className='mt-1'>
                                <span style={{ color: '#6F7070', fontWeight: 'bold' }}>APUESTA</span>
                                <span className='ms-3' style={{ color: 'white' }}>100 MONEDAS</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-5'>
                    <ChatApp socket={socket} owner={owner} codeRoom={codeRoom} />
                    <div className="mt-1">
                        <button className='btn-out mt-1' onClick={() => outRoom()}>ABANDONAR LA SALA
                            <i className="fa-solid fa-xmark ms-2"></i>
                        </button>
                        <button className='btn-ready mt-1' onClick={() => navigate('/admin/game/123')}>INICIAR PARTIDA</button>
                    </div>

                </div>

            </div>
            {
                tabFriends && (<ListFrientInviteApp close={closeTabFriends} socket={socket} />)
            }
        </div>
    )
}
