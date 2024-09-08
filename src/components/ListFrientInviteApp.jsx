import React, { useContext, useEffect } from 'react'
import { MainContext } from '../contexts/MainContextApp';
import { showInfoToast } from '../utils/showInfoToast';

export const ListFrientInviteApp = ({ close, socket }) => {
    const { friends, codeRoom } = useContext(MainContext);
    const sendInvitation = (id) => {
        socket.emit('invit_friend', { code: codeRoom, id });
        showInfoToast('Solicitud enviada');
        close();
    }
    return (
        <div className='tab-req'>
            <div style={{ width: '400px' }}>
                <h4>Amigos en Linea</h4>
                <hr />
                <table className='table w-100 table-rounded'>
                    <tbody>
                        <tr>
                            <td>Nombre</td>
                            <td></td>
                        </tr>
                        {
                            friends.filter(x => x.online).map((x, idx) => (
                                <tr key={idx}>
                                    <td>{x.username}</td>
                                    <td>
                                        <button
                                            onClick={() => sendInvitation(x._id)}
                                            className='btn btn-dark'><i className="fa-solid fa-paper-plane"></i></button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <button className='btn btn-danger w-100 mt-2' onClick={() => close()}>Cancelar</button>
            </div>

        </div>
    )
}
