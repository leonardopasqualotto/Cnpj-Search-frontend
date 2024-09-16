import {useState } from 'react';
import {StyleSheet, Image, Text, View} from "react-native"; 
import { SignInButton } from './SignInButton';
import { Divider } from './Divider'
import { SocialLoginButton } from './SocialLoginButton';
import { InputGroup } from './InputGroup';
import React from 'react';
import { useAuthContext } from '@/context/context';
import { Link } from 'expo-router';

export default function SignInForm() {

  const [user,setUser] = useState('')
  const [password,setPassword] = useState('')
  const {signIn, signInWithGoogle, signInWithFacebook} = useAuthContext()

  function handleSignIn( user: string, password:string){
    if(user ==""|| password =="" ){
      alert("Usuário e/ou senha inválidos. Preencha corretamente os campos")
    }else{
      signIn(user,password)
    }
    
  }

  return (
      <View style={styles.container}>
        <Image style={styles.image} source={require('@/assets/images/logo.png')}/>
        <Text style={styles.subtitle}>Sign in to your account</Text>
        <InputGroup label='User' value={user} onChangeText={setUser} placeholder='usuário'/>
        <InputGroup label='Password' value={password} onChangeText={setPassword} placeholder='password' secureTextEntry/>   
        <SignInButton title = 'Sign In'onPress={()=> handleSignIn(user, password)} />
        <Divider/>
        <View style={styles.alternativeLogin}>
          <SocialLoginButton icon= {require('@/assets/images/google.png')} onPress={signInWithGoogle}/>
          <SocialLoginButton icon= {require('@/assets/images/facebook.png')} onPress={signInWithFacebook}/>
        </View>
        <Link href={'/register'} style={styles.footerText}>Don't have an account?</Link>
     </View>
  );
};
 
const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    maxWidth:600,
    padding: 20, 
  },
  image:{
    alignSelf:'center', 
    height:80,width:80, 
    borderRadius:70
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
  }
});
