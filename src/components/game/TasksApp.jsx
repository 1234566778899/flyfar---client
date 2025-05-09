import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MainContext } from '../../contexts/MainContextApp';
import axios from 'axios';
import { CONFIG } from '../../config';
import { showInfoToast } from '../../utils/showInfoToast';
import { TabSkipApp } from '../tabs/TabSkipApp';


export const TasksApp = () => {
    const navigate = useNavigate();
    const [taks, setTaks] = useState(null);
    const { owner } = useContext(MainContext);
    const [tabskipt, setTabskipt] = useState({ active: false, id: null });
    const closeTabSkip = () => setTabskipt({ active: false, id: null });
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
    const resolvProblem = (score, task) => {
        if (score == 20) {
            updateTask(task._id);
        } else {
            navigate(`/admin/game/${task._id}`)
        }
    }
    const updateTask = (id) => {
        id = id || tabskipt.id;
        axios.put(`${CONFIG.uri}/tasks/${id}`)
            .then(_ => {
                setTaks(prev => prev.map(x => x._id == id ? ({ ...x, finished: true }) : x));
                if (tabskipt.id) {
                    setTabskipt({ active: false, id: null })
                }
            })
            .catch(_ => {
                showInfoToast('Error');
            })
    }
    if (!taks && owner.favoriteLenguaje && owner.test) {
        return (
            <div className='loading' style={{ display: 'flex', flexDirection: 'column' }}>
                <img src={require('../../assets/load_animation.gif')} alt="img-animation" style={{ width: '60px' }} />
                <span>Cargando desafios..</span>
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
                    <>
                        <h3 className='mt-3 fw-bold'>Desafios individuales</h3>
                        <p>Completa desafíos para mejorar tus habilidades. Tienes un máximo de 10 desafíos activos.</p>
                        <div>
                            {
                                taks.filter(x => !x.finished).map((x) => (
                                    <div key={x._id} style={{ position: 'relative' }} className='item-c mt-3 item-challenge'>
                                        <div>
                                            <h5 className='mb-3' style={{ fontWeight: 'bold' }}>{x.title}</h5>
                                            {x.score != undefined && (<span className='label-score'>{x.score} Puntos</span>)}
                                            {x.score == undefined && (<span className='label-score'>Sin intentos</span>)}
                                            {
                                                x.score != undefined && (
                                                    <span
                                                        onClick={() => navigate(`/admin/sends/${x._id}`)}
                                                        className='ms-3 btn-ver-comment'>
                                                        <i className="me-2 fa-solid fa-comment"></i>
                                                        Ver comentarios
                                                    </span>
                                                )
                                            }
                                        </div>

                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            {
                                                (!x.score || x.score != 20) && (
                                                    <button title='Omitir desafio' onClick={() => setTabskipt({ active: true, id: x._id })} className='btn-skip'>
                                                        <i className="fa-solid fa-ban"></i>
                                                    </button>
                                                )
                                            }
                                            <button className={`btn-challenge ${x.score !== undefined ? 'btn-challenge-solved' : ''}`} onClick={() => resolvProblem(x.score, x)}>{x.score == undefined ? 'Resolver problema' : (x.score < 20 ? 'Intentar de nuevo' : 'Marcar como terminado')}</button>
                                        </div>
                                    </div>

                                ))
                            }
                        </div>
                    </>
                )
            }
            <br />
            {
                tabskipt.active && (<TabSkipApp close={closeTabSkip} fnAccept={updateTask} />)
            }
        </div>
    )
}
