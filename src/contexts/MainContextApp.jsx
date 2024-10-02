import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { CONFIG } from '../config';
import { AuthContext } from './AuthContextApp';
import { showInfoToast } from '../utils/showInfoToast';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
export const MainContext = createContext()
const socket = io(`${CONFIG.uri}`);
export const MainContextApp = ({ children }) => {
    const [owner, setOwner] = useState(null);
    const { user } = useContext(AuthContext);
    const [codeRoom, setCodeRoom] = useState(false);
    const [friends, setFriends] = useState([]);
    const navigate = useNavigate();
    const [friendsActive, setFriendsActive] = useState(null);
    const [settings, setSettings] = useState(null);
    const [challenge, setChallenge] = useState(null);
    const [started, setStarted] = useState(false);
    const getFriends = (data) => {
        axios.get(`${CONFIG.uri}/friends/retrieve/${data._id}`)
            .then(res => {
                socket.emit('enter', { ...data, friends: res.data });
            })
            .catch(error => {
                showInfoToast('Error');
            })
    }

    const getUser = () => {
        axios.get(`${CONFIG.uri}/users/retrieve/${user.email}`)
            .then(res => {
                setOwner(res.data);
                getFriends(res.data);
            })
            .catch(error => {
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
            socket.on('online_friends', data => {
                setFriends(data);
            })
            socket.on('send_settings', data => {
                if (data) {
                    setSettings(data);
                }
            })
        }
        return () => {
            socket.off('update_users');
            socket.off('send_settings');
        }
    }, [owner])
    return (
        <MainContext.Provider value={{ getFriends, getUser, started, setStarted, challenge, setChallenge, settings, setSettings, owner, setOwner, socket, codeRoom, setCodeRoom, friends, setFriends, friendsActive, setFriendsActive }}>
            {children}
        </MainContext.Provider>
    )
}
