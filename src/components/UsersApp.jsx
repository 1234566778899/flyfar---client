import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CONFIG } from '../config'
import { showInfoToast } from '../utils/showInfoToast'
import moment from 'moment'

export const UsersApp = () => {
    const [users, setUsers] = useState([])
    const getUsers = () => {
        axios.get(`${CONFIG.uri}/users`)
            .then(res => {
                setUsers(res.data)
            })
            .catch(error => {
                showInfoToast('Error');
            })
    }
    useEffect(() => {
        getUsers();
    }, [])
    return (
        <div className='container inter'>
            <h5 className='fw-bold'>BD Flyfar: Lista de usuarios</h5>
            <hr />
            <br />
            <table className='table'>
                <tbody>
                    <tr className='fw-bold'>
                        <td>N°</td>
                        <td>Nombre de usuario</td>
                        <td>Nombre</td>
                        <td>Apellido</td>
                        <td>Correo</td>
                        <td>Fecha de registro</td>
                        <td>¿Realizó el test inicial?</td>
                        <td>Ejercicios resueltos</td>
                    </tr>
                    {
                        users.map((x, idx) => (
                            <tr style={{ fontSize: '0.9rem' }} key={x.userId}>
                                <td>{idx + 1}</td>
                                <td>{x.username}</td>
                                <td>{x.name || '-'}</td>
                                <td>{x.lname || '-'}</td>
                                <td>{x.email}</td>
                                <td>{moment(x.createdAt).format('DD-MM-YYYY hh:mm:ss')}</td>
                                <td>{x.test ? 'Sí' : 'No'}</td>
                                <td>{x.totalEjerciciosUnicos}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}


