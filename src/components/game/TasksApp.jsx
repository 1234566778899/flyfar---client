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
            .then(res => {
                setTaks(prev => prev.map(x => x._id == id ? ({ ...x, finished: true }) : x));
                if (tabskipt.id) {
                    setTabskipt({ active: false, id: null })
                }
            })
            .catch(error => {
                showInfoToast('Error');
            })
    }
    if (!taks && owner.favoriteLenguaje && owner.test) {
        return (
            <div className='loading'>
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
                        <p>Tienes un máximo de 10 desafíos individuales. Al completar uno, se generará automáticamente otro. También puedes eliminar desafíos. Si deseas generar un nuevo desafío después de eliminar uno, deberás recargar la página.</p>
                        <br />
                        <div>
                            {
                                taks.filter(x => !x.finished).map((x) => (
                                    <div key={x._id} style={{ position: 'relative' }} className='item-c mt-3 item-challenge'>
                                        <div>
                                            <h5 style={{ color: '#135181', fontWeight: 'bold' }}>{x.title}</h5>
                                            <p className='mt-3'
                                                style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#505050' }}>Puntaje: <span style={{ color: '#000' }}>{x.score != undefined ? x.score : '-'}</span>
                                            </p>
                                            {
                                                x.score != undefined && (
                                                    <span
                                                        onClick={() => navigate(`/admin/sends/${x._id}`)}
                                                        style={{ cursor: 'pointer' }}>
                                                        <i className="fa-regular fa-comment-dots me-1"></i>
                                                        Ver comentarios
                                                    </span>
                                                )
                                            }
                                        </div>
                                        <div>
                                            <button className={`btn-challenge ${x.score !== undefined ? 'btn-challenge-solved' : ''}`} onClick={() => resolvProblem(x.score, x)}>{x.score == undefined ? 'Resolver problema' : (x.score < 20 ? 'Intentar de nuevo' : 'Marcar como terminado')}</button>
                                        </div>
                                        {
                                            (!x.score || x.score != 20) && (
                                                <button onClick={() => setTabskipt({ active: true, id: x._id })} className='btn-skip'>
                                                    <i className="fa-solid fa-xmark me-2"></i>
                                                    Omitir
                                                </button>
                                            )
                                        }
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
