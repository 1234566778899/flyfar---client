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
                        <p className='description-main'>Aquí podrás poner a prueba tus habilidades de programación y competir con otros estudiantes universitarios.</p>
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
                <br />
                <div className='text-center' style={{ display: 'flex', justifyContent: 'center' }}>
                    <h1 className='text-center fw-bold title-info'>Desafíos individuales y grupales para poner a prueba tus habilidades de programación</h1>
                </div>
                <br />
                <br />
                <br />
                <br />
                <div className='text-center info mb-5'>
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
                <br />
                <br />
            </section>
            <footer className='bg-dark text-white py-5  '>
                <div class="container">
                    <div className='row'>
                        <div className='col-md-3'>
                            <h3 >Sobre FlyFar</h3>
                            <p class="text-sm">
                                FlyFar es una plataforma innovadora que utiliza inteligencia artificial generativa para crear desafíos de programación personalizados para estudiantes universitarios, ayudándolos a mejorar sus habilidades en programación de manera eficiente y entretenida.
                            </p>
                        </div>
                        <div className='col-md-3'>
                            <h3 className='ms-3'>Accesos rápidos</h3>
                            <ul style={{ listStyle: 'none' }}>
                                <li class="mb-2"><a href="terms" target='_blank' class="text-white">Términos y condiciones</a></li>
                                <li class="mb-2"><a href="politycs" target='_blank' class="text-white">Politicas de privacidad</a></li>
                                <li class="mb-2"><a href="#asks" class="text-white">Preguntas frecuentes</a></li>
                                <li class="mb-2"><a href="#contact" class="text-white">Contáctanos</a></li>
                            </ul>
                        </div>
                        <div className='col-md-3'>
                            <h3>Contacto</h3>
                            <p >Email: <a href="mailto:support@comyapp.com" class="text-white">ordazhoyos2001@gmail.com</a></p>
                            <p >Teléfono: +51 904 435631</p>
                            <p >Dirección: Lima, Perú</p>
                        </div>
                        <div className='col-md-3'>
                            <h3 className='ms-3'>Redes sociales</h3>
                            <div>
                                <ul style={{ listStyle: 'none' }}>
                                    <li class="mb-2">
                                        <a href="#" className='text-white' >
                                            <i class="fab fa-facebook fa-lg text-white me-2"></i>Facebook</a>
                                    </li>
                                    <li class="mb-2">
                                        <a href="#" className='text-white'>
                                            <i class="fab fa-twitter fa-lg text-white me-2"></i>Twiter</a></li>
                                    <li class="mb-2">
                                        <a href="#" className='text-white'>
                                            <i class="fab fa-instagram fa-lg text-white me-2"></i>Instagram</a></li>
                                    <li class="mb-2">
                                        <a href="#" className='text-white' >
                                            <i class="fa-brands fa-tiktok text-white me-2"></i>Tiktok</a>
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
