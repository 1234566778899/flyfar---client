import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { CONFIG } from '../config'
import { useNavigate } from 'react-router-dom'
import { showInfoToast } from '../utils/showInfoToast'
import { MainContext } from '../contexts/MainContextApp'
import { AuthContext } from '../contexts/AuthContextApp'

export const TopUsersApp = () => {
    const [ranking, setRanking] = useState(null)
    const { socket, owner, friends } = useContext(MainContext);
    const { user } = useContext(AuthContext);
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
    const [isLoading, setIsLoading] = useState(false);
    const sendRequest = (email) => {
        if (!isLoading) {
            setIsLoading(true);
            if (email == user.email) {
                setIsLoading(false);
                return showInfoToast('Email inválido');
            }
            axios.post(`${CONFIG.uri}/friends/send_request`, { userId: owner._id, friend: email })
                .then(res => {
                    showInfoToast('Solicitud enviada');
                    socket.emit('request_friend', { from: owner, to: email });
                    setIsLoading(false);
                })
                .catch(error => {
                    setIsLoading(false);
                    if (error.response) {
                        showInfoToast(error.response.data.error);
                    }
                })
        }
    }
    const isFriend = (email) => {
        return friends.map(x => x.email).includes(email);
    }
    useEffect(() => {
        getRanking();
    }, [])
    if (!ranking) {
        return (
            <div className='loading'>
                <i className="fa-solid fa-spinner icon-load me-2"></i>
                <span>Cargando</span>
            </div>
        )
    }
    return friends && ranking && (
        <div className='container'>
            <br />
            {
                isLoading && (
                    <div className='tab-loading'>
                        <i className="fa-solid fa-spinner icon-load me-2"></i>
                        Cargando
                    </div>
                )
            }
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
                            <td>N°</td>
                            <td>Nombre de usuario</td>
                            <td>Nombre</td>
                            <td>Apellido</td>
                            <td>Puntaje</td>
                            <td className='text-center'>Agregar amigo</td>
                        </tr>
                        {
                            ranking.map((x, idx) => (
                                <tr key={x.userId} style={{ fontSize: '0.90rem' }}>

                                    <td >{idx + 1}</td>
                                    <td >{x.userDetails.username}</td>
                                    <td >{x.userDetails.name || '-'}</td>
                                    <td >{x.userDetails.lname || '-'}</td>
                                    <td >
                                        <span style={{ background: 'green', padding: '3px 10px', color: 'white', borderRadius: '3px' }}>{x.averageScore ? x.averageScore : 0}</span>
                                    </td>
                                    <td className='text-center' >
                                        {
                                            !isFriend(x.userDetails.email) && (<button
                                                onClick={() => sendRequest(x.userDetails.email)}
                                                type="submit" className="btn-request"> <i className="fa-solid fa-plus"></i></button>)
                                        }
                                        {
                                            isFriend(x.userDetails.email) && (<span>Amigos
                                                <i style={{ fontSize: '0.9rem' }} className="ms-1 fa-solid fa-check"></i>
                                            </span>)
                                        }
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
