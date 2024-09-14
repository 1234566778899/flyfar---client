import React, { useContext } from 'react'
import { MainContext } from '../contexts/MainContextApp'
import { useNavigate } from 'react-router-dom';

export const ChallengesApp = () => {
    const navigate = useNavigate();
    const { challenge } = useContext(MainContext);
    if (!challenge) {
        return navigate('/admin/dashboard');
    }
    return (
        <div className='container'>
            <br />
            <hr />
            <h3 className='fw-bold'>Desafios</h3>
            <hr />
            <div style={{ display: 'grid', gridTemplateColumns: '70% 30%', gap: '20px' }}>
                <div>
                    {
                        challenge.tasks.map((x, idx) => (
                            <div key={idx} className='item-challenge mb-3'>
                                <div>
                                    <h5 style={{ color: '#2D74FF', fontWeight: 'bold' }}>{x.title}</h5>
                                    <p className='mt-3' style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#A0A0A0' }}>Puntaje: <span style={{ color: '#414141' }}>12</span></p>
                                </div>
                                <div>
                                    <button onClick={() => navigate(`/admin/game/${idx}`)}>Resolver problema</button>
                                </div>
                            </div>
                        ))
                    }

                </div>
                <div>
                    <h5 style={{ fontWeight: 'bold' }}>Ranking actual: 2</h5>
                    <div className='mt-4'>
                        <button className='btn-c' onClick={() => navigate('/admin/progress')}>
                            <i style={{ color: 'gray' }} className="fa-solid fa-trophy me-2"></i>
                            <span style={{ color: '#2D74FF', fontWeight: 'bold' }}>Clasificación actual</span>
                        </button><br />
                        <button className='btn-c mt-2'><i style={{ color: 'gray' }} className="fa-solid fa-chart-simple me-2"></i>
                            <span style={{ color: '#2D74FF', fontWeight: 'bold' }}>Revisar envios</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
