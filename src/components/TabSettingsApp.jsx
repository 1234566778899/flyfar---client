import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { MainContext } from '../contexts/MainContextApp';

export const TabSettingsApp = ({ close }) => {
    const { register, handleSubmit } = useForm();
    const { setSettings, socket } = useContext(MainContext);
    const saveSetting = (data) => {
        socket.emit('send_settings', data);
        close();
    }
    return (
        <div className='tab-settings'>
            <form onSubmit={handleSubmit(saveSetting)}>
                <h6 style={{ color: '#A19C99', margin: 0 }}>AJUSTES GENERALES DE LA SALA</h6>
                <hr style={{ color: 'white', marginTop: '5px' }} />
                <div className="card-settings">
                    <div>
                        <div className='form-item'>
                            <span>LENGUAJE DE PROGRAMACIÓN</span>
                            <select {...register('lenguaje', { required: true })}>
                                <option value="C++">C++</option>
                                <option value="Python">Python</option>
                                <option value="C#">C#</option>
                                <option value="Java">Java</option>
                            </select>
                        </div>
                        <div className='form-item'>
                            <span>TIEMPO (min)</span>
                            <input type="text" {...register('time', { required: true })} />
                        </div>
                    </div>
                    <div>
                        <div className='form-item'>
                            <span>N° DE EJERCICIOS</span>
                            <input type="text"{...register('count', { required: true })} />
                        </div>
                        <div className='form-item'>
                            <span>NIVEL</span>
                            <select {...register('level', { required: true })}>
                                <option value="principiante">Principiante</option>
                                <option value="junior">Junior</option>
                                <option value="semi-senior">Semi-senior</option>
                                <option value="senior">Senior</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div className='form-item'>
                            <span>TEMA</span>
                            <input type="text" {...register('topic', { required: true })} />
                        </div>
                        <div className='form-item'>
                            <span>APUESTA</span>
                            <input type="text" {...register('bet', { required: true })} />
                        </div>
                    </div>
                </div>
                <hr style={{ color: 'white' }} />
                <div className='d-flex justify-content-end'>
                    <button type='submit' className='me-2 btn-accept'>ACEPTAR</button>
                    <button type='button' className='btn-cancel' onClick={() => close()}>CANCELAR</button>
                </div>
            </form>
        </div>
    )
}
