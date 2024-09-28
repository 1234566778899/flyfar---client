import React from 'react'
export const TabListFriendsApp = ({ friends, close }) => {
    return (
        <div className='tab-friends'>
            <div style={{ width: '600px', position: 'relative' }}>
                <button style={{ position: 'absolute', top: '10px', right: '10px' }} className='btn' onClick={() => close()}><i className="fa-solid fa-xmark"></i></button>
                <h4 className='fw-bold'>Lista de amigos</h4>
                <div className='input-search mb-3'>
                    <input type="text" placeholder='Buscar amigo..' />
                </div>
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {
                        friends.map((x, idx) => (
                            <div key={idx} className='p-1 mt-2' style={{ display: 'flex', borderBottom: '1px solid gray', justifyContent: 'space-between' }}>
                                <div>
                                    <span className='fw-bold'>{x.username}</span>
                                </div>
                                <div>
                                    <button className='btn-add-user' style={{ fontSize: '0.7rem' }}>
                                        <i className="fa-solid fa-user-minus"></i>
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
