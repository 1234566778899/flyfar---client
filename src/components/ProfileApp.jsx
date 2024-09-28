import React, { useContext, useState } from 'react'
import '../styles/Profile.css'
import moment from 'moment';
import { TabEditNameApp } from './tabs/TabEditNameApp';
import { TabPersonalApp } from './tabs/TabPersonalApp';
import { TabSkillApp } from './tabs/TabSkillApp';
import { TabBiografiApp } from './tabs/TabBiografiApp';
import { TabEducationApp } from './tabs/TabEducationApp';
import { TabPhotoApp } from './tabs/TabPhotoApp';
import { MainContext } from '../contexts/MainContextApp';
export const ProfileApp = () => {
    const [tab1, setTab1] = useState(false);
    const [tab2, setTab2] = useState(false);
    const [tab3, setTab3] = useState(false);
    const [tab4, setTab4] = useState(false);
    const [tab5, setTab5] = useState(false);
    const [tab6, setTab6] = useState(false);
    const closeTab1 = () => setTab1(false);
    const closeTab2 = () => setTab2(false);
    const closeTab3 = () => setTab3(false);
    const closeTab4 = () => setTab4(false);
    const closeTab5 = () => setTab5(false);
    const closeTab6 = () => setTab6(false);

    const { owner } = useContext(MainContext);
    return owner && (
        <>
            <div style={{ background: '#F7F8FD' }} className='inter'>
                <div className='container pb-5' >
                    <br />
                    <h3 className='fw-bold'>Mi perfil</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
                        <div>
                            <div className='card-profile mt-2' style={{ position: 'relative' }}>
                                <i
                                    onClick={() => setTab1(true)}
                                    style={{ position: 'absolute', cursor: 'pointer', right: 20 }} className="fa-regular fa-pen-to-square"></i>
                                <img onClick={() => setTab6(true)} className='img-profile' src={owner.photo || 'https://cdn-icons-png.flaticon.com/512/1488/1488581.png'} alt="img" />
                                <h4 className='mt-2 fw-bold'>{owner.name ? `${owner.name} ${owner.lname}` : owner.username}</h4>
                                <div style={{ fontSize: '0.9rem' }}>@{owner.username}</div>
                            </div>
                            <div className='card-profile mt-2' style={{ position: 'relative' }}>
                                <i
                                    onClick={() => setTab2(true)}
                                    style={{ position: 'absolute', right: 20, cursor: 'pointer' }} className="fa-regular fa-pen-to-square"></i>
                                <h5 className='fw-bold'>Información personal</h5>
                                <div className='mt-3' style={{ fontSize: '0.9rem' }}>
                                    <div className='mt-1'>
                                        <i className="fa-regular fa-envelope me-2"></i>
                                        ordazhoyos2001@gmail.com</div>
                                    {
                                        !owner.phone && (
                                            <div className='mt-1' style={{ color: '#797983' }}>
                                                <i className="fa-solid fa-mobile me-2"></i>
                                                <span>Agrega tu número de telefono</span></div>
                                        )
                                    }
                                    {
                                        owner.phone && (
                                            <div className='mt-1'>
                                                <i className="fa-solid fa-mobile me-2"></i>
                                                <span>{owner.phone}</span></div>
                                        )
                                    }
                                    {
                                        !owner.country && (
                                            <div className='mt-1' style={{ color: '#797983' }}>
                                                <i className="fa-solid fa-location-dot me-2"></i>
                                                <span>Agrega tu dirección</span></div>
                                        )
                                    }
                                    {
                                        !owner.birthdate && (<div className='mt-1' style={{ color: '#797983' }}><i className="fa-solid fa-calendar-days me-2"></i>

                                            <span>Agrega la fecha de nacimiento</span></div>)
                                    }
                                    {
                                        owner.country && (<div className='mt-1'><i className="fa-solid fa-location-dot me-2"></i>Perú</div>)
                                    }
                                    {
                                        owner.birthdate && (<div className='mt-1'><i className="fa-solid fa-calendar-days me-2"></i>{moment(owner.birthdate).format('DD/MM/YYYY')}</div>)
                                    }
                                </div>
                            </div>
                            <div className='card-profile mt-2' style={{ position: 'relative' }}>
                                <i onClick={() => setTab3(true)} style={{ position: 'absolute', right: 20, cursor: 'pointer' }} className="fa-regular fa-pen-to-square"></i>
                                <h5 className='fw-bold'>Tus Habilidades</h5>
                                <div className='mt-3' style={{ fontSize: '0.9rem' }}>
                                    {
                                        !owner.levelProgramming && (
                                            <div className='mt-1' style={{ color: '#797983' }}>
                                                <i className="fa-solid fa-hammer me-2"></i>
                                                Agrega tu nivel en programación</div>
                                        )
                                    }
                                    {
                                        owner.levelProgramming && (
                                            <div className='mt-1' >
                                                <i className="fa-solid fa-hammer me-2"></i>
                                                {owner.levelProgramming}</div>
                                        )
                                    }
                                    {
                                        !owner.favoriteLenguaje && (
                                            <div className='mt-1' style={{ color: '#797983' }}>
                                                <i className="fa-solid fa-cubes me-2"></i>
                                                Agrega tu lenguaje de favorito</div>
                                        )
                                    }
                                    {
                                        owner.favoriteLenguaje && (
                                            <div className='mt-1'>
                                                <i className="fa-solid fa-cubes me-2"></i>
                                                {owner.favoriteLenguaje}</div>
                                        )
                                    }
                                    {
                                        !owner.timeProgramming && (
                                            <div className='mt-1' style={{ color: '#797983' }}><i className="fa-solid fa-clock me-2"></i>Agregar tiempo programando</div>
                                        )
                                    }
                                    {
                                        owner.timeProgramming && (
                                            <div className='mt-1'><i className="fa-solid fa-clock me-2"></i>{owner.timeProgramming}</div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='card-profile mt-2' style={{ position: 'relative' }}>
                                <span onClick={() => setTab4(true)} className='enlace' style={{ position: 'absolute', right: 20 }} >+ {owner.biografy ? 'Editar' : 'Añadir'} biografia</span>
                                <h5 className='fw-bold'><i className="fa-solid fa-heart me-2"></i>Biografía</h5>
                                {
                                    owner.biografy ? (<p style={{ fontSize: '0.9rem', color: '#3B3B3B' }}>{owner.biografy}</p>) : (<p style={{ fontSize: '0.9rem', color: '#3B3B3B' }}>Añade tu biografia aquí</p>)
                                }
                            </div>
                            <div className='card-profile mt-3' style={{ position: 'relative' }}>
                                <span onClick={() => setTab5(true)} className='enlace' style={{ position: 'absolute', right: 20 }}>+ {owner.university ? 'Editar' : 'Añadir'} educación</span>
                                <h5 className='fw-bold'><i className="fa-solid fa-graduation-cap me-2"></i>Educación</h5>
                                {
                                    !owner.university && (<p style={{ fontSize: '0.9rem', color: '#797983' }}>Ingrese datos sobre sus estudios, es muy importante para nosotros</p>)
                                }

                                {
                                    owner.university && (
                                        <div style={{ fontSize: '0.9rem', display: 'flex' }}>
                                            <img style={{ width: '40px', height: '40px' }} src="https://hrcdn.net/s3_pub/hr-assets/hr-apply-job-icon-light-2.png" alt="img" />
                                            <div className='ms-2'>
                                                <span>{owner.university}, {owner.addressUniversity}</span><br />
                                                <span>{owner.profession}</span>
                                            </div>

                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                tab1 && (<TabEditNameApp close={closeTab1} />)
            }
            {
                tab2 && (<TabPersonalApp close={closeTab2} />)
            }
            {
                tab3 && (<TabSkillApp close={closeTab3} />)
            }
            {
                tab4 && (<TabBiografiApp close={closeTab4} />)
            }
            {
                tab5 && (<TabEducationApp close={closeTab5} />)
            }
            {
                tab6 && (<TabPhotoApp close={closeTab6} />)
            }
        </>
    )
}
