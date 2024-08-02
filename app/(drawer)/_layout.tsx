import React from "react"; 
import {Image} from 'react-native'
import { Drawer } from 'expo-router/drawer';
import {  useWindowDimensions} from "react-native";
import { DrawerToggleButton } from "@react-navigation/drawer";
import CustomDrawerContent from "@/components/CustomDrawerContent";
import { useUserData } from "@/hooks/context";
import { Redirect, } from "expo-router";

export default function AppLayout() {
  console.log("vai pro AppLayout")

  const {width} = useWindowDimensions()
  const{userData,token} = useUserData()
  const uri = userData?.picture

  if(!token && !userData ){
    console.log("vai pro login")
    return(<Redirect href={"/login"}/>)
}
console.log("vai pra Home")
    return (
      <Drawer 
        drawerContent={CustomDrawerContent}
        screenOptions={{
          drawerType: width >1000 ? 'permanent' : 'front',
          drawerStyle: {justifyContent:'center',backgroundColor:'#4F46E5'},
          drawerLabelStyle: {color:'#fff'},  
          drawerActiveBackgroundColor: '#4338CA',
          headerLeft: () => width >1000 ? null : <DrawerToggleButton/>,
          headerRight:() => (<Image source={{uri:'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg'}} style={{borderWidth:1,height:50,width:50}}/>)
        }}
      />
    );
  }