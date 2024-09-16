import React, { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Api } from '../utils/api'
import { router } from 'expo-router'
import * as WebBrowser from 'expo-web-browser';
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import { Cnpj, FaceBookData, GoogleData, UserContext, UserRole } from '../utils/interfaces';
import { Alert } from 'react-native';

WebBrowser.maybeCompleteAuthSession()

const Context = createContext<UserContext>({} as UserContext)

export function UserProvider (props: React.PropsWithChildren) {

  const [isLoading,setIsLoading] = useState(true)
  const [token,setToken] = useState<string>()
  const [googleData,setGoogleData] = useState<GoogleData>()
  const [facebookData,setFacebookData] = useState<FaceBookData>()
  const [cnpj,setCnpj] = useState<Cnpj>({} as Cnpj)
  const [req,res,prompt] = Facebook.useAuthRequest({clientId:"807233447920358"});
  const [request,response,promptAsync] = Google.useAuthRequest({
    webClientId:'71316409857-njqh33dpopsa6c6thqioviehcp7dfcn8.apps.googleusercontent.com',
  androidClientId:'71316409857-0vd4n2dem72jqf3rh247ggbq8733686v.apps.googleusercontent.com'});

  useEffect(()=>{loadStorage()},[]);

  async function loadStorage(){
    const loadedToken = await AsyncStorage.getItem('@AuthData')
    const loadedGoogleData = await AsyncStorage.getItem('@Gguser')
    const loadedFacebookData = await AsyncStorage.getItem('@FbUser')
    if (loadedToken) {setToken(loadedToken)}
    if (loadedGoogleData) {setGoogleData(JSON.parse(loadedGoogleData))}
    if (loadedFacebookData) {setFacebookData(JSON.parse(loadedFacebookData))}
    setIsLoading(false)
  }

  useEffect(()=>{
    handleLoginWithGoogle()
  },[response])

  useEffect(()=>{
    handleLoginWithFacebook()
  },[res])
  
  async function handleLoginWithGoogle(){
   
    if(response?.type ==="success"){
      if(!response.authentication?.accessToken) return;
      try{
        await Api.get("https://www.googleapis.com/userinfo/v2/me",{
          
          headers:{Authorization:`Bearer ${response.authentication.accessToken}`},
        })
        .then((resp) =>{
          
          AsyncStorage.setItem("@Gguser",JSON.stringify(resp.data));
          setGoogleData(resp.data);  
          router.replace('/')
        })  
      }catch(error){console.log(error)}
    }else{}
  }

  async function handleLoginWithFacebook(){
    if(res && res.type ==="success" && res.authentication){
      (async () =>{
        const userInfoResponse = await fetch(
           `https://graph.facebook.com/me?access_token=${res.authentication?.accessToken}&fields=id,name,picture.type(large)`
        )
        const userInfo = await userInfoResponse.json();
        AsyncStorage.setItem("@Fbuser",JSON.stringify(userInfo));
        setFacebookData(userInfo);  
        router.replace('/')
      })()
    }
  }
  
  return (
    <Context.Provider 
      value={{
        async signIn(login: string, password: string) {
          await Api.post("/auth/login", { login, password })
          .then((response) =>{
            AsyncStorage.setItem('@AuthData', response.data.token);
            setToken(response.data.token)
            router.replace("/")
          })
          .catch((e) =>{
            if(e.status==403){
              alert("Usuário e/ou senha inválidos")
            }else{
              alert("Banco de dados não encontrado. Certifique-se de que o projeto CnpjBackend esteja rodando localmente em sua máquina")
            }
          })
        },
        async register(login: string, password: string, role:UserRole) {
          await Api.post("/auth/register", { login, password, role })
          .then((response) =>{
            if(response.status == 200){
              alert("Usuário Cadastrado com sucesso!")
              router.replace("/")
            }
          })
          .catch((e) =>{
            if(e.status==400){
              alert("usuário " + login + " já foi cadastrado anteriormente. Utilize um novo username")
            }else{
              alert("Banco de dados não encontrado. Certifique-se de que o projeto CnpjBackend esteja rodando localmente em sua máquina")
            }
          })
        },
        async signInWithGoogle(){
          await promptAsync()
        },
        async signInWithFacebook(){
          await prompt()
        },
        async signOut() {
          AsyncStorage.removeItem('@AuthData');
          AsyncStorage.removeItem('@Gguser');
          AsyncStorage.removeItem('@Fbuser');
          setCnpj({} as Cnpj)
          setToken(undefined)
          setGoogleData(undefined) 
          setFacebookData(undefined) 
          
        },
        async searchCnpj(cnpj:string) {
        
          await Api.get(`/cnpj/${cnpj}`)
          .then((response)=>{
           setCnpj(response.data)        
          })
          .catch((e)=>{
            if(e.status==400){
              alert("CNPJ não encontrado")
            }else{
              alert("Banco de dados não encontrado. Certifique-se de que o projeto CnpjBackend esteja rodando localmente em sua máquina")
            }
          })
        },
        token,googleData,facebookData,isLoading,cnpj,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export function useAuthContext() {
    return useContext(Context)
  }