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
            <h4 className='fw-bold'>
                <i className="fa-solid fa-trophy"></i>
                <span className='ms-3'>Clasificación de usuarios</span>
            </h4>
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
                ranking.length > 0 && ranking.map((x, index) => (
                    <div className='item-top' key={index}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ background: '#9E57F6', width: '35px', height: '35px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', color: 'white' }}>{index + 1}</div>
                            <div className='ms-4'>
                                <span>Usuario</span><br />
                                <span className='fw-bold'>{x.userDetails.username}</span>
                            </div>
                        </div>
                        <div>
                            <span>Nombre</span><br />
                            <span className='fw-bold'>{x.userDetails.name || '-'}</span>
                        </div>
                        <div>
                            <span>Apellido</span><br />
                            <span className='fw-bold'>{x.userDetails.lname || '-'}</span>
                        </div>
                        <div>
                            <span>Puntaje</span><br />
                            <span style={{ background: '#13BB7C', padding: '3px 10px', color: 'white', borderRadius: '10px', fontSize: '0.9rem' }}>95</span>
                        </div>
                        <div>
                            {
                                !isFriend(x.userDetails.email) && (<button
                                    onClick={() => sendRequest(x.userDetails.email)}
                                    type="submit" className='btn-add-friend'>
                                    <span >
                                        <i className="fa-solid fa-plus me-2"></i>
                                        Añadir</span>
                                </button>)
                            }
                            {
                                isFriend(x.userDetails.email) && (<span style={{ color: '#16A34A' }}><i className="me-2 fa-solid fa-circle-check"></i>Amigos</span>)
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
