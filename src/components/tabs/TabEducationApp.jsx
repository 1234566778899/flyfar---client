import React, { useContext, useState } from 'react'
import { set, useForm } from 'react-hook-form';
import axios from 'axios';
import { CONFIG } from '../../config';
import { showInfoToast } from '../../utils/showInfoToast';
import { MainContext } from '../../contexts/MainContextApp';

export const TabEducationApp = ({ close }) => {
    const { register, handleSubmit } = useForm();
    const { owner, getUser } = useContext(MainContext);
    const [isLoading, setIsLoading] = useState(false);
    const update = (data) => {
        if (isLoading) return;
        setIsLoading(true);
        axios.put(`${CONFIG.uri}/users/update/${owner._id}`, data)
            .then(_ => {
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
            <div style={{ width: '600px', fontSize: '0.95rem', position: 'relative' }}>
                <form onSubmit={handleSubmit(update)}>
                    <i onClick={() => close()}
                        style={{ position: 'absolute', right: 20, cursor: 'pointer' }} className="fa-solid fa-xmark"></i>
                    <h5 className='fw-bold'>Agregar educación</h5>
                    <div className='mt-3'>
                        <span>Escuela/Universidad</span>
                        <input defaultValue={owner.university} type="text" {...register('university', { required: true })} placeholder='¿En que universidad estas estudiando?' />
                    </div>
                    <div className='mt-2'>
                        <span>Lugar</span>
                        <input defaultValue={owner.addressUniversity} {...register('addressUniversity', { required: true })} type="text" placeholder='Distrito..' />
                    </div>
                    <div className='mt-2'>
                        <span>Carrera</span>
                        <input defaultValue={owner.profession} type="text" placeholder='Ingeniería de..' {...register('profession', { required: true })} />
                    </div>
                    <div className='text-end mt-3'>
                        <button className='btn-view-challenges'>
                            {
                                isLoading ? (<span><i className="fa-solid fa-spinner icon-load me-2"></i>Guardando</span>) : (<span>Guardar</span>)
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
