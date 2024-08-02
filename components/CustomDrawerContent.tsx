import { DrawerContentScrollView } from "@react-navigation/drawer";
import CustomDrawerItem from "./CustomDrawerItem";
import { router } from "expo-router";
import {Image,Platform,StyleSheet} from 'react-native'
import { useAuthContext } from "@/hooks/context";


export default function CustomDrawerContent() {
  const {signOut} =useAuthContext()
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
            onPress={()=>signOut()} 
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