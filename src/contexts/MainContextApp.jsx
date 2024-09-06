import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { CONFIG } from '../config';
import { AuthContext } from './AuthContextApp';
import { showInfoToast } from '../utils/showInfoToast';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
export const MainContext = createContext()

const socket = io(`${CONFIG.uri}/`);

export const MainContextApp = ({ children }) => {
    const [owner, setOwner] = useState(null);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const getUser = () => {
        axios.get(`${CONFIG.uri}/users/retrieve/${user.email}`)
            .then(res => {
                setOwner(res.data);
            })
            .catch(error => {
                console.log(error);
                showInfoToast('Error');
            })
    }
    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        getUser();
        return () => {
            //socket.off('')
        }
    }, [])
    return (
        <MainContext.Provider value={{ owner, socket }}>
            {children}
        </MainContext.Provider>
    )
}
