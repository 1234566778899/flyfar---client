import axios from 'axios';
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { CONFIG } from '../../config';
import { MainContext } from '../../contexts/MainContextApp';
import { showInfoToast } from '../../utils/showInfoToast';

export const TabEditNameApp = ({ close }) => {
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
            <div style={{ width: '400px', fontSize: '0.95rem', position: 'relative' }}>
                <form onSubmit={handleSubmit(update)}>
                    <i onClick={() => close()}
                        style={{ position: 'absolute', right: 20, cursor: 'pointer' }} className="fa-solid fa-xmark"></i>
                    <h5 className='fw-bold'>Información personal</h5>
                    <div className='mt-3'>
                        <span>Primer nombre</span>
                        <input defaultValue={owner.name} type="text" {...register('name', { required: true })} />
                    </div>
                    <div className='mt-2'>
                        <span>Apellido</span>
                        <input defaultValue={owner.lname} type="text" {...register('lname', { required: true })} />
                    </div>
                    <div className='mt-2'>
                        <span>Alias</span>
                        <input defaultValue={owner.username} type="text" {...register('username', { required: true })} />
                    </div>
                    <div className='text-end mt-3'>
                        <button className='btn-view-challenges'>Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
