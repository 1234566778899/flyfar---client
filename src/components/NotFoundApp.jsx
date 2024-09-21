import React from 'react'
import { useNavigate } from 'react-router-dom'

export const NotFoundApp = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <h1 className='mt-3 fw-bold'>Página no encontrada</h1>
                <img className='mt-4' style={{ width: '300px' }} src="https://osaka.nyc3.cdn.digitaloceanspaces.com/GGF_s1_webp_o_06/sticker-fan_2366885_o.webp" alt="img" />
                <button onClick={() => navigate('/admin/dashboard')} className='btn-view-challenges mt-5'>Ir al dashboard</button>
            </div>
        </div>
    )
}
