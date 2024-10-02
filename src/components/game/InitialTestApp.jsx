import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { CONFIG } from '../../config';
import { useNavigate, useParams } from 'react-router-dom';
import { MainContext } from '../../contexts/MainContextApp';
import { showInfoToast } from './../../utils/showInfoToast';
import { TabConfirmSendApp } from '../tabs/TabConfirmSendApp';

export const InitialTestApp = () => {
    const navigate = useNavigate();
    const { challenge, setChallenge, owner, setOwner } = useContext(MainContext);
    const [tabConfirmSend, setTabConfirmSend] = useState(false);
    const closeTabConfirmSend = () => setTabConfirmSend(false);
    const { id } = useParams();
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
    const resolvProblem = (score, id) => {
        if (score == 20) {
            showInfoToast('Desafio completado');
        } else {
            navigate(`/admin/game/test/${id}`)
        }
    }
    useEffect(() => {
        getChallenge();
    }, [])
    return challenge && (
        <>
            <div className='container inter'>
                <br />
                <hr />
                <h4 className='fw-bold'>Prueba inicial</h4>
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
                                                    <span onClick={() => navigate(`/admin/submissions/${x._id}`)} style={{ cursor: 'pointer' }}>
                                                        <i className="fa-regular fa-comment-dots me-1"></i>
                                                        Ver comentarios
                                                    </span>
                                                )
                                            }
                                        </div>
                                        <div>
                                            <button className={`btn-challenge ${x.score !== undefined ? 'btn-challenge-solved' : ''}`} onClick={() => resolvProblem(x.score, x._id)}>{x.score == undefined ? 'Resolver problema' : (x.score < 20 ? 'Intentar de nuevo' : 'Completado')}</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                    <div>
                        <h5 style={{ fontWeight: 'bold' }}>Puntaje promedio: -</h5>
                        <div className='mt-2'>
                            <button
                                onClick={() => navigate(`/admin/submissions/test/${challenge._id}`)}
                                className='btn-c mt-2'><i style={{ color: '#505050' }} className="fa-solid fa-chart-simple me-2"></i>
                                <span style={{ color: '#135181', fontWeight: 'bold' }}>Revisar envios</span>
                            </button>
                        </div>
                        <button className='mt-5 btn-send' onClick={() => setTabConfirmSend(true)}>Enviar prueba</button>
                    </div>
                </div>
            </div>
            {
                tabConfirmSend && (<TabConfirmSendApp close={closeTabConfirmSend} fnConfirm={sendTest} />)
            }
        </>
    )
}
