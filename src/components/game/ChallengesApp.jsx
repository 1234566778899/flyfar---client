import React, { useContext, useEffect, useState } from 'react'
import { MainContext, MainContextApp } from '../../contexts/MainContextApp'
import { useNavigate, useParams } from 'react-router-dom';
import { CONFIG } from '../../config';
import axios from 'axios';
import { showInfoToast } from '../../utils/showInfoToast';
import { TabConfirmSendApp } from '../tabs/TabConfirmSendApp';

export const ChallengesApp = () => {
    const navigate = useNavigate();
    const { challenge, setChallenge, owner, setOwner, socket } = useContext(MainContext);
    const { id } = useParams();
    const [tabConfirmSend, setTabConfirmSend] = useState(false);
    const closeTabConfirmSend = () => setTabConfirmSend(false);
    const [finished, setFinished] = useState(false);
    const sendTest = () => {
        axios.put(`${CONFIG.uri}/users/test/${owner._id}`)
            .then(res => {
                navigate('/admin/dashboard')
                setChallenge(null);
                showInfoToast('Prueba enviada correctamente');
                setOwner({ ...owner, test: true });
            })
            .catch(error => {
                console.log(error);
                showInfoToast('Error');
            })
    }
    const getChallenge = () => {
        if (!challenge) {
            axios.get(`${CONFIG.uri}/challenge/${id}`)
                .then(res => {
                    socket.emit('join-sala', res.data.code);
                    setChallenge(res.data);
                })
                .catch(error => {
                    showInfoToast('Error');
                })
        }
    }
    const resolvProblem = (score, idx) => {
        if (score == 20) {
            showInfoToast('Desafio completado');
        } else {
            navigate(`/admin/game/${challenge._id}/${idx}`)
        }
    }
    const check = () => {
        setFinished(!finished);
        socket.emit('finished', !finished);
    }
    useEffect(() => {
        getChallenge();
    }, [])
    return challenge && (
        <>
            <div className='container inter'>
                <br />
                <hr />
                <h4 className='fw-bold'>Desafios</h4>
                <hr />
                <div style={{ display: 'grid', gridTemplateColumns: '70% 30%', gap: '20px' }}>
                    <div>
                        {
                            challenge.tasks.map((x, idx) => (
                                <div key={idx} className='item-c mb-3'>
                                    <div className='item-challenge'>
                                        <div>
                                            <h5 style={{ color: '#135181', fontWeight: 'bold' }}>{x.title}</h5>
                                            <p className='mt-3'
                                                style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#505050' }}>Puntaje: <span style={{ color: '#000' }}>{x.score != undefined ? x.score : '-'}</span>
                                            </p>
                                            {
                                                x.score != undefined && (
                                                    <span onClick={() => navigate(`/admin/submissions/${challenge._id}/${x._id}`)} style={{ cursor: 'pointer' }}>
                                                        <i className="fa-regular fa-comment-dots me-1"></i>
                                                        Ver comentarios
                                                    </span>
                                                )
                                            }
                                        </div>
                                        <div>
                                            <button className={`btn-challenge ${x.score !== undefined ? 'btn-challenge-solved' : ''}`} onClick={() => resolvProblem(x.score, idx)}>{x.score == undefined ? 'Resolver problema' : (x.score < 20 ? 'Intentar de nuevo' : 'Completado')}</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        <div className='text-end'>
                            <button
                                onClick={() => check()}
                                className='btn-challenge' style={{ background: `${finished ? 'green' : ''}` }}>
                                {finished && <i className="fa-solid fa-check me-2"></i>}
                                {finished ? 'Esperando a los demas' : 'Marcar como terminando'}</button>
                        </div>

                    </div>
                    <div>
                        {
                            challenge.code !== '000000' && (
                                <h5 style={{ fontWeight: 'bold' }}>Ranking actual: -</h5>
                            )
                        }
                        <div className='mt-4'>
                            {
                                challenge.code != '000000' && (<>
                                    <button className='btn-c' onClick={() => navigate(`/admin/progress/${challenge._id}`)}>
                                        <i style={{ color: '#505050' }} className="fa-solid fa-trophy me-2"></i>
                                        <span style={{ color: '#135181', fontWeight: 'bold' }}>Clasificación actual</span>
                                    </button><br />
                                </>)
                            }
                            <button
                                onClick={() => navigate(`/admin/submissions/${challenge._id}`)}
                                className='btn-c mt-2'><i style={{ color: '#505050' }} className="fa-solid fa-chart-simple me-2"></i>
                                <span style={{ color: '#135181', fontWeight: 'bold' }}>Revisar envios</span>
                            </button>
                        </div>
                        {
                            challenge.code == '000000' && (<button
                                onClick={() => setTabConfirmSend(true)}
                                className='mt-4 w-100 btn-test'> Enviar prueba</button>)
                        }
                    </div>
                </div>
            </div>
            {
                tabConfirmSend && (<TabConfirmSendApp close={closeTabConfirmSend} fnConfirm={sendTest} />)
            }
        </>
    )
}
