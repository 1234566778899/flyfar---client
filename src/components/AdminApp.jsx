import React, { useContext } from 'react'
import '../styles/Dashboard.css'
import { Outlet } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContextApp'
export const AdminApp = () => {
    const { user } = useContext(AuthContext);
    return user && (
        <div>
            <nav style={{ background: 'black', color: 'white', paddingBottom: '10px' }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px' }}>
                    <div></div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <i className="fa-regular fa-bell me-5" style={{ fontSize: '1.2rem' }}></i>
                        <img className='profile-img' src="https://i.pinimg.com/originals/c6/89/95/c68995aa24906a1320b4d7d10aa374b2.png" alt="img" />
                        <button className='btn-profile'>
                            <span style={{ color: 'white' }}>{user.email.split('@')[0]}</span><i className="fa-solid fa-chevron-down ms-2"></i>
                        </button>
                    </div>
                </div>
            </nav>
            <Outlet />
        </div>
    )
}
