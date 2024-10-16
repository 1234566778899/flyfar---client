import React, { useState } from 'react'
import { showInfoToast } from '../../utils/showInfoToast';

export const TabConfTestApp = ({ close, fnConfirm, isLoading }) => {
    const [lenguaje, setLenguaje] = useState('');
    return (
        <div className='tab-test'>
            <div style={{ position: 'relative' }}>
                <i onClick={() => close()} style={{ position: 'absolute', right: '20px', cursor: 'pointer' }} className="fa-solid fa-xmark"></i>
                <h3 className='fw-bold'>Antes de iniciar la prueba</h3>
                <p>Esta prueba nos ayudara a saber en que nivel de programación te encuentras, a partir de esto de enviaremos defasios acorde a tu nivel.</p>
                <div className='mt-2'>
                    <select onClick={(e) => setLenguaje(e.target.value)}>
                        <option value="">Seleccione el lenguaje de preferencia</option>
                        <option value="C++">C++</option>
                        <option value="Python">Python</option>
                        <option value="C#">C#</option>
                        <option value="Java">Java</option>
                        <option value="Javascript">Javascript</option>
                    </select>
                </div>
                <button onClick={() => lenguaje == '' ? showInfoToast('Debe seleccionar un lenguaje') : fnConfirm(lenguaje)} className='mt-3'>
                    {
                        isLoading && (<i className="fa-solid fa-spinner icon-load me-2"></i>)
                    }
                    Iniciar sesión
                </button>
            </div>
        </div>
    )
}
