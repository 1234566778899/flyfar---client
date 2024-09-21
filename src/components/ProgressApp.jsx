import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CONFIG } from '../config';
import { MainContext } from '../contexts/MainContextApp';
import { showInfoToast } from '../utils/showInfoToast';

export const ProgressApp = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { socket } = useContext(MainContext);
    const [ranking, setRanking] = useState([]);
    const getRanking = () => {
        axios.get(`${CONFIG.uri}/results/ranking/${id}`)
            .then(res => {
                setRanking(res.data);
            })
            .catch(error => {
                showInfoToast('Error');
            })
    }
    useEffect(() => {
        getRanking();
        socket.on('send_result', () => {
            getRanking();
        })
        return () => {
            socket.off('send_result');
        }
    }, [])
    const letters = ['A', 'B', 'C', 'D', 'E'];
    const rand = () => Math.random() * 1;
    return (
        <div>
            <div className="container inter">
                <br />
                <div className='mb-3' style={{ display: 'flex', color: '#717171', fontWeight: 'bold', alignItems: 'center' }}>
                    <span style={{ cursor: 'pointer' }} onClick={() => navigate(`/admin/challenges/${id}`)} className='me-2'>Todos los desafios</span>
                    <i className="me-2 fa-solid fa-chevron-right"></i>
                    <span style={{ cursor: 'pointer' }}>Clasificación</span>
                </div>
            </div>
            <hr />
            <div className='container inter'>
                <h3 className='fw-bold mt-2'>Tabla de clasificaciones</h3>
                <hr />
                {
                    ranking.length > 0 && (
                        <div style={{ overflowX: 'auto' }}>
                            <table className='table text-center' style={{ color: '#39424E' }}>
                                <tbody>
                                    <tr className='fw-bold'>
                                        <td style={{ width: '100px' }}>Puesto</td>
                                        <td style={{ width: '150px' }}>Usuario</td>
                                        <td style={{ width: '100px' }}>Resueltos</td>
                                        <td style={{ width: '100px' }}>Tiempo</td>
                                        {
                                            ranking[0].tasks.map((task, idx) => (
                                                <td key={rand()}>{letters[idx]}</td>
                                            ))
                                        }

                                    </tr>
                                    {
                                        ranking.map((x, idx) => (
                                            <tr key={idx} style={{ height: '70px' }} >
                                                <td style={{ width: '100px' }}>{idx + 1}</td>
                                                <td style={{ width: '150px' }}>{x.user}</td>
                                                <td style={{ width: '100px' }}>{x.solved}</td>
                                                <td style={{ width: '100px' }}>{x.time}</td>
                                                {
                                                    x.tasks.map((y, i) => (
                                                        <td key={rand()} style={{ padding: 0 }}>
                                                            <div className='progress-bar' style={{ background: `${y.ended ? '#5487EA' : '#555'}` }}>
                                                                {y.ended && (<span>{y.score} ({y.time}:00)</span>)}
                                                            </div>
                                                        </td>
                                                    ))
                                                }
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    )
                }
                {
                    ranking.length == 0 && (<div>
                        <div className='message-empty'>
                            <span>No hay ningún envio todavía</span>
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
