import React, { createContext, useContext, useEffect, useState } from 'react';
import { router } from 'expo-router';
import { Api } from './api';
import { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface User {
    token:string,
    isLoading:boolean
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => void;
  }
const Context = createContext<User>({} as User);

export function UserProvider (props: React.PropsWithChildren) {
    const [token, setToken] = useState("");
    const [isLoading, setisLoading] = useState(true);
    

    useEffect(() => {
        loadStorageData();
    }, []);

    async function loadStorageData(): Promise<void> {
   
        const loadedToken = await AsyncStorage.getItem('@AuthData');
        
        if (loadedToken) {
          setToken(loadedToken);
        }
        setisLoading(false);
    }
    return (
        <Context.Provider 
            value={{
                async signIn(login: string, password: string) {
                    await Api.post("/auth/login", { login, password })
                    .then((response) =>{
                        AsyncStorage.setItem('@AuthData', response.data.token);
                        setToken(response.data.token)
                        router.replace('/')
                    })
                    .catch((e) =>{})
                },
            
                signOut: () => {
                    setToken("");
                    AsyncStorage.removeItem('@AuthData');
                    router.replace('/')
                },
                token,
                isLoading,
            }}>
          {props.children}
        </Context.Provider>
    );
}

export function useUser() {
    return useContext(Context);
  }