import React, { useContext, useEffect, useState } from 'react'
import { MainContext } from '../contexts/MainContextApp'
import { useNavigate, useParams } from 'react-router-dom';
import { CONFIG } from '../config';
import axios from 'axios';
import { showInfoToast } from '../utils/showInfoToast';

export const ChallengesApp = () => {
    const navigate = useNavigate();
    const { challenge, setChallenge } = useContext(MainContext);
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
    const resolvProblem = (score, idx) => {
        if (score == 20) {
            showInfoToast('Desafio completado');
        } else {
            navigate(`/admin/game/${challenge._id}/${idx}`)
        }
    }
    useEffect(() => {
        getChallenge();
    }, [])
    return challenge && (
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
                                                <span onClick={() => navigate(`/admin/submissions/${x._id}`)} style={{ cursor: 'pointer' }}>
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

                </div>
                <div>
                    <h5 style={{ fontWeight: 'bold' }}>Ranking actual: 2</h5>
                    <div className='mt-4'>
                        <button className='btn-c' onClick={() => navigate(`/admin/progress/${challenge._id}`)}>
                            <i style={{ color: '#505050' }} className="fa-solid fa-trophy me-2"></i>
                            <span style={{ color: '#135181', fontWeight: 'bold' }}>Clasificación actual</span>
                        </button><br />
                        <button
                            onClick={() => navigate(`/admin/submissions/${challenge._id}`)}
                            className='btn-c mt-2'><i style={{ color: '#505050' }} className="fa-solid fa-chart-simple me-2"></i>
                            <span style={{ color: '#135181', fontWeight: 'bold' }}>Revisar envios</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
