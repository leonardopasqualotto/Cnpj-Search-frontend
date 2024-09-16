import { View, Text, StyleSheet } from 'react-native';

export function Divider() {
  return (
    <View style={styles.dividerView}>
      <View style={{ flex:1,height: 1, backgroundColor: 'gray', width:'90%' }} />
      <Text style={styles.continueWith}>  Or continue with  </Text>
      <View style={{ flex:1,height: 1, backgroundColor: 'gray', width:'90%' }} />
  </View>
  );
}

const styles = StyleSheet.create({
    dividerView:{
        justifyContent:'center',
        marginVertical:30,
        alignItems:'center',
        flexDirection:'row',
      },
    continueWith:{
        fontSize:14,
        fontWeight:'400', 
      },
  });