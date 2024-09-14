import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../styles/Game.css'
import { MainContext } from '../contexts/MainContextApp';
import axios from 'axios';
import { CONFIG } from '../config';
import { showInfoToast } from '../utils/showInfoToast';
export const GameApp = () => {
    const navigate = useNavigate();
    const [optionActive, setOptionActive] = useState('problem');
    const { id } = useParams();
    const { challenge, owner } = useContext(MainContext);
    const [isLoading, setIsLoading] = useState(false);
    if (!challenge) {
        return navigate('/admin/dashboard')
    }
    const sendResult = () => {
        if (!isLoading) {
            setIsLoading(true);
            axios.post(`${CONFIG.uri}/results/register`, { user: owner._id, task: challenge.tasks[id] })
                .then(res => {
                    navigate('/admin/challenges');
                })
                .catch(error => {
                    console.log(error);
                    setIsLoading(false);
                    showInfoToast('Error');
                })
        }
    }
    return (
        <div>
            <div className="container">
                <br />
                <div className='mb-3' style={{ display: 'flex', color: '#717171', fontWeight: 'bold', alignItems: 'center' }}>
                    <span style={{ cursor: 'pointer' }} onClick={() => navigate('/admin/challenges')} className='me-2'>Todos los desafios</span>
                    <i class="me-2 fa-solid fa-chevron-right"></i>
                    <span style={{ cursor: 'pointer' }}>Ejercicio {Number(id) + 1}</span>
                </div>
            </div>
            <hr />
            <div className='container'>
                <div className='pe-3'>
                    <h3>{challenge.tasks[id].title}</h3>
                    <div className='content-menu mt-3'>
                        <div>
                            <button
                                onClick={() => setOptionActive('problem')} className={`ms-3 menu-option ${optionActive == 'problem' ? 'menu-active' : ''}`}>Problema</button>
                            <button
                                onClick={() => setOptionActive('send')}
                                className={`ms-3 menu-option ${optionActive == 'send' ? 'menu-active' : ''}`}>Envios</button>
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '70% 30%' }}>
                        <div>
                            <p className='mt-4' style={{ color: '#39424E' }}>{challenge.tasks[id].description}</p>
                            <h6 style={{ fontWeight: 'bold', color: '#39424E' }}>Formato de entrada</h6>
                            <p style={{ color: '#39424E' }}>{challenge.tasks[id].format_input}</p>
                            <h6 style={{ fontWeight: 'bold', color: '#39424E' }}>Restricciones</h6>
                            <p>{challenge.tasks[id].restriction}</p>
                            <h6 style={{ fontWeight: 'bold', color: '#39424E', marginTop: '15px' }}>Formato de salida</h6>
                            <p>{challenge.tasks[id].format_output}</p>
                            <h6 style={{ fontWeight: 'bold', color: '#39424E' }}>Ejemplo de entrada 1</h6>
                            <div style={{ background: '#F4FAFF', padding: '15px 10px' }}>
                                <p className='ms-2' dangerouslySetInnerHTML={{ __html: challenge.tasks[id].example_input.replace(/\n/g, '<br />') }}></p>
                            </div>
                            <h6 style={{ fontWeight: 'bold', color: '#39424E', marginTop: '15px' }}>Ejemplo de salida</h6>
                            <div style={{ background: '#F4FAFF', padding: '15px 10px' }}>
                                <p className='ms-2' dangerouslySetInnerHTML={{ __html: challenge.tasks[id].example_output.replace(/\n/g, '<br />') }}></p>
                            </div>
                            <h6 style={{ fontWeight: 'bold', color: '#39424E', marginTop: '15px' }}>Explicación</h6>
                            <p className='ms-2' dangerouslySetInnerHTML={{ __html: challenge.tasks[id].explanation.replace(/\n/g, '<br />') }}></p>
                        </div>
                        <div>

                        </div>
                    </div>
                    <br />
                    <textarea placeholder='Pega el código aqui..' type="text" multiple className='inp-editor' style={{ height: '300px' }} />
                    <div className='text-end mt-2'>
                        {/* <input type="file" /> */}
                        <div>
                            {/* <button className='btn-test'>Test</button> */}
                            <button className='btn-submit ms-3' onClick={() => navigate('/admin/resume')}>Enviar respuesta</button>
                        </div>
                    </div>
                    <br />
                    <br />
                    {/* <h4>Console Input</h4>
                <textarea type="text" multiple className='inp-editor' style={{ height: '200px' }} /> */}
                </div>

            </div>
        </div>
    )
}
