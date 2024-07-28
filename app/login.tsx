import SignInForm from "@/components/SignInForm";
import { Image,StyleSheet,useWindowDimensions, KeyboardAvoidingView, ScrollView, Platform } from "react-native";

export default function Login() {
  const  {width} = useWindowDimensions()
  return (
    <KeyboardAvoidingView style={{ flex:1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
        <ScrollView contentContainerStyle={styles.scroll}>
            <SignInForm /> 
            {width >1500 ? 
            <Image style={styles.image} source={require('./../assets/images/login-image.png')} />
            : null}
        </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    justifyContent:'space-around',
    flexDirection:'row',    
},
image:{
    height:'100%',
    width:'50%',
}
})