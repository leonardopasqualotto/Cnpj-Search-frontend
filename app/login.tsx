import SignInForm from "@/components/SignInForm";
import { Image,StyleSheet,useWindowDimensions, ScrollView } from "react-native";

export default function Login() {
  const {width} = useWindowDimensions()

  return (
    <ScrollView contentContainerStyle={styles.scroll}>    
        <SignInForm /> 
        {width > 1300 ? 
          <Image style={styles.image} source={require('./../assets/images/login-image.png')}/> 
          : null
        }
    </ScrollView>
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