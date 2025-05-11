import React from 'react'
import { useNavigate } from 'react-router-dom'

export const TermsApp = () => {
    const navigate = useNavigate();
    return (
        <>
            <div style={{ background: 'black', display: 'flex', alignItems: 'center', color: 'white', alignItems: 'center' }}>
                <nav className='container' style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img style={{ height: '25px' }} src={require('../assets/logo_white.png')} alt="logo" />
                    </div>
                    <ul className='mt-3' style={{ display: 'flex', listStyle: 'none', gap: '20px', alignItems: 'center' }}>
                        <li>
                            <button className='btn-login px-3' onClick={() => navigate('/register')}>Registrarse</button>
                        </li>
                        <li>
                            <button className='btn-ver-demo' onClick={() => navigate('/login')}> Iniciar</button>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className='container inter'>
                <br />
                <h3 className='fw-bold'>Términos y Condiciones de Uso</h3>
                <span style={{ fontSize: '0.9rem' }}>Última actualización: 08/10/2024</span>
                <p className='mt-2'>Bienvenido a la plataforma web de desafíos de programación Flyfar, desarrollada para estudiantes universitarios de Lima Metropolitana. Antes de registrarte y utilizar nuestra plataforma, te pedimos que leas detenidamente estos Términos y Condiciones. Al registrarte y utilizar nuestra plataforma, aceptas cumplir con estos términos.</p>

                <h5 className='fw-bold'>1. Aceptación de los Términos</h5>
                <p>Al registrarte en la plataforma Flyfar, aceptas estos Términos y Condiciones en su totalidad. Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar nuestros servicios.</p>
                <h5 className='fw-bold'>2. Descripción del Servicio</h5>
                <p>Flyfar ofrece a los usuarios la posibilidad de participar en desafíos de programación generados mediante inteligencia artificial. Los usuarios pueden practicar de forma individual o en modo competitivo con otros participantes.</p>
                <h5 className='fw-bold'>3. Registro de Usuario</h5>
                <p>Para acceder a los servicios de la plataforma, es necesario crear una cuenta proporcionando información precisa y actualizada.
                    Los usuarios deben ser mayores de edad o contar con el permiso de un tutor legal si son menores.
                    Los datos proporcionados en el registro estarán sujetos a nuestra Política de Privacidad, que protege la información personal.</p>
                <h5 className='fw-bold'> 4. Uso Adecuado de la Plataforma</h5>
                <p> Al utilizar la plataforma, aceptas:

                    No utilizar la plataforma con fines ilegales o no autorizados.
                    No interferir en el funcionamiento de la plataforma, incluyendo pero no limitado a la introducción de virus o cualquier otro código malicioso.
                    No realizar actividades que violen los derechos de propiedad intelectual, confidencialidad o privacidad de otros usuarios.</p>
                <h5 className='fw-bold'> 5. Propiedad Intelectual</h5>
                <p>Todo el contenido de la plataforma, incluyendo los desafíos generados, el diseño y el código, son propiedad de Flyfar o de sus licenciantes. No se permite reproducir, distribuir ni modificar este contenido sin autorización previa por escrito.</p>

                <h5 className="fw-bold">6. Limitación de Responsabilidad</h5>
                <p> Flyfar no se responsabiliza por errores en los desafíos generados, fallos técnicos, o cualquier daño derivado del uso o la imposibilidad de uso de la plataforma. El uso de la plataforma es bajo tu propio riesgo.</p>

                <h5 className="fw-bold"> 7. Suspensión y Terminación de Cuentas</h5>
                <p>Nos reservamos el derecho de suspender o eliminar cuentas de usuario si se detecta alguna violación de estos Términos y Condiciones, o cualquier comportamiento inapropiado que afecte el correcto funcionamiento de la plataforma o a otros usuarios.</p>
                <h5 className="fw-bold">8. Modificaciones de los Términos</h5>
                <p>[Nombre de la Plataforma] se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Cualquier cambio será notificado a los usuarios registrados y la versión actualizada estará disponible en nuestra plataforma. El uso continuado del servicio después de la actualización implica la aceptación de los nuevos términos.</p>

                <h5 className="fw-bold"> 9. Política de Privacidad</h5>
                <p>El uso de tu información personal está regulado por nuestra Política de Privacidad, disponible [aquí], donde se describe cómo recolectamos, utilizamos y protegemos tus datos.</p>
                <h5 className="fw-bold">10. Ley Aplicable y Jurisdicción</h5>
                <p>Estos Términos y Condiciones se rigen por las leyes de [País o Región], y cualquier conflicto relacionado con el uso de la plataforma será resuelto en los tribunales de [Ciudad, País].</p>
                <h5 className="fw-bold">11. Contacto</h5>
                <p>Si tienes alguna pregunta sobre estos Términos y Condiciones, puedes contactarnos a través del correo: ordazhoyos2001@gmail.com</p>
                <br />
            </div>
        </>
    )
}
