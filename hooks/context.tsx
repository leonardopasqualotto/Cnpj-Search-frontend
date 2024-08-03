import React, { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Api } from './api'
import { router } from 'expo-router'
import * as WebBrowser from 'expo-web-browser';
import * as Google from "expo-auth-session/providers/google";
WebBrowser.maybeCompleteAuthSession()
interface GoogleData{
  email: string,
  family_name: string,
  given_name: string,
  id: string,
  name: string,
  picture: string,
  verified_email: boolean
}

interface UserContext {
  token?:string
  googleData?:GoogleData
  isLoading:boolean
  signIn: (email: string, password: string) => void
  signInWithGoogle: () => void
  signOut:() => void
}

const Context = createContext<UserContext>({} as UserContext)

export function UserProvider (props: React.PropsWithChildren) {
  const [isLoading,setIsLoading] = useState(true)
  const [token,setToken] = useState<string>()
  const [googleData,setGoogleData] = useState<GoogleData>()
  const [request,response,promtAsync] = Google.useAuthRequest({
    webClientId: '71316409857-njqh33dpopsa6c6thqioviehcp7dfcn8.apps.googleusercontent.com',
    androidClientId: '71316409857-0vd4n2dem72jqf3rh247ggbq8733686v.apps.googleusercontent.com'
  });

  useEffect(()=>{loadStorage()},[]);

  async function loadStorage(){
    const loadedToken = await AsyncStorage.getItem('@AuthData')
    const loadedUserData = await AsyncStorage.getItem('@User')
    if (loadedToken) {setToken(loadedToken)}
    if (loadedUserData) {setGoogleData(JSON.parse(loadedUserData))}
    setIsLoading(false)
  }

  useEffect(()=>{
    handleLoginWithGoogleOnWeb()
  },[response])

  async function handleLoginWithGoogleOnWeb(){
    if(response?.type ==="success"){
      if(!response.authentication?.accessToken) return;
      try{
        await Api.get("https://www.googleapis.com/userinfo/v2/me",{
          headers:{Authorization:`Bearer ${response.authentication.accessToken}`},
        })
        .then((resp) =>{
          AsyncStorage.setItem("@User",JSON.stringify(resp.data));
          setGoogleData(resp.data);  
          router.replace('/')
        })  
      }catch(error){console.log(error)}
    }else{}
  }
  
  return (
    <Context.Provider value={{
      async signIn(login: string, password: string) {
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
        AsyncStorage.removeItem('@User');
        setToken(undefined)
        setGoogleData(undefined)
      },

      async signInWithGoogle(){
        await promtAsync()
      },

      token,googleData,isLoading}}>
      {props.children}
    </Context.Provider>
  );
}

export function useAuthContext() {
    return useContext(Context)
  }