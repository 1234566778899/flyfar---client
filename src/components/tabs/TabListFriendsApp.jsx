import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export const TabListFriendsApp = ({ friends, close, onConfirm }) => {
    const [duplicado, setDuplicado] = useState(friends.map(x => ({ ...x, deleted: false })))
    const showBoton = (idx) => {
        const aux = [...duplicado];
        aux[idx].deleted = !aux[idx].deleted;
        setDuplicado(aux);
    }
    const searchFriens = (name) => {
        setDuplicado([...friends.filter(x => x.username.toLowerCase().includes(name.toLowerCase()))]);
    }
    const navigate = useNavigate();
    return (
        <div className='tab-friends' onClick={() => close()}>
            <div style={{ width: '600px', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
                <button style={{ position: 'absolute', top: '10px', right: '10px' }} className='btn' onClick={() => close()}><i className="fa-solid fa-xmark"></i></button>
                <h4 className='fw-bold'>Lista de amigos</h4>
                <div className='input-search mb-3'>
                    <input onInput={(e) => searchFriens(e.target.value)} type="text" placeholder='Buscar amigo..' />
                </div>
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {
                        duplicado.map((x, idx) => (
                            <div key={idx} className='p-1 mt-2 item-friend'>
                                <div onClick={() => navigate(`/admin/user/${x.email}`)}>
                                    <img src={x.photo || 'https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=yDJ4ITX1cHMh25Lt1vI1zBn2cAKKAlByHBvPJ8gEiIg='} alt="photo" style={{ width: '30px', borderRadius: '50%', height: '30px', objectFit: 'cover' }} />
                                    <span className='fw-bold ms-2'>{x.username}</span>
                                    {
                                        x.online && (
                                            <span className='ms-2 text-success fw-bold' style={{ fontSize: '0.8rem' }}>En linea</span>
                                        )
                                    }
                                </div>
                                <div>
                                    {
                                        !x.deleted && (
                                            <button onClick={() => showBoton(idx)} className='btn-add-user' style={{ fontSize: '0.7rem' }}>
                                                <i className="fa-solid fa-user-minus"></i>
                                            </button>
                                        )
                                    }
                                    {
                                        x.deleted && (
                                            <>
                                                <button onClick={() => onConfirm(x.id)} className='btn-add-user' style={{ fontSize: '0.7rem' }}>
                                                    <i className="fa-solid fa-check"></i>
                                                </button>
                                                <button onClick={() => showBoton(idx)} className='ms-2 btn-add-user' style={{ fontSize: '0.7rem' }}>
                                                    <i className="fa-solid fa-xmark"></i>
                                                </button>
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        ))
                    }
                    {
                        duplicado.length === 0 && (
                            <div className='text-center'>
                                <span>No se encontraron amigos</span>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
