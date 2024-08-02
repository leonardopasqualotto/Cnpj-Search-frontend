import { useEffect, useState } from 'react';
import {Platform, StyleSheet, Text, View} from "react-native"; 

import { SignInButton } from './SignInButton';
import { Divider } from './Divider'
import { SocialLoginButton } from './SocialLoginButton';
import { InputGroup } from './InputGroup';
import { useUserData } from '@/hooks/context';
import * as WebBrowser from "expo-web-browser";
import React from 'react';

WebBrowser.maybeCompleteAuthSession()

export default function SignInForm() {

  const [user,setUser] = useState('');
  const [password,setPassword] = useState('');
  const {signInWithGoogleOnWeb} = useUserData()
  const {signInWithGoogleOnMobile} = useUserData()

 function handleSignIn(){
  if(Platform.OS != 'web'){
    signInWithGoogleOnMobile()
  }
  if(Platform.OS == 'web'){
    signInWithGoogleOnWeb()
    console.log("iniciando signIn na web")
  }
}
  
  return (
      <View style={styles.container}>
        <Text style={styles.subtitle}>Sign in to your account</Text>
        <InputGroup label='User' value={user} onChageText={setUser} placeholder='email or user'  securityEntry={false}/>
        <InputGroup label='Password' value={password} onChageText={setPassword} placeholder='password'  securityEntry={true}/>   
        <SignInButton user={user}password={password} />
        <Divider />
        <View style={styles.alternativeLogin}>
          <SocialLoginButton icon= {require('@/assets/images/google.png')} isLoading={false} onPress={handleSignIn} title={''}/>
          <SocialLoginButton icon= {require('@/assets/images/github.png')} isLoading={false} onPress={()=>{}} title={''} />
        </View>
        <Text style={styles.footerText}>Not a member?{' '}</Text>
     </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    maxWidth:500,
    padding: 20, 
  },
  subtitle: {
    marginVertical: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
  },
  alternativeLogin:{
    flexDirection:'row',
    justifyContent:'space-around'
  },
  footerText: {
    margin: 15,
    textAlign: 'center',
    fontSize: 14,
    color: '#6b7280', 
  },
  footerLink: {
    fontWeight: '600',
    color: '#4f46e5',
  }
});
