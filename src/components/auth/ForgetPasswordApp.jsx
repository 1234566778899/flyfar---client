import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/Login.css';
import { showInfoToast } from '../../utils/showInfoToast';

export const ForgetPasswordApp = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        if (!isLoading) {
            setIsLoading(true);
            sendPasswordResetEmail(auth, data.email.trim())
                .then(() => {
                    showInfoToast("Correo de restablecimiento de contraseña enviado.");
                    navigate('/login');
                })
                .catch((error) => {
                    if (error.code === 'auth/user-not-found') {
                        showInfoToast("No se encontró ningún usuario con ese correo electrónico.");
                    } else if (error.code === 'auth/invalid-email') {
                        showInfoToast("Correo electrónico no válido.");
                    } else {
                        showInfoToast("Error al enviar el correo de restablecimiento.");
                    }
                    setIsLoading(false);
                });
        }
    };

    return (
        <>
            <div className='login-content inter' style={{ fontSize: '0.9rem' }}>
                <div className="container">
                    <button className='btn-back mt-2' onClick={() => navigate('/login')}>
                        <i className="fa-solid fa-arrow-left me-2"></i>Login
                    </button>
                    <div className="row justify-content-center">
                        <div className="col-md-4"></div>
                        <div className="col-md-4">
                            <div className="box-login mt-5">
                                <div className="card-body">
                                    <div className="text-center">
                                        <img src="https://png.pngtree.com/png-clipart/20220616/original/pngtree-computer-security-logo-design-png-image_8091046.png" alt="login-img" style={{ width: '60px' }} />
                                    </div>
                                    <h4 className="card-title text-center" style={{ color: 'white' }}>Restablecer contraseña</h4>
                                    <form className='mt-3' onSubmit={handleSubmit(onSubmit)}>
                                        <div className="mb-2">
                                            <label htmlFor="email" style={{ color: '#06BEFF', letterSpacing: '1px', fontSize: '0.65rem', fontWeight: 'bold' }}>CORREO ELECTRÓNICO</label>
                                            <input
                                                type="email"
                                                id="email"
                                                {...register('email', {
                                                    required: "El correo electrónico es requerido",
                                                    pattern: {
                                                        value: /^\S+@\S+$/i,
                                                        message: "El formato del correo electrónico es inválido"
                                                    }
                                                })}
                                            />
                                            {errors.email && <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.email.message}</p>}
                                        </div>
                                        <button type="submit" className="mt-3 btn-login" style={{ letterSpacing: '1px' }}>
                                            {isLoading ? (<i className="fa-solid fa-spinner icon-load"></i>) : 'Enviar correo'}
                                        </button>
                                    </form>
                                    <hr />
                                    <div className="text-center">
                                        <p className='mt-2'><span style={{ color: 'white' }}>¿No tienes una cuenta?</span> <Link style={{ color: '#06BEFF' }} to="/register">Regístrate aquí</Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4"></div>
                    </div>
                </div>
            </div>
        </>
    );
};
