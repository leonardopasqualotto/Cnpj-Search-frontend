import { DrawerContentScrollView } from "@react-navigation/drawer";
import CustomDrawerItem from "./CustomDrawerItem";
import { router } from "expo-router";
import {Image,Platform,StyleSheet} from 'react-native'
import { useUserData } from "@/hooks/context";
import { useAuth } from "@clerk/clerk-expo";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CustomDrawerContent() {
  const {signOut,isSignedIn} = useAuth();
  const { signOutonWeb} = useUserData()

  async function handleSignOut(){
    if(Platform.OS =="web"){
      signOutonWeb()
    }else{
      signOut()
      
      signOutonWeb()
      console.log(isSignedIn)
    }
  }
    return (
      <DrawerContentScrollView >
        <Image 
            style={styles.image} 
            source={require('@/assets/images/logo.png')}
        />
        <CustomDrawerItem 
            label={"Home"} 
            onPress={()=>router.navigate('/')} 
            iconName='home' 
        />
        <CustomDrawerItem 
            label={"Profile"} 
            onPress={()=>router.navigate('/profile')} 
            iconName='person' />
        <CustomDrawerItem 
            label={"Sair"} 
            onPress={()=>handleSignOut()} 
            iconName='logout' 
        />
      </DrawerContentScrollView>
    );
  }

  const styles = StyleSheet.create({
    image:{
      justifyContent:'center',
      borderRadius:10,
      margin:10,
      marginBottom:30,
      maxHeight:60,
      maxWidth:60
    }
  })