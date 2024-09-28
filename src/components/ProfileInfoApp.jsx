import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { CONFIG } from '../config';
import { showInfoToast } from '../utils/showInfoToast';
import moment from 'moment';

export const ProfileInfoApp = () => {
    const [owner, setOwner] = useState(null);
    const { email } = useParams();
    const getUser = () => {
        axios.get(`${CONFIG.uri}/users/retrieve/${email}`)
            .then(res => {
                setOwner(res.data);
            })
            .catch(error => {
                showInfoToast('Error');
            })
    }
    useEffect(() => {
        getUser();
    }, [])
    return owner && (
        <>
            <div style={{ background: '#F7F8FD' }} className='inter'>
                <div className='container pb-5' >
                    <br />
                    <h3 className='fw-bold'>Mi perfil</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
                        <div>
                            <div className='card-profile mt-2' >
                                <img className='img-profile' src={owner.photo || 'https://cdn-icons-png.flaticon.com/512/1488/1488581.png'} alt="img" />
                                <h4 className='mt-2 fw-bold'>{owner.name ? `${owner.name} ${owner.lname}` : owner.username}</h4>
                                <div style={{ fontSize: '0.9rem' }}>@{owner.username}</div>
                            </div>
                            <div className='card-profile mt-2' >
                                <h5 className='fw-bold'>Información personal</h5>
                                <div className='mt-3' style={{ fontSize: '0.9rem' }}>
                                    <div className='mt-1'>
                                        <i className="fa-regular fa-envelope me-2"></i>
                                        {owner.email}
                                    </div>
                                    <div className='mt-1'>
                                        <i className="fa-solid fa-mobile me-2"></i>
                                        <span>{owner.phone ? owner.phone : '-'}</span>
                                    </div>
                                    <div className='mt-1'>
                                        <i className="fa-solid fa-location-dot me-2"></i>{owner.country ? owner.country : '-'}</div>
                                    <div className='mt-1'><i className="fa-solid fa-calendar-days me-2"></i>
                                        {owner.birthdate ? moment(owner.birthdate).format('DD/MM/YYYY') : '-'}
                                    </div>
                                </div>
                            </div>
                            <div className='card-profile mt-2' >
                                <h5 className='fw-bold'>Habilidades</h5>
                                <div className='mt-3' style={{ fontSize: '0.9rem' }}>

                                    <div className='mt-1' >
                                        <i className="fa-solid fa-hammer me-2"></i>
                                        {owner.levelProgramming ? owner.levelProgramming : '-'}</div>
                                    <div className='mt-1'>
                                        <i className="fa-solid fa-cubes me-2"></i>
                                        {owner.favoriteLenguaje ? owner.favoriteLenguaje : '-'}
                                    </div>
                                    <div className='mt-1'><i className="fa-solid fa-clock me-2"></i>{owner.timeProgramming ? owner.timeProgramming : '-'}
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='card-profile mt-2'>
                                <h5 className='fw-bold'><i className="fa-solid fa-heart me-2"></i>Biografía</h5>
                                <p style={{ fontSize: '0.9rem', color: '#3B3B3B' }}>{owner.biografy ? owner.biografy : 'Sin información'}</p>
                            </div>
                            <div className='card-profile mt-3' >
                                <h5 className='fw-bold'><i className="fa-solid fa-graduation-cap me-2"></i>Educación</h5>
                                {
                                    !owner.university && (<p style={{ fontSize: '0.9rem', color: '#797983' }}>Sin información</p>)
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
        </>
    )
}
