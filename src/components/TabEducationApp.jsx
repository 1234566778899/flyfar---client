import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { CONFIG } from '../config';
import { showInfoToast } from '../utils/showInfoToast';
import { MainContext } from '../contexts/MainContextApp';
import axios from 'axios';

export const TabEducationApp = ({ close }) => {
    const { register, handleSubmit } = useForm();
    const { owner, getUser } = useContext(MainContext);
    const update = (data) => {
        axios.put(`${CONFIG.uri}/users/update/${owner._id}`, data)
            .then(x => {
                getUser();
                showInfoToast('Datos actualizados');
                close();
            })
            .catch(error => {
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
                        <button className='btn-view-challenges'>Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
