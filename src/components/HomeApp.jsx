import React from 'react'
import '../styles/Home.css'
import { useNavigate } from 'react-router-dom';
export const HomeApp = () => {
    const navigate = useNavigate();
    return (
        <div className='contenido inter' id='inicio' style={{ background: '#1D2026', color: 'white' }}>
            <section className='contenedor header' >
                <div className="container" style={{ height: '100%' }}>
                    <nav>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img style={{ width: '20px' }} src='https://preview.cruip.com/solid/dist/images/logo.svg' alt="logo" />
                            <span className='ms-2' style={{ fontSize: '1.1rem' }}>Flyfire</span>
                        </div>
                        <ul className='menu-home'>
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
                        <h1 className='text-center fw-bold title-main'>¡Bienvenido a nuestra plataforma de desafíos!</h1>
                        <p className='description-main' style={{ color: '#8A94A7' }}>Aquí podrás poner a prueba tus habilidades de programación y competir con otros estudiantes universitarios.</p>
                        <div>
                            <a style={{ fontSize: '1rem', textDecoration: 'none' }} href='#desafios' className='btn-l btn-explore'>Explorar</a>
                            <button
                                onClick={() => navigate('/register')}
                                style={{ fontSize: '1rem' }} className='btn-register ms-4 btn-l'>Registrate</button>
                        </div>
                        <br />
                        <br />
                        <br />
                    </div>
                </div>
            </section>
            <section className='container' id='desafios'>
                <br />
                <br />
                <div className='text-center' style={{ display: 'flex', justifyContent: 'center' }}>
                    <h1 className='text-center fw-bold title-info mb-5'>Desafíos individuales y grupales para poner a prueba tus habilidades de programación</h1>
                </div>
                <div className='text-center info mb-5 mt-5'>
                    <div>
                        <img style={{ height: '200px' }} src='https://preview.cruip.com/solid/dist/images/feature-icon-01.svg' alt="img" />
                        <h4 className='fw-bold mt-4'>Mejora tus habilidades de programación y compite</h4>
                        <p className='mt-3' style={{ color: '#8A94A7' }}>Con nuestra plataforma, podrás mejorar tus habilidades de programación mientras compites con otros estudiantes. </p>
                    </div>
                    <div>
                        <img style={{ height: '200px' }} src='https://preview.cruip.com/solid/dist/images/feature-icon-02.svg' alt="img" />
                        <h4 className='fw-bold mt-4'>Mide tu rendimiento y compáralo con otros usuarios en los rankingss</h4>
                        <p className='mt-3' style={{ color: '#8A94A7' }}>Desafía a otros usuarios en emocionantes desafíos grupales y demuestra quién es el mejor programador</p>
                    </div>
                    <div>
                        <img style={{ height: '200px' }} src='https://preview.cruip.com/solid/dist/images/feature-icon-03.svg' alt="img" />
                        <h4 className='fw-bold mt-4'>Gana recompensas y comparte tus logros en redes sociales</h4>
                        <p className='mt-3' style={{ color: '#8A94A7' }}>Obtén puntos, medallas e insignias por tus logros y presume de ellos en tus perfiles sociales</p>
                    </div>
                </div>
                <br />
                <br />
            </section>
            <footer className='py-5' style={{ background: '#242830' }}>
                <div className="container">
                    <div className='row'>
                        <div className='col-md-3'>
                            <h3 >Sobre FlyFar</h3>
                            <p style={{ color: '#8A94A7' }}>
                                FlyFar es una plataforma innovadora que utiliza inteligencia artificial generativa para crear desafíos de programación personalizados para estudiantes universitarios, ayudándolos a mejorar sus habilidades en programación de manera eficiente y entretenida.
                            </p>
                        </div>
                        <div className='col-md-3'>
                            <h3 className='ms-3'>Accesos rápidos</h3>
                            <ul style={{ listStyle: 'none' }}>
                                <li className="mb-2"><a style={{ color: '#8A94A7' }} href="terms" target='_blank'>Términos y condiciones</a></li>
                                <li className="mb-2"><a href="politycs" target='_blank' style={{ color: '#8A94A7' }}>Politicas de privacidad</a></li>
                                <li className="mb-2"><a href="#asks" style={{ color: '#8A94A7' }}>Preguntas frecuentes</a></li>
                                <li className="mb-2">
                                    <a href="https://wa.me/+51904435631" target="_blank" rel="noopener noreferrer" style={{ color: '#8A94A7' }}>Contáctanos</a>
                                </li>

                            </ul>
                        </div>
                        <div className='col-md-3'>
                            <h3>Contacto</h3>
                            <p style={{ color: '#8A94A7' }}>Email: <a style={{ color: '#8A94A7' }} href="mailto:support@comyapp.com">ordazhoyos2001@gmail.com</a></p>
                            <p style={{ color: '#8A94A7' }}>Teléfono: +51 904 435631</p>
                            <p style={{ color: '#8A94A7' }}>Dirección: Lima, Perú</p>
                        </div>
                        <div className='col-md-3'>
                            <h3 className='ms-3'>Redes sociales</h3>
                            <div>
                                <ul style={{ listStyle: 'none' }}>
                                    <li className="mb-2">
                                        <a style={{ color: '#8A94A7' }} href="#"  >
                                            <i style={{ color: '#0270D7' }} className="fab fa-facebook fa-lg me-2"></i>Facebook</a>
                                    </li>
                                    <li className="mb-2">
                                        <a style={{ color: '#8A94A7' }} href="#" >
                                            <i style={{ color: '#0270D7' }} className="fab fa-twitter fa-lg me-2"></i>Twiter</a></li>
                                    <li className="mb-2">
                                        <a style={{ color: '#8A94A7' }} href="#" >
                                            <i style={{ color: '#0270D7' }} className="fab fa-instagram fa-lg me-2"></i>Instagram</a></li>
                                    <li className="mb-2">
                                        <a style={{ color: '#8A94A7' }} href="#"  >
                                            <i style={{ color: '#0270D7' }} className="fa-brands fa-tiktok me-2"></i>Tiktok</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
                <div >
                    <p className='text-center mt-4'>&copy; 2024 Flyfar. All rights reserved.</p>
                </div>
            </footer >

        </div >
    )
}
