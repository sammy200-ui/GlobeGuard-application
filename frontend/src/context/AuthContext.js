import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import client from '../api/client';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Check if user is logged in
    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            let userToken = await AsyncStorage.getItem('userToken');
            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);

            if (userInfo) {
                setUserToken(userToken);
                setUserInfo(userInfo);
            }
            setIsLoading(false);
        } catch (e) {
            console.log(`isLoggedIn error ${e}`);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);

    const login = async (email, password) => {
        setIsLoading(true);
        try {
            const res = await client.post('/auth/login', { email, password });

            const { token, user } = res.data;
            setUserInfo(user);
            setUserToken(token);

            await AsyncStorage.setItem('userToken', token);
            await AsyncStorage.setItem('userInfo', JSON.stringify(user));
            setIsLoading(false);
            return true; // success
        } catch (e) {
            console.log(`login error ${e}`);
            setIsLoading(false);
            return false; // fail
        }
    };

    const register = async (name, email, password) => {
        setIsLoading(true);
        try {
            const res = await client.post('/auth/register', { name, email, password });

            const { token, user } = res.data;
            setUserInfo(user);
            setUserToken(token);

            await AsyncStorage.setItem('userToken', token);
            await AsyncStorage.setItem('userInfo', JSON.stringify(user));
            setIsLoading(false);
            return true;
        } catch (e) {
            console.log(`register error ${e}`);
            setIsLoading(false);
            return false;
        }
    };

    const logout = async () => {
        setIsLoading(true);
        setUserToken(null);
        setUserInfo(null);
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userInfo');
        setIsLoading(false);
    };

    return (
        <AuthContext.Provider value={{ login, register, logout, isLoading, userToken, userInfo }}>
            {children}
        </AuthContext.Provider>
    );
};
