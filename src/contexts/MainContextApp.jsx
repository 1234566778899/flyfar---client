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
    const [codeRoom, setCodeRoom] = useState(false);
    const [friends, setFriends] = useState([]);
    const navigate = useNavigate();
    const [friendsActive, setFriendsActive] = useState([]);
    const [settings, setSettings] = useState(null);
    const [challenge, setChallenge] = useState(null);
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
    useEffect(() => {
        if (owner) {
            socket.on('update_users', data => {
                setFriendsActive(data);
            })
        }
        return () => {
            socket.off('update_users');
        }
    }, [owner])
    return (
        <MainContext.Provider value={{ challenge, setChallenge, settings, setSettings, owner, socket, codeRoom, setCodeRoom, friends, setFriends, friendsActive, setFriendsActive }}>
            {children}
        </MainContext.Provider>
    )
}
