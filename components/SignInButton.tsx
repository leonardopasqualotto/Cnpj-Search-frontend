import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

export interface ButtonPropps extends TouchableOpacityProps{
  title:string
}

export function SignInButton({title, ...rest}:ButtonPropps) {
   
  return (
    <TouchableOpacity {...rest}style={styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

    button: {
      backgroundColor: '#4f46e5',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent:'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
  });
  