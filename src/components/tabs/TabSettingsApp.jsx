import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { MainContext } from '../../contexts/MainContextApp';
import { InputTagApp } from '../InputTagApp';
import { showInfoToast } from '../../utils/showInfoToast';

export const TabSettingsApp = ({ close }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { socket } = useContext(MainContext);
    const [topics, setTopics] = useState([]);
    const [difficulty, setDifficulty] = useState(5);
    const saveSetting = (data) => {
        if (topics.length <= 0) {
            showInfoToast('Debe agregar al menos un tema');
            return;
        }
        socket.emit('send_settings', { ...data, topics, level: difficulty });
        close();
    }
    return (
        <div className='tab-settings'>
            <form onSubmit={handleSubmit(saveSetting)}>
                <h5 className='fw-bold' >Configuración</h5>
                <hr style={{ marginTop: '5px' }} />
                <div className="card-settings">
                    <div className='form-item'>
                        <span>Lenguaje de programación</span>
                        <select {...register('lenguaje', { required: true })}>
                            <option value="cpp">C++</option>
                            <option value="javascript">JavaScript</option>
                            <option value="python">Python</option>
                            <option value="java">Java</option>
                            <option value="csharp">C#</option>
                            <option value="php">PHP</option>
                            <option value="go">Go</option>
                            <option value="typescript">TypeScript</option>
                            <option value="ruby">Ruby</option>
                            <option value="swift">Swift</option>
                        </select>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div className='form-item'>
                            <span>Tiempo (min)</span>
                            <input type="number" {...register('time', {
                                required: 'Campo obligatorio',
                                validate: (value) => {
                                    if (value <= 0 || value > 600) {
                                        return 'El tiempo no es válido';
                                    }
                                    return true;
                                }
                            })} />
                            {
                                errors.time && <span style={{ fontSize: '0.8rem', color: 'red' }}>{errors.time.message}</span>
                            }
                        </div>
                        <div className='form-item'>
                            <span>N° de ejercicios</span>
                            <input type="number"{...register('count', {
                                required: 'El cambio es obligatorio', validate: (value) => {
                                    if (value > 10) return 'Máximo 10 preguntas';
                                    if (value < 0) return 'No es válido';
                                    return true;
                                }
                            })} />
                            {
                                errors.count && <span style={{ fontSize: '0.8rem', color: 'red' }}>{errors.count.message}</span>
                            }
                        </div>
                    </div>
                    <div className='form-item'>
                        <span>Nivel de dificultad: {difficulty}</span>
                        <input
                            type="range"
                            min={1}
                            max={10}
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Facil</span>
                            <span>Dificil</span>
                        </div>
                    </div>
                    <div className='form-item'>
                        <span>Temas</span>
                        <InputTagApp items={topics} setItems={setTopics} />
                    </div>
                    <div className='form-item'>
                        <span>Apuesta</span>
                        <input type="text" {...register('bet')} />
                    </div>
                </div>
                <br />
                <div className='d-flex justify-content-end'>
                    <button type='submit' className='me-2 btn-accept'>Aceptar</button>
                    <button type='button' className='btn-cancel' onClick={() => close()}>Cancelar</button>
                </div>
            </form>
        </div>
    )
}
