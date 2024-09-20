import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContextApp'
import { useNavigate } from 'react-router-dom';

export const MenuApp = () => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    return (
        <div className='card-menu'>
            <div onClick={() => navigate('/admin/profile')}>Ver mi perfil</div>
            <div onClick={() => navigate('/admin/friends')}>Amigos</div>
            <div onClick={() => navigate('/admin/dashboard')}>Dashboard</div>
            <div onClick={() => auth.signOut()} >Cerrar sesión...</div>
        </div>
    )
}
