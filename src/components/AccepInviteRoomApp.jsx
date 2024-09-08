import React, { useContext } from 'react'
import { MainContext } from '../contexts/MainContextApp';
import { useNavigate } from 'react-router-dom';

export const AccepInviteRoomApp = ({ close, code }) => {
    const { socket, owner } = useContext(MainContext);
    const navigate = useNavigate();
    const acceptinvitation = () => {
        socket.emit('accept_invitation', { code, id: owner._id });
        navigate('/admin/room');
    }
    return (
        <div className='tab-req'>
            <div style={{ width: '400px' }}>
                <h4>Unirse a una sala: {code}</h4>
                <p>Acepta para unirse a una sala y empezar una competencia de programación</p>
                <div className='d-flex'>
                    <button className='btn btn-danger w-100 me-2' onClick={() => close()}>Cancelar</button>
                    <button className='btn btn-dark w-100 ms-2' onClick={() => acceptinvitation()}>Aceptar</button>
                </div>
            </div>
        </div>
    )
}
