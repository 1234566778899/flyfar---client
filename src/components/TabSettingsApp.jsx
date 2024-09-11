import React from 'react'

export const TabSettingsApp = ({ close }) => {
    return (
        <div className='tab-settings'>
            <div>
                <h6 style={{ color: '#A19C99', margin: 0 }}>AJUSTES GENERALES DE LA SALA</h6>
                <hr style={{ color: 'white', marginTop: '5px' }} />
                <div className="card-settings">
                    <div>
                        <div className='form-item'>
                            <span>LENGUAJE DE PROGRAMACIÓN</span>
                            <select >
                                <option value="C++">C++</option>
                                <option value="Python">Python</option>
                                <option value="C#">C#</option>
                                <option value="Java">Java</option>
                            </select>
                        </div>
                        <div className='form-item'>
                            <span>TIEMPO</span>
                            <input type="text" />
                        </div>
                    </div>
                    <div>
                        <div className='form-item'>
                            <span>N° DE EJERCICIOS</span>
                            <input type="text" />
                        </div>
                        <div className='form-item'>
                            <span>NIVEL</span>
                            <select >
                                <option value="">Principiante</option>
                                <option value="">Junior</option>
                                <option value="">Semi-senior</option>
                                <option value="">Senior</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div className='form-item'>
                            <span>TEMA</span>
                            <input type="text" />
                        </div>
                        <div className='form-item'>
                            <span>APUESTA</span>
                            <input type="text" />
                        </div>
                    </div>
                </div>
                <hr style={{ color: 'white' }} />
                <div className='d-flex justify-content-end'>
                    <button className='me-2 btn-accept'>ACEPTAR</button>
                    <button className='btn-cancel' onClick={() => close()}>CANCELAR</button>
                </div>
            </div>
        </div>
    )
}
