import React from 'react'
import { useNavigate } from 'react-router-dom'

export const PolitycsApp = () => {
    const navigate = useNavigate();
    return (
        <>
            <div style={{ background: 'black', display: 'flex', alignItems: 'center' }}>
                <nav className='container'>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img style={{ width: '30px' }} src={require('../assets/logo.png')} alt="logo" />
                        <span className='ms-2' style={{ fontSize: '1.1rem' }}>Flyfire</span>
                    </div>
                    <ul className='menu-home'>
                        <li>
                            <button className='btn-r' onClick={() => navigate('/register')}>Registrarse</button>
                        </li>
                        <li>
                            <button style={{ background: '#0CB2FF' }} className='btn-i' onClick={() => navigate('/login')}> Iniciar</button>
                        </li>
                    </ul>
                </nav>


            </div>
            <div className='inter container'>
                <br />
                <h3 className='fw-bold'>Política de Privacidad</h3>
                <span style={{ fontSize: '0.9rem' }}>Última actualización: 08/10/2024</span>
                <p className='mt-2'>En Flyfar, nos comprometemos a proteger la privacidad de nuestros usuarios y a garantizar que tu información personal esté segura. Esta Política de Privacidad describe cómo recolectamos, utilizamos y protegemos los datos personales que nos proporcionas cuando utilizas nuestra plataforma.</p>
                <h5 className="fw-bold">1. Información que Recopilamos</h5>
                <p>  Al registrarte y usar nuestra plataforma, podemos recopilar los siguientes tipos de información:</p>
                <p>Información personal: Nombre, dirección de correo electrónico, institución educativa, y otros datos que proporciones durante el proceso de registro.
                    Datos de uso: Información sobre tu interacción con la plataforma, como el tipo de desafíos resueltos, el tiempo dedicado a ellos y los resultados obtenidos.
                    Datos técnicos: Dirección IP, tipo de navegador, dispositivo, y otros datos relacionados con el acceso a la plataforma.</p>
                <h5 className="fw-bold">2. Cómo Utilizamos tu Información</h5>
                <p> La información que recopilamos tiene los siguientes propósitos:  </p>
                <p>Mejora de la experiencia del usuario: Personalizar los desafíos y recomendaciones según tu nivel y preferencias.
                    Desarrollo de la plataforma: Analizar el comportamiento de los usuarios para optimizar las funcionalidades y el contenido de la plataforma.
                    Comunicaciones: Enviar notificaciones sobre actualizaciones de la plataforma, cambios en los Términos y Condiciones, o información relevante para los usuarios.
                    Seguridad: Proteger la integridad de tu cuenta y prevenir fraudes o accesos no autorizados.</p>
                <h5 className="fw-bold">3. Divulgación de Información a Terceros</h5>
                <p> No compartimos tu información personal con terceros, excepto en las siguientes circunstancias:

                </p>
                <p>Proveedores de servicios: Podemos compartir información con empresas que nos ayudan a operar y mejorar la plataforma, siempre bajo estrictas condiciones de confidencialidad.
                    Obligaciones legales: Podemos divulgar tu información cuando sea requerido por ley o para cumplir con un proceso legal, como una orden judicial.</p>
                <h5 className="fw-bold">4. Cookies y Tecnologías Similares </h5>
                <p> Utilizamos cookies y tecnologías similares para mejorar tu experiencia en nuestra plataforma, por ejemplo:</p>
                <p>Cookies de funcionalidad: Ayudan a recordar tus preferencias de usuario.
                    Cookies de análisis: Nos permiten recopilar datos sobre cómo utilizas la plataforma para mejorarla.
                    Puedes optar por deshabilitar las cookies en la configuración de tu navegador, aunque esto podría afectar la funcionalidad de la plataforma.</p>

                <h5 className="fw-bold"></h5>
                <p>En Flyfar, tomamos medidas de seguridad razonables para proteger tu información personal contra el acceso no autorizado, la pérdida o el uso indebido. Sin embargo, ningún sistema de seguridad es infalible, y no podemos garantizar la seguridad total de los datos.</p>

                <h5 className="fw-bold">6. Retención de la Información</h5>
                <p>Retendremos tu información personal mientras tu cuenta esté activa o mientras sea necesario para cumplir con los fines descritos en esta Política de Privacidad. Si deseas eliminar tu cuenta o solicitar la eliminación de tus datos personales, puedes contactarnos en ordazhoyos2001@gmail.com.
                </p>
                <h5 className="fw-bold">7. Derechos de los Usuarios</h5>
                <p> Tienes el derecho de:
                </p>
                <p>Acceder, corregir o eliminar tu información personal.
                    Solicitar la limitación del tratamiento de tus datos.
                    Oponerte al uso de tus datos para ciertos fines, como la publicidad personalizada.
                    Para ejercer cualquiera de estos derechos, puedes contactarnos en ordazhoyos2001@gmail.com.</p>
                <h5 className="fw-bold"> 8. Cambios en la Política de Privacidad</h5>
                <p>Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento. Cualquier cambio será notificado a los usuarios registrados y estará disponible en la plataforma. El uso continuo de la plataforma tras los cambios implica la aceptación de la nueva política.</p>

                <h5 className="fw-bold"> 9. Contacto</h5>
                <p>Si tienes preguntas o inquietudes sobre esta Política de Privacidad, puedes contactarnos en:</p>
                <p>Flyfar <br />
                    ordazhoyos2001@gmail.com <br />
                    904435632 <br />
                    Av. La Marina 1651, San Miguel, Lima, Perú</p>
                <br />
            </div>
        </>
    )
}
