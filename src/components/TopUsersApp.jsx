import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CONFIG } from '../config'
import { useNavigate } from 'react-router-dom'
import { showInfoToast } from '../utils/showInfoToast'
import moment from 'moment/moment'

export const TopUsersApp = () => {
    const [ranking, setRanking] = useState(null)
    const navigate = useNavigate();
    const getRanking = () => {
        axios.get(`${CONFIG.uri}/results/ranking`)
            .then(res => {
                setRanking(res.data);
            })
            .catch(error => {
                console.log(error);
                showInfoToast('Error');
            })
    }
    useEffect(() => {
        getRanking();
    }, [])
    if (!ranking) {
        return (
            <div className='loading'>
                <span>Cargando..</span>
            </div>
        )
    }


    return (
        <div className='container'>
            <br />
            <h4 className='fw-bold'>Clasificación de usuarios</h4>
            <hr />
            {
                ranking.length == 0 && (
                    <div className='mt-3'>
                        <div className='message-empty'>
                            <span>No existen registros todavía</span>
                        </div>
                        <div className="text-center mt-3">
                            <button className='btn-view-challenges'
                                onClick={() => navigate('/admin/dashboard')} >Regresar al dashboard</button>
                        </div>
                    </div>
                )
            }
            {
                ranking.length > 0 && <table className='table'>
                    <tbody>
                        <tr className='fw-bold'>
                            <td>Nombre de usuario</td>
                            <td>Nombre</td>
                            <td>Apellido</td>
                            <td>Correo</td>
                            <td>Fecha de registro</td>
                            <td>Puntaje</td>
                        </tr>
                        {
                            ranking.map(x => (
                                <tr key={x.userId} style={{ fontSize: '0.90rem' }}>

                                    <td >{x.userDetails.username}</td>
                                    <td >{x.userDetails.name || '-'}</td>
                                    <td >{x.userDetails.lname || '-'}</td>
                                    <td >{x.userDetails.email || '-'}</td>
                                    <td >{moment(x.userDetails.createdAt).format('DD-MM-YYYY')}</td>
                                    <td >
                                        <span style={{ background: 'green', padding: '3px 10px', color: 'white', borderRadius: '3px' }}>{x.averageScore ? x.averageScore.toFixed(2) : 0}</span>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            }
        </div>
    )
}
