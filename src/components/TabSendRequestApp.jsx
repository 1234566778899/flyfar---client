import axios from 'axios'
import React, { useState } from 'react'
import { CONFIG } from '../config'
import { useForm } from 'react-hook-form'
import { showInfoToast } from './../utils/showInfoToast';

export const TabSendRequestApp = ({ close, user, socket, owner }) => {
    const { register, handleSubmit } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const sendRequest = (data) => {
        if (!isLoading) {
            setIsLoading(true);
            if (data.email == user.email) {
                setIsLoading(false);
                return showInfoToast('Email inválido');
            }
            axios.post(`${CONFIG.uri}/friends/send_request`, { user: user.email, friend: data.email })
                .then(res => {
                    socket.emit('request_friend', { from: owner, to: data.email });
                    close()
                })
                .catch(error => {
                    setIsLoading(false);
                    console.log(error);
                    if (error.response) {
                        showInfoToast(error.response.data.error);
                    }
                })
        }
    }
    return (
        <div className='tab-req' >
            <div style={{ width: '350px' }}>
                <form onSubmit={handleSubmit(sendRequest)}>
                    <h3 className='text-center'>Agregar un amigo</h3>
                    <p style={{ color: '#555' }} className='mt-2'>Ingresa el correo electrónico para solicitar ser amigos</p>
                    <input type="text" {...register('email', { required: true })} className='form-control' placeholder='Correo eletrónico aqui' />
                    <div className="d-flex mt-2">
                        <button type='button' className='btn btn-outline-secondary w-100 me-2' onClick={() => close()}>Cancelar</button>
                        <button type="submit" className="btn-main w-100">
                            {isLoading ? (<i className="fa-solid fa-spinner icon-load"></i>) : 'Enviar solicitud'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
