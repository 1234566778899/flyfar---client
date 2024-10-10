import React, { useContext, useEffect, useState } from 'react'
import { CONFIG } from '../../config'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { MainContext } from '../../contexts/MainContextApp'
import { showInfoToast } from './../../utils/showInfoToast';
import { formatMinutes } from '../../utils/formatMinutes'

export const ResumeApp = () => {
    const { id } = useParams();
    const [ranking, setRanking] = useState([]);
    const navigate = useNavigate();
    const { setStarted, setChallenge, owner, socket } = useContext(MainContext);
    const [result, setResult] = useState({ score: 0, time: 0 });
    const getRanking = () => {
        axios.get(`${CONFIG.uri}/results/ranking/${id}`)
            .then(res => {
                setRanking(res.data);
                getResult(res.data)
            })
            .catch(error => {
                console.log(error)
                showInfoToast('Error');
            })
    }

    const getResult = (data) => {
        const me = data.find(x => x.user == owner.username);
        if (!me) return;
        const max = me.tasks.reduce((maxTime, task) => Math.max(maxTime, task.time || 0), -1);
        const sum = me.tasks.reduce((s, task) => s + (task.score || 0), 0);
        setResult({ time: max, score: sum / me.tasks.length });
    }
    useEffect(() => {
        getRanking();
        setStarted(false);
        setChallenge(null);
    }, [])
    const playAgain = () => {
        socket.emit('ended')
        navigate(`/admin/room`);
    }
    return ranking && (
        <div style={{ fontSize: '0.9rem' }}>
            <div className="container inter">
                <br />
                {
                    ranking.length > 1 && (
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '20px' }}>
                                <div className='caja mt-4'>
                                    <div className='foto'>
                                        <div>

                                        </div>
                                        <img src={ranking[1].photo || 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'} alt="img" />
                                        <div c className='name-resume mt-2 text-center'>{ranking[1] ? ranking[1].user : '-'}</div>
                                    </div>
                                    <div className='puesto' style={{ height: '84px' }}>
                                        <span>2</span>
                                    </div>
                                    <div className='points'>Score: {ranking[1] ? ranking[1].total : '-'}</div>
                                </div>

                                <div className='caja'>
                                    <div className='foto'>
                                        <div>

                                        </div>
                                        <img src={ranking[0].photo || 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'} alt="img" />
                                        <div className='name-resume mt-2 text-center'>{ranking[0].user}</div>
                                    </div>
                                    <div className='puesto' style={{ height: '108px', fontSize: '3rem' }}>
                                        <span>1</span>
                                    </div>
                                    <div className='points'>Score: {ranking[0].total}</div>
                                </div>
                                <div className='caja mt-5'>
                                    <div className='foto'>
                                        <div>

                                        </div>
                                        <img src={(ranking[2] && ranking[2].photo) || 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'} alt="img" />
                                        <div className='name-resume mt-2 text-center'>{ranking[2] ? ranking[2].user : '-'}</div>
                                    </div>
                                    <div className='puesto'>
                                        <span>3</span>
                                    </div>
                                    <div className='points'>Score: {ranking[2] ? ranking[2].total : '-'}</div>
                                </div>

                            </div>
                            <br />

                        </div>
                    )
                }
                <h3 className='fw-bold'>Tabla de clasificación</h3>
                <table className='table mt-3'>
                    <tbody>
                        <tr>
                            <td className='fw-bold'>Puesto</td>
                            <td className='fw-bold'>Nombre</td>
                            <td className='fw-bold'>Puntaje</td>
                            <td className='fw-bold'>Tiempo</td>
                            <td className='fw-bold'>Precisión</td>
                            <td className='fw-bold'></td>
                        </tr>
                        {
                            ranking.map((x, idx) => (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{x.user}</td>
                                    <td>{x.total}</td>
                                    <td>{formatMinutes(x.time)}</td>
                                    <td>{100}%</td>
                                    <td></td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
                {
                    ranking.length == 0 && <p className='text-center'>Nadie ha enviado ningun resultado</p>
                }
                <br />
                <div className="mt-3">
                    <h3 className='fw-bold'>Tus resultados</h3>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <div className='room-item mt-3 w-100'>
                            <h4 className='fw-bold'>Puntaje promedio</h4>
                            <span style={{ fontSize: '2rem' }}>{result.score}</span>
                            <div className='bar-box' style={{ background: '#F4F4F5', height: '10px', borderRadius: '10px' }}>
                                <div style={{ background: '#000', marginTop: '2px', borderRadius: '10px', height: '10px', width: '20%' }} className="progress-box"></div>
                            </div>
                        </div>
                        <div className='room-item mt-3 w-100'>
                            <h4 className='fw-bold'>Tiempo total</h4>
                            <span style={{ fontSize: '2rem' }}>{formatMinutes(result.time)} min</span>
                            <div className='bar-box' style={{ background: '#F4F4F5', height: '10px', borderRadius: '10px' }}>
                                <div style={{ background: '#000', marginTop: '2px', borderRadius: '10px', height: '10px', width: '20%' }} className="progress-box"></div>
                            </div>
                        </div>
                        <div className='room-item mt-3 w-100'>
                            <h4 style={{ fontWeight: 'bold' }}>Presición</h4>
                            <span style={{ fontSize: '2rem' }}>
                                {ranking.length == 0 ? 0 : 85}%</span>
                            <div className='bar-box' style={{ background: '#F4F4F5', height: '10px', borderRadius: '10px' }}>
                                <div style={{ background: '#000', marginTop: '2px', borderRadius: '10px', height: '10px', width: '20%' }} className="progress-box"></div>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                        <div >
                            <button
                                onClick={() => playAgain()}
                                className='btn-try'>Jugar otra vez</button>
                        </div>
                        <button className='btn-try'>Compartir tus resultados<i className="fa-solid fa-share-nodes ms-2"></i></button>
                    </div>
                </div>
            </div>
            <br />
            <br />
        </div>
    )
}
