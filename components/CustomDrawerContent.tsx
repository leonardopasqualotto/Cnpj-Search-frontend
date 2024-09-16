import CustomDrawerItem from "@/components/CustomDrawerItem";
import { router} from "expo-router";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Image} from 'react-native'
import { useAuthContext } from "@/context/context";

export function CustomDrawerContent(props: any) {
  const {signOut} = useAuthContext()

  return (
    <DrawerContentScrollView style={{backgroundColor:'#4f46e5'}}>
      <Image 
        style={{borderRadius:20,margin:10,marginBottom:30,maxHeight:70,maxWidth:70}} 
        source={require('@/assets/images/logo.png')}/>
      <CustomDrawerItem index={0} props={props} iconName="search" label={"Busca CNPJ"} onPress={()=>router.navigate('/')}/>
      <CustomDrawerItem index={1} props={props} iconName="person" label={"Profile"} onPress={()=>router.navigate('/profile')}/>
      <CustomDrawerItem index={2} props={props} iconName="logout" label={"Sair"} onPress={signOut} />
    </DrawerContentScrollView>
  );
}