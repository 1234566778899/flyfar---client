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
import { AccepInviteRoomApp } from './AccepInviteRoomApp';
export const DashboardApp = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [tabActive, setTabActive] = useState(false);
    const closeTab = () => setTabActive(false);
    const [tabListFriends, setTabListFriends] = useState(false);
    const closeTabFriends = () => setTabListFriends(false);
    const [tabRequest, setTabRequest] = useState(false);
    const closeTabRequest = () => setTabRequest(false);
    const { owner, socket, codeRoom, setCodeRoom, friends, setFriends } = useContext(MainContext);
    const [nameFriend, setNameFriend] = useState('')
    const [tabInvitation, setTabInvitation] = useState(false);
    const closeInvitation = () => setTabInvitation(false);
    const [codeInvitation, setCodeInvitation] = useState('');
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
            socket.on('invite_room', data => {
                setCodeInvitation(data);
                setCodeRoom(data)
                setTabInvitation(true);
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
    const goRoom = () => {
        const code = Math.floor(100000 + Math.random() * 900000);
        setCodeRoom(code);
        socket.emit('create_room', { code, id: owner._id });
        navigate('/admin/room')
    }

    return user && owner && (
        <div className='dasboard-content' style={{ fontSize: '0.9rem' }}>

            <div className="container">
                {
                    codeRoom && (<div className='d-flex justify-content-between align-items-center p-3 border my-4'>
                        <span className='fw-bold'>Volver a la sala</span>
                        <button className='btn btn-dark' onClick={() => navigate('/admin/room')}>Unirse</button>
                    </div>)
                }
                <h3 className='fw-bold'>Bienvenido, {owner.username}</h3>
                <p style={{ opacity: '0.8', fontSize: '0.9rem   ' }}>Completaste 5 desafios esta semana!</p>

                <div style={{ display: 'grid', gridTemplateColumns: '75% 25%' }}>
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
                        <div className="content-friends mt-4" style={{ height: '400px' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div className='input-search'>
                                    <input type="text" placeholder='Buscar amigos' />
                                    <i className="fa-solid fa-magnifying-glass me-2"></i>
                                </div>
                                <button className='btn btn-dark' onClick={() => setTabActive(true)}>
                                    <i className="fa-solid fa-user-plus"></i>
                                </button>
                            </div>
                            {
                                friends.slice(0, 4).map((x, index) => (
                                    <div key={index} style={{ display: 'flex', marginTop: '15px', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <img style={{ width: '30px', height: '30px', objectFit: 'cover', borderRadius: '2px' }} src="https://vivolabs.es/wp-content/uploads/2022/03/perfil-hombre-vivo.png" alt="img" />
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span className='ms-2' style={{ color: 'white' }}>{x.username}</span>
                                                {
                                                    x.online ? (<span className='ms-2' style={{ fontSize: '0.7rem', fontWeight: 'bold', color: 'green' }}>En linea</span>) : (<span className='ms-2' style={{ fontSize: '0.7rem', color: 'gray', fontWeight: 'bold' }}>Desconectado</span>)
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
                        <button className='btn-start mt-2' onClick={() => goRoom()}>EMPEZAR DESAFIO</button>
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
            {
                tabInvitation && (<AccepInviteRoomApp close={closeInvitation} code={codeInvitation} />)
            }
            <br />
            <br />
        </div>
    )
}
