import { SocialLoginButtonProps } from '@/utils/interfaces';
import {Text,StyleSheet, Image, TouchableOpacity } from 'react-native';

export function SocialLoginButton({icon,...rest}:SocialLoginButtonProps) {
  return (
    <TouchableOpacity style={styles.socialLogin}  {...rest} >
       <Image source= {icon} style={{maxHeight:30,maxWidth:30}}/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
socialLoginText:{
    fontWeight:'700',
    marginLeft:6,
  },
  socialLogin:{
    flex:1,
    borderWidth:1,
    borderColor: '#d1d5db',
    borderRadius:5,
    margin:8,
    padding:10,
    width:'100%',
    justifyContent:'center',
    flexDirection:'row',
    alignItems:'center',
  },
})