import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { MainContext } from '../../contexts/MainContextApp';
import { CONFIG } from '../../config';
import { showInfoToast } from '../../utils/showInfoToast';

export const TabSkillApp = ({ close }) => {
    const { register, handleSubmit } = useForm();
    const { owner, getUser } = useContext(MainContext);
    const [isLoading, setIsLoading] = useState(false);
    const update = (data) => {
        if (isLoading) return;
        setIsLoading(true);
        axios.put(`${CONFIG.uri}/users/update/${owner._id}`, data)
            .then(x => {
                getUser();
                showInfoToast('Datos actualizados');
                close();
                setIsLoading(false);
            })
            .catch(error => {
                showInfoToast('Error');
                setIsLoading(false);
            })
    }
    return (
        <div className='tab-profile inter'>
            <div style={{ width: '400px', fontSize: '0.95rem', position: 'relative' }}>
                <form onSubmit={handleSubmit(update)}>
                    <i onClick={() => close()}
                        style={{ position: 'absolute', right: 20, cursor: 'pointer' }} className="fa-solid fa-xmark"></i>
                    <h5 className='fw-bold'>Habilidades en programación</h5>
                    <div className='mt-3'>
                        <span>Nivel</span>
                        <select defaultValue={owner.levelProgramming} {...register('levelProgramming', { required: true })}>
                            <option value="">Seleccione su nivel</option>
                            <option value="Principiante">Principiante</option>
                            <option value="Junior">Junior</option>
                            <option value="Semi Senior">Semi senior</option>
                            <option value="Senior">Senior</option>
                        </select>
                    </div>
                    <div className='mt-2'>
                        <span>Lenguaje de programación favorito</span>
                        <select defaultValue={owner.favoriteLenguaje} {...register('favoriteLenguaje', { required: true })}>
                            <option value="">Selecciona un lenguaje</option>
                            <option value="C++">C++</option>
                            <option value="Python">Python</option>
                            <option value="Javascript">JavaScript</option>
                            <option value="Java">Java</option>
                            <option value="C#">C#</option>
                            <option value="Ruby">Ruby</option>
                            <option value="Php">PHP</option>
                            <option value="Typescript">TypeScript</option>
                            <option value="Swift">Swift</option>
                            <option value="Go">Go</option>
                            <option value="Rust">Rust</option>
                            <option value="Kotlin">Kotlin</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>

                    <div className='mt-2'>
                        <span>Tiempo programando</span>
                        <input defaultValue={owner.timeProgramming} {...register('timeProgramming', { required: true })} type="text" placeholder='1 mes..' />
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
