import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../../styles/Game.css'
import { MainContext } from '../../contexts/MainContextApp';
import axios from 'axios';
import { CONFIG } from '../../config';
import { showInfoToast } from '../../utils/showInfoToast';
import Editor from '@monaco-editor/react';
import moment from 'moment';
import { SubmissionOneApp } from './SubmissionOneApp';
export const GameApp = () => {
    const navigate = useNavigate();
    const [optionActive, setOptionActive] = useState('problem');
    const { id, index } = useParams();
    const { challenge, setChallenge, owner, socket } = useContext(MainContext);
    const [isLoading, setIsLoading] = useState(false);
    const [code, setCode] = useState('')
    const [task, setTask] = useState(null);
    const getTask = () => {
        axios.get(`${CONFIG.uri}/tasks/${index}`)
            .then(res => {
                setTask(res.data);
            })
            .catch(error => {
                showInfoToast('Error');
            })
    }
    useEffect(() => {
        getTask();
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
            axios.post(`${CONFIG.uri}/results/register`, { result: code, title: task.title, lenguaje: challenge.lenguaje, challenge: challenge._id, user: owner._id, task, time })
                .then(res => {
                    const { score } = res.data;
                    const tasks = [...challenge.tasks].map(x => x._id == index ? ({ ...x, score }) : x);
                    setChallenge({ ...challenge, tasks });
                    socket.emit('send_result');
                    navigate(`/admin/challenges/${id}`);
                })
                .catch(error => {
                    console.log(error);
                    setIsLoading(false);
                    showInfoToast('Error');
                })
        }
    }

    return task && (
        <div  >
            <div className="container inter">
                <br />
                <div className='mb-3' style={{ display: 'flex', color: '#717171', fontWeight: 'bold', alignItems: 'center' }}>
                    <span style={{ cursor: 'pointer' }} onClick={() => navigate(`/admin/challenges/${id}`)} className='me-2'>Todos los desafios</span>
                    <i className="me-2 fa-solid fa-chevron-right"></i>
                    <span style={{ cursor: 'pointer' }}>{task.title}</span>
                </div>
            </div>
            <hr />
            <div className='container inter'>
                <div className='pe-3'>
                    <h3 className='fw-bold'>{task.title}</h3>
                    <div className='content-menu mt-3'>
                        <div>
                            <button
                                onClick={() => setOptionActive('problem')} className={`ms-3 menu-option ${optionActive == 'problem' ? 'menu-active' : ''}`}>Problema</button>
                            <button
                                onClick={() => setOptionActive('sends')}
                                className={`ms-3 menu-option ${optionActive == 'sends' ? 'menu-active' : ''}`}>Envios</button>
                        </div>
                    </div>
                    {
                        optionActive == 'problem' && (
                            <>
                                <div style={{ display: 'grid', gridTemplateColumns: '70% 30%' }}>
                                    <div>
                                        <p
                                            className='mt-4'
                                            style={{ color: '#39424E' }}
                                            dangerouslySetInnerHTML={{ __html: task.description }}>
                                        </p>
                                        <h6 style={{ fontWeight: 'bold', color: '#39424E' }}>Formato de entrada</h6>
                                        <p style={{ color: '#39424E' }}>{task.format_input}</p>
                                        <h6 style={{ fontWeight: 'bold', color: '#39424E' }}>Restricciones</h6>
                                        <p>{task.restriction}</p>
                                        <h6 style={{ fontWeight: 'bold', color: '#39424E', marginTop: '15px' }}>Formato de salida</h6>
                                        <p>{task.format_output}</p>
                                        <h6 style={{ fontWeight: 'bold', color: '#39424E' }}>Ejemplo de entrada 1</h6>
                                        <div style={{ background: '#F4FAFF', padding: '15px 10px' }}>
                                            <p className='ms-2' dangerouslySetInnerHTML={{ __html: task.example_input.replace(/\n/g, '<br />') }}></p>
                                        </div>
                                        <h6 style={{ fontWeight: 'bold', color: '#39424E', marginTop: '15px' }}>Ejemplo de salida</h6>
                                        <div style={{ background: '#F4FAFF', padding: '15px 10px' }}>
                                            <p className='ms-2' dangerouslySetInnerHTML={{ __html: task.example_output.replace(/\n/g, '<br />') }}></p>
                                        </div>
                                        <h6 style={{ fontWeight: 'bold', color: '#39424E', marginTop: '15px' }}>Explicación</h6>
                                        <p className='ms-2' dangerouslySetInnerHTML={{ __html: task.explanation.replace(/\n/g, '<br />') }}></p>
                                    </div>
                                    <div>

                                    </div>
                                </div>
                                <br />
                                <div className='mb-2'>Pega el código aqui..</div>
                                <Editor
                                    height="300px"
                                    defaultLanguage={'cpp'}
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
                            </>
                        )
                    }
                    {
                        optionActive == 'sends' && (
                            <SubmissionOneApp taskId={index} />
                        )
                    }
                    <br />
                    <br />
                </div>
            </div>
        </div >
    )
}
