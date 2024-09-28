import React, { useContext } from 'react'
import { MainContext } from '../contexts/MainContextApp';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

export const ListFriendsApp = () => {
    const { friends } = useContext(MainContext);
    const navigate = useNavigate();
    return (
        <div className='container inter'>
            <br />
            <h2 className='fw-bold'>Lista de amigos</h2>
            <hr />
            <table className='table'>
                <tbody>
                    <tr>
                        <td className='fw-bold'>Nombre</td>
                        <td className='fw-bold'>Fecha</td>
                        <td className='fw-bold'>Ejercicios resueltos</td>
                        <td className='fw-bold'>Opciones</td>
                    </tr>
                    {
                        friends.map(x => (
                            <tr key={x._id}>
                                <td>{x.username}</td>
                                <td>{moment(x.createdAt).fromNow()}</td>
                                <td>0</td>
                                <td>
                                    <button
                                        onClick={() => navigate(`/admin/user/${x.email}`)}
                                        className='btn-infor'><i className="fa-solid fa-circle-info"></i></button>
                                    <button className='btn-delete ms-2'><i className="fa-solid fa-user-minus"></i></button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
