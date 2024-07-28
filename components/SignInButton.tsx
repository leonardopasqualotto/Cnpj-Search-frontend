import { useUser } from '@/hooks/context';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

interface SignInButtonProps{
    user:string
    password:string
}

export function SignInButton({user, password}:SignInButtonProps) {
    const { signIn } = useUser();
  return (
    <Pressable onPress={ ()=> signIn(user,password)} style={styles.button}>
        <Text style={styles.buttonText}>Sign in</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({

    button: {
      marginTop: 16,
      backgroundColor: '#4f46e5',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center'
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
  
  });
  