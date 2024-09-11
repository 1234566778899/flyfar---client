import React from 'react'
import { useNavigate } from 'react-router-dom'

export const GameApp = () => {
    const navigate = useNavigate();
    return (
        <div className='container'>
            <div className='pe-3'>
                <br />
                <h3>Coding Challengue:  Fibonacci Secuence</h3>
                <div className='content-menu'>
                    <div>
                        <button>Problema</button>
                        <button>Envios</button>
                    </div>
                </div>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur sapiente vero inventore voluptatem ducimus quas optio. Aliquid inventore autem deserunt temporibus ipsa eveniet perferendis dolorem repudiandae ex, delectus nesciunt non? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda accusantium commodi sequi repellat minima, iure quo earum suscipit dolor quae esse tempora temporibus odit molestias enim vel. Officia, dicta voluptates.</p>
                <h4>Restricciones</h4>
                <ul>
                    <li>0 {'<='} n {'<='} n</li>
                </ul>
                <h4>Editor de Código</h4>
                <textarea type="text" multiple className='inp-editor' style={{ height: '300px' }} />
                <button className='btn-main px-4'>Test</button>
                <button className='btn-main px-4 ms-3' onClick={() => navigate('/admin/resume')}>Submit</button>
                <br />
                <br />
                <h4>Console Input</h4>
                <textarea type="text" multiple className='inp-editor' style={{ height: '200px' }} />
            </div>

        </div>
    )
}
