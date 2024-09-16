import { useWindowDimensions, View} from 'react-native'
import { Drawer } from 'expo-router/drawer';
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Redirect} from "expo-router";
import { CustomDrawerContent } from "@/components/CustomDrawerContent";
import { useAuthContext } from '@/context/context';
import { useState } from 'react';
import { SearchInput } from '@/components/SearchInput';
import { formatCnpjInput } from '@/utils/format';

export default function AppLayout() {

  const {width} = useWindowDimensions()
  const {token,googleData, facebookData,isLoading} = useAuthContext()
  const [cnpjInput,setCnpjInput] = useState("")
  const {searchCnpj} = useAuthContext()

  if(isLoading) return
  if(!token && !googleData && !facebookData) {return( <Redirect href={"/login"}/>)} 
  
  return (
    <Drawer 
      drawerContent={CustomDrawerContent}
      screenOptions={{
        drawerType: width > 1000 ? 'permanent' : 'front',
        headerLeft: () => width >1000 ? null : <DrawerToggleButton/>,
      }}
    >
      <Drawer.Screen 
        name='index' 
        options={{
          headerTitle:()=> 
          <SearchInput 
            onPress={()=>searchCnpj(formatCnpjInput(cnpjInput))} 
            value= {cnpjInput} onChangeText={setCnpjInput}
          />  
        }} 
      />
      <Drawer.Screen 
        name = 'profile' 
        options={{ 
          title: (
            googleData ? 'Você está logado via Google' : 
            facebookData? 'Você fez login pelo Facebook' :
            'Bem-vindo!'
          ) 
        }}
      />
    </Drawer>
  );
}
 