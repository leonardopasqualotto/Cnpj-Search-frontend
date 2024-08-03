import React from "react"; 
import {Image} from 'react-native'
import { Drawer } from 'expo-router/drawer';
import {  useWindowDimensions,Text} from "react-native";
import { DrawerToggleButton } from "@react-navigation/drawer";
import CustomDrawerContent from "@/components/CustomDrawerContent";
import { Redirect, } from "expo-router";
import { useAuthContext } from "@/hooks/context";

export default function AppLayout() {

  const {width} = useWindowDimensions()
  const {token,googleData,isLoading} = useAuthContext()

  if(isLoading) {
    return(<Text>loading</Text>)
  }

  if(!token && !googleData){
    return(<Redirect href={"/login"}/>)
  }
    


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