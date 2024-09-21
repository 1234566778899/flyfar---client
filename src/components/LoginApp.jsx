import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css';
import { showInfoToast } from '../utils/showInfoToast';

export const LoginApp = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

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
        if (!isLoading) {
            setIsLoading(true);
            signInWithEmailAndPassword(auth, data.email, data.password)
                .then((res) => {
                    if (res.user.emailVerified) {
                        navigate('/admin/dashboard');
                    } else {
                        showInfoToast("Por favor, verifica tu correo antes de iniciar sesión.");
                        setIsLoading(false)
                    }
                })
                .catch((error) => {
                    if (error.code === 'auth/invalid-login-credentials') {
                        showInfoToast("Las credenciales son inválidas");
                    } else if (error.code === 'auth/too-many-requests') {
                        showInfoToast("Demasiados intentos fallidos. Por favor, intenta más tarde.");
                    } else {
                        showInfoToast(error.code.split('/')[1].split('-').join(' '));
                    }
                    setIsLoading(false);
                });
        }
    };

    return (
        <div className='login-content inter' style={{ fontSize: '0.9rem' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <div className="box-login mt-5">
                            <div className="card-body">
                                <div className="text-center">
                                    <img src="https://png.pngtree.com/png-clipart/20220616/original/pngtree-computer-security-logo-design-png-image_8091046.png" alt="login-img" style={{ width: '60px' }} />
                                </div>
                                <h3 className="card-title text-center" style={{ color: 'white' }}>Iniciar Sesión</h3>
                                <form className='mt-3' onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-2">
                                        <label htmlFor="email" style={{ color: '#06BEFF', letterSpacing: '1px', fontSize: '0.65rem', fontWeight: 'bold' }}>CORREO ELECTRÓNICO</label>
                                        <input
                                            type="email"
                                            id="email"
                                            {...register('email', {
                                                required: "El correo electrónico es requerido",
                                                // validate: validateEmailDomain
                                            })}
                                        />
                                        {errors.email && <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.email.message}</p>}
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="password"
                                            style={{ color: '#D7D7D7', letterSpacing: '1.2px', fontSize: '0.65rem', fontWeight: 'bold' }}
                                        >CONTRASEÑA</label>
                                        <input
                                            type="password"
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
                                    <button type="submit" className="mt-2 btn-login" style={{ letterSpacing: '1px' }}>
                                        {isLoading ? (<i className="fa-solid fa-spinner icon-load"></i>) : 'Iniciar sesión'}
                                    </button>
                                </form>
                                <hr />
                                <div className="text-center mt-3">
                                    <p><span style={{ color: 'white' }}>¿No tienes una cuenta?</span> <Link style={{ color: '#06BEFF' }} to="/register">Regístrate aquí</Link></p>
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
