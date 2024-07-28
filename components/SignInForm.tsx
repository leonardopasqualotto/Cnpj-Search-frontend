import { useEffect, useState } from 'react';
import {StyleSheet, Text, View} from "react-native"; 
import { Link } from 'expo-router';
import { SignInButton } from './SignInButton';
import { Divider } from './Divider'
import { SocialLoginButton } from './SocialLoginButton';
import { InputGroup } from './InputGroup';

export default function SignInForm() {
 

  const [user,setUser] = useState('');
  const [password,setPassword] = useState('');

  return (
      <View style={styles.container}>
        <Text style={styles.subtitle}>Sign in to your account</Text>
        <InputGroup label='User' value={user} onChageText={setUser} placeholder='email or user'  securityEntry={false}/>
        <InputGroup label='Password' value={password} onChageText={setPassword} placeholder='password'  securityEntry={true}/>   
        <SignInButton user={user}password={password} />
        <Divider />
        <View style={styles.alternativeLogin}>
          <SocialLoginButton image={require('@/assets/images/google.png')} socialMedia='Google' />
          <SocialLoginButton image={require('@/assets/images/github.png')} socialMedia='GitHub' />
        </View>
        <Text style={styles.footerText}>Not a member?{' '}<Link href={'/register'} style={styles.footerLink}>Register</Link></Text>
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
