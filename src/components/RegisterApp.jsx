import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { showInfoToast } from '../utils/showInfoToast';

export const RegisterApp = () => {
    const auth = getAuth();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, getValues } = useForm();

    useEffect(() => {
        if (auth.currentUser && auth.currentUser.emailVerified) {
            navigate('/admin/');
        }
    }, [auth, navigate]);

    const validateEmailDomain = (email) => {
        const domainPattern = /@upc\..+$/;
        return domainPattern.test(email) || "El correo debe ser un dominio válido @upc";
    };

    const onSubmit = (data) => {
        signUp(data);
    };

    const signUp = (data) => {
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(async (res) => {
                await sendEmailVerification(res.user);
                showInfoToast("Correo de verificación enviado. Por favor, revisa tu bandeja de entrada.");
                navigate('/login');
            })
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    showInfoToast("Este correo electrónico ya está en uso. Por favor, usa otro.");
                }
                showInfoToast(error.code.split('/')[1].split('-').join(' '));
            });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center">Únete a CodeChallenge</h3>
                            <p className="text-center">¡Comienza tu viaje de codificación hoy!</p>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-3">
                                    <label htmlFor="fullName" className="form-label">Nombre Completo</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="fullName"
                                        {...register('fullName', { required: "El nombre completo es requerido" })}
                                    />
                                    {errors.fullName && <p style={{ color: 'red' }}>{errors.fullName.message}</p>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Correo Electrónico</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        {...register('email', {
                                            required: "El correo electrónico es requerido",
                                            validate: validateEmailDomain
                                        })}
                                    />
                                    {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Nombre de Usuario</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        {...register('username', { required: "El nombre de usuario es requerido" })}
                                    />
                                    {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}
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
                                    {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
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
                                    {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword.message}</p>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="skillLevel" className="form-label">Nivel de Habilidad</label>
                                    <select
                                        className="form-select"
                                        id="skillLevel"
                                        {...register('skillLevel', { required: "El nivel de habilidad es requerido" })}
                                    >
                                        <option value="">Selecciona tu nivel de habilidad</option>
                                        <option value="beginner">Principiante</option>
                                        <option value="intermediate">Intermedio</option>
                                        <option value="advanced">Avanzado</option>
                                    </select>
                                    {errors.skillLevel && <p style={{ color: 'red' }}>{errors.skillLevel.message}</p>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="referralCode" className="form-label">Código de Referencia (Opcional)</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="referralCode"
                                        {...register('referralCode')}
                                    />
                                </div>
                                <div className="form-check mb-3">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="terms"
                                        {...register('terms', { required: "Debes aceptar los términos y condiciones" })}
                                    />
                                    <label className="form-check-label" htmlFor="terms">
                                        Acepto los Términos de Servicio y la Política de Privacidad
                                    </label>
                                    {errors.terms && <p style={{ color: 'red' }}>{errors.terms.message}</p>}
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Registrarse</button>
                            </form>
                            <hr />
                            <div className="text-center mt-3">
                                <p>¿Ya tienes una cuenta? <Link to='/login'>Inicia sesión aquí</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
