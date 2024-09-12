import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Game.css'
import { MainContext } from '../contexts/MainContextApp';
export const GameApp = () => {
    const navigate = useNavigate();
    const [optionActive, setOptionActive] = useState('problem');
    const [pag, setpag] = useState(0);
    const { challenge } = useContext(MainContext);
    if (!challenge) {
        return navigate('/admin/dashboard')
    }
    return (
        <div className='container'>
            <div className='pe-3'>
                <br />
                <h3>{challenge.tasks[pag].title}</h3>
                <div className='content-menu mt-3'>
                    <div>
                        <button
                            onClick={() => setOptionActive('problem')} className={`ms-3 menu-option ${optionActive == 'problem' ? 'menu-active' : ''}`}>Problema</button>
                        <button
                            onClick={() => setOptionActive('send')}
                            className={`ms-3 menu-option ${optionActive == 'send' ? 'menu-active' : ''}`}>Envios</button>
                    </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '70% 30%' }}>
                    <div>
                        <p className='mt-4' style={{ color: '#39424E' }}>Wayki asiste al cine con su novia y solo encuentra una fila deasientos libres. Ahora él desea saber de cuántas maneras distintas se pueden sentar, dado que quieren estar en asientos juntos.</p>
                        <h6 style={{ fontWeight: 'bold', color: '#39424E' }}>Formato de entrada</h6>
                        <p style={{ color: '#39424E' }}>La entrada consta de un entero., indicando el número de asientos libres.</p>
                        <h6 style={{ fontWeight: 'bold', color: '#39424E' }}>Restricciones</h6>
                        <p>{`2 <= n <= 20`}</p>
                        <h6 style={{ fontWeight: 'bold', color: '#39424E', marginTop: '15px' }}>Formato de salida</h6>
                        <p>Imprime el número de formas en que Wayki y su novia se pueden sentar.</p>
                        <h6 style={{ fontWeight: 'bold', color: '#39424E' }}>Entrada de muestra 1</h6>
                        <div style={{ background: '#F4FAFF', padding: '15px 10px' }}>
                            <span className='ms-2'>2</span>
                        </div>
                        <h6 style={{ fontWeight: 'bold', color: '#39424E', marginTop: '15px' }}>Ejemplo de salida 1</h6>
                        <div style={{ background: '#F4FAFF', padding: '15px 10px' }}>
                            <span className='ms-2'>2</span>
                        </div>
                        <h6 style={{ fontWeight: 'bold', color: '#39424E', marginTop: '15px' }}>Explicación 1</h6>
                        <div style={{ background: '#F4FAFF', padding: '15px 10px' }}>
                            <span className='ms-2'>2</span>
                        </div>

                    </div>
                    <div>

                    </div>
                </div>
                <br />
                <textarea type="text" multiple className='inp-editor' style={{ height: '300px' }} />
                <div className='text-end mt-2'>
                    {/* <input type="file" /> */}
                    <div>
                        <button className='btn-test'>Test</button>
                        <button className='btn-submit ms-3' onClick={() => navigate('/admin/resume')}>Submit</button>
                    </div>
                </div>
                <br />
                <br />
                <h4>Console Input</h4>
                <textarea type="text" multiple className='inp-editor' style={{ height: '200px' }} />
            </div>

        </div>
    )
}
