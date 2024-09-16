import { CustomDrawerItemProps } from "@/utils/interfaces"
import { MaterialIcons } from "@expo/vector-icons"
import { DrawerItem } from "@react-navigation/drawer"

export default function CustomDrawerItem({label, onPress, iconName, index, props}:CustomDrawerItemProps){
    return(  
      <DrawerItem 
        label={label}
        onPress={onPress} 
        icon={()=> 
          <MaterialIcons name={iconName} size={30} color={props.state.index === index ? '#fff' : '#C7D2FE'}/>
        }  
        focused = {props.state.index === index}
        style={props.state.index === index ? 
          {backgroundColor:'#4338CA', borderRadius:10} : 
          null
        }
        labelStyle={props.state.index ===index ? 
          {color:'#fff', fontWeight:'800'} : 
          {color:'#C7D2FE'}
        } 
      />
    )
  }
