import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { CONFIG } from '../config'
import { MainContext } from '../contexts/MainContextApp'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { showInfoToast } from '../utils/showInfoToast'

export const HistoryApp = () => {
    const [results, setResults] = useState([])
    const { owner } = useContext(MainContext);
    const [paginate, setPaginate] = useState(1);
    const navigate = useNavigate();
    const [total, settotal] = useState(0)
    const getResults = () => {
        axios.post(`${CONFIG.uri}/results/history`, { user: owner._id, paginate })
            .then(res => {
                setResults(res.data.data)
                settotal(res.data.total);
            })
            .catch(error => {
                showInfoToast('Error');
            })
    }
    useEffect(() => {
        getResults();
    }, [paginate])
    return (
        <div className='container inter'>
            <br />
            <h4 className='fw-bold'>Historial de envios</h4>
            <hr />
            <table className='table' style={{ fontSize: '0.9rem' }}>
                <tbody>
                    <tr className='fw-bold'>
                        <td>N°</td>
                        <td>Titulo</td>
                        <td>Descripción</td>
                        <td style={{ width: '120px' }}>Fecha de envío</td>
                        <td style={{ width: '120px' }}>Opciones</td>
                    </tr>
                    {
                        results.map(({ taskDetails }, idx) => (
                            <tr key={taskDetails._id}>
                                <td>{idx + 1}</td>
                                <td>{taskDetails.title}</td>
                                <td>{taskDetails.description}</td>
                                <td>{moment(taskDetails.createdAt).format('DD-MM-YYYY')}</td>
                                <td>
                                    <button
                                        onClick={() => navigate(`/admin/sends/history/${taskDetails._id}`)}
                                        className='btn-view-sends'><i className="fa-solid fa-share me-2"></i>Ver envios</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {
                total <= 0 && (
                    <p className='text-center'>No ha realizado ningún envío</p>
                )
            }
            {
                total > 1 && (
                    <div className='mt-1'>
                        <nav aria-label="Page navigation" style={{ cursor: 'pointer' }}>
                            <ul className="pagination">
                                <li style={{ margin: 0 }} className="page-item">
                                    <a onClick={() => setPaginate(previus => (previus - 1 > 0 ? previus - 1 : 1))} className="page-link" aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                    </a>
                                </li>
                                {
                                    Array.from({ length: Math.ceil(total / 20) }, (_, index) => (
                                        <li style={{ margin: 0 }} className={`page-item ${paginate == index + 1 ? 'active' : ''}`} key={index} >
                                            <a onClick={() => setPaginate(index + 1)} className={`page-link`}>{index + 1}</a>
                                        </li>
                                    ))
                                }
                                <li style={{ margin: 0 }} className="page-item">
                                    <a
                                        onClick={() => setPaginate(previus => (previus + 1 < Math.ceil(total / 20) ? previus + 1 : Math.ceil(total / 20)))}
                                        className="page-link"
                                        aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                )
            }
        </div>
    )
}
