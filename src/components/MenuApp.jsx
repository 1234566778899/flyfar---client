import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContextApp'

export const MenuApp = () => {
    const { auth } = useContext(AuthContext);

    return (
        <div className='card-menu'>
            <div>Ver mi perfil</div>
            <div>Amigos</div>
            <div>Dashboard</div>
            <div onClick={() => auth.signOut()} >Cerrar sesión...</div>
        </div>
    )
}
