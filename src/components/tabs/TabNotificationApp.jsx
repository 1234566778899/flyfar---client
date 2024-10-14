import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import moment from 'moment'
import { CONFIG } from '../../config';
import { showInfoToast } from '../../utils/showInfoToast';
import { MainContext } from '../../contexts/MainContextApp';
export const TabNotificationApp = ({ close, notifications, setNotifications }) => {
    const { owner, socket, getFriends } = useContext(MainContext);
    const changeStatusVisible = (id) => {
        setNotifications(prev => prev.map(x => x._id == id ? { ...x, seen: true } : x))
        axios.put(`${CONFIG.uri}/notifications/update/${id}`)
            .then(res => {
            })
            .catch(error => {
                setNotifications(prev => prev.map(x => x._id == id ? { ...x, seen: false } : x))
            })
    }
    const changeStatusRequest = (data) => {
        changeStatusVisible(data._id);
        axios.post(`${CONFIG.uri}/friends/change_status`, { from: data.from._id, to: owner._id, status: data.status })
            .then(res => {
                socket.emit('status_request', { status: data.status, from: data.from._id, to: { id: owner._id, name: owner.username } })
                if (data.status == 'accepted') {
                    getFriends(owner)
                }
                close()
            })
            .catch(error => {
                showInfoToast('Error');
            })
    }
    useEffect(() => {
    }, [notifications])
    return (
        <div className='tab-noti' style={{ fontSize: '0.95rem' }}>
            <div style={{ backgroundColor: 'black', padding: '10px 10px' }}>
                <span>Notificaciones</span>
            </div>
            <div>
                {
                    notifications.length == 0 && (
                        <p className='text-dark text-center mt-2'>No tiene ninguna notificación</p>
                    )
                }
                {
                    notifications.map(x => (
                        <div key={x._id} className='item-r'>
                            <img style={{ width: '30px', height: '30px' }} src="https://hrcdn.net/hackerrank/assets/forum_mailer/notifymarker.png" alt="noti" />
                            <div className=' ms-3 d-flex align-items-center'>

                                {
                                    x.type === 'request' && (
                                        <span style={{ color: 'black' }}>{x.from.username} le ha enviado una solicitud de amistad. <span style={{ color: 'gray', fontSize: '0.9rem' }}>{moment(x.createdAt).fromNow()}</span>
                                            {
                                                !x.seen && (
                                                    <div>
                                                        <a href="#"
                                                            onClick={() => changeStatusRequest({ ...x, status: 'rejected' })}
                                                            className='ms-2'>¿Cancelar?</a>
                                                        <a
                                                            onClick={() => changeStatusRequest({ ...x, status: 'accepted' })}
                                                            href="#" className='ms-2'>¿Aceptar?</a>
                                                    </div>
                                                )
                                            }
                                            {
                                                x.seen && (<i className="text-success ms-3 fa-solid fa-check"></i>)
                                            }
                                        </span>
                                    )
                                }
                                {
                                    x.type == 'rejected' && (
                                        <span style={{ color: 'red' }}>{x.from.username} ha rechazado tu solicitud de amistad.
                                            <span className='ms-1' style={{ color: 'gray', fontSize: '0.9rem' }}>{moment(x.createdAt).fromNow()}</span>
                                            {
                                                !x.seen && (
                                                    <a className='ms-2' href="#" onClick={() => changeStatusVisible(x._id)}>Marcar como leido</a>
                                                )
                                            }
                                            {
                                                x.seen && (<i className="text-success ms-3 fa-solid fa-check"></i>)
                                            }
                                        </span>
                                    )
                                }
                                {
                                    x.type == 'accepted' && (
                                        <span style={{ color: 'green' }}>{x.from.username} ha aceptado tu solicitud de amistad.
                                            <span className='ms-1' style={{ color: 'gray', fontSize: '0.9rem' }}>{moment(x.createdAt).fromNow()}</span>
                                            {
                                                !x.seen && (
                                                    <a className='ms-2' href="#" onClick={() => changeStatusVisible(x._id)}>Marcar como leido</a>
                                                )
                                            }
                                            {
                                                x.seen && (<i className="text-success ms-3 fa-solid fa-check"></i>)
                                            }
                                        </span>
                                    )
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
            <div
                onClick={() => close()}
                className='i-c' style={{ display: 'flex', justifyContent: 'center', padding: '10px 0px' }}>
                <span style={{ color: 'black' }}>Cerrar</span>
            </div>
        </div>
    )
}
