import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../../styles/Game.css'
import { MainContext } from '../../contexts/MainContextApp';
import axios from 'axios';
import { CONFIG } from '../../config';
import { showInfoToast } from '../../utils/showInfoToast';
import Editor from '@monaco-editor/react';
import moment from 'moment';
export const GameApp = () => {
    const navigate = useNavigate();
    const [optionActive, setOptionActive] = useState('problem');
    const { id, index } = useParams();
    const { challenge, setChallenge, owner, socket } = useContext(MainContext);
    const [isLoading, setIsLoading] = useState(false);
    const [code, setCode] = useState('')
    const getChallenge = () => {
        if (!challenge) {
            axios.get(`${CONFIG.uri}/challenge/${id}`)
                .then(res => {
                    setChallenge(res.data);
                })
                .catch(error => {
                    showInfoToast('Error');
                })
        }
    }
    useEffect(() => {
        getChallenge();
    }, [])
    const sendResult = () => {
        if (!isLoading) {
            setIsLoading(true);
            if (code == '') {
                showInfoToast('Debe completar el ejercicio');
                setIsLoading(false);
                return;
            }
            const time = moment().diff(challenge.createdAt, 'seconds');
            axios.post(`${CONFIG.uri}/results/register`, { result: code, title: challenge.tasks[index].title, lenguaje: challenge.lenguaje, challenge: challenge._id, user: owner._id, task: challenge.tasks[index], time })
                .then(res => {
                    const { score } = res.data;
                    const tasks = [...challenge.tasks];
                    tasks[index].score = score;
                    setChallenge({ ...challenge, tasks });
                    socket.emit('send_result');
                    navigate(`/admin/challenges/${id}`);
                })
                .catch(error => {
                    setIsLoading(false);
                    showInfoToast('Error');
                })
        }
    }

    return challenge && (
        <div  >
            <div className="container inter">
                <br />
                <div className='mb-3' style={{ display: 'flex', color: '#717171', fontWeight: 'bold', alignItems: 'center' }}>
                    <span style={{ cursor: 'pointer' }} onClick={() => navigate(`/admin/challenges/${id}`)} className='me-2'>Todos los desafios</span>
                    <i className="me-2 fa-solid fa-chevron-right"></i>
                    <span style={{ cursor: 'pointer' }}>Ejercicio {Number(index) + 1}</span>
                </div>
            </div>
            <hr />
            <div className='container inter'>
                <div className='pe-3'>
                    <h3 className='fw-bold'>{challenge.tasks[index].title}</h3>
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
                            <p
                                className='mt-4'
                                style={{ color: '#39424E' }}
                                dangerouslySetInnerHTML={{ __html: challenge.tasks[index].description }}>
                            </p>
                            <h6 style={{ fontWeight: 'bold', color: '#39424E' }}>Formato de entrada</h6>
                            <p style={{ color: '#39424E' }}>{challenge.tasks[index].format_input}</p>
                            <h6 style={{ fontWeight: 'bold', color: '#39424E' }}>Restricciones</h6>
                            <p>{challenge.tasks[index].restriction}</p>
                            <h6 style={{ fontWeight: 'bold', color: '#39424E', marginTop: '15px' }}>Formato de salida</h6>
                            <p>{challenge.tasks[index].format_output}</p>
                            <h6 style={{ fontWeight: 'bold', color: '#39424E' }}>Ejemplo de entrada 1</h6>
                            <div style={{ background: '#F4FAFF', padding: '15px 10px' }}>
                                <p className='ms-2' dangerouslySetInnerHTML={{ __html: challenge.tasks[index].example_input.replace(/\n/g, '<br />') }}></p>
                            </div>
                            <h6 style={{ fontWeight: 'bold', color: '#39424E', marginTop: '15px' }}>Ejemplo de salida</h6>
                            <div style={{ background: '#F4FAFF', padding: '15px 10px' }}>
                                <p className='ms-2' dangerouslySetInnerHTML={{ __html: challenge.tasks[index].example_output.replace(/\n/g, '<br />') }}></p>
                            </div>
                            <h6 style={{ fontWeight: 'bold', color: '#39424E', marginTop: '15px' }}>Explicación</h6>
                            <p className='ms-2' dangerouslySetInnerHTML={{ __html: challenge.tasks[index].explanation.replace(/\n/g, '<br />') }}></p>
                        </div>
                        <div>

                        </div>
                    </div>
                    <br />
                    <div className='mb-2'>Pega el código aqui..</div>
                    <Editor
                        height="300px"
                        defaultLanguage={challenge.lenguaje}
                        defaultValue={code}
                        theme="vs-dark"
                        onChange={setCode}
                    />
                    <div className='text-end mt-2'>
                        <div>
                            <button onClick={() => sendResult()} className='btn-submit ms-3' >
                                {isLoading ? (<i className="fa-solid fa-spinner icon-load"></i>) : 'Enviar resultado'}
                            </button>
                        </div>
                    </div>
                    <br />
                    <br />
                </div>
            </div>
        </div >
    )
}
