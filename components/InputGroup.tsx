import React from 'react';
import { Text,TextInput, StyleSheet, InputModeOptions } from 'react-native';

interface InputGroupProps{
    label:string
    value:string
    onChageText: React.Dispatch<React.SetStateAction<string>>
    placeholder:string
    securityEntry:boolean
}

export function InputGroup({label, value, onChageText, placeholder, securityEntry}: InputGroupProps) {
  return (
    <>
        <Text style={styles.inputLabel}>{label}</Text>
        <TextInput style={styles.input} 
            value={value} 
            placeholder={placeholder} 
            onChangeText={onChageText} 
            secureTextEntry={securityEntry}
        />
    </>
  );
}

const styles = StyleSheet.create({

inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937'
  },
  input: {
    marginVertical: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderColor: '#d1d5db',
    borderWidth: 1,
    fontSize: 14,
    color: '#1f2937',
  }
})