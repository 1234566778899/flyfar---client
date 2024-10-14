import React, { useState } from 'react';
export const TabSkipApp = ({ close, fnAccept }) => {
    const [hoveredButton, setHoveredButton] = useState(null); // Estado para saber cuál botón está siendo hovereado

    return (
        <div className='tab-confirm inter'>
            <div style={{ width: '400px' }}>
                <div className='text-center'>
                    {hoveredButton === 'cancel' && <span style={{ fontSize: '3rem' }}>🙃</span>}
                    {hoveredButton === 'accept' && <span style={{ fontSize: '3rem' }}>😟</span>}
                    {!hoveredButton && (<span style={{ fontSize: '3rem' }}>🥲</span>)}
                </div>
                <h3 className='fw-bold inter text-center'>¿Estas seguro de eliminar este desafío?</h3>
                <div
                    className='mt-4'
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '0px 20px'
                    }}
                >
                    <button
                        className='btn-cancel'
                        onMouseEnter={() => setHoveredButton('cancel')} // Detecta cuando el mouse está sobre el botón
                        onMouseLeave={() => setHoveredButton(null)} // Detecta cuando el mouse deja de estar sobre el botón
                        onClick={() => close()}
                    >
                        Cancelar
                    </button>
                    <button
                        className='btn-accept'
                        onMouseEnter={() => setHoveredButton('accept')}
                        onMouseLeave={() => setHoveredButton(null)}
                        onClick={() => fnAccept()}
                    >
                        Aceptar
                    </button>
                </div>
            </div>
        </div>
    );
};
