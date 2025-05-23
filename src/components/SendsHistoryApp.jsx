import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { showInfoToast } from '../utils/showInfoToast';
import { CONFIG } from '../config';

export const SendsHistoryApp = () => {
    const { taskId } = useParams();
    const [submissions, setSubmissions] = useState(null);
    const [visibles, setVisibles] = useState(null);
    const navigate = useNavigate();
    const getSubmission = () => {
        axios.get(`${CONFIG.uri}/results/task/${taskId}`)
            .then(res => {
                setSubmissions(res.data);
                setVisibles(res.data.map(x => false))
            })
            .catch(error => {
                console.log(error)
                showInfoToast('Error');
            })
    }
    const showComment = (idx) => {
        const aux = [...visibles];
        aux[idx] = !aux[idx];
        setVisibles(aux);
    }
    useEffect(() => {
        getSubmission()
    }, [])
    if (!submissions) {
        return (
            <div className='loading'>
                <i className="fa-solid fa-spinner icon-load me-2"></i>
                Cargando
            </div>
        )
    }
    return submissions && (
        <div className="container inter">
            <div className="container inter">
                <br />
                <div className='mb-3' style={{ display: 'flex', color: '#717171', fontWeight: 'bold', alignItems: 'center' }}>
                    <span style={{ cursor: 'pointer' }} onClick={() => navigate(`/admin/history`)} className='me-2'>Todos mis envios</span>
                    <i className="me-2 fa-solid fa-chevron-right"></i>
                    <span style={{ cursor: 'pointer' }}>Envios</span>
                </div>
            </div>
            <h3 className='fw-bold mt-3'>Envios</h3>
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
                                                            <div style={{ fontSize: '0.9rem', }} className='mt-1'>
                                                                {x.comment}
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            ) : ''
                                        }
                                    </td>
                                    <td className='py-3 text-center'>{x.lenguaje}</td>
                                    <td className='py-3 text-center'>-</td>
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
                    {/* <div className="text-center mt-3">
                        <button className='btn-view-challenges' onClick={() => navigate(`/admin/challenges/${challengeId}`)}>Ver desafios</button>
                    </div> */}
                </div>)
            }
        </div>
    )
}
