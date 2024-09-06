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
        <div className='login-content' style={{ fontSize: '0.9rem' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <div className="box-login mt-5">
                            <div className="card-body">
                                <h3 className="card-title text-center">Iniciar Sesión</h3>
                                <p className="text-center">Ingresa con tu cuenta de UPC</p>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-2">
                                        <label htmlFor="email" className="form-label">Correo Electrónico</label>
                                        <input
                                            type="email"
                                            className="input-main"
                                            id="email"
                                            {...register('email', {
                                                required: "El correo electrónico es requerido",
                                                // validate: validateEmailDomain
                                            })}
                                        />
                                        {errors.email && <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.email.message}</p>}
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="password" className="form-label">Contraseña</label>
                                        <input
                                            type="password"
                                            className="input-main"
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
                                    <button type="submit" className="btn-main w-100">
                                        {isLoading ? (<i className="fa-solid fa-spinner icon-load"></i>) : 'Iniciar sesión'}
                                    </button>
                                </form>
                                <hr />
                                <div className="text-center mt-3">
                                    <p>¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link></p>
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
