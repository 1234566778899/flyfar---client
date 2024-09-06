import React from 'react'
import '../styles/Room.css'
import { useNavigate } from 'react-router-dom'
export const RoomApp = () => {
    const navigate = useNavigate();
    return (
        <div className='container mt-2' style={{ display: 'grid', fontSize: '0.9rem', gridTemplateColumns: '70% 30%' }}>
            <div className='pe-3'>
                <div className='room-item'>
                    <h3 className='fw-bold'>Participantes</h3>
                    <div style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div className="avatar">
                                <span className='fw-bold'>Carlos</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div className="avatar">
                                <span className='fw-bold'>Carlos</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div className="avatar">
                                <span className='fw-bold'>Carlos</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div className="avatar">
                                <span className='fw-bold'>Carlos</span>
                            </div>
                        </div>
                    </div>
                    <button className='btn-invite mt-4'><i class="fa-solid fa-user-plus me-2"></i>Invitar amigos</button>
                </div>
                <div className='room-item mt-3'>
                    <h3 className='fw-bold'>Descripción general del desafio</h3>
                </div>
            </div>
            <div>
                <div className="room-item">
                    <h3 className='fw-bold'>Chat</h3>
                    <div className='mt-3'>
                        <p><span className='fw-bold'>Alice: </span>Hey everone! Ready for the challengue</p>
                        <p><span className='fw-bold'>Bob: </span>Almost! Just need a few more minutes</p>
                        <p><span className='fw-bold'>Charly: </span>I'm all set! Can't wait to start</p>
                    </div>
                    <div className='inp-chat'>
                        <input type="text" />
                        <button><i class="fa-solid fa-paper-plane"></i></button>
                    </div>
                </div>
                <div className="room-item mt-3">
                    <button className='btn-status mt-3'>Estoy Listo</button>
                    <button className='btn-ready mt-3' onClick={() => navigate('/admin/game/123')}>Comenzar desafío</button>
                </div>
            </div>
        </div>
    )
}
