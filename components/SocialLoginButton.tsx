import {Image,Text, StyleSheet, ImageProps, Pressable } from 'react-native';

interface SocialLoginButtonProps{
  image:ImageProps,
  socialMedia:string,
}

export function SocialLoginButton({image, socialMedia}:SocialLoginButtonProps) {
 
  return (
    <Pressable style={styles.socialLogin} onPress={()=>console.log("oi")}>
        <Image style={{height:20,width:20}} source={image}/>
        <Text style={styles.socialLoginText}>{socialMedia}</Text>
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
    alignItems:'center'
  },
})