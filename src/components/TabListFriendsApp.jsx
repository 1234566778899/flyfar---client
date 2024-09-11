import React from 'react'
export const TabListFriendsApp = ({ friends, close }) => {
    return (
        <div className='tab-req'>
            <div style={{ width: '600px', position: 'relative' }}>
                <button style={{ position: 'absolute', top: '10px', right: '10px' }} className='btn' onClick={() => close()}><i className="fa-solid fa-xmark"></i></button>
                <h3>Lista de amigos</h3>
                <input type="text" className='form-control' placeholder='Buscar amigo..' />
                <table className='table mt-2'>
                    <tbody>
                        <tr>
                            <td>Nombre</td>
                            <td>Fecha de amistad</td>
                            <td></td>
                        </tr>
                        {
                            friends.map(x => (
                                <tr>
                                    <td>{x.username}</td>
                                    <td>{'12/09/2024'}</td>
                                    <td>
                                        <button style={{ fontSize: '0.7rem' }}><i className="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
