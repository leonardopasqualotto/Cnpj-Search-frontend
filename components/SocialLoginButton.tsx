import {Text,StyleSheet,ActivityIndicator, TouchableOpacity, TouchableOpacityProps, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SocialLoginButtonProps extends TouchableOpacityProps{
  title:string,
  isLoading?:boolean
  icon: keyof typeof Ionicons.glyphMap
}

export function SocialLoginButton({title,isLoading=false,icon,...rest}:SocialLoginButtonProps) {
  return (
    <Pressable style={styles.socialLogin}  disabled={isLoading}{...rest} >
      {isLoading ? <ActivityIndicator color={'#000'}/> : 
      <> 
       <Ionicons name={icon} size={20} />
        <Text style={styles.socialLoginText}>{title}</Text>
      </>
      }
    </Pressable>
  );
}

const styles = StyleSheet.create({
socialLoginText:{
    fontWeight:'700',
    marginLeft:6,
  },
  socialLogin:{
    borderWidth:1,
    borderColor: '#d1d5db',
    flex:1,
    borderRadius:5,
    margin:8,
    padding:10,
    width:'100%',
    justifyContent:'center',
    flexDirection:'row',
    alignItems:'center',
  },
})