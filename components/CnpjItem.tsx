import { formatDate } from '@/utils/format';
import {CnpjItemProps } from '@/utils/interfaces';
import { View,Text,StyleSheet } from 'react-native';

export function CnpjItem({itemTitle, item}:CnpjItemProps) {
  const renderItem = () => {
    if(typeof item ==='string'){
      return  <Text style={styles.item}>{item? item : "Não informado"}</Text>
    } else if (Array.isArray(item)) {
      return (
        <View>
          {item.map((item, index) => (     
            <View key={index}>
              {item.descricao ? 
                <Text  style={styles.item}>{index+1} - {item.descricao}</Text> :
                <View style={{marginVertical:5,}}>
                  <Text style={{fontWeight:'600', fontSize:12}}>{index+1} - {item.nome_socio_razao_social}</Text>
                  <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <View >
                      <Text>Qualificação</Text>
                      <Text style={styles.item}>{item.qualificacao_socio.descricao}</Text>
                    </View>
                    <View>
                      <Text>CPF</Text>
                      <Text style={styles.item}>{item.cpf_cnpj_socio}</Text>
                    </View>
                    <View>
                      <Text>Faixa Etária</Text>
                      <Text style={styles.item}>{item.faixa_etaria.descricao}</Text>
                    </View>
                    <View>
                      <Text>Data Entrada Sociedade</Text>
                      <Text style={styles.item}>{formatDate(item.data_entrada_sociedade)}</Text>  
                    </View>
                    
                  </View>
                </View>
              }
            </View>
          ))}
        </View>
      );
    }
  }

  return(
    <View>
      <Text style={styles.itemTitle}>{itemTitle}</Text> 
      {renderItem()}
    </View>
  )
}
const styles = StyleSheet.create({
    itemTitle:{
      fontWeight:'700',
      fontSize:14,
      lineHeight:25
    },
    item:{
      flex:1,
      fontWeight:'400',
      fontSize:11,
      lineHeight:18
    }
  })