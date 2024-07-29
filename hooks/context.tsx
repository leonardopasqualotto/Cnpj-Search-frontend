import React, { createContext, useContext, useEffect, useState } from 'react';
import { router } from 'expo-router';
import { Api } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from '@clerk/clerk-expo';
import { Platform } from 'react-native';
import { AuthSessionResult } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google'
interface userData{
  email:string
  family_name:String
  given_name:String
  id:string
  name: String
  picture:string
  verified_email:boolean
}

interface User {
    userData?:userData,
    token:string,
    isLoading:boolean
    signIn: (email: string, password: string) => Promise<void>;
    signInWithGoogle:()=>void
    signInWithGoogleOnWeb:()=>void;
    signOut: () => void;
  }

  WebBrowser.maybeCompleteAuthSession()

const Context = createContext<User>({} as User);

export function UserProvider (props: React.PropsWithChildren) {
    const [token, setToken] = useState("");
    const [isLoading, setisLoading] = useState(true);
    const [userData,setUserData] = useState<userData>()
    const [isGoogleLoading,setIsGoogleLoading] = useState(false)
    const googleOAuth = useOAuth({strategy:'oauth_google'})
    const [request,response,promtAsync] = Google.useAuthRequest({
      webClientId: '71316409857-njqh33dpopsa6c6thqioviehcp7dfcn8.apps.googleusercontent.com',
      androidClientId: '71316409857-0vd4n2dem72jqf3rh247ggbq8733686v.apps.googleusercontent.com'
   });
    useEffect(() => {
        loadStorageData();
    }, []);

    useEffect(()=>{
      if(Platform.OS != 'web'){
        WebBrowser.warmUpAsync()
        return () => {
          WebBrowser.coolDownAsync()
        }
      }
    },[])

    useEffect(()=>{
      handleSignInWithGoogleOnWeb(response)
    },[response])

    async function loadStorageData(): Promise<void> {

        const loadedToken = await AsyncStorage.getItem('@AuthData');
        const googleUser =await AsyncStorage.getItem('@user');

        if (loadedToken) {setToken(loadedToken)} 
        if(googleUser){setUserData(JSON.parse(googleUser))}
        
        setisLoading(false);
    }
    async function handleSignInWithGoogleOnWeb(response:AuthSessionResult | null){
      if(response?.type ==="success"){
       
        if(!response.authentication?.accessToken) return;
        try{
          await Api.get(
            "https://www.googleapis.com/userinfo/v2/me",
            {
              headers:{Authorization:`Bearer ${response.authentication.accessToken}`},
            }
          ).then((response) =>{
            AsyncStorage.setItem("@user",JSON.stringify(response.data));
            setUserData(response.data);
            console.log("o UserData é"+userData?.email)
            router.replace('/')
          })  
        }catch(error){
        }
      }else{
        console.log("Falhou o Async prompt")
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
                async signInWithGoogle() {
                    try {
                      setIsGoogleLoading(true)
                      const oAuthFlow = await googleOAuth.startOAuthFlow()
                      
                      if(oAuthFlow.authSessionResult?.type === "success"){
                        if(oAuthFlow.setActive){
                          await oAuthFlow.setActive({session:oAuthFlow.createdSessionId})
                        }
                      } 
                    } catch (error) {
                      setIsGoogleLoading(false)
                    } 
                  },
                async signInWithGoogleOnWeb(){
                  promtAsync()
                  },
                signOut: () => {
                    setToken("");
                    setUserData(undefined)
                    AsyncStorage.removeItem('@AuthData');
                    AsyncStorage.removeItem('@user')
                    router.replace('/')
                },
                token,
                isLoading,
                userData
            }}>
          {props.children}
        </Context.Provider>
    );
}

export function useUser() {
    return useContext(Context);
  }