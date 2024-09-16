
import { InputGroup } from '@/components/InputGroup';
import { SignInButton } from '@/components/SignInButton';
import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View ,Text,StyleSheet} from 'react-native';
import { useAuthContext } from '@/context/context';
import { UserRole } from '@/utils/interfaces';


export default function Help() {
  const userRole: UserRole = UserRole.USER
  const [user,setUser] = useState('')
  const [password,setPassword] = useState('')
  const {register} = useAuthContext()

  function handleRegister( user: string, password:string, role:UserRole){
    if(user ==""|| password =="" ){
      alert("Os campos de usuário e senha não podem estar vazios")
    }else{
      register(user,password,role)
    }
    
  }
 
  return (
    <View style={styles.container}>
      <Link href={'/login'}>
        <MaterialIcons name='arrow-back' size={30} color={'#4f46e5'} style={{borderColor:'#4f46e5',alignSelf:'flex-start',borderWidth:2, borderRadius:30}}/>
      </Link>
      <View style={styles.form}>
        <Text style={styles.title}>Register</Text>
        <InputGroup label='User' onChangeText={setUser} value={user}/>
        <InputGroup label='Password' onChangeText={setPassword} value={password} secureTextEntry/>
        <SignInButton title='Register' onPress={()=>handleRegister(user, password,userRole)}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    
    padding:20
  },
  form:{
    alignSelf:'center',
   minWidth:400
  },
  title:{
    fontWeight:'700',
    fontSize:16,
   alignSelf:'center'
  }
})