import axios from 'axios';
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { CONFIG } from '../config';
import { MainContext } from '../contexts/MainContextApp';
import { showInfoToast } from '../utils/showInfoToast';

export const TabBiografiApp = ({ close }) => {
    const { register, handleSubmit } = useForm();
    const { owner } = useContext(MainContext);
    const update = (data) => {
        axios.put(`${CONFIG.uri}/users/update/${owner._id}`, data)
            .then(x => {
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
                    <h5 className='fw-bold'>Biografía</h5>
                    <div className='mt-3'>
                        <textarea defaultValue={owner.biografy} {...register('biografy', { required: true })} style={{ height: '150px' }} placeholder='Escribe tu nombre aqui..'></textarea>
                    </div>
                    <div className='text-end mt-3'>
                        <button className='btn-view-challenges'>Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
