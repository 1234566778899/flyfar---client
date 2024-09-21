import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CONFIG } from '../config';
import { showInfoToast } from './../utils/showInfoToast';
import { MainContext } from '../contexts/MainContextApp';

export const SubmissionApp = () => {
    const navigate = useNavigate();
    const { challenge, owner } = useContext(MainContext);
    const [submissions, setSubmissions] = useState([]);
    const [visibles, setVisibles] = useState(submissions.map(x => false));
    const { taskId, challengeId } = useParams();
    const getSubmissions = () => {
        axios.post(`${CONFIG.uri}/results/retrieve`, { user: owner._id, challenge: challenge._id })
            .then(res => {
                setSubmissions(res.data);
            })
            .catch(error => {
                showInfoToast('Error');
            })
    }
    const showComment = (idx) => {
        const aux = [...visibles];
        aux[idx] = !aux[idx];
        setVisibles(aux);
    }
    useEffect(() => {
        getSubmissions();
    }, [])
    return (
        <div>
            <div className="container inter">
                <br />
                <div className='mb-3' style={{ display: 'flex', color: '#717171', fontWeight: 'bold', alignItems: 'center' }}>
                    <span style={{ cursor: 'pointer' }} onClick={() => navigate(`/admin/challenges/${challengeId}`)} className='me-2'>Todos los desafios</span>
                    <i className="me-2 fa-solid fa-chevron-right"></i>
                    <span style={{ cursor: 'pointer' }}>Envios</span>
                </div>
            </div>
            <hr />
            <div className="container inter">
                <h3 className='fw-bold'>Envios</h3>
                <hr />
                {
                    submissions.length > 0 && (<table className='table'>
                        <tbody>
                            <tr className='fw-bold'>
                                <td>Problema</td>
                                <td className='text-center'>Lenguaje</td>
                                <td className='text-center'>Tiempo</td>
                                <td className='text-center'>Resultado</td>
                                <td className='text-center'>Puntaje</td>
                            </tr>
                            {
                                submissions.filter(x => (taskId ? x.task == taskId : true)).map((x, idx) => (
                                    <tr key={x._id}>
                                        <td className='py-3' style={{ color: '#2D74FF' }}>
                                            {x.title}
                                            {
                                                x.score != undefined ? (
                                                    <div className='text-dark mt-2'>
                                                        <div style={{ cursor: 'pointer' }} onClick={() => showComment(idx)}>
                                                            {
                                                                visibles[idx] ? (<i style={{ fontSize: '0.9rem' }} className="fa-solid fa-chevron-down"></i>) : (<i className="fa-solid fa-chevron-right" style={{ fontSize: '0.9rem' }}></i>)
                                                            }
                                                            <span className='ms-2'>Comentarios</span>
                                                        </div>
                                                        {
                                                            visibles[idx] && (
                                                                <div style={{ fontSize: '0.9rem' }} className='mt-1'>
                                                                    {x.comment}
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                ) : ''
                                            }
                                        </td>
                                        <td className='py-3 text-center'>{x.lenguaje}</td>
                                        <td className='py-3 text-center'>{x.time}</td>
                                        <td className='py-3 text-center'>{x.description ? x.description : '-'}</td>
                                        <td className='py-3 text-center'>{x.score}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>)
                }
                {
                    submissions.length == 0 && (<div>
                        <div className='message-empty'>
                            <span>No tienes ningún envio todavia</span>
                        </div>
                        <div className="text-center mt-3">
                            <button className='btn-view-challenges' onClick={() => navigate(`/admin/challenges`)}>Ver desafios</button>
                        </div>
                    </div>)
                }
            </div>
        </div>
    )
}
