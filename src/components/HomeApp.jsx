import React from 'react'
import '../styles/Home.css'
import fondoVideo from '../assets/fondo.mp4';
import { useNavigate } from 'react-router-dom';
export const HomeApp = () => {
    const navigate = useNavigate();
    return (
        <div className='contenido inter' id='inicio'>
            <section className='contenedor'>
                <video src={fondoVideo} autoPlay loop muted></video>
                <div className="container" style={{ height: '100%' }}>
                    <nav>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img style={{ width: '30px' }} src={require('../assets/logo.png')} alt="logo" />
                            <span className='ms-2' style={{ fontSize: '1.1rem' }}>Flyfire</span>
                        </div>
                        <ul style={{ cursor: 'pointer' }}>
                            <li>
                                <a className='ancla' href="#inicio">Inicio</a>
                            </li>
                            <li>
                                <a className='ancla' href="#desafios">Desafios</a>
                            </li>
                            {/* <li>
                                <a href="#rankings">Rankings</a>
                            </li> */}
                            <li>
                                <button className='btn-r' onClick={() => navigate('/register')}>Registrarse</button>
                            </li>
                            <li>
                                <button className='btn-i' onClick={() => navigate('/login')}> Iniciar</button>
                            </li>
                        </ul>
                    </nav>
                    <div style={{ flexDirection: 'column', color: 'white', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <h2 className='text-center fw-bold' style={{ fontSize: '4rem', width: '60%' }}>¡Bienvenido a nuestra plataforma de desafíos!</h2>
                        <p>Aquí podrás poner a prueba tus habilidades de programación y competir con otros estudiantes universitarios.</p>
                        <div>
                            <a style={{ fontSize: '1rem', textDecoration: 'none' }} href='#desafios' className='btn-r px-4 py-2'>Explorar</a>
                            <button
                                onClick={() => navigate('/register')}
                                style={{ fontSize: '1rem', padding: '9px 0px' }} className='btn-i ms-4 px-4'>Registrate</button>
                        </div>
                        <br />
                        <br />
                        <br />
                    </div>
                </div>
            </section>
            <section className='container' id='desafios'>
                <br />
                <div className='text-center' style={{ display: 'flex', justifyContent: 'center' }}>
                    <h1 className='text-center fw-bold' style={{ width: '70%' }}>Desafíos individuales y grupales para poner a prueba tus habilidades de programación</h1>
                </div>
                <br />
                <br />
                <br />
                <br />
                <div className='text-center' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '30px' }}>
                    <div>
                        <img style={{ height: '200px' }} src={require('../assets/p1.png')} alt="img" />
                        <h4 className='fw-bold mt-3'>Mejora tus habilidades de programación y compite</h4>
                        <p>Con nuestra plataforma, podrás mejorar tus habilidades de programación mientras compites con otros estudiantes. </p>
                    </div>
                    <div>
                        <img style={{ height: '200px' }} src={require('../assets/p2.png')} alt="img" />
                        <h4 className='fw-bold mt-3'>Mide tu rendimiento y compáralo con otros usuarios en los rankingss</h4>
                        <p>Desafía a otros usuarios en emocionantes desafíos grupales y demuestra quién es el mejor programador</p>
                    </div>
                    <div>
                        <img style={{ height: '200px' }} src={require('../assets/p3.png')} alt="img" />
                        <h4 className='fw-bold mt-3'>Gana recompensas y comparte tus logros en redes sociales</h4>
                        <p>Obtén puntos, medallas e insignias por tus logros y presume de ellos en tus perfiles sociales</p>
                    </div>
                </div>
            </section>
        </div>
    )
}
