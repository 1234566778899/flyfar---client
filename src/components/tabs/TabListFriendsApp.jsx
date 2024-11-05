import axios from 'axios'
import React, { useState } from 'react'
export const TabListFriendsApp = ({ friends, close, onConfirm }) => {
    const [duplicado, setDuplicado] = useState(friends.map(x => ({ ...x, deleted: false })))
    const showBoton = (idx) => {
        const aux = [...duplicado];
        aux[idx].deleted = !aux[idx].deleted;
        setDuplicado(aux);
    }

    return (
        <div className='tab-friends' onClick={() => close()}>
            <div style={{ width: '600px', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
                <button style={{ position: 'absolute', top: '10px', right: '10px' }} className='btn' onClick={() => close()}><i className="fa-solid fa-xmark"></i></button>
                <h4 className='fw-bold'>Lista de amigos</h4>
                <div className='input-search mb-3'>
                    <input type="text" placeholder='Buscar amigo..' />
                </div>
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {
                        duplicado.map((x, idx) => (
                            <div key={idx} className='p-1 mt-2 item-friend'>
                                <div>
                                    <span className='fw-bold'>{x.username}</span>
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
                </div>
            </div>
        </div>
    )
}
