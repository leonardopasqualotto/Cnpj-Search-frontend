import React from "react";
import { Drawer } from 'expo-router/drawer';
import { Pressable,Image,Text, useWindowDimensions, StyleSheet} from "react-native";
import { DrawerContentScrollView, DrawerItem, DrawerItemList, DrawerToggleButton } from "@react-navigation/drawer";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Redirect, router } from "expo-router";
import { useUser } from "@/hooks/context";

export default function AppLayout() {

  const {token,isLoading} = useUser();
  const {width} = useWindowDimensions()

  if (isLoading) {return(<Text>Loading</Text>)}
  if (!token) {return (<Redirect href="/login" />)}

  return (
    <Drawer  
      drawerContent={CustomDrawerContent}
      screenOptions={{
        drawerType: (width >1000 ? 'permanent' : 'front'),
        drawerStyle: {justifyContent:'center',backgroundColor:'#4F46E5'},
        drawerLabelStyle: {color:'#fff'},  
        drawerActiveBackgroundColor: '#4338CA',
        headerLeft: ()=>(width >1000 ? null : <DrawerToggleButton/>),
        headerRight: ()=><Pressable onPress={()=>null}><Ionicons name='person-circle' size={40} color={'gray'}/></Pressable>
      }}
    >
      <Drawer.Screen name ='index' options={{title:'Home',drawerIcon:()=><MaterialIcons name='home' size={30}color={'#fff'}/>}}/>
      <Drawer.Screen name='profile' options={{title:'Profile',drawerIcon:()=><MaterialIcons name='person' size={30} color={'#fff'}/>}}/>
    </Drawer>
  );
}
function CustomDrawerContent(props:any) {
  const { signOut } = useUser();
 
  return (
    <DrawerContentScrollView {...props}>
      <Image source={require('@/assets/images/logo.png')} style={styles.image}/>
      <DrawerItem label={'Home'} labelStyle={{color:'#fff'}}  onPress={()=>router.navigate('/')} icon={()=><MaterialIcons name='home' size={30} color={'#fff'}/>}/>
      <DrawerItem label={'Profile'} labelStyle={{color:'#fff'}}  onPress={()=>router.navigate('/profile')} icon={()=><MaterialIcons name='person' size={30} color={'#fff'}/>}/>
      <DrawerItem label={'Sair'} labelStyle={{color:'#fff'}}  onPress={()=>signOut()} icon={()=><MaterialIcons name='logout' size={30} color={'#fff'}/>}/>
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