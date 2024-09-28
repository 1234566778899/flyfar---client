import React, { useContext, useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { AuthContext } from './../contexts/AuthContextApp';
import { MainContext } from '../contexts/MainContextApp';
import axios from 'axios';
import { CONFIG } from '../config';
import { showInfoToast } from '../utils/showInfoToast';
import { TabConfTestApp } from './tabs/TabConfTestApp';
import { TabListFriendsApp } from './tabs/TabListFriendsApp';
import { TabSendRequestApp } from './tabs/TabSendRequestApp';

export const DashboardApp = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [tabActive, setTabActive] = useState(false);
    const closeTab = () => setTabActive(false);
    const [tabListFriends, setTabListFriends] = useState(false);
    const [tabTest, setTabTest] = useState(false);
    const closeTabTest = () => setTabTest(false);
    const closeTabFriends = () => setTabListFriends(false);
    const { owner, socket, codeRoom, setCodeRoom, friends, setFriends, challenge, setFriendsActive } = useContext(MainContext);
    const generateInitialTest = (lenguaje) => {
        axios.post(`${CONFIG.uri}/challenge/generate/test`, { lenguaje, user: { id: owner._id, username: owner.username } })
            .then(res => {
                navigate(`/admin/challenges/${res.data}`);
            })
            .catch(error => {
                console.log(error);
                showInfoToast('Error');
            })
    }
    useEffect(() => {
        if (owner) {
            socket.on('out_friend', data => {
                setFriends(prev => (prev.map(x => (x._id == data ? { ...x, online: false } : x))))
            })
            socket.on('entering', data => {
                setFriends(prev => (prev.map(x => (x._id == data ? { ...x, online: true } : x))))
            })
        }
        return () => {
            socket.off('send_request');
            socket.off('status_request');
            socket.off('online_friends');
        }
    }, [owner])
    const goRoom = () => {
        const code = `${Math.floor(100000 + Math.random() * 900000)}`;
        setCodeRoom(code);
        setFriendsActive([{ id: owner._id, username: owner.username }])
        socket.emit('create_room', { code, user: { id: owner._id, username: owner.username } });
        navigate('/admin/room')
    }
    return user && owner && (
        <div className='inter' style={{ fontSize: '0.9rem', background: '#F7F8FD' }}>
            <div className='bg-white pb-1' style={{ borderBottom: '1px solid #EBEBF3' }}>
                <div className="container">
                    {
                        !codeRoom && !challenge && (<div >
                            <h3 className='fw-bold mt-4'>Bienvenido, {owner.username}</h3>
                            <p style={{ opacity: '0.8', fontSize: '0.9rem   ' }}>Completaste 0 desafios esta semana!</p>
                        </div>)
                    }
                </div>
            </div>
            <div className="container">
                {
                    codeRoom && (<div className='bar-wait'>
                        <span className='fw-bold'>Sala en curso..</span>
                        <button className='btn-view-challenges' onClick={() => navigate('/admin/room')}>Unirse a la sala</button>
                    </div>)
                }
                <div style={{ display: 'grid', gridTemplateColumns: '75% 25%' }}>
                    <div className='pe-3'>
                        <br />
                        {
                            !owner.test && (
                                <div>
                                    <h5 className='fw-bold'>Prueba inicial</h5>

                                    <div className='card-profile' style={{ background: 'black', color: 'white' }}>
                                        <h5 className='fw-bold'>Evalúa tu Nivel de Programación</h5>
                                        <p>Antes de comenzar con los desafíos, realiza esta prueba inicial para conocer tu nivel actual en programación.</p>
                                        <button onClick={() => setTabTest(true)} className='btn-t'>Iniciar prueba</button>
                                    </div>
                                </div>
                            )
                        }
                        {
                            owner.test && (
                                <div className='content-dash'>
                                    <h4 className='fw-bold'>Desafios actuales</h4>
                                    <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <span>Algoritmos avanzados</span>
                                            <div className='bar-box' style={{ background: '#F4F4F5', height: '8px', width: '300px', borderRadius: '10px' }}>
                                                <div style={{ background: '#000', marginTop: '2px', borderRadius: '10px', height: '8px', width: '20%' }} className="progress-box"></div>
                                            </div>
                                        </div>
                                        <button className='btn-continue'>Continuar</button>
                                    </div>
                                    <div style={{ display: 'flex', marginTop: '15px', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <span>Algoritmos avanzados</span>
                                            <div className='bar-box' style={{ background: '#F4F4F5', height: '8px', width: '300px', borderRadius: '10px' }}>
                                                <div style={{ background: '#000', marginTop: '2px', borderRadius: '10px', height: '8px', width: '80%' }} className="progress-box"></div>
                                            </div>
                                        </div>
                                        <button className='btn-continue'>Continuar</button>
                                    </div>
                                    <div style={{ display: 'flex', marginTop: '15px', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <span>Maching Learning Fundamentals</span>
                                            <div className='bar-box' style={{ background: '#F4F4F5', height: '8px', width: '300px', borderRadius: '10px' }}>
                                                <div style={{ background: '#000', marginTop: '2px', borderRadius: '10px', height: '8px', width: '40%' }} className="progress-box"></div>
                                            </div>
                                        </div>
                                        <button className='btn-continue'>Continuar</button>
                                    </div>
                                </div>
                            )
                        }
                        <div className='content-dash mt-2'>
                            <h4 className='fw-bold'>Actividad reciente</h4>
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
                                <button
                                    onClick={() => setTabActive(true)}
                                    className='btn-add-user'><i className="fa-solid fa-user-plus"></i></button>
                            </div>
                            {
                                friends.slice(0, 4).map((x, index) => (
                                    <div key={index} style={{ display: 'flex', marginTop: '15px', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <img style={{ width: '30px', height: '30px', objectFit: 'cover', borderRadius: '2px' }} src={x.photo || 'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg'} alt="img" />
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span className='ms-2 fw-bold'>{x.username}</span>
                                                {
                                                    x.online ? (<span className='ms-2' style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#2E87BA' }}>En linea</span>) : (<span className='ms-2' style={{ fontSize: '0.7rem', color: 'gray', fontWeight: 'bold' }}>Desconectado</span>)
                                                }
                                            </div>
                                        </div>
                                        <div>
                                            {/* <button className='btn-join'>
                                                <i className="fa-solid fa-plus"></i>
                                            </button> */}
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
                        <button className='btn-main w-100 py-3 mt-2' onClick={() => goRoom()}>Iniciar desafio grupal</button>
                    </div>
                </div>
            </div>
            {
                tabActive && (<TabSendRequestApp close={closeTab} user={user} socket={socket} owner={owner} />)
            }
            {
                tabTest && (<TabConfTestApp close={closeTabTest} fnConfirm={generateInitialTest} />)
            }
            {
                tabListFriends && (<TabListFriendsApp friends={friends} close={closeTabFriends} />)
            }
            <br />
            <br />
        </div>
    )
}
