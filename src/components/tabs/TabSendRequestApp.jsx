import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { showInfoToast } from './../../utils/showInfoToast';
import { CONFIG } from '../../config';

export const TabSendRequestApp = ({ close, user, socket, owner }) => {
    const { register, handleSubmit } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const sendRequest = (data) => {
        if (!isLoading) {
            setIsLoading(true);
            if (data.email == user.email) {
                setIsLoading(false);
                return showInfoToast('No puede enviarse a si mismo');
            }
            axios.post(`${CONFIG.uri}/friends/send_request`, { userId: owner._id, friend: data.email })
                .then(res => {
                    showInfoToast('Solicitud enviada');
                    socket.emit('request_friend', { from: owner, to: data.email });
                    close()
                })
                .catch(error => {
                    setIsLoading(false);
                    if (error.response) {
                        showInfoToast(error.response.data.error);
                    }
                })
        }
    }
    return (
        <div className='tab-req' >
            <div className='card-add' style={{ width: '350px' }}>
                <form onSubmit={handleSubmit(sendRequest)}>
                    <h5 className='text-center text-light'>Añadir amigo</h5>
                    <input className='mt-2' type="text" {...register('email', { required: true })} placeholder='Correo eletrónico aqui' />
                    <div className="d-flex mt-3">
                        <button type="submit" className="me-2 btn-accept w-100">
                            {isLoading ? (<i className="fa-solid fa-spinner icon-load"></i>) : 'Aceptar'}
                        </button>
                        <button type='button' className='ms-2 btn-cancel w-100 ' onClick={() => close()}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
