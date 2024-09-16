import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CnpjItem } from './CnpjItem';
import { CnpjItemGroupProps } from '@/utils/interfaces';

export function CnpjItemGroup({itens}:CnpjItemGroupProps) {
  return (
    <View style={styles.itemView}>
         {itens.map((cnpjItem, index)=>(
         <CnpjItem key={index} itemTitle={cnpjItem.itemTitle} item={cnpjItem.item}/>
        ))}
    </View>
  );
}
const styles = StyleSheet.create({
    itemView:{
        flexDirection:'row', 
        justifyContent:'space-between',
    },
})
