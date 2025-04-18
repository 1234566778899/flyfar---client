import React, { useRef, useState } from 'react'
import '../styles/Home.css'
import { useNavigate } from 'react-router-dom';
export const HomeApp = () => {
    const menuRef = useRef();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        menuRef.current.classList.toggle('menu-active');
    };
    const navigate = useNavigate();
    return (
        <div className='inter'>
            <nav style={{ padding: '20px 0px' }}>
                <div className='container' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <a style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', textDecoration: 'none' }} href='#init'>
                        <img src="https://images.vexels.com/media/users/3/331161/isolated/preview/2a386615007f32659a8112824aea895b-icono-de-chip-de-cpu.png" alt="log" style={{ width: '30px', height: '30px' }} />
                        <span className='ms-2' style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#977EF5' }}>Flyfar</span>
                    </a>
                    <div className='nav-items' ref={menuRef}>
                        <span className='link-span'>
                            <a href="#about">Características</a>
                        </span>
                        <span className='link-span'>
                            <a href="#uso">Como funciona</a>
                        </span>
                        <span className='link-span'>
                            <a href="#testimonios">Testimonios</a>
                        </span>
                        <span className='link-span'><button className='btn-register' onClick={() => navigate('/register')}>Registrarse</button></span>
                    </div>
                    {
                        !menuOpen ?
                            <button className='btn-toggle' onClick={toggleMenu}>
                                <i className="fa-solid fa-bars"></i>
                            </button>
                            :
                            <button className='btn-toggle' onClick={toggleMenu}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                    }
                </div>
            </nav>
            <div className='min'>
                <section className='container section-main' id='init'>
                    <div >
                        <h1 className='fw-bold main-title' style={{ fontSize: '3rem' }}>
                            <span style={{ color: '#9A86F5' }}>Desafíos de Programación <span style={{ color: 'black' }}>Generados por IA para tu Crecimiento</span></span>
                        </h1>
                        <p className='mt-4 main-title' style={{ fontSize: '1.2rem' }}>Aprende a programar con desafíos personalizados a tu nivel, generados por inteligencia artificial, con feedback instantáneo y una experiencia gamificada.</p>
                        <div className='mt-4 main-title'>
                            <button className='btn-comenzar' onClick={() => navigate('/register')}>Comenzar gratis</button>
                            <button className='btn-ver-demo ms-3' onClick={() => navigate('/register')}>Ver demo <i className="ms-3 fa-solid fa-arrow-right"></i></button>
                        </div>
                        <div className='mt-4 info-main-1'>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div className='bola verde'></div>
                                <span className='ms-2' style={{ color: 'gray' }}>10,000+ Estudiantes</span>
                            </div>
                            <div className='ms-2' style={{ display: 'flex', alignItems: 'center' }}>
                                <div className='bola azul'></div>
                                <span className='ms-2' style={{ color: 'gray' }}>+50 Universidades</span>
                            </div>
                        </div>
                    </div>
                    <div className='main-aux' style={{ position: 'relative' }}>
                        <div className='side-1'></div>
                        <div className='card-code'>
                            <div className='code'>
                                <span style={{ color: '#7E69AB' }}>// Desafío generado por IA según tu nivel</span> <br />
                                <span>function resolverAlgoritmo(arr){' {'}</span> <br />
                                <span>   // ¿Puedes completar esta función para</span> <br />
                                <span> // encontrar el elemento que aparece más veces?</span> <br /> <br />
                                <span>  // Tu código aquí...</span>
                            </div>
                            <div className='mt-3' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: '#8C5EF6', background: '#E8DEFD', padding: '3px 7px', borderRadius: '10px', fontWeight: 'bold', fontSize: '0.8rem' }}>Nivel intermedio</span>
                                <button className='btn-register' onClick={() => navigate('/register')}>Resolver</button>
                            </div>

                        </div>
                        <div className='side-2'></div>
                    </div>
                </section>
            </div>
            <section style={{ marginTop: '100px' }} >
                <div className='section-info'>
                    <div className='item-2'>
                        <i className="fa-solid fa-users icon-2"></i>
                        <span>10,000+</span>
                        <h6>Estudiantes activos</h6>
                    </div>
                    <div className='item-2'>
                        <i className="fa-solid fa-code icon-2"></i>
                        <span>500,000+</span>
                        <h6>Desafios resueltos</h6>
                    </div>
                    <div className='item-2'>
                        <i className="fa-solid fa-medal icon-2"></i>
                        <span>50+</span>
                        <h6>Universidades asociadas</h6>
                    </div>
                    <div className='item-2'>
                        <i className="fa-solid fa-book-open icon-2"></i>
                        <span>15+</span>
                        <h6 className='text-center'>Lenguajes de programación</h6>
                    </div>
                </div>
            </section>
            <section id='about' className='container' style={{ marginTop: '100px' }}>
                <div className='text-info-2'>
                    <h1 className='text-center fw-bold'>Potencia tu Aprendizaje con Tecnología Avanzada</h1>
                    <p className='text-center mt-3' style={{ fontSize: '1.2rem' }}>Nuestra plataforma combina inteligencia artificial con metodologías pedagógicas probadas para acelerar tu dominio de la programación.</p>
                </div>
                <div className='benefit'>
                    <div>
                        <i className="fa-solid fa-brain"></i>
                        <h5 className='fw-bold mt-4'>IA Generativa</h5>
                        <p>Problemas creados y adaptados a tu nivel por inteligencia artificial avanzada.</p>
                    </div>
                    <div>
                        <i className="fa-solid fa-chart-simple"></i>
                        <h4 className='fw-bold mt-4'>Progreso Adaptativo</h4>
                        <p>Aumenta la dificultad conforme mejoras tus habilidades de programación.</p>
                    </div>
                    <div>
                        <i className="fa-solid fa-message"></i>
                        <h4 className='fw-bold mt-4'>Feedback Inmediato</h4>
                        <p>Recibe comentarios instantáneos sobre tu código y sugerencias de mejora.</p>
                    </div>
                    <div>
                        <i className="fa-solid fa-microchip"></i>
                        <h4 className='fw-bold mt-4'>Múltiples Lenguajes</h4>
                        <p>Aprende Python, JavaScript, Java, C++ y muchos otros lenguajes.</p>
                    </div>
                    <div>
                        <i className="fa-solid fa-trophy"></i>
                        <h4 className='fw-bold mt-4'>Gamificación</h4>
                        <p>Problemas creados y adaptados a tu nivel por inteligencia artificial avanzada.</p>
                    </div>
                    <div>
                        <i className="fa-solid fa-bolt"></i>
                        <h4 className='fw-bold mt-4'>Rendimiento Académico</h4>
                        <p>Mejora tus resultados en cursos de programación universitarios.</p>
                    </div>
                </div>
            </section>
            <section id='uso' style={{ marginTop: '100px' }}>
                <h2 className='text-center fw-bold'>Cómo Funciona Flyfar</h2>
                <p className='text-center mt-3' style={{ fontSize: '1.2rem' }}>Un proceso simple y efectivo diseñado para maximizar tu aprendizaje y mantener tu motivación.</p>
                <br />
                <div className='container mt-5 section-uso'>
                    <div className='item-3'>
                        <div className='number'>01</div>
                        <h3 className='fw-bold mt-3'>Evaluación Inicial</h3>
                        <p>Al registrarte, nuestra IA evalúa tu nivel actual de conocimientos en programación.</p>
                        <div>
                            <p>✅ Test de habilidades adaptativo</p>
                            <p>✅ Identificación de fortalezas y debilidades</p>
                            <p>✅ Personalización de ruta de aprendizaje</p>
                        </div>
                    </div>
                    <div className='paso-1'>PASO 01</div>
                    <div className='paso-2'>PASO 02</div>
                    <div className='item-3 mt-3'>
                        <div className='number'>02</div>
                        <h3 className='fw-bold'>Desafíos Personalizados</h3>
                        <p>Recibe desafíos de programación generados por IA específicamente para tu nivel y objetivos.</p>
                        <div>
                            <p>✅ Problemas relevantes a tu perfil</p>
                            <p>✅ Dificultad progresiva</p>
                            <p>✅ Enfoque en tus áreas de mejora</p>
                        </div>
                    </div>
                    <div className='item-3 mt-3'>
                        <div className='number'>03</div>
                        <h3 className='fw-bold'>Práctica y Feedback</h3>
                        <p>Resuelve los problemas y recibe retroalimentación detallada e instantánea sobre tu código.</p>
                        <div>
                            <p>✅ Análisis de eficiencia de código</p>
                            <p>✅ Sugerencias de optimización</p>
                            <p>✅ Explicaciones detalladas</p>
                        </div>
                    </div>
                    <div className='paso-1'>PASO 03</div>
                    <div className='paso-2'>PASO 04</div>
                    <div className='item-3 mt-3'>
                        <div className='number'>04</div>
                        <h3 className='fw-bold'>Seguimiento y Progreso</h3>
                        <p>Visualiza tu mejora con métricas claras y celebra tus logros mediante gamificación.</p>
                        <div>
                            <p>✅ Estadísticas de rendimiento</p>
                            <p>✅ Insignias y recompensas</p>
                            <p>✅ Seguimiento de objetivos académicos</p>
                        </div>
                    </div>
                </div>
            </section>
            <section id='testimonios' style={{ marginTop: '100px' }}>
                <div className='text-info-3'>
                    <h1 className='text-center fw-bold'>Lo Que Dicen Nuestros Usuarios</h1>
                    <p className='text-center mt-3' style={{ fontSize: '1.2rem' }}>Estudiantes y profesores de todo el país confían en Flyfar para mejorar sus habilidades de programación.</p>
                </div>
                <br />
                <div className='container mt-5 section-test'>
                    <div>
                        <div style={{ color: '#FACC15' }}>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                        </div>
                        <p className='mt-3'>"Flyfar me ha ayudado a reforzar los conceptos aprendidos en clase y a prepararme para los exámenes. Los desafíos personalizados se adaptan perfectamente a mi nivel y me ayudan a mejorar constantemente."</p>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div className='name-letra'>L</div>
                            <div className='ms-3'>
                                <span className='fw-bold'>Laura Martínez</span>
                                <div style={{ fontSize: '0.95rem', color: 'gray' }}>
                                    <span>Estudiante de Ingeniería Informática</span>
                                    <br />
                                    <span>Universidad Autónoma de Madrid</span>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div>
                        <div style={{ color: '#FACC15' }}>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                        </div>
                        <p className='mt-3'>"Lo que más me gusta es el feedback inmediato. No solo me dice si mi solución es correcta, sino que me explica cómo mejorarla. He notado una gran mejora en mis calificaciones desde que comencé a usar la plataforma."</p>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div className='name-letra'>L</div>
                            <div className='ms-3'>
                                <span className='fw-bold'>Carlos Rodríguez</span>
                                <div style={{ fontSize: '0.95rem', color: 'gray' }}>
                                    <span>Estudiante de Ciencias de la Computación</span>
                                    <br />
                                    <span>Universidad de Barcelona</span>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div>
                        <div style={{ color: '#FACC15' }}>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                        </div>
                        <p className='mt-3'>"Como profesor, recomiendo Flyfar a todos mis estudiantes. La generación de problemas mediante IA ofrece una variedad infinita de ejercicios que complementan perfectamente mi plan de estudios."</p>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div className='name-letra'>L</div>
                            <div className='ms-3'>
                                <span className='fw-bold'>Miguel Ángel Suárez</span>
                                <div style={{ fontSize: '0.95rem', color: 'gray' }}>
                                    <span>Profesor de Algoritmos</span>
                                    <br />
                                    <span>Universidad Politécnica de Madrid</span>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </section>
            <section className='section-last'>
                <div className='card-3'>
                    <h1 className='fw-bold text-center'>Comienza Tu Viaje de Aprendizaje Hoy</h1>
                    <p className='text-center mt-4' style={{ fontSize: '1.1rem' }}>Únete a miles de estudiantes que están mejorando sus habilidades de programación con desafíos personalizados por IA.</p>
                    <div className='block-btn mt-5'>
                        <button className='btn-comenzar' onClick={() => navigate('/register')}>Crear cuenta gratuita</button>
                        <button className='btn-ver-demo' onClick={() => navigate('/register')}>Conocer planes premiun <i className="ms-3 fa-solid fa-arrow-right"></i> </button>
                    </div>
                    <div className='mt-4 section-planes'>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div className='bola verde'></div>
                            <span className='ms-2'>Sin tarjeta de crédito requerida</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div className='bola azul'></div>
                            <span className='ms-2'>14 días de acceso completo</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div className='bola morado'></div>
                            <span className='ms-2'>Cancela cuando quieras</span>
                        </div>
                    </div>
                </div>
            </section>
            <footer style={{ background: '#221F26', color: 'white', padding: '50px 0' }}>
                <div className='container section-footer'>
                    <div>
                        <h5 style={{ color: '#9983F5', fontWeight: 'bold' }}>Flyfar</h5>
                        <p style={{ color: '#9CA3A2' }}>Desafíos de programación personalizados con IA para estudiantes universitarios.</p>
                        <div style={{ display: 'flex', gap: '15px', color: '#9CA3A2', fontSize: '1.3rem' }}>
                            <i className="link-p fa-brands fa-twitter"></i>
                            <i className="link-p fa-brands fa-github"></i>
                            <i className="link-p fa-brands fa-linkedin"></i>
                            <i className="link-p fa-brands fa-instagram"></i>
                        </div>
                    </div>
                    <div>
                        <h5 className='fw-bold title-f'>Plataforma</h5>
                        <div style={{ color: '#9CA3A2' }}>
                            <p className='link-p'>Características</p>
                            <p className='link-p'>Planes de Precios</p>
                            <p className='link-p'>Para Universidades</p>
                            <p className='link-p'>Para Profesores</p>
                        </div>
                    </div>
                    <div>
                        <h5 className='fw-bold title-f'>Recursos</h5>
                        <div style={{ color: '#9CA3A2' }}>
                            <p className='link-p'>Blog</p>
                            <p className='link-p'>Documentación</p>
                            <p className='link-p'>Tutoriales</p>
                            <p className='link-p'>FAQs</p>
                        </div>
                    </div>
                    <div>
                        <h5 className='fw-bold title-f'>Legal</h5>
                        <div style={{ color: '#9CA3A2' }}>
                            <p className='link-p' onClick={() => navigate('/terms')}>Términos de Servicio</p>
                            <p className='link-p' onClick={() => navigate('/politycs')}>Política de Privacidad</p>
                            <p className='link-p' onClick={() => navigate('/')}>Cookies</p>
                        </div>
                    </div>
                </div>
                <hr />
                <p className='text-center mt-4' style={{ color: '#9CA3A2' }}>© 2025 Flyfar. Todos los derechos reservados.</p>
            </footer>
        </div >
    )
}
