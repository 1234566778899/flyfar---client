import React, { useContext, useEffect, useState } from 'react'
import { MainContext } from '../contexts/MainContextApp';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CONFIG } from '../config';
import { showInfoToast } from '../utils/showInfoToast';

export const ListFriendsApp = () => {
    const { friends, getFriends, owner } = useContext(MainContext);
    const [duplicado, setDuplicado] = useState([]);
    useEffect(() => {
        if (friends) {
            setDuplicado([...friends].map(x => ({ ...x, deleted: false })))
        }
    }, [friends])
    const showBoton = (idx) => {
        const aux = [...duplicado];
        aux[idx].deleted = !aux[idx].deleted;
        setDuplicado(aux);
    }
    const deleteFriend = (id) => {
        axios.delete(`${CONFIG.uri}/friends/${id}`)
            .then(res => {
                getFriends(owner);
                showInfoToast('Amistad eliminada');
            })
            .catch(error => {
                showInfoToast('Error');
            })
    }
    const navigate = useNavigate();
    return (
        <div className='container inter'>
            <br />
            <h2 className='fw-bold'>Lista de amigos</h2>
            <hr />
            <table className='table'>
                <tbody>
                    <tr>
                        <td className='fw-bold'>Nombre</td>
                        <td className='fw-bold'>Fecha</td>
                        <td className='fw-bold'>Ejercicios resueltos</td>
                        <td className='fw-bold'>Opciones</td>
                    </tr>
                    {
                        duplicado.map((x, idx) => (
                            <tr key={x.id}>
                                <td>{x.username}</td>
                                <td>{moment(x.createdAt).fromNow()}</td>
                                <td>0</td>
                                <td>
                                    <button
                                        onClick={() => navigate(`/admin/user/${x.email}`)}
                                        className='btn-infor'><i className="fa-solid fa-circle-info"></i></button>
                                    {
                                        !x.deleted && (<button onClick={() => showBoton(idx)} className='btn-delete ms-2'><i className="fa-solid fa-user-minus"></i></button>)
                                    }
                                    {
                                        x.deleted && (
                                            <>
                                                <button onClick={() => deleteFriend(x.id)} className='ms-2 btn-add-use' style={{ fontSize: '0.7rem' }}>
                                                    <i className="fa-solid fa-check"></i>
                                                </button>
                                                <button onClick={() => showBoton(idx)} className='ms-2 btn-add-use' style={{ fontSize: '0.7rem' }}>
                                                    <i className="fa-solid fa-xmark"></i>
                                                </button>
                                            </>
                                        )
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>

            </table>
            {
                friends.length == 0 && <p className='text-center'>Aún no tienes ningún amigo en la lista..</p>
            }
        </div>
    )
}
