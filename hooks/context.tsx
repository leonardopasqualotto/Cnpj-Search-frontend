import React, { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Api } from './api'
import { router } from 'expo-router'

export interface UserContext {
  token?:string
  isLoading:boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut:() => void
}

const Context = createContext<UserContext>({} as UserContext)

export function UserProvider (props: React.PropsWithChildren) {
  const [isLoading,setIsLoading] = useState(true)
  const [token,setToken] = useState<string>()

  useEffect(()=>{
   loadStorage()
  }, []);

  async function loadStorage(){
    setToken(undefined)
    console.log("token é " +token)
    const loadedToken = await AsyncStorage.getItem('@AuthData')
    console.log("token carregado é "+loadedToken )
    if(loadedToken){
      setToken(loadedToken)
      console.log("novo token é "+token )
    }
    setIsLoading(false)
  }
  
  return (
    <Context.Provider value={{
      async  signIn(login: string, password: string) {
        await Api.post("/auth/login", { login, password })
        .then((response) =>{
          AsyncStorage.setItem('@AuthData', response.data.token);
          setToken(response.data.token)
          router.replace("/")
        })
        .catch((e) =>{
            alert("erro na solicitação "+e)
        })
      },
      async signOut() {
        AsyncStorage.removeItem('@AuthData');
        setToken(undefined)
      },
      token,isLoading}}>

      {props.children}

    </Context.Provider>
  );
}

export function useAuthContext() {
    return useContext(Context)
  }