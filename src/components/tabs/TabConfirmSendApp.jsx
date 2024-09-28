import React from 'react'

export const TabConfirmSendApp = ({ close, fnConfirm }) => {
    return (
        <div className='tab-confirm inter'>
            <div style={{ width: '450px' }}>
                <h3 className='fw-bold'>¿Seguro de enviar la prueba?</h3>
                <p className='mt-1' style={{ fontSize: '0.9rem' }}>Recuerda que esta prueba es muy importante, verifica muy bien tus respuestas</p>
                <div className='mt-3' style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button className='btn-cancel' onClick={() => close()}>Cancelar</button>
                    <button className='btn-accept' onClick={() => fnConfirm()}>Aceptar</button>
                </div>
            </div>
        </div>
    )
}
