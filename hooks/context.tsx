import React, { createContext, useContext, useEffect, useState } from 'react';
import { router } from 'expo-router';
import { Api } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from "expo-web-browser";
import { useAuth, useOAuth,useUser } from '@clerk/clerk-expo';
import { Platform } from 'react-native';
import { AuthSessionResult } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google'
import * as Linking from 'expo-linking';

export interface UserData{
  email?:string
  family_name?:string | null
  given_name?:string | null
  id?:string
  name?: string | null
  picture?:string
  verified_email?:boolean
}

export interface User {
  userData?:UserData,
  token:string,
  isLoading:boolean
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogleOnMobile:()=>void
  signInWithGoogleOnWeb:()=>void;
  signOutonWeb: () => void;
}

WebBrowser.maybeCompleteAuthSession()
const Context = createContext<User>({} as User);

export function UserProvider (props: React.PropsWithChildren) {
  
  console.log("vai pro UserProvider")
  
  const [token, setToken] = useState("");
  const [isLoading, setisLoading] = useState(true);
  const [userData,setUserData] = useState<UserData>()
  const googleOAuth = useOAuth({strategy:'oauth_google'})
  const [request,response,promtAsync] = Google.useAuthRequest({
    webClientId: '71316409857-njqh33dpopsa6c6thqioviehcp7dfcn8.apps.googleusercontent.com',
    androidClientId: '71316409857-0vd4n2dem72jqf3rh247ggbq8733686v.apps.googleusercontent.com'
  });
  
  useEffect(() => {
    console.log("ativou useEffect do loadStorage")
    loadStorageData();
  }, []);
  
  useEffect(()=>{
    console.log("ativou useEffect do login com google mobile")
    if(Platform.OS != 'web'){
      WebBrowser.warmUpAsync()
      console.log("fez o warmUpAsync")
      return () => {
        WebBrowser.coolDownAsync()
        console.log("fez o coolDownAsync")
      }
    }
  },[])

  useEffect(()=>{
    console.log("ativou o useEffect do handleSignIn Web")
    handleSignInWithGoogleOnWeb(response)
  },[response])

  async function loadStorageData(): Promise<void> {
    const loadedToken = await AsyncStorage.getItem('@AuthData');
    const googleUser =await AsyncStorage.getItem('@user');
    if (loadedToken) {setToken(loadedToken)} 
    if (googleUser){setUserData(JSON.parse(googleUser))}
    
    setisLoading(false);
    console.log("fez o loadStorage: token = "+token+ "googleUser = "+userData?.email)
  }

  async function handleSignInWithGoogleOnWeb(response:AuthSessionResult | null){
    console.log("chama o handleSignInWithGoogleOnWeb")
    if(response?.type ==="success"){
      console.log("response é "+response)
      if(!response.authentication?.accessToken) return;
        console.log("!response.authentication?.accessToken é "+ response.authentication?.accessToken)
      try{
        console.log("tenta acesar api do google com o token "+ response.authentication.accessToken )
        await Api.get("https://www.googleapis.com/userinfo/v2/me",{
          headers:{Authorization:`Bearer ${response.authentication.accessToken}`},
        })
        .then((resp) =>{
          console.log("response é "+ resp)
          AsyncStorage.setItem("@user",JSON.stringify(resp.data));
          setUserData(resp.data);
          console.log("armazena no Async storage "+AsyncStorage.getItem("@user"))
          router.replace('/')
        })  
      }catch(error){console.log(error)}
    }else{
      console.log("response é "+response)
    }
  }
  return (
    <Context.Provider 
      value={{
        async signIn(login: string, password: string) {
          await Api.post("/auth/login", { login, password })
          .then((response) =>{
            const token = response.data.token;
            AsyncStorage.setItem('@AuthData', token);
            setToken(token)
            router.replace('/')
          })
          .catch((e) =>{})
        },
        async signInWithGoogleOnMobile() {
          try {
            const redirectURL = Linking.createURL('/')
            const oAuthFlow = await googleOAuth.startOAuthFlow({redirectUrl:redirectURL})
            console.log("aqui eu cheguei")
            if(oAuthFlow.authSessionResult?.type === "success"){
              if(oAuthFlow.setActive){
                await oAuthFlow.setActive({session:oAuthFlow.createdSessionId}) 
              }     
            } 
          } catch (error) {console.log(error)} 
        },
          async signInWithGoogleOnWeb(){
            promtAsync()
          },
     
          signOutonWeb:() =>{
            setToken("");
            setUserData(undefined)
            AsyncStorage.removeItem('@AuthData');
            AsyncStorage.removeItem('@user')
            router.replace('/')
          },

          token,isLoading,userData

        }}>
      {props.children}
    </Context.Provider>
  );
}

export function useUserData() {
    return useContext(Context);
  }