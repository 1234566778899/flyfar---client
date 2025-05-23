import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { MainContext } from '../../contexts/MainContextApp';
import { CONFIG } from '../../config';
import { showInfoToast } from '../../utils/showInfoToast';

export const TabPersonalApp = ({ close }) => {
    const { register, handleSubmit } = useForm();
    const { owner, getUser } = useContext(MainContext);
    const [isLoading, setIsLoading] = useState(false);
    const update = (data) => {
        if (isLoading) return;
        if (data.birthdate) {
            const d = new Date(data.birthdate);
            if (d.getFullYear() > 2015) {
                showInfoToast('Fecha de nacimiento inválido');
                return;
            }
        }
        setIsLoading(true);
        axios.put(`${CONFIG.uri}/users/update/${owner._id}`, data)
            .then(x => {
                getUser();
                showInfoToast('Datos actualizados');
                close();
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                showInfoToast('Error');
            })
    }
    return (
        <div className='tab-profile inter'>
            <div style={{ width: '400px', fontSize: '0.95rem', position: 'relative' }}>
                <form onSubmit={handleSubmit(update)}>
                    <i onClick={() => close()}
                        style={{ position: 'absolute', right: 20, cursor: 'pointer' }} className="fa-solid fa-xmark"></i>
                    <h5 className='fw-bold'>Información personal</h5>
                    <div className='mt-3'>
                        <span>Correo electrónico</span>
                        <input defaultValue={owner.email} type="text" {...register('email', { required: true })} />
                    </div>
                    <div className='mt-2'>
                        <span>Pais</span>
                        <input type="text" defaultValue={owner.country}{...register('country', { required: true })} />
                    </div>
                    <div className='mt-2'>
                        <span>Número de teléfono</span>
                        <input defaultValue={owner.phone} type="text"{...register('phone', { required: true })} />
                    </div>
                    <div className='mt-2'>
                        <span>Fecha de nacimiento</span>
                        <input defaultValue={moment(owner.birthdate).format('YYYY-MM-DD')} type="date" {...register('birthdate', { required: true })} />
                    </div>
                    <div className='text-end mt-3'>
                        <button className='btn-view-challenges'>
                            {
                                isLoading ? (<span><i className="fa-solid fa-spinner icon-load me-2"></i>Guardar</span>) : (<span>Guardar</span>)
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
