import { Redirect } from "expo-router";
import { Text, View,StyleSheet } from "react-native";

export default function Home() {

  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container:{
    flex:1,
  },
})