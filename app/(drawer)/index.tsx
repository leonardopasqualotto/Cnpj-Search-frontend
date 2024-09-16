import CnpjForm from '@/components/CnpjForm'
import { useAuthContext } from '@/context/context'
import {StyleSheet, View} from 'react-native'

export default function Home() {
const {cnpj} = useAuthContext()
  return(
    <View style={styles.container}>
      <CnpjForm {...cnpj} />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20
  },
})
