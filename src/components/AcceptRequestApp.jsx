import axios from 'axios'
import React from 'react'
import { CONFIG } from '../config'
import { showInfoToast } from '../utils/showInfoToast'

export const AcceptRequestApp = ({ friend, close, owner, socket, getFriends }) => {
    const changeStatus = (status) => {
        axios.post(`${CONFIG.uri}/friends/change_status`, { from: friend._id, to: owner._id, status })
            .then(res => {
                socket.emit('status_request', { status, from: friend._id, to: { id: owner._id, name: owner.username } })
                if (status == 'accepted') {
                    getFriends(owner._id)
                }
                close()
            })
            .catch(error => {
                console.log(error);
                showInfoToast('Error');
            })
    }
    return (
        <div className='tab-accept'>
            <div className='card-add'>
                <h5 className='text-white fw-bold'>Solicitud de Amistad</h5>
                <p style={{ color: 'white' }}>{friend.username} te ha enviado una solicitud de amigos</p>
                <div className='d-flex justify-content-center'>
                    <button style={{ fontSize: '0.8rem' }} className='btn-leave w-100 me-2' onClick={() => changeStatus('rejected')} >Rechazar</button>
                    <button style={{ fontSize: '0.8rem' }} className='w-100 ms-2' onClick={() => changeStatus('accepted')}>Aceptar</button>
                </div>
            </div>
        </div>
    )
}
