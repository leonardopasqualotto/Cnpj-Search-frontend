import { SearchInputProps } from '@/utils/interfaces';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import MaskInput, {Masks } from 'react-native-mask-input';

export function SearchInput({onPress, ...rest}: SearchInputProps) {
 
  return (
    <View style={{flexDirection:'row'}}>
      <MaskInput
        mask={Masks.BRL_CNPJ}
        keyboardType='numeric'
        placeholder='Digite o CNPJ'
        style={styles.input} 
        {...rest}
      />   
      <TouchableOpacity style={styles.searchIcon} onPress={onPress}>
        <Ionicons  size={25} name='search'/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    minWidth:300,
    borderBottomLeftRadius: 18,
    borderTopLeftRadius:18,
    paddingLeft:18,
    padding:10,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  searchIcon:{
    justifyContent:'center',
    paddingHorizontal:10,
    backgroundColor: '#4470E2',
    borderBottomRightRadius: 18,
    borderTopRightRadius:18,
  }
})