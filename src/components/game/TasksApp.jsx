import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MainContext } from '../../contexts/MainContextApp';
import axios from 'axios';
import { CONFIG } from '../../config';
import { showInfoToast } from '../../utils/showInfoToast';

export const TasksApp = () => {
    const navigate = useNavigate();
    const [taks, setTaks] = useState(null);
    const { owner } = useContext(MainContext);
    const getTaks = () => {
        axios.get(`${CONFIG.uri}/challenge/generate/individual/${owner._id}`)
            .then(res => {
                setTaks(res.data);
            })
            .catch(error => {
                console.log(error);
                showInfoToast('Error')
            })
    }
    useEffect(() => {
        if (owner.favoriteLenguaje && owner.test) {
            getTaks();
        }
    }, [])
    const resolvProblem = (score, idx) => {
        if (score == 20) {
            showInfoToast('Desafio completado');
        } else {
            //  navigate(`/admin/game/${challenge._id}/${idx}`)
        }
    }
    if (!taks && owner.favoriteLenguaje && owner.test) {
        return (
            <div className='loading'>
                <span>Cargando..</span>
            </div>
        )
    }
    return (
        <div className='container'>
            {
                !owner.test && (
                    <div className='mt-3'>
                        <div className='message-empty'>
                            <span>Debe realizar el test inicial para saber su nivel en programación</span>
                        </div>
                        <div className="text-center mt-3">
                            <button className='btn-view-challenges'
                                onClick={() => navigate('/admin/dashboard')} >Regresar al dashboard</button>
                        </div>
                    </div>
                )
            }
            {
                owner.test && !owner.favoriteLenguaje && (
                    <div className='mt-3'>
                        <div className='message-empty'>
                            <span>Debe agregar su lenguaje favorito para comenzar con los desafios individuales</span>
                        </div>
                        <div className="text-center mt-3">
                            <button className='btn-view-challenges'
                                onClick={() => navigate('/admin/profile')} >Ir a mi perfil</button>
                        </div>
                    </div>
                )
            }
            {
                taks && (
                    <div>
                        {
                            taks.map((x, idx) => (
                                <div key={idx} className='item-c mt-3'>
                                    <div className='item-challenge'>
                                        <div>
                                            <h5 style={{ color: '#135181', fontWeight: 'bold' }}>{x.title}</h5>
                                            <p className='mt-3'
                                                style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#505050' }}>Puntaje: <span style={{ color: '#000' }}>{x.score != undefined ? x.score : '-'}</span>
                                            </p>
                                            {
                                                x.score != undefined && (
                                                    <span style={{ cursor: 'pointer' }}>
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
                )
            }
            <br />
        </div>
    )
}
