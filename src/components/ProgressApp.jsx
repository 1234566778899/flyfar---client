import React from 'react'
import { useNavigate } from 'react-router-dom'

export const ProgressApp = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="container">
                <br />
                <div className='mb-3' style={{ display: 'flex', color: '#717171', fontWeight: 'bold', alignItems: 'center' }}>
                    <span style={{ cursor: 'pointer' }} onClick={() => navigate('/admin/challenges')} className='me-2'>Todos los desafios</span>
                    <i class="me-2 fa-solid fa-chevron-right"></i>
                    <span style={{ cursor: 'pointer' }}>Clasificación</span>
                </div>
            </div>
            <hr />
            <div className='container'>
                <h3 className='fw-bold mt-2'>Tabla de clasificaciones</h3>
                <hr />
                <br />
                <table className='table text-center' style={{ color: '#39424E' }}>
                    <tbody>
                        <tr className='fw-bold'>
                            <td style={{ width: '100px' }}>Puesto</td>
                            <td style={{ width: '150px' }}>Usuario</td>
                            <td style={{ width: '100px' }}>Resueltos</td>
                            <td style={{ width: '100px' }}>Tiempo</td>
                            <td>A</td>
                            <td>B</td>
                        </tr>
                        <tr style={{ height: '70px' }}>
                            <td style={{ width: '100px' }}>2</td>
                            <td style={{ width: '150px' }}>Jesús</td>
                            <td style={{ width: '100px' }}>2</td>
                            <td style={{ width: '100px' }}>16</td>
                            <td style={{ padding: 0 }}>
                                <div className='progress-bar'>
                                    <span>6:47</span>
                                </div>
                            </td>
                            <td style={{ padding: 0 }}>
                                <div className='progress-bar'>
                                    <span>12:47</span>
                                </div>
                            </td>
                        </tr>
                        <tr style={{ height: '70px' }}>
                            <td style={{ width: '100px' }}>3</td>
                            <td style={{ width: '150px' }}>Codea</td>
                            <td style={{ width: '100px' }}>2</td>
                            <td style={{ width: '100px' }}>16</td>
                            <td style={{ padding: 0 }}>
                                <div className='progress-bar'>
                                    <span>6:47</span>
                                </div>
                            </td>
                            <td style={{ padding: 0 }}></td>
                        </tr>
                        <tr style={{ height: '70px' }}>
                            <td style={{ width: '100px' }}>4</td>
                            <td style={{ width: '150px' }}>Jorge</td>
                            <td style={{ width: '100px' }}>2</td>
                            <td style={{ width: '100px' }}>16</td>
                            <td>
                                <div className='progress-bar'>
                                    <span>6:47</span>
                                </div>
                            </td>
                            <td></td>
                        </tr>
                        <tr style={{ height: '70px' }}>
                            <td style={{ width: '100px' }}>5</td>
                            <td style={{ width: '150px' }}>Santi</td>
                            <td style={{ width: '100px' }}>2</td>
                            <td style={{ width: '100px' }}>16</td>
                            <td>
                                <div className='progress-bar'>
                                    <span>6:47</span>
                                </div>
                            </td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
