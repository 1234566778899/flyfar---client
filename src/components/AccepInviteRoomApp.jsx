import React, { useContext } from 'react'
import { MainContext } from '../contexts/MainContextApp';
import { useNavigate } from 'react-router-dom';

export const AccepInviteRoomApp = ({ close, code }) => {
    const { socket, owner, setCodeRoom } = useContext(MainContext);
    const navigate = useNavigate();
    const acceptinvitation = () => {
        setCodeRoom(code)
        close();
        socket.emit('accept_invitation', { code, user: { id: owner._id, username: owner.username } });
        navigate('/admin/room');
    }
    return (
        <div className='tab-accept-room'>
            <div >
                <div className='info' style={{ textAlign: 'center', paddingTop: '10px', paddingBottom: '5px' }}>
                    <div style={{ color: '#ABABAB' }}>ID SALA : {code}</div>
                    <div style={{ color: 'white', fontSize: '1.2rem', letterSpacing: '1px', fontWeight: 'bold' }}>DESAFIO GRUPAL</div>
                </div>
                <div className='options'>
                    <button className='btn-accept' onClick={() => acceptinvitation()}>ACEPTAR</button>
                    <button className='btn-cancel' onClick={() => close()}>
                        <i className="fa-solid fa-xmark me-1"></i>
                        Rechazar partida</button>
                </div>
            </div>
        </div>
    )
}
