import React, { useContext, useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { AuthContext } from './../contexts/AuthContextApp';
import { TabSendRequestApp } from './TabSendRequestApp';
import { TabListFriendsApp } from './TabListFriendsApp';
import { AcceptRequestApp } from './AcceptRequestApp';
import axios from 'axios';
import { CONFIG } from '../config';
import { MainContext } from '../contexts/MainContextApp';
import { showInfoToast } from '../utils/showInfoToast';
export const DashboardApp = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [tabActive, setTabActive] = useState(false);
    const closeTab = () => setTabActive(false);
    const [tabListFriends, setTabListFriends] = useState(false);
    const closeTabFriends = () => setTabListFriends(false);
    const [tabRequest, setTabRequest] = useState(false);
    const closeTabRequest = () => setTabRequest(false);
    const { owner, socket } = useContext(MainContext);
    const [friends, setFriends] = useState([]);
    const [nameFriend, setNameFriend] = useState('')


    const getFriends = () => {
        axios.get(`${CONFIG.uri}/friends/retrieve/${owner._id}`)
            .then(res => {
                setFriends(res.data);
                socket.emit('enter', { ...owner, friends: res.data });
            })
            .catch(error => {
                console.log(error);
            })
    }
    useEffect(() => {
        if (owner) {
            getFriends();
            socket.on('online_friends', data => {
                setFriends(data);
            })
            socket.on('send_request', data => {
                if (data.to == user.email) {
                    setTabRequest(true);
                    setNameFriend(data.from);
                }
            })
            socket.on('out_friend', data => {
                setFriends(prev => (prev.map(x => (x._id == data ? { ...x, online: false } : x))))
            })
            socket.on('entering', data => {
                setFriends(prev => (prev.map(x => (x._id == data ? { ...x, online: true } : x))))
            })
            socket.on('status_request', data => {
                if (data.from == owner._id) {
                    showInfoToast(data.status == 'accepted' ? `${data.to.name} ha aceptado tu solicitud de amistad` : `${data.to.name} ha rechazado tu solicitud de amistad`);
                    if (data.status == 'accepted') {
                        getFriends()
                    }
                }
            })
        }
        return () => {
            socket.off('send_request');
            socket.off('status_request');
            socket.off('online_friends');
        }
    }, [owner])

    return user && owner && (
        <div className='dasboard-content' style={{ fontSize: '0.9rem' }}>
            <div className="container">
                <h3 className='fw-bold'>Bienvenido, {owner.username}</h3>
                <p style={{ opacity: '0.8', fontSize: '0.9rem   ' }}>Completaste 5 desafios esta semana!</p>
                <button className='btn-main px-2' style={{ fontSize: '0.9rem' }} onClick={() => navigate('/admin/room/123')}>Empezar nuevo desafío</button>
                <div style={{ display: 'grid', gridTemplateColumns: '70% 30%' }}>
                    <div className='pe-3'>
                        <div className='content-dash mt-4'>
                            <h4>Desafios actuales</h4>
                            <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <span>Algoritmos avanzados</span>
                                    <div className='bar-box' style={{ background: '#F4F4F5', height: '10px', width: '300px', borderRadius: '10px' }}>
                                        <div style={{ background: '#000', marginTop: '2px', borderRadius: '10px', height: '10px', width: '20%' }} className="progress-box"></div>
                                    </div>
                                </div>
                                <button className='btn-continue'>Continuar</button>
                            </div>
                            <div style={{ display: 'flex', marginTop: '15px', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <span>Algoritmos avanzados</span>
                                    <div className='bar-box' style={{ background: '#F4F4F5', height: '10px', width: '300px', borderRadius: '10px' }}>
                                        <div style={{ background: '#000', marginTop: '2px', borderRadius: '10px', height: '10px', width: '80%' }} className="progress-box"></div>
                                    </div>
                                </div>
                                <button className='btn-continue'>Continuar</button>
                            </div>
                            <div style={{ display: 'flex', marginTop: '15px', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <span>Maching Learning Fundamentals</span>
                                    <div className='bar-box' style={{ background: '#F4F4F5', height: '10px', width: '300px', borderRadius: '10px' }}>
                                        <div style={{ background: '#000', marginTop: '2px', borderRadius: '10px', height: '10px', width: '40%' }} className="progress-box"></div>
                                    </div>
                                </div>
                                <button className='btn-continue'>Continuar</button>
                            </div>
                        </div>
                        <div className='content-dash mt-4'>
                            <h4>Actividad reciente</h4>
                            <ul className='mt-3'>
                                <li>Completaste Data Structure</li>
                                <li className='mt-1'>Earn 'Code NInja' Badge</li>
                                <li className='mt-1'>Joined 'Python Enthusiast' group</li>
                                <li className='mt-1'>Completaste Data Structure</li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <div className="content-dash mt-4">
                            <h4>Amigos</h4>
                            <div style={{ display: 'flex' }}>
                                <input type="text" className='form-control' placeholder='Buscar amigos' />
                                <button className='btn btn-dark' onClick={() => setTabActive(true)}>
                                    <i className="fa-solid fa-plus"></i>
                                </button>
                            </div>
                            {
                                friends.slice(0, 4).map((x, index) => (
                                    <div key={index} style={{ display: 'flex', marginTop: '15px', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <img style={{ width: '30px', height: '30px', objectFit: 'cover', borderRadius: '50%' }} src="https://vivolabs.es/wp-content/uploads/2022/03/perfil-hombre-vivo.png" alt="img" />
                                            <div>
                                                <span className='ms-2'>{x.username}</span><br />
                                                {
                                                    x.online ? (<span className='ms-2' style={{ fontSize: '0.7rem', fontWeight: 'bold', color: 'green' }}>En linea</span>) : (<span className='ms-2' style={{ fontSize: '0.7rem', color: 'red', fontWeight: 'bold' }}>Desconectado</span>)
                                                }
                                            </div>
                                        </div>
                                        <div>
                                            <button className='btn-join'>
                                                <i className="fa-solid fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                            {
                                friends.length > 4 && (<div className='text-center mt-3'>
                                    <span className='btn-view-all' onClick={() => setTabListFriends(true)}>Ver mas</span>
                                </div>)
                            }
                        </div>
                    </div>
                </div>
            </div>
            {
                tabActive && (<TabSendRequestApp close={closeTab} user={user} socket={socket} owner={owner} />)
            }
            {
                tabListFriends && (<TabListFriendsApp friends={friends} close={closeTabFriends} />)
            }
            {
                tabRequest && (<AcceptRequestApp friend={nameFriend} socket={socket} owner={owner} close={closeTabRequest} getFriends={getFriends} />)
            }
            <br />
            <br />
        </div>
    )
}
