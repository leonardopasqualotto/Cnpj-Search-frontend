import { useAuthContext } from "@/context/context";
import { View,Text,Image,StyleSheet } from "react-native";

export default function Profile() {
const {googleData,facebookData} = useAuthContext()
  return (
    <View  style={styles.container}>  
      <Image 
        source = {{uri: googleData? googleData?.picture :facebookData?.picture.data.url }} 
        style = {{width:200,height:200, borderRadius:200}}
      />
      <Text style={styles.title}>{googleData? googleData.name : facebookData?.name}</Text>
      <Text style={styles.subTitle}>{googleData? googleData.email : null}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    padding:20
  },
  title:{
    fontSize:16,
    fontWeight:'700'
  },
  subTitle:{
    fontSize:12,
    fontWeight:'500'
  }
})