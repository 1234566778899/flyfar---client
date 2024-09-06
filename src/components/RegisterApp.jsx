import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { showInfoToast } from '../utils/showInfoToast';
import axios from 'axios';
import { CONFIG } from './../config';

export const RegisterApp = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();

    useEffect(() => {
        // if (auth.currentUser && auth.currentUser.emailVerified) {
        //     navigate('/dashboard');
        // }
    }, [auth, navigate]);

    // const validateEmailDomain = (email) => {
    //     const domainPattern = /@upc\..+$/;
    //     return domainPattern.test(email) || "El correo debe ser un dominio válido @upc";
    // };

    const onSubmit = (data) => {
        signUp(data);
    };

    const signUp = (data) => {
        if (!isLoading) {
            setIsLoading(true);
            createUserWithEmailAndPassword(auth, data.email, data.password)
                .then(async (res) => {
                    axios.post(`${CONFIG.uri}/users/register`, data)
                        .then(async (response) => {
                            await sendEmailVerification(res.user);
                            showInfoToast("Correo de verificación enviado. Por favor, revisa tu bandeja de entrada.");
                            navigate('/login');
                        })
                        .catch(error => {
                            showInfoToast('Error');
                            console.log(error);
                        })
                })
                .catch((error) => {
                    if (error.code === 'auth/email-already-in-use') {
                        showInfoToast("Correo electrónico en uso");
                    } else {
                        showInfoToast(error.code.split('/')[1].split('-').join(' '));
                    }
                    setIsLoading(false);
                });
        }
    };

    return (
        <div className="login-content" style={{ fontSize: '0.9rem' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <div className="mt-3 box-login">
                            <div className="card-body">
                                <h3 className="card-title text-center">Únete a CodeChallenge</h3>
                                <p className="text-center">¡Comienza tu viaje de codificación hoy!</p>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Correo Electrónico</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            {...register('email', {
                                                required: "El correo electrónico es requerido",
                                                // validate: validateEmailDomain
                                            })}
                                        />
                                        {errors.email && <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.email.message}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">Nombre de Usuario</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            {...register('username', { required: "El nombre de usuario es requerido" })}
                                        />
                                        {errors.username && <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.username.message}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Contraseña</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            {...register('password', {
                                                required: "La contraseña es requerida",
                                                minLength: {
                                                    value: 6,
                                                    message: "La contraseña debe tener al menos 6 caracteres"
                                                }
                                            })}
                                        />
                                        {errors.password && <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.password.message}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="confirmPassword"
                                            {...register('confirmPassword', {
                                                required: "Por favor confirma tu contraseña",
                                                validate: value =>
                                                    value === getValues('password') || "Las contraseñas no coinciden"
                                            })}
                                        />
                                        {errors.confirmPassword && <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.confirmPassword.message}</p>}
                                    </div>
                                    <button type="submit" className="btn-main w-100">
                                        {isLoading ? (<i class="fa-solid fa-spinner icon-load"></i>) : 'Registrarse'}
                                    </button>
                                </form>
                                <hr />
                                <div className="text-center mt-3">
                                    <p>¿Ya tienes una cuenta? <Link to='/login'>Inicia sesión aquí</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4"></div>
                </div>

            </div>
        </div>
    );
}
