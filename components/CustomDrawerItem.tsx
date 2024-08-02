import { MaterialIcons } from "@expo/vector-icons"
import { DrawerItem } from "@react-navigation/drawer"

interface CustomDrawerItemProps{
    label:string 
    onPress:()=>void 
    iconName: keyof typeof MaterialIcons.glyphMap  
  }


export default function CustomDrawerItem({label,iconName,onPress}: CustomDrawerItemProps){
    return(
    <DrawerItem 
      label={label} 
      labelStyle={{color:'#fff'}} 
      onPress={onPress} 
      icon={()=><MaterialIcons name={iconName} size={30} color={'#fff'}/>}  
    />
    )
  }