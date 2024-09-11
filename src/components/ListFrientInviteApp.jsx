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
                <h5 className='text-white text-center' style={{ letterSpacing: '1px' }}>AMIGOS EN LINEA</h5>
                <hr style={{ color: 'white' }} />
                {
                    friends.filter(x => x.online).map((x, idx) => (
                        <div key={idx} className='item-friend' >
                            <span style={{ color: 'white' }}>{x.username}</span>
                            <button onClick={() => sendInvitation(x._id)}>
                                <i className="fa-solid fa-user-plus"></i>
                            </button>
                        </div>
                    ))
                }
                {
                    friends.filter(x => x.online).length == 0 && (<p className='mt-3' style={{ color: 'gray', fontSize: '0.9rem' }}>No hay amigos en linea..</p>)
                }
                <button className='btn-leave mt-3' style={{ letterSpacing: '1px', fontSize: '0.9rem' }} onClick={() => close()}>Cancelar</button>
            </div>
        </div>
    )
}
